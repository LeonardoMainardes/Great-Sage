let audioContext: AudioContext | null = null;

export const startAudioProcessing = async (stream: MediaStream) => {
  audioContext = new AudioContext();

  await audioContext.audioWorklet.addModule(
    new URL("./processor.ts", import.meta.url),
  );

  const audioSource = audioContext.createMediaStreamSource(stream);

  const audioWorkletNode = new AudioWorkletNode(
    audioContext,
    "audio-processor",
  );

  audioWorkletNode.port.onmessage = (event) => {
    if (event.data.type === "audio-samples") {
      const samples = event.data.samples as Float32Array;
      console.log(
        "Received audio samples from AudioWorkletProcessor:",
        samples.length,
      );
    }
  };

  audioSource.connect(audioWorkletNode);
};

export const stopAudioProcessing = async () => {
  if (audioContext) {
    await audioContext.close();
  }
  audioContext = null;
};
