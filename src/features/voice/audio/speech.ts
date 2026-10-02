export class SpeechDetector {
  detectSpeech(samples: Float32Array): boolean {
    const energyThreshold = 0.00001;

    if (samples.length === 0) {
      return false;
    }

    const energy =
      samples.reduce((acc, sample) => acc + sample * sample, 0) /
      samples.length;

    return energy > energyThreshold;
  }
}
