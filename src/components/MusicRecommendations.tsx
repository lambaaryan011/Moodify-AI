import React from 'react';
import { Play, ExternalLink } from 'lucide-react';
import { useMusicStore } from '../store/musicStore';

export default function MusicRecommendations() {
  const { recommendations, isLoading, setCurrentTrack } = useMusicStore();

  if (isLoading) {
    // Loading state
    return (
      <div className="text-center py-8">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-500 mx-auto"></div>
        <p className="text-white/60 mt-4">Finding the perfect tracks...</p>
      </div>
    );
  }

  if (!recommendations || recommendations.length === 0) {
    // No recommendations fallback
    return (
      <div className="text-center text-white/60 mt-8">
        <p>No recommendations available. Please try again later!</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-8">
      {recommendations.map((track) => (
        <div
          key={track.id}
          className="bg-white/5 rounded-lg p-4 hover:bg-white/10 transition-colors group"
        >
          <div className="flex space-x-4">
            {/* Track Image and Play Button */}
            <div className="relative flex-shrink-0">
              <img
                src={track.image || 'fallback-image-url.jpg'} // Replace with a fallback image URL
                alt={track.album || 'Unknown Album'}
                className="w-16 h-16 rounded-md"
              />
              <button
                onClick={() => setCurrentTrack(track)}
                className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center"
                aria-label={`Play ${track.name}`}
              >
                <Play className="w-8 h-8 text-white" />
              </button>
            </div>

            {/* Track Details */}
            <div className="flex-grow min-w-0">
              <h3 className="text-white font-medium truncate">{track.name || 'Unknown Track'}</h3>
              <p className="text-white/60 text-sm truncate">{track.artist || 'Unknown Artist'}</p>
              <p className="text-white/40 text-sm truncate">{track.album || 'Unknown Album'}</p>
            </div>

            {/* External Link */}
            <a
              href={track.externalUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-shrink-0 p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors self-start"
              aria-label={`Open ${track.name} on external site`}
            >
              <ExternalLink className="w-4 h-4 text-white" />
            </a>
          </div>
        </div>
      ))}
    </div>
  );
}
