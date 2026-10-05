import { generateResponse } from "../response";
import { speakText } from "../voice/tts";
import { addMessage } from "./history";

export async function conversation(text: string): Promise<string> {
  addMessage({
    role: "user",
    text,
    timestamp: new Date(),
  });

  const response = await generateResponse(text);

  await speakText({
    text: response.text,
    onStatusChange: (status) => {
      console.log("TTS Status:", status);
    },
  });

  addMessage({
    role: "assistant",
    text: response.text,
    timestamp: new Date(),
  });

  return response.text;
}
