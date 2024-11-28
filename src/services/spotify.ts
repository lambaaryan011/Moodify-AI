import SpotifyWebApi from 'spotify-web-api-node';

const spotifyApi = new SpotifyWebApi({
  clientId: import.meta.env.VITE_SPOTIFY_CLIENT_ID,
  clientSecret: import.meta.env.VITE_SPOTIFY_CLIENT_SECRET,
  redirectUri: import.meta.env.VITE_SPOTIFY_REDIRECT_URI
});

const moodToGenres: Record<string, string[]> = {
  Happy: ['pop', 'dance', 'happy'],
  Energetic: ['edm', 'rock', 'workout'],
  Calm: ['ambient', 'chill', 'sleep'],
  Focused: ['classical', 'focus', 'study'],
  Sad: ['sad', 'indie', 'blues'],
  Neutral: ['alternative', 'indie', 'pop']
};

const moodToFeatures: Record<string, {
  min_valence?: number;
  max_valence?: number;
  min_energy?: number;
  max_energy?: number;
}> = {
  Happy: { min_valence: 0.7, min_energy: 0.6 },
  Energetic: { min_energy: 0.8 },
  Calm: { max_energy: 0.4, max_valence: 0.6 },
  Focused: { min_valence: 0.4, max_valence: 0.6, max_energy: 0.5 },
  Sad: { max_valence: 0.4 },
  Neutral: { min_valence: 0.4, max_valence: 0.6 }
};

export async function initializeSpotify() {
  if (!import.meta.env.VITE_SPOTIFY_CLIENT_ID || !import.meta.env.VITE_SPOTIFY_CLIENT_SECRET) {
    throw new Error('Spotify credentials are not configured');
  }

  try {
    const response = await fetch('https://accounts.spotify.com/api/token', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Authorization': 'Basic ' + btoa(
          `${import.meta.env.VITE_SPOTIFY_CLIENT_ID}:${import.meta.env.VITE_SPOTIFY_CLIENT_SECRET}`
        ),
      },
      body: 'grant_type=client_credentials',
    });

    if (!response.ok) {
      throw new Error('Failed to get access token');
    }

    const data = await response.json();
    spotifyApi.setAccessToken(data.access_token);
    return true;
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(`Failed to initialize Spotify: ${error.message}`);
    }
    throw new Error('Failed to initialize Spotify');
  }
}

export async function getRecommendations(mood: string) {
  if (!spotifyApi.getAccessToken()) {
    throw new Error('Spotify is not initialized');
  }

  try {
    const genres = moodToGenres[mood] || ['pop'];
    const features = moodToFeatures[mood] || {};
    
    const recommendations = await spotifyApi.getRecommendations({
      seed_genres: genres.slice(0, 2),
      limit: 10,
      target_valence: features.min_valence || 0.5,
      target_energy: features.min_energy || 0.5,
      min_popularity: 50
    });

    return recommendations.body.tracks.map(track => ({
      id: track.id,
      name: track.name,
      artist: track.artists[0].name,
      album: track.album.name,
      image: track.album.images[0]?.url,
      previewUrl: track.preview_url,
      externalUrl: track.external_urls.spotify
    }));
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(`Failed to get recommendations: ${error.message}`);
    }
    throw new Error('Failed to get recommendations');
  }
}