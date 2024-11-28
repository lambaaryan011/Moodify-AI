import { create } from 'zustand';

interface MoodState {
  currentMood: string | null;
  confidence: number;
  isProcessing: boolean;
  cameraEnabled: boolean;
  micEnabled: boolean;
  setMood: (mood: string, confidence: number) => void;
  setProcessing: (processing: boolean) => void;
  setCameraEnabled: (enabled: boolean) => void;
  setMicEnabled: (enabled: boolean) => void;
}

export const useMoodStore = create<MoodState>((set) => ({
  currentMood: null,
  confidence: 0,
  isProcessing: false,
  cameraEnabled: false,
  micEnabled: false,
  setMood: (mood, confidence) => set({ currentMood: mood, confidence }),
  setProcessing: (processing) => set({ isProcessing: processing }),
  setCameraEnabled: (enabled) => set({ cameraEnabled: enabled }),
  setMicEnabled: (enabled) => set({ micEnabled: enabled }),
}));