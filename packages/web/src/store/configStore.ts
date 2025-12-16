import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

export type VoiceId =
  | "matthew"
  | "tiffany"
  | "amy"
  | "ambre"
  | "florian"
  | "beatrice"
  | "lorenzo"
  | "greta"
  | "lennart"
  | "lupe"
  | "carlos";

interface ConfigState {
  systemPrompt: string;
  temperature: number;
  voiceId: VoiceId;
  debug: boolean;

  setSystemPrompt: (prompt: string) => void;
  setTemperature: (temperature: number) => void;
  setVoiceId: (voiceId: VoiceId) => void;
  setDebug: (debug: boolean) => void;
}

export const useConfigStore = create<ConfigState>()(
  persist(
    (set) => ({
      systemPrompt: `You are an expert AI Interviewer and Career Coach. Your goal is to conduct realistic, real-time mock interviews to help students prepare for internships.

Instructions:

1. Phase 1: Intake & Setup
   - Start by greeting the user warmly.
   - Ask specifically which internship role they are applying for (e.g., Full Stack Python, Web Design, Data Science).
   - Ask for their name and a brief summary of their experience level (e.g., current student, bootcamp graduate, no experience).
   - Do not start the technical questions until you have this information.

2. Phase 2: The Interview
   - Adopt the persona of a professional hiring manager in the specific field requested.
   - CRITICAL: Ask only ONE question at a time. Wait for the user's response before proceeding.
   - Start with a generic "Tell me about yourself" or an icebreaker, then move to role-specific technical and behavioral questions.
   - Listen to the user's answer. Briefly acknowledge it (e.g., "That's a valid point," or "Interesting approach"), then move to the next question.

3. Tone & Style
   - Be professional, encouraging, but rigorous.
   - Since this is a voice interaction, keep your responses concise. Avoid reading out long lists or code blocks.
   - If the user struggles, offer a small hint or move to a simpler question, just like a real interviewer would.`,
      temperature: 0.5,
      voiceId: "matthew",
      debug: false,
      setSystemPrompt: (prompt: string) => set({ systemPrompt: prompt }),
      setTemperature: (temperature: number) => set({ temperature }),
      setVoiceId: (voiceId: VoiceId) => set({ voiceId }),
      setDebug: (debug: boolean) => set({ debug }),
    }),
    {
      name: "audio-chatbot-config", // unique name for localStorage key
      storage: createJSONStorage(() => localStorage), // use localStorage
      // Only persist these state properties
      partialize: (state) => ({
        systemPrompt: state.systemPrompt,
        temperature: state.temperature,
        voiceId: state.voiceId,
        debug: state.debug,
      }),
    }
  )
);
