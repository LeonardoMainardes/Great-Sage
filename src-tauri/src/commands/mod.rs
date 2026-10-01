use crate::speech::resample_audio;

#[derive(serde::Deserialize)]
pub struct AudioPayload {
    sample_rate: u32,
    channels: u16,
    data: Vec<u8>,
}

#[tauri::command]
pub fn receive_audio(payload: AudioPayload) -> Result<Vec<f32>, String> {
    println!("payload data length: {}", payload.data.len());

    let sample_rate = payload.sample_rate;
    let channels = payload.channels;

    let f32_samples = convert_bytes_to_f32(&payload.data);

    println!("Received audio with number of samples: {}", f32_samples.len());

    let resampled_samples = resample_audio(f32_samples);
    
    let resampled_sample_rate = 16000;

    println!("Resampled audio with sample rate: {}, channels: {}, number of samples: {}", resampled_sample_rate, channels, resampled_samples.len());
    
    Ok(resampled_samples)
}

pub fn convert_bytes_to_f32(audio_bytes: &[u8]) -> Vec<f32> {
    let mut f32_samples = Vec::with_capacity(audio_bytes.len() / 4);
    for chunk in audio_bytes.chunks_exact(4) {
        let sample = f32::from_le_bytes([chunk[0], chunk[1], chunk[2], chunk[3]]);
        f32_samples.push(sample);
    }
    f32_samples
}