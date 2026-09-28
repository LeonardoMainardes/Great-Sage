#[cfg_attr(mobile, tauri::mobile_entry_point)]

mod speech;
mod commands;

pub fn run() {
    tauri::Builder::default()
        .plugin(tauri_plugin_autostart::Builder::new().build())
        .plugin(tauri_plugin_global_shortcut::Builder::new().build())
        .plugin(tauri_plugin_window_state::Builder::default().build())
        .plugin(tauri_plugin_opener::init())
        .invoke_handler(tauri::generate_handler![commands::receive_audio])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");

    }
