import { generateResponse } from "../response";
import { speakText } from "../voice/tts";

export async function conversation(text: string): Promise<string> {
  const response = await generateResponse(text);

  await speakText({
    text: response.text,
    onStatusChange: (status) => {
      console.log("TTS Status:", status);
    },
  });

  return response.text;
}
