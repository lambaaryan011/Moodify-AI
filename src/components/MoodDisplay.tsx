import React, { useState } from 'react';
import { Smile, Music, AlertCircle } from 'lucide-react';
import { useMoodStore } from '../store/moodStore';
import { useMusicStore } from '../store/musicStore';
import { getRecommendations } from '../services/spotify';
import MusicRecommendations from './MusicRecommendations';

const moods = ['Happy', 'Energetic', 'Calm', 'Focused', 'Sad', 'Neutral'];

export default function MoodDisplay() {
  const { currentMood, confidence, isProcessing } = useMoodStore();
  const { setRecommendations, setLoading } = useMusicStore();
  const [error, setError] = useState<string | null>(null);

  const handleGetRecommendations = async () => {
    if (!currentMood) return;
    
    setLoading(true);
    setError(null);
    try {
      const tracks = await getRecommendations(currentMood);
      setRecommendations(tracks);
    } catch (error) {
      setError(error instanceof Error ? error.message : 'Failed to get recommendations');
      setRecommendations([]);
    }
    setLoading(false);
  };

  return (
    <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold text-white">Current Mood</h2>
        <div className="flex items-center space-x-2 text-purple-300">
          <Smile className="w-5 h-5" />
          <span>{isProcessing ? 'Analyzing...' : currentMood || 'Not detected'}</span>
        </div>
      </div>

      <div className="space-y-4">
        <div className="space-y-2">
          <label className="text-sm text-white/60">Emotion Confidence</label>
          <div className="h-2 bg-white/10 rounded-full overflow-hidden">
            <div 
              className="h-full bg-gradient-to-r from-purple-500 to-violet-500 rounded-full transition-all duration-300"
              style={{ width: `${(confidence * 100)}%` }}
            />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4 text-center">
          {moods.map((mood) => (
            <div
              key={mood}
              className={`${
                currentMood === mood 
                  ? 'bg-purple-600 text-white' 
                  : 'bg-white/5 text-white/80'
              } rounded-lg p-3 cursor-pointer hover:bg-white/10 transition-colors`}
            >
              <span>{mood}</span>
            </div>
          ))}
        </div>

        {error && (
          <div className="flex items-center space-x-2 text-red-400 bg-red-500/10 rounded-lg p-3">
            <AlertCircle className="w-5 h-5 flex-shrink-0" />
            <p className="text-sm">{error}</p>
          </div>
        )}

        <button 
          onClick={handleGetRecommendations}
          className={`w-full flex items-center justify-center space-x-2 ${
            currentMood 
              ? 'bg-gradient-to-r from-purple-600 to-violet-600 hover:from-purple-700 hover:to-violet-700' 
              : 'bg-gray-600 cursor-not-allowed'
          } text-white rounded-lg py-3 px-4 transition-colors mt-4`}
          disabled={!currentMood}
        >
          <Music className="w-5 h-5" />
          <span>Get Music Recommendations</span>
        </button>

        <MusicRecommendations />
      </div>
    </div>
  );
}