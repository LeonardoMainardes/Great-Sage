import { ResponseType } from "./types";

export async function generateResponse(text: string): Promise<ResponseType> {
  if (text) {
    return { text: `You said: ${text}` };
  }

  return { text: "No input provided." };
}
