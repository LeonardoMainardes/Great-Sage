import { useEffect, useRef } from "react";
import { getCurrentWindow } from "@tauri-apps/api/window";
import { saveWindowState, StateFlags } from "@tauri-apps/plugin-window-state";
import "./App.css";

function App() {
  const saveTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const window = getCurrentWindow();

  useEffect(() => {
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

  const toggleVisibility = async () => {
    const visible = await window.isVisible();

    if (visible) {
      await window.hide();
    } else {
      await window.show();
    }
  }

  return (
    <>
      <button onClick={toggleVisibility}>Toggle</button>

      <main className="nucleus-container">
      <div className="nucleus">
        <div className="nucleus-core" data-tauri-drag-region />
      </div>
    </main>
    </>
  );
}

export default App;