// tensorflow-models-facemesh.d.ts
declare module '@tensorflow-models/facemesh' {
   export const load: () => Promise<any>;
   export const estimateFaces: (video: HTMLVideoElement) => Promise<any[]>;
 }
 