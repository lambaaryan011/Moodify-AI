import React, { useEffect, useState } from 'react';
import Header from './components/Header';
import MoodDetector from './components/MoodDetector';
import MoodDisplay from './components/MoodDisplay';
import MusicPlayer from './components/MusicPlayer';
import { initializeSpotify } from './services/spotify';
import { AlertCircle } from 'lucide-react';

function App() {
  const [spotifyError, setSpotifyError] = useState<string | null>(null);

  useEffect(() => {
    const initSpotify = async () => {
      try {
        await initializeSpotify();
      } catch (error) {
        setSpotifyError(error instanceof Error ? error.message : 'Failed to initialize Spotify');
      }
    };
    initSpotify();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-purple-900">
      <Header />
      
      {spotifyError && (
        <div className="fixed top-20 left-1/2 -translate-x-1/2 w-full max-w-md">
          <div className="mx-4 bg-red-500/90 text-white px-4 py-3 rounded-lg shadow-lg backdrop-blur-sm flex items-center space-x-3">
            <AlertCircle className="w-5 h-5 flex-shrink-0" />
            <p className="text-sm">{spotifyError}</p>
          </div>
        </div>
      )}

      <main className="container mx-auto px-4 pt-24 pb-32">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold text-white text-center mb-2">
            Discover Music That Matches Your Mood
          </h1>
          <p className="text-lg text-purple-200 text-center mb-12">
            Using AI to analyze your emotions and find the perfect songs
          </p>

          <div className="grid md:grid-cols-2 gap-6">
            <MoodDetector />
            <MoodDisplay />
          </div>
        </div>
      </main>

      <MusicPlayer />

      <footer className="text-center py-6 text-white/60">
        <p>© 2024 MoodSync. All rights reserved.</p>
      </footer>
    </div>
  );
}

export default App;