import { TTSStatus } from "./types";

interface SpeakTextProps {
  text: string;
  onStatusChange: (status: TTSStatus) => void;
}

export function speakText({
  text,
  onStatusChange,
}: SpeakTextProps): Promise<void> {
  const synth = window.speechSynthesis;
  const utterance = new SpeechSynthesisUtterance(text);

  return new Promise((resolve, reject) => {
    utterance.onend = () => {
      onStatusChange("IDLE");
      resolve();
    };
    utterance.onerror = (event) => {
      onStatusChange("ERROR");
      reject(event.error);
    };
    onStatusChange("SPEAKING");

    synth.speak(utterance);
  });
}
