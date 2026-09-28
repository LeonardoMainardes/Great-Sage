export type AudioProcessorMessage = {
  type: "audio-samples";
  samples: Float32Array;
};
