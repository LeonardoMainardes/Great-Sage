#[tauri::command]
pub fn receive_audio(bytes: Vec<u8>) -> Result<(), String> {
    println!("Received audio bytes: {}", bytes.len());
  Ok(())
}