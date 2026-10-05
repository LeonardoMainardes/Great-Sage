export type AudioProcessorMessage = {
  type: "audio-samples";
  samples: Float32Array;
};

export type ChunkStatus = "EMPTY" | "RECORDING" | "COMPLETED";

export type AudioPayload = {
  sample_rate: number;
  channels: number;
  data: Uint8Array;
};
