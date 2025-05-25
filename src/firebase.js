import { initializeApp } from "firebase/app";
import { 
    getAuth, 
    createUserWithEmailAndPassword, 
    signInWithEmailAndPassword, 
    onAuthStateChanged,
    signOut
} from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyDL2V3JpuFnyKIsJDZeS54ghNrvFlf6r-I",
    authDomain: "gitmarked.firebaseapp.com",
    projectId: "gitmarked",
    storageBucket: "gitmarked.firebasestorage.app",
    messagingSenderId: "995622368718",
    appId: "1:995622368718:web:3c03ffb0768a682e24e79f",
    measurementId: "G-JHZJ7R823X"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);

// Sign up with email and password
export const signUp = async (email, password) => {
    try {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        return {
            user: userCredential.user,
            error: null
        };
    } catch (error) {
        return {
            user: null,
            error: {
                code: error.code,
                message: error.message
            }
        };
    }
};

// Sign in with email and password
export const signIn = async (email, password) => {
    try {
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        return {
            user: userCredential.user,
            error: null
        };
    } catch (error) {
        return {
            user: null,
            error: {
                code: error.code,
                message: error.message
            }
        };
    }
};

// Sign out
export const logOut = async () => {
    try {
        await signOut(auth);
        return { error: null };
    } catch (error) {
        return {
            error: {
                code: error.code,
                message: error.message
            }
        };
    }
};

// Subscribe to auth state changes
export const subscribeToAuthChanges = (callback) => {
    return onAuthStateChanged(auth, (user) => {
        callback(user);
    });
};

// Get current user
export const getCurrentUser = () => {
    return auth.currentUser;
};