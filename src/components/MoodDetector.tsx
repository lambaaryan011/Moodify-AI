import { useState } from 'react';
import { Camera, AlertCircle } from 'lucide-react';
import { useMoodStore } from '../store/moodStore';
import VideoStream from './VideoStream';

export default function MoodDetector() {
  const { cameraEnabled, setCameraEnabled } = useMoodStore();
  const [isDetecting, setIsDetecting] = useState(false);

  const handleMoodDetectToggle = async () => {
    try {
      if (!cameraEnabled) {
        // Request camera access
        const stream = await navigator.mediaDevices.getUserMedia({ video: true });
        stream.getTracks().forEach(track => track.stop());
        setCameraEnabled(true);
        setIsDetecting(true);
      } else {
        // Stop camera and detection
        setCameraEnabled(false);
        setIsDetecting(false);
      }
    } catch (error) {
      console.error('Error accessing camera:', error);
      alert('Unable to access camera. Please check permissions.');
    }
  };

  return (
    <div className="relative overflow-hidden rounded-xl bg-gradient-to-br from-purple-900/50 via-violet-900/50 to-purple-900/50 backdrop-blur-sm p-6 shadow-xl border border-white/10">
      <div className="absolute inset-0 bg-grid-white/5 [mask-image:linear-gradient(0deg,transparent,white,transparent)]" />

      <div className="relative">
        <div className="aspect-video bg-black/80 rounded-lg overflow-hidden mb-6">
          {cameraEnabled ? (
            <VideoStream />
          ) : (
            <div className="flex flex-col items-center justify-center h-full text-white/80">
              <Camera className="w-12 h-12 mb-4" />
              <p className="text-lg font-medium">Camera access required</p>
              <p className="text-sm text-white/60">Click "Mood Detect" to analyze mood</p>
            </div>
          )}
        </div>

        <button
          onClick={handleMoodDetectToggle}
          className={`w-full flex items-center justify-center space-x-2 ${
            cameraEnabled
              ? 'bg-red-600 hover:bg-red-700'
              : 'bg-purple-600 hover:bg-purple-700'
          } text-white rounded-lg py-3 px-4 transition-colors`}
        >
          <Camera className="w-5 h-5" />
          <span>{cameraEnabled ? 'Stop Mood Detection' : 'Mood Detect'}</span>
        </button>

        <div className="flex items-center space-x-3 text-white/80 bg-white/5 rounded-lg p-4 mt-6">
          <AlertCircle className="w-5 h-5 text-purple-400 flex-shrink-0" />
          <p className="text-sm">
            Your privacy is important to us. Video is processed locally and never stored.
          </p>
        </div>
      </div>
    </div>
  );
}
