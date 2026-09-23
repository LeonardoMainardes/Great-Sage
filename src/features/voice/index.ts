import { VoiceStatus } from "./types";

let mediaStream: MediaStream | null = null;

export async function startVoiceCapture(): Promise<{
  status: VoiceStatus;
  stream: MediaStream | null;
}> {
  try {
    mediaStream = await navigator.mediaDevices.getUserMedia({ audio: true });
  } catch (error) {
    console.error("Error starting voice capture:", error);
    return { status: "ERROR", stream: null };
  }
  return { status: "ACTIVE", stream: mediaStream };
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
