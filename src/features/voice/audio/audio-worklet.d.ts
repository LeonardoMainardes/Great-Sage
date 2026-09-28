class AudioWorkletProcessor {
  port: MessagePort;
  process(
    inputs: Float32Array[][],
    outputs: Float32Array[][],
    parameters: Record<string, Float32Array>,
  ): boolean;
}

function registerProcessor(
  name: string,
  processorCtor: typeof AudioWorkletProcessor,
): void;
