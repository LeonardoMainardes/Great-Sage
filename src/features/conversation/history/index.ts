import { ConversationMessage } from "./types";

let conversationHistory: ConversationMessage[] = [];

export const addMessage = (message: ConversationMessage) => {
  conversationHistory.push(message);
};

export const getHistory = () => {
  const history = [...conversationHistory];

  return history;
};
