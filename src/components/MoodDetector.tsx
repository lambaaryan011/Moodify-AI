import React from 'react';
import { Camera, Mic, AlertCircle } from 'lucide-react';
import { useMoodStore } from '../store/moodStore';
import VideoStream from './VideoStream';

export default function MoodDetector() {
  const { cameraEnabled, micEnabled, setCameraEnabled, setMicEnabled } = useMoodStore();

  const handleCameraToggle = async () => {
    try {
      if (!cameraEnabled) {
        const stream = await navigator.mediaDevices.getUserMedia({ video: true });
        stream.getTracks().forEach(track => track.stop());
        setCameraEnabled(true);
      } else {
        setCameraEnabled(false);
      }
    } catch (error) {
      console.error('Error accessing camera:', error);
      alert('Unable to access camera. Please check permissions.');
    }
  };

  const handleMicToggle = async () => {
    try {
      if (!micEnabled) {
        const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
        stream.getTracks().forEach(track => track.stop());
        setMicEnabled(true);
      } else {
        setMicEnabled(false);
      }
    } catch (error) {
      console.error('Error accessing microphone:', error);
      alert('Unable to access microphone. Please check permissions.');
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
              <p className="text-sm text-white/60">Enable your camera to detect mood</p>
            </div>
          )}
        </div>

        <div className="grid grid-cols-2 gap-4 mb-6">
          <button
            onClick={handleCameraToggle}
            className={`flex items-center justify-center space-x-2 ${
              cameraEnabled ? 'bg-red-600 hover:bg-red-700' : 'bg-purple-600 hover:bg-purple-700'
            } text-white rounded-lg py-3 px-4 transition-colors`}
          >
            <Camera className="w-5 h-5" />
            <span>{cameraEnabled ? 'Disable Camera' : 'Enable Camera'}</span>
          </button>
          <button
            onClick={handleMicToggle}
            className={`flex items-center justify-center space-x-2 ${
              micEnabled ? 'bg-red-600 hover:bg-red-700' : 'bg-violet-600 hover:bg-violet-700'
            } text-white rounded-lg py-3 px-4 transition-colors`}
          >
            <Mic className="w-5 h-5" />
            <span>{micEnabled ? 'Disable Mic' : 'Enable Mic'}</span>
          </button>
        </div>

        <div className="flex items-center space-x-3 text-white/80 bg-white/5 rounded-lg p-4">
          <AlertCircle className="w-5 h-5 text-purple-400 flex-shrink-0" />
          <p className="text-sm">Your privacy is important to us. Audio and video are processed locally and never stored.</p>
        </div>
      </div>
    </div>
  );
}