/**
 * Firebase authentication service module
 * Handles all authentication-related logic.
 */
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged, signOut } from "firebase/auth";
import { app } from "./firebaseApp";

export const auth = getAuth(app);

/**
 * Sign up with email and password
 * @param {string} email
 * @param {string} password
 * @returns {Promise<{user: object|null, error: object|null}>}
 */
export const signUp = async (email, password) => {
    try {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        return { user: userCredential.user, error: null };
    } catch (error) {
        return { user: null, error: { code: error.code, message: error.message } };
    }
};

/**
 * Sign in with email and password
 * @param {string} email
 * @param {string} password
 * @returns {Promise<{user: object|null, error: object|null}>}
 */
export const signIn = async (email, password) => {
    try {
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        return { user: userCredential.user, error: null };
    } catch (error) {
        return { user: null, error: { code: error.code, message: error.message } };
    }
};

/**
 * Sign out current user
 * @returns {Promise<{error: object|null}>}
 */
export const logOut = async () => {
    try {
        await signOut(auth);
        return { error: null };
    } catch (error) {
        return { error: { code: error.code, message: error.message } };
    }
};

/**
 * Subscribe to auth state changes
 * @param {function} callback
 * @returns {function} unsubscribe
 */
export const subscribeToAuthChanges = (callback) => {
    return onAuthStateChanged(auth, (user) => callback(user));
};

/**
 * Get current user
 * @returns {object|null}
 */
export const getCurrentUser = () => auth.currentUser;
