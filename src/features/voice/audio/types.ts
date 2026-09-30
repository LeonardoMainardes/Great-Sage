export type AudioProcessorMessage = {
  type: "audio-samples";
  samples: Float32Array;
};

export type ChunkStatus = "EMPTY" | "RECORDING" | "COMPLETED";
