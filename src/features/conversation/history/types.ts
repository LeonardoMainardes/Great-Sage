export type ConversationMessage = {
  role: "user" | "assistant";
  text: string;
  timestamp: Date;
};
