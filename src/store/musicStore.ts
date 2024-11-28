import { create } from 'zustand';

export interface Track {
  id: string;
  name: string;
  artist: string;
  album: string;
  image: string;
  previewUrl: string | null;
  externalUrl: string;
}

interface MusicState {
  recommendations: Track[];
  isLoading: boolean;
  currentTrack: Track | null;
  isPlaying: boolean;
  setRecommendations: (tracks: Track[]) => void;
  setLoading: (loading: boolean) => void;
  setCurrentTrack: (track: Track | null) => void;
  setPlaying: (playing: boolean) => void;
}

export const useMusicStore = create<MusicState>((set) => ({
  recommendations: [],
  isLoading: false,
  currentTrack: null,
  isPlaying: false,
  setRecommendations: (tracks) => set({ recommendations: tracks }),
  setLoading: (loading) => set({ isLoading: loading }),
  setCurrentTrack: (track) => set({ currentTrack: track }),
  setPlaying: (playing) => set({ isPlaying: playing })
}));