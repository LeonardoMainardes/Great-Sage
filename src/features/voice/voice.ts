import { VoiceStatus } from "./types";

let mediaStream: MediaStream | null = null;

export async function startVoiceCapture(): Promise<VoiceStatus> {
  try {
    mediaStream = await navigator.mediaDevices.getUserMedia({ audio: true });
  } catch (error) {
    console.error("Error starting voice capture:", error);
    return "ERROR";
  }
  return "ACTIVE";
}

export function stopVoiceCapture(): VoiceStatus {
  if (mediaStream) {
    mediaStream.getTracks().forEach((track) => {
      if (track.readyState === "live") {
        track.stop();
      }
    });
  }
  mediaStream = null;
  return "INACTIVE";
}
