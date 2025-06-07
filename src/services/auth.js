/**
 * Firebase authentication service module
 * Handles all authentication-related logic.
 */
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged, signOut, updateProfile } from "firebase/auth";
import { app } from "./firebaseApp";

export const auth = getAuth(app);

/**
 * Sign up with email, password, first name, and last name
 * @param {string} email
 * @param {string} password
 * @param {string} firstName
 * @param {string} lastName
 * @returns {Promise<{user: object|null, error: object|null}>}
 */
export const signUp = async (email, password, firstName, lastName) => {
    try {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        // Set displayName as 'FirstName LastName'
        await updateProfile(userCredential.user, {
            displayName: `${firstName} ${lastName}`
        });
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
