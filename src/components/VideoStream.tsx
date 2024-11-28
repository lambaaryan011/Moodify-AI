import React, { useRef, useEffect } from 'react';
import Webcam from 'react-webcam';
import { useMoodStore } from '../store/moodStore';
import { initializeMoodDetection, detectMood } from '../services/moodDetection';

export default function VideoStream() {
  const webcamRef = useRef<Webcam>(null);
  const { setMood, setProcessing, cameraEnabled } = useMoodStore();

  useEffect(() => {
    if (cameraEnabled) {
      initializeMoodDetection().then(() => {
        startMoodDetection();
      });
    }
  }, [cameraEnabled]);

  const startMoodDetection = async () => {
    if (!webcamRef.current?.video) return;

    const detectMoodLoop = async () => {
      if (webcamRef.current?.video) {
        setProcessing(true);
        try {
          const result = await detectMood(webcamRef.current.video);
          if (result) {
            setMood(result.mood, result.confidence);
          }
        } catch (error) {
          console.error('Error detecting mood:', error);
        }
        setProcessing(false);
      }
      requestAnimationFrame(detectMoodLoop);
    };

    detectMoodLoop();
  };

  if (!cameraEnabled) return null;

  return (
    <Webcam
      ref={webcamRef}
      audio={false}
      className="w-full h-full object-cover rounded-lg"
      mirrored
    />
  );
}