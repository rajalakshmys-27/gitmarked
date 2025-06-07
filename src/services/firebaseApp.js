// Centralized Firebase app initialization for use in both auth.js and firestore.js
import { initializeApp } from "firebase/app";
import { config } from '../config/config';

// Firebase configuration
const firebaseConfig = config.firebase;

// Initialize Firebase app (singleton)
export const app = initializeApp(firebaseConfig);
