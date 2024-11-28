import React, { useRef, useEffect } from 'react';
import { Play, Pause, ExternalLink } from 'lucide-react';
import { useMusicStore } from '../store/musicStore';

export default function MusicPlayer() {
  const audioRef = useRef<HTMLAudioElement>(null);
  const { currentTrack, isPlaying, setPlaying } = useMusicStore();

  useEffect(() => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.play();
      } else {
        audioRef.current.pause();
      }
    }
  }, [isPlaying]);

  useEffect(() => {
    if (currentTrack?.previewUrl && audioRef.current) {
      audioRef.current.src = currentTrack.previewUrl;
      setPlaying(true);
    }
  }, [currentTrack]);

  if (!currentTrack) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-gradient-to-r from-purple-900/90 to-violet-900/90 backdrop-blur-lg border-t border-white/10 p-4">
      <div className="container mx-auto max-w-4xl">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <img 
              src={currentTrack.image} 
              alt={currentTrack.album}
              className="w-12 h-12 rounded-md"
            />
            <div>
              <h3 className="text-white font-medium">{currentTrack.name}</h3>
              <p className="text-white/60 text-sm">{currentTrack.artist}</p>
            </div>
          </div>

          <div className="flex items-center space-x-4">
            <button
              onClick={() => setPlaying(!isPlaying)}
              className="p-2 rounded-full bg-purple-500 hover:bg-purple-600 transition-colors"
            >
              {isPlaying ? (
                <Pause className="w-6 h-6 text-white" />
              ) : (
                <Play className="w-6 h-6 text-white" />
              )}
            </button>

            <a
              href={currentTrack.externalUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors"
            >
              <ExternalLink className="w-5 h-5 text-white" />
            </a>
          </div>
        </div>
      </div>
      <audio ref={audioRef} onEnded={() => setPlaying(false)} />
    </div>
  );
}