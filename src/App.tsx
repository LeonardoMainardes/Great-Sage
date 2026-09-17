import { useEffect, useRef, useState } from "react";
import { getCurrentWindow } from "@tauri-apps/api/window";
import { saveWindowState, StateFlags } from "@tauri-apps/plugin-window-state";
import { register, unregister } from "@tauri-apps/plugin-global-shortcut";
import Nucleus from "./components/nucleus";
import { NucleusState } from "./components/nucleus/types";

function App() {
  const saveTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const window = getCurrentWindow();
  const [nucleusState, _setNucleusState] = useState<NucleusState>("IDLE");

  const toggleVisibility = async () => {
    const visible = await window.isVisible();

    if (visible) {
      await window.hide();
    } else {
      await window.show();
    }
  };

  useEffect(() => {
    async function registerShortcut() {
      await register("CommandOrControl+G", (event) => {
        if (event.state === "Pressed") {
          toggleVisibility();
        }
      });
    }

    registerShortcut();

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

      async function unregisterShortcut() {
        await unregister("CommandOrControl+G");
      }

      unregisterShortcut();
    };
  }, []);

  return <Nucleus state={nucleusState} />;
}

export default App;
