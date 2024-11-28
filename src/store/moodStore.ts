import { create } from 'zustand';

interface MoodState {
  currentMood: string | null;
  confidence: number;
  isProcessing: boolean;
  cameraEnabled: boolean;
  setMood: (mood: string, confidence: number) => void;
  setProcessing: (processing: boolean) => void;
  setCameraEnabled: (enabled: boolean) => void;
  isDetecting: boolean;
  setIsDetecting: (detecting: boolean) => void;
}

export const useMoodStore = create<MoodState>((set) => ({
  currentMood: null,
  confidence: 0,
  isProcessing: false,
  cameraEnabled: false,
  setMood: (mood, confidence) => set({ currentMood: mood, confidence }),
  setProcessing: (processing) => set({ isProcessing: processing }),
  setCameraEnabled: (enabled) => set({ cameraEnabled: enabled }),
  isDetecting: false,
  setIsDetecting: (detecting: boolean) => set({ isDetecting: detecting }),
}));

