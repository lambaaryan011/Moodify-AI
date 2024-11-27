import * as tf from '@tensorflow/tfjs';
import * as faceDetection from '@tensorflow-models/face-detection';

let model: faceDetection.FaceDetector | null = null;

export async function initializeMoodDetection() {
  await tf.setBackend('webgl');
  model = await faceDetection.createDetector(
    faceDetection.SupportedModels.MediaPipeFaceDetector,
    { runtime: 'tfjs' }
  );
}

export async function detectMood(video: HTMLVideoElement) {
  if (!model) {
    throw new Error('Model not initialized');
  }

  const faces = await model.estimateFaces(video);
  if (faces.length === 0) {
    return null;
  }

  // Simple mood mapping based on face box dimensions
  const face = faces[0];
  const { height, width } = face.box;
  const aspectRatio = width / height;

  // This is a simplified example - in production you'd want more sophisticated emotion detection
  if (aspectRatio > 1.2) return { mood: 'Happy', confidence: 0.8 };
  if (aspectRatio < 0.8) return { mood: 'Sad', confidence: 0.7 };
  return { mood: 'Neutral', confidence: 0.6 };
}