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

export function toggleInteractionStatus({
  onStatusChange,
}: ToggleInteractionStatusProps) {
  if (interactionStatus === "INACTIVE") {
    const newStatus = startInteraction();
    interactionStatus = newStatus;
    onStatusChange(newStatus);
  } else if (interactionStatus === "ACTIVE") {
    const newStatus = stopInteraction();
    interactionStatus = newStatus;
    onStatusChange(newStatus);
  }
}
