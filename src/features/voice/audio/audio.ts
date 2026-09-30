import { AudioProcessorMessage } from "./types";
import { Chunk } from "./chunk";

let audioContext: AudioContext | null = null;

let audioChunk: Chunk | null = null;

export const startAudioProcessing = async (stream: MediaStream) => {
  audioContext = new AudioContext();

  audioChunk = new Chunk();

  audioChunk.start();

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

      audioChunk?.add(samples);
    }
  };

  audioSource.connect(audioWorkletNode);
};

export const stopAudioProcessing = async () => {
  if (audioContext) {
    await audioContext.close();
  }

  if (audioChunk) {
    audioChunk.reset();
  }

  audioChunk = null;

  audioContext = null;
};
