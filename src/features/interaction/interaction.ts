import { startVoiceCapture, stopVoiceCapture } from "../voice/voice";
import { InteractionStatus } from "./types";

interface ToggleInteractionStatusProps {
  onStatusChange: (status: InteractionStatus) => void;
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
}: ToggleInteractionStatusProps) {
  if (interactionStatus === "INACTIVE") {
    try {
      const voiceStatus = await startVoiceCapture();

      if (voiceStatus === "ACTIVE") {
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

    stopVoiceCapture();
  }
}
