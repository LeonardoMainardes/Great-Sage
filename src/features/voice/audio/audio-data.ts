export class AudioDataTypes {
  sampleRate: number;
  channels: number;
  data: Float32Array;

  constructor(sampleRate: number, channels: number, data: Float32Array) {
    this.sampleRate = sampleRate;
    this.channels = channels;
    this.data = data;
  }
}
