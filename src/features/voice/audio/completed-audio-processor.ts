import { AudioDataTypes } from "./audio-data";

export class CompletedAudioProcessor {
  process(completedChunk: AudioDataTypes) {
    console.log(
      "Processed completed chunk length:",
      completedChunk.data,
      "Sample Rate:",
      completedChunk.sampleRate,
      "Channels:",
      completedChunk.channels,
    );

    return {
      type: "completed-chunk",
      chunk: completedChunk,
    };
  }
}
