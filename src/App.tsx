import { useEffect, useRef, useState } from "react";
import { getCurrentWindow } from "@tauri-apps/api/window";
import { saveWindowState, StateFlags } from "@tauri-apps/plugin-window-state";
import { register, unregister } from "@tauri-apps/plugin-global-shortcut";
import Nucleus from "./components/nucleus";
import { NucleusState } from "./components/nucleus/types";
import { enable, isEnabled } from "@tauri-apps/plugin-autostart";
import { toggleInteractionStatus } from "./features/interaction/interaction";
import { InteractionStatus } from "./features/interaction/types";
import Response from "./components/response";

function App() {
  const saveTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const window = getCurrentWindow();

  const [_interactionStatus, setInteractionStatus] =
    useState<InteractionStatus>("INACTIVE");

  const [nucleusState, setNucleusState] = useState<NucleusState>("IDLE");
  const [currentResponse, setCurrentResponse] = useState<string | null>(null);

  const toggleVisibility = async () => {
    const visible = await window.isVisible();

    if (visible) {
      await window.hide();
    } else {
      await window.show();
    }
  };

  useEffect(() => {
    async function interactionShortcut() {
      try {
        await register("CommandOrControl+B", (event) => {
          if (event.state === "Pressed") {
            toggleInteractionStatus({
              onStatusChange: (status: InteractionStatus) => {
                if (status === "INACTIVE") {
                  setNucleusState("IDLE");
                }
                setInteractionStatus(status);
              },
              onSpeechStatusChange: (status) => {
                setNucleusState(status === "SPEECH" ? "LISTENING" : "IDLE");
              },
            });
          }
        });
      } catch (error) {
        console.error("Failed to register global shortcut:", error);
      }
    }

    interactionShortcut();

    return () => {
      async function unregisterShortcut() {
        try {
          await unregister("CommandOrControl+B");
        } catch (error) {
          console.error("Failed to unregister global shortcut:", error);
        }
      }

      unregisterShortcut();
    };
  }, []);

  useEffect(() => {
    async function setupAutostart() {
      try {
        const autostartEnabled = await isEnabled();

        if (!autostartEnabled) {
          await enable();
        }
      } catch (error) {
        console.error("Failed to enable autostart:", error);
      }
    }

    setupAutostart();
  }, []);

  useEffect(() => {
    async function registerShortcut() {
      try {
        await register("CommandOrControl+G", (event) => {
          if (event.state === "Pressed") {
            toggleVisibility();
          }
        });
      } catch (error) {
        console.error("Failed to register global shortcut:", error);
      }
    }

    registerShortcut();

    return () => {
      async function unregisterShortcut() {
        try {
          await unregister("CommandOrControl+G");
        } catch (error) {
          console.error("Failed to unregister global shortcut:", error);
        }
      }

      unregisterShortcut();
    };
  }, []);

  useEffect(() => {
    const unlisten = window.onMoved(() => {
      if (saveTimer.current) {
        clearTimeout(saveTimer.current);
      }

      saveTimer.current = setTimeout(async () => {
        try {
          await saveWindowState(StateFlags.POSITION);
        } catch (error) {
          console.error("Failed to save window position:", error);
        }
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
    <div>
      {currentResponse && <Response text={currentResponse} />}
      <Nucleus state={nucleusState} />
    </div>
  );
}

export default App;
