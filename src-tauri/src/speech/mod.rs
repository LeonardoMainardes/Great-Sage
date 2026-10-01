use std::{ffi::c_int, path::Path};
use whisper_rs::{FullParams, SamplingStrategy, WhisperContext, WhisperContextParameters, WhisperError};

use rubato::{Fft, FixedSync, Resampler, audioadapter::Adapter, audioadapter_buffers::owned::InterleavedOwned};

pub fn extract_mono_samples(inter_leaved: InterleavedOwned<f32>) -> Vec<f32> {
    
    let frames = inter_leaved.frames();

    let mut mono_samples = Vec::with_capacity(frames);

    for frame in 0..frames {
        let samples = inter_leaved.read_sample(0, frame);
        
        match samples {
            Some(sample) => mono_samples.push(sample),
            None => {
                eprintln!("Failed to read sample at frame {}", frame);
                return vec![];
            }
        };
    }

    mono_samples
}

pub fn resample_audio(sample: Vec<f32>) -> Vec<f32> {

    let mut resampler = Fft::<f32>::new(
        48000,
        16000,
        1024,
        1,
        FixedSync::Input,
    ).expect("Failed to create resampler");

    let frames = sample.len();
    
    let inter_leaved_buffer = InterleavedOwned::new_from(sample, 1, frames).expect("Failed to create interleaved audio buffer");

    let output = resampler.process_all(&inter_leaved_buffer, frames, None);

    match output {
        Ok(resampled) => {
            let mono_samples = extract_mono_samples(resampled);
            mono_samples
        }
        Err(e) => {
            eprintln!("Error during resampling: {:?}", e);
            vec![]
        }
    }
}

pub fn transcribe_audio(context: &WhisperContext, audio: Vec<f32>) -> Result<String, WhisperError> {
    let mut state = match context.create_state() {
        Ok(state) => state,
        Err(e) => {
            eprintln!("Error creating Whisper state: {:?}", e);
            return Err(e);
        }
    };

    let sampling_strategy = SamplingStrategy::Greedy { best_of: 5 };

    let mut params = FullParams::new(sampling_strategy);
    
    params.set_language(Some("pt"));

    let audio = resample_audio( audio );

    println!("Audio samples length: {}", audio.len());

    match state.full(params, &audio) {
        Ok(()) => (),
        Err(e) => {
            eprintln!("Error during transcription: {:?}", e);
            return Err(e);
        }
    };

    let n_segments = state.full_n_segments() as usize;

    let mut transcription = String::new();

    for i in 0..n_segments {

        let segment = state.get_segment(i as c_int);

        match segment {
            Some(segment) => {
                match segment.to_str() {
                    Ok(text) => transcription.push_str(text),
                    Err(e) => return Err(e),
                }
            }
            None => {
                eprintln!("Failed to retrieve segment {}", i);
            }
        };
    };
    Ok(transcription)
}


pub fn load_model<P>(
    path: P,
    parameters: WhisperContextParameters<'_>
) -> Result<WhisperContext, WhisperError>
where 
    P: AsRef<Path>,
    {
        WhisperContext::new_with_params(path, parameters)
    }

