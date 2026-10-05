import { AudioProcessorMessage } from "./types";

class AudioProcessor extends AudioWorkletProcessor {
  process(
    inputs: Float32Array[][],
    outputs: Float32Array[][],
    parameters: Record<string, Float32Array>,
  ): boolean {
    const input = inputs[0][0];

    if (!input || input.length === 0) return true;

    const message: AudioProcessorMessage = {
      type: "audio-samples",
      samples: input,
    };

    this.port.postMessage(message);

    return true;
  }
}

registerProcessor("audio-processor", AudioProcessor);
