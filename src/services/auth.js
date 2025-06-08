/**
 * Firebase authentication service module
 * Handles all authentication-related logic.
 */
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged, signOut, updateProfile, sendEmailVerification, sendPasswordResetEmail, reauthenticateWithCredential, EmailAuthProvider, updatePassword } from "firebase/auth";
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
        // Send verification email after registration
        await sendEmailVerification(userCredential.user);
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

/**
 * Send email verification to the current user
 * @returns {Promise<{success: boolean, error: object|null}>}
 */
export const sendVerificationEmail = async () => {
    try {
        if (!auth.currentUser) throw new Error('No user logged in');
        await sendEmailVerification(auth.currentUser);
        return { success: true, error: null };
    } catch (error) {
        return { success: false, error: { code: error.code, message: error.message } };
    }
};

/**
 * Check if current user's email is verified
 * @returns {boolean}
 */
export const isEmailVerified = () => {
    return auth.currentUser?.emailVerified || false;
};

/**
 * Send password reset email
 * @param {string} email
 * @returns {Promise<{success: boolean, error: object|null}>}
 */
export const sendResetPasswordEmail = async (email) => {
    try {
        await sendPasswordResetEmail(auth, email);
        return { success: true, error: null };
    } catch (error) {
        return { success: false, error: { code: error.code, message: error.message } };
    }
};

/**
 * Change password for current user (requires re-authentication)
 * @param {string} currentPassword
 * @param {string} newPassword
 * @returns {Promise<{success: boolean, error: object|null}>}
 */
export const changePassword = async (currentPassword, newPassword) => {
    try {
        if (!auth.currentUser || !auth.currentUser.email) throw new Error('No user logged in');
        const credential = EmailAuthProvider.credential(auth.currentUser.email, currentPassword);
        await reauthenticateWithCredential(auth.currentUser, credential);
        await updatePassword(auth.currentUser, newPassword);
        return { success: true, error: null };
    } catch (error) {
        return { success: false, error: { code: error.code, message: error.message } };
    }
};
