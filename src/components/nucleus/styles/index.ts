import { NucleusState } from "../types";

export const nucleusStyles: Record<NucleusState, string> = {
  IDLE: "bg-[radial-gradient(circle,_rgba(255,190,248,0.95)_0%,_rgba(255,70,243,0.5)_35%,_rgba(255,40,251,0.15)_65%,_transparent_75%)] shadow-[0_0_15px_rgba(255,120,244,0.9),0_0_35px_rgba(255,70,230,0.6),0_0_60px_rgba(255,50,248,0.35)]",

  LISTENING:
    "bg-[radial-gradient(circle,_rgba(190,231,255,0.95)_0%,_rgba(70,166,255,0.5)_35%,_rgba(40,140,255,0.15)_65%,_transparent_75%)] shadow-[0_0_15px_rgba(120,194,255,0.9),0_0_35px_rgba(70,166,255,0.6),0_0_60px_rgba(50,139,255,0.35)]",

  THINKING:
    "bg-[radial-gradient(circle,_rgba(243,255,190,0.95)_0%,_rgba(243,255,70,0.5)_35%,_rgba(255,241,40,0.15)_65%,_transparent_75%)] shadow-[0_0_15px_rgba(255,246,120,0.9),0_0_35px_rgba(255,227,70,0.6),0_0_60px_rgba(252,255,50,0.35)]",

  SPEAKING:
    "bg-[radial-gradient(circle,_rgba(192,255,190,0.95)_0%,_rgba(101,255,70,0.5)_35%,_rgba(76,255,40,0.15)_65%,_transparent_75%)] shadow-[0_0_15px_rgba(147,255,120,0.9),0_0_35px_rgba(101,255,70,0.6),0_0_60px_rgba(74,255,50,0.35)]",
};

export const nucleusCoreStyles: Record<NucleusState, string> = {
  IDLE: "bg-[radial-gradient(circle,_white_0%,_rgb(250,180,255)_35%,_rgba(255,80,249,0.8)_70%,_transparent_100%)] shadow-[0_0_12px_white,0_0_25px_rgba(255,100,247,0.9)]",
  LISTENING:
    "bg-[radial-gradient(circle,_white_0%,_rgb(180,220,255)_35%,_rgba(80,200,255,0.8)_70%,_transparent_100%)] shadow-[0_0_12px_white,0_0_25px_rgba(80,200,255,0.9)]",
  THINKING:
    "bg-[radial-gradient(circle,_white_0%,_rgb(255,255,180)_35%,_rgba(255,255,80,0.8)_70%,_transparent_100%)] shadow-[0_0_12px_white,0_0_25px_rgba(255,255,80,0.9)]",
  SPEAKING:
    "bg-[radial-gradient(circle,_white_0%,_rgb(180,255,180)_35%,_rgba(80,255,80,0.8)_70%,_transparent_100%)] shadow-[0_0_12px_white,0_0_25px_rgba(80,255,80,0.9)]",
};

export const nucleusAnimationStyles: Record<NucleusState, string> = {
  IDLE: "animate-nucleusIdle",
  LISTENING: "animate-nucleusListening",
  THINKING: "animate-nucleusThinking",
  SPEAKING: "animate-nucleusSpeaking",
};
