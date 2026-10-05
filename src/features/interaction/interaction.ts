import { startSpeechDetection, stopSpeechDetection } from "../voice/speech";
import { startVoiceCapture, stopVoiceCapture } from "../voice/";
import { InteractionStatus } from "./types";
import { SpeechStatus } from "../voice/speech/types";

interface ToggleInteractionStatusProps {
  onStatusChange: (status: InteractionStatus) => void;
  onSpeechStatusChange: (status: SpeechStatus) => void;
}

export function startInteraction(): InteractionStatus {
  return "ACTIVE";
}

export function stopInteraction(): InteractionStatus {
  return "INACTIVE";
}

let interactionStatus: InteractionStatus = "INACTIVE";

export async function toggleInteractionStatus({
  onStatusChange,
  onSpeechStatusChange,
}: ToggleInteractionStatusProps) {
  if (interactionStatus === "INACTIVE") {
    try {
      const voiceResult = await startVoiceCapture();

      if (voiceResult.stream && voiceResult.status === "ACTIVE") {
        await startSpeechDetection({
          stream: voiceResult.stream,
          onSpeechStatusChange,
        });

        const newStatus = startInteraction();
        interactionStatus = newStatus;
        onStatusChange(newStatus);
      }
    } catch (error) {
      console.error("Error starting voice capture:", error);
    }
  } else if (interactionStatus === "ACTIVE") {
    const newStatus = stopInteraction();
    interactionStatus = newStatus;
    onStatusChange(newStatus);

    stopSpeechDetection();

    stopVoiceCapture();
  }
}
