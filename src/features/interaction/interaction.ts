import { InteractionStatus } from "./types";

export function startInteraction(): InteractionStatus {
  return "ACTIVE";
}

export function stopInteraction(): InteractionStatus {
  return "INACTIVE";
}
