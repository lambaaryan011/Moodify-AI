import * as tf from '@tensorflow/tfjs';
import * as facemesh from '@tensorflow-models/facemesh';  // Corrected import

let model: any = null;

export async function initializeMoodDetection() {
  await tf.setBackend('webgl');  // Set TensorFlow.js backend
  model = await facemesh.load();  // Load the facemesh model
}

export async function detectMood(video: HTMLVideoElement) {
  if (!model) {
    throw new Error('Model not initialized');
  }

  const predictions = await model.estimateFaces(video);
  if (predictions.length === 0) {
    return null;
  }

  const landmarks = predictions[0].scaledMesh;

  // Landmark positions for eyes, mouth, and eyebrows
  const leftEye = landmarks[33];
  const rightEye = landmarks[133];
  const mouthLeft = landmarks[78];
  const mouthRight = landmarks[308];
  const leftEyebrow = landmarks[70];
  const rightEyebrow = landmarks[300];

  const eyeDistance = Math.abs(leftEye[1] - rightEye[1]);
  const mouthWidth = Math.abs(mouthLeft[0] - mouthRight[0]);
  const eyebrowHeight = Math.abs(leftEyebrow[1] - rightEyebrow[1]);

  // **Energetic**: Raised eyebrows, wide mouth, eyes may be open and alert
  if (eyebrowHeight > 12 && mouthWidth > 40) {
    return { mood: 'Energetic', confidence: 0.9 };  // Raised eyebrows and wide mouth, energetic feeling
  }

  // **Focused**: Narrowed eyes, small eye distance
  if (eyeDistance < 20 && eyebrowHeight < 10) {
    return { mood: 'Focused', confidence: 0.85 };  // Narrow eyes and neutral eyebrows, concentrated expression
  }

  // **Sad**: Downturned mouth, relaxed eyes, and low eyebrow height
  if (mouthWidth < 25 && eyebrowHeight < 5) {
    return { mood: 'Sad', confidence: 0.75 };  // Downturned mouth and relaxed brows, sadness
  }

  // **Anger**: Furrowed brows, tight mouth
  if (eyebrowHeight > 15 && mouthWidth < 25) {
    return { mood: 'Anger', confidence: 0.8 };  // Furrowed brows, tight mouth indicating anger
  }

  // **Happy**: Wide smile, relaxed or slightly raised eyebrows
  if (mouthWidth > 50 && eyeDistance < 15 && eyebrowHeight < 10) {
    return { mood: 'Happy', confidence: 0.85 };  // Wide smile and relaxed features, happiness
  }

  // **Neutral**: If no other emotion is detected, return Neutral
  return { mood: 'Neutral', confidence: 0.6 };  // Default neutral expression
}
