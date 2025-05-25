/**
 * Application configuration object that centralizes all environment variables
 */
export const config = {
  firebase: {
    apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
    authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
    projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
    storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
    appId: import.meta.env.VITE_FIREBASE_APP_ID,
    measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID
  },
  github: {
    token: import.meta.env.VITE_GITHUB_TOKEN || null
  }
};

// Validate config at runtime
Object.entries(config.firebase).forEach(([key, value]) => {
  if (!value) {
    throw new Error(`Firebase ${key} is not set in environment variables.`);
  }
});
