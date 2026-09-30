import { AudioProcessorMessage } from "./types";
import { Chunk } from "./chunk";
import { SpeechDetector } from "./speech";
import { SpeechEndDetector } from "./speech-end";

let audioContext: AudioContext | null = null;

let audioChunk: Chunk | null = null;

let speechDetector: SpeechDetector | null = null;

let speechEndDetector: SpeechEndDetector | null = null;

export const startAudioProcessing = async (stream: MediaStream) => {
  audioContext = new AudioContext();

  audioChunk = new Chunk();

  audioChunk.start();

  speechDetector = new SpeechDetector();

  speechEndDetector = new SpeechEndDetector();

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

      const isSpeech = speechDetector?.detectSpeech(samples) ?? false;

      const speechEnd =
        speechEndDetector?.update(isSpeech ? "speech" : "silence") ?? false;

      console.log(
        "Speech detected:",
        isSpeech,
        "Speech end detected:",
        speechEnd,
      );

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

  speechDetector = null;

  speechEndDetector = null;

  audioChunk = null;

  audioContext = null;
};
