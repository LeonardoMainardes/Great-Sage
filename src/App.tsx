import { useEffect, useRef } from "react";
import { getCurrentWindow } from "@tauri-apps/api/window";
import { saveWindowState, StateFlags } from "@tauri-apps/plugin-window-state";
import "./App.css";

function App() {
  const saveTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const window = getCurrentWindow();

    const unlisten = window.onMoved(() => {
      if (saveTimer.current) {
        clearTimeout(saveTimer.current);
      }

      saveTimer.current = setTimeout(async () => {
        await saveWindowState(StateFlags.POSITION);
      }, 300);
    });

    return () => {
      if (saveTimer.current) {
        clearTimeout(saveTimer.current);
      }

      unlisten.then((fn) => fn());
    };
  }, []);

  return (
    <main className="nucleus-container">
      <div className="nucleus">
        <div className="nucleus-core" data-tauri-drag-region />
      </div>
    </main>
  );
}

export default App;