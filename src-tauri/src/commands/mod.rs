use tauri::State;
use whisper_rs::WhisperContext;

use crate::speech::{resample_audio, transcribe_audio};

#[derive(serde::Deserialize)]
pub struct AudioPayload {
    data: Vec<u8>,
}

#[tauri::command]
pub fn receive_audio(payload: AudioPayload, context: State<WhisperContext>) -> Result<String, String> {
    let f32_samples = convert_bytes_to_f32(&payload.data);

    if f32_samples.is_empty() {
        return Err("Received audio data is empty.".to_string());
    }

    let resampled_samples = resample_audio(f32_samples);

    if resampled_samples.is_empty() {
        return Err("Resampled audio data is empty.".to_string());
    }
    
    let transcribed_audio = transcribe_audio(&context, &resampled_samples)
        .map_err(|e| format!("Error during transcription: {:?}", e))?;
    
    Ok(transcribed_audio)
}

pub fn convert_bytes_to_f32(audio_bytes: &[u8]) -> Vec<f32> {
    let mut f32_samples = Vec::with_capacity(audio_bytes.len() / 4);
    for chunk in audio_bytes.chunks_exact(4) {
        let sample = f32::from_le_bytes([chunk[0], chunk[1], chunk[2], chunk[3]]);
        f32_samples.push(sample);
    }
    f32_samples
}