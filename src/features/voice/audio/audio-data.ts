export class AudioDataTypes {
  sample_rate: number;
  channels: number;
  data: Float32Array;

  constructor(sampleRate: number, channels: number, data: Float32Array) {
    this.sample_rate = sampleRate;
    this.channels = channels;
    this.data = data;
  }
}
