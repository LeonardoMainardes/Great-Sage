import { Buffer } from "./buffer";
import { ChunkStatus } from "./types";

export class Chunk {
  private status: ChunkStatus;
  private buffer: Buffer;

  constructor() {
    this.status = "EMPTY";
    this.buffer = new Buffer();
  }

  start() {
    this.status = "RECORDING";
  }

  add(samples: Float32Array) {
    if (this.status === "RECORDING") {
      this.buffer.add(samples);
    }
  }

  complete(): Float32Array {
    if (this.status === "RECORDING") {
      this.status = "COMPLETED";

      return this.buffer.get();
    }

    return new Float32Array(0);
  }

  reset() {
    this.status = "EMPTY";
    this.buffer.clear();
  }
}
