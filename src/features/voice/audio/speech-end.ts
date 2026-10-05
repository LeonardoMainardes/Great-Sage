export class SpeechEndDetector {
  private silenceFrames = 0;
  private speechDetected = false;
  private readonly silenceThreshold: number = 75;

  public update(state: "speech" | "silence"): boolean {
    switch (state) {
      case "speech":
        this.silenceFrames = 0;
        this.speechDetected = true;
        break;
      case "silence":
        this.silenceFrames++;
        if (
          this.silenceFrames >= this.silenceThreshold &&
          this.speechDetected
        ) {
          this.silenceFrames = 0;
          this.speechDetected = false;
          return true;
        }
    }

    return false;
  }
}
