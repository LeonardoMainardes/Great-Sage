#[derive(serde::Deserialize)]
pub struct AudioPayload {
    sample_rate: u32,
    channels: u16,
    data: Vec<u8>,
}

#[tauri::command]
pub fn receive_audio(payload: AudioPayload) -> Result<(), String> {
    println!("Received audio bytes: {}", payload.data.len());
  Ok(())
}