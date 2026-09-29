import { AudioProcessorMessage } from "./types";
import { Buffer } from "./buffer";

let audioContext: AudioContext | null = null;

let audioBuffer: Buffer | null = null;

export const startAudioProcessing = async (stream: MediaStream) => {
  audioContext = new AudioContext();

  audioBuffer = new Buffer();

  await audioContext.audioWorklet.addModule(
    new URL("./processor.ts", import.meta.url),
  );

  const audioSource = audioContext.createMediaStreamSource(stream);

  const audioWorkletNode = new AudioWorkletNode(
    audioContext,
    "audio-processor",
  );

  audioWorkletNode.port.onmessage = (
    event: MessageEvent<AudioProcessorMessage>,
  ) => {
    const message = event.data;
    if (message.type === "audio-samples") {
      const samples = message.samples;

      audioBuffer?.add(samples);
    }
  };

  audioSource.connect(audioWorkletNode);
};

export const stopAudioProcessing = async () => {
  if (audioContext) {
    await audioContext.close();
  }

  if (audioBuffer) {
    audioBuffer.clear();
  }

  audioBuffer = null;

  audioContext = null;
};
