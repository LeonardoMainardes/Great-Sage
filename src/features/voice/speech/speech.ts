import { SpeechStatus } from "./types";

let audioAnalyzer: AnalyserNode | null = null;

let audioContext: AudioContext | null = null;

let audioStreamSource: MediaStreamAudioSourceNode | null = null;

let requestAnimationFrameValue: number | null = null;

function calculateAudioLevel(dataArray: Uint8Array<ArrayBuffer>): number {
  let sum = 0;

  for (let i = 0; i < dataArray.length; i++) {
    const value = dataArray[i];

    const centeredValue = value - 128;
    sum += centeredValue * centeredValue;
  }

  const rms = Math.sqrt(sum / dataArray.length);

  return rms;
}

function analyzeAudio(dataArray: Uint8Array<ArrayBuffer>) {
  if (audioAnalyzer) {
    audioAnalyzer.getByteTimeDomainData(dataArray);

    const audioLevel = calculateAudioLevel(dataArray);

    const speechStatus = detectSpeech(audioLevel);

    console.log("Audio Level:", audioLevel, "Speech Status:", speechStatus);
  }
  requestAnimationFrameValue = requestAnimationFrame(() =>
    analyzeAudio(dataArray),
  );
}

function detectSpeech(audioLevel: number): SpeechStatus {
  const threshold = 1;

  if (audioLevel >= threshold) {
    return "SPEECH";
  }

  return "SILENCE";
}

export async function startSpeechDetection(stream: MediaStream) {
  audioContext = new AudioContext();

  await audioContext.resume();

  audioAnalyzer = audioContext.createAnalyser();

  audioAnalyzer.fftSize = 2048;

  audioStreamSource = audioContext.createMediaStreamSource(stream);

  audioStreamSource.connect(audioAnalyzer);

  const bufferLength = audioAnalyzer.frequencyBinCount;
  const dataArray = new Uint8Array(new ArrayBuffer(bufferLength));

  analyzeAudio(dataArray);
}

export async function stopSpeechDetection() {
  if (requestAnimationFrameValue !== null) {
    cancelAnimationFrame(requestAnimationFrameValue);
  }

  if (audioStreamSource) {
    audioStreamSource.disconnect();
  }

  if (audioContext) {
    await audioContext.close();
  }

  requestAnimationFrameValue = null;

  audioStreamSource = null;

  audioContext = null;

  audioAnalyzer = null;
}
