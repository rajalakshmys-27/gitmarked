import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig(({ mode, command }) => {
  // Load env file based on mode (development/production)
  const env = loadEnv(mode, './', '')
  
  // Validate required environment variables
  const requiredEnvVars = [
    'VITE_FIREBASE_API_KEY',
    'VITE_FIREBASE_AUTH_DOMAIN',
    'VITE_FIREBASE_PROJECT_ID',
    'VITE_FIREBASE_STORAGE_BUCKET',
    'VITE_FIREBASE_MESSAGING_SENDER_ID',
    'VITE_FIREBASE_APP_ID',
    'VITE_FIREBASE_MEASUREMENT_ID'
  ]

  const missingEnvVars = requiredEnvVars.filter(key => !env[key])
  if (missingEnvVars.length > 0 && command !== 'serve') {
    console.error('❌ Missing required environment variables:', missingEnvVars.join(', '))
    console.error('Please check your .env file')
    throw new Error('Missing required environment variables')
  }

  return {
    plugins: [
      react(),
      tailwindcss(),
    ],
    define: {
      // Ensure environment variables are properly stringified
      __FIREBASE_CONFIG__: {
        apiKey: JSON.stringify(env.VITE_FIREBASE_API_KEY),
        authDomain: JSON.stringify(env.VITE_FIREBASE_AUTH_DOMAIN),
        projectId: JSON.stringify(env.VITE_FIREBASE_PROJECT_ID),
        storageBucket: JSON.stringify(env.VITE_FIREBASE_STORAGE_BUCKET),
        messagingSenderId: JSON.stringify(env.VITE_FIREBASE_MESSAGING_SENDER_ID),
        appId: JSON.stringify(env.VITE_FIREBASE_APP_ID),
        measurementId: JSON.stringify(env.VITE_FIREBASE_MEASUREMENT_ID)
      }
    }
  }
})