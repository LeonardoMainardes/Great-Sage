export class CompletedAudioProcessor {
  process(completedChunk: Float32Array) {
    console.log("Processed completed chunk length:", completedChunk.length);

    return {
      type: "completed-chunk",
      chunk: completedChunk,
    };
  }
}
