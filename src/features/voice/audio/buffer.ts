export class Buffer {
  private buffer: Float32Array[] = [];

  add(sample: Float32Array) {
    this.buffer.push(sample);

    return sample;
  }
  get(): Float32Array {
    return this.buffer.reduce((acc, curr) => {
      const newBuffer = new Float32Array(acc.length + curr.length);
      newBuffer.set(acc, 0);
      newBuffer.set(curr, acc.length);
      return newBuffer;
    }, new Float32Array());
  }
  clear() {
    this.buffer = [];
  }
}
