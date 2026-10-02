import { startAudioProcessing, stopAudioProcessing } from "./audio/audio";
import { VoiceStatus } from "./types";

let mediaStream: MediaStream | null = null;

export async function startVoiceCapture(): Promise<{
  status: VoiceStatus;
  stream: MediaStream | null;
}> {
  try {
    const devices = await navigator.mediaDevices.enumerateDevices();

    const microphone = devices.find(
      (device) =>
        device.kind === "audioinput" &&
        device.deviceId !== "default" &&
        device.deviceId !== "communications",
    );

    if (!microphone) {
      throw new Error("Microphone not found");
    }

    mediaStream = await navigator.mediaDevices.getUserMedia({
      audio: {
        deviceId: {
          exact: microphone.deviceId,
        },
        autoGainControl: true,
        echoCancellation: true,
        noiseSuppression: true,
        channelCount: 1,
        sampleRate: 48000,
      },
    });

    await startAudioProcessing(mediaStream);
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
  stopAudioProcessing();
  return "INACTIVE";
}
