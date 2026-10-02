use whisper_rs::WhisperContextParameters;

use crate::speech::load_model;

#[cfg_attr(mobile, tauri::mobile_entry_point)]

mod speech;
mod commands;

pub fn run() {

    let parameters = WhisperContextParameters::default();

    let path = "models/ggml-small.bin";

    let context = load_model(path, parameters).expect(" Failed to load model");

    tauri::Builder::default()
        .plugin(tauri_plugin_autostart::Builder::new().build())
        .plugin(tauri_plugin_global_shortcut::Builder::new().build())
        .plugin(tauri_plugin_window_state::Builder::default().build())
        .plugin(tauri_plugin_opener::init())
        .manage(context)
        .invoke_handler(tauri::generate_handler![commands::receive_audio])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");

    }
