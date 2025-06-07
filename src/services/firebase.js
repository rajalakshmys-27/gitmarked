/**
 * Firebase service module for authentication and Firestore operations
 * All Firebase-related logic is centralized here for maintainability.
 */
import { initializeApp } from "firebase/app";
import {
    getAuth,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    onAuthStateChanged,
    signOut
} from "firebase/auth";
import {
    getFirestore,
    doc,
    setDoc,
    getDoc,
    updateDoc,
    collection,
    getDocs,
    deleteDoc,
    writeBatch,
    query,
    orderBy,
    startAfter
} from "firebase/firestore";
import { config } from '../config/config';

// Firebase configuration
const firebaseConfig = config.firebase;

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);

// ===================== AUTH FUNCTIONS =====================
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

// ===================== BOOKMARK FUNCTIONS =====================
/**
 * Add a bookmark for a user
 * @param {string} userId
 * @param {object} repo
 * @returns {Promise<{success: boolean, error?: object}>}
 */
export const addBookmark = async (userId, repo) => {
    try {
        const repoRef = doc(db, "bookmarks", userId, "repos", repo.id.toString());
        await setDoc(repoRef, {
            name: repo.name,
            full_name: repo.full_name,
            html_url: repo.html_url,
            description: repo.description,
            language: repo.language,
            bookmarkedAt: new Date().toISOString(),
        });
        return { success: true };
    } catch (error) {
        return { success: false, error };
    }
};

/**
 * Get all bookmarks for a user
 * @param {string} userId
 * @returns {Promise<{success: boolean, data?: object[], error?: object}>}
 */
export const getUserBookmarks = async (userId) => {
    try {
        const reposRef = collection(db, "bookmarks", userId, "repos");
        const snapshot = await getDocs(reposRef);
        return {
            success: true,
            data: snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }))
        };
    } catch (error) {
        return { success: false, error };
    }
};

/**
 * Remove a bookmark for a user
 * @param {string} userId
 * @param {string|number} repoId
 * @returns {Promise<{success: boolean, error?: object}>}
 */
export const removeBookmark = async (userId, repoId) => {
    try {
        const repoRef = doc(db, "bookmarks", userId, "repos", repoId.toString());
        await deleteDoc(repoRef);
        return { success: true };
    } catch (error) {
        return { success: false, error };
    }
};

/**
 * Check if a repo is bookmarked
 * @param {string} userId
 * @param {string|number} repoId
 * @returns {Promise<{success: boolean, exists?: boolean, error?: object}>}
 */
export const isRepoBookmarked = async (userId, repoId) => {
    try {
        const repoRef = doc(db, "bookmarks", userId, "repos", repoId.toString());
        const docSnap = await getDoc(repoRef);
        return { success: true, exists: docSnap.exists() };
    } catch (error) {
        return { success: false, error };
    }
};

/**
 * Get paginated bookmarks for a user
 * @param {string} userId
 * @param {number} limit
 * @param {object|null} lastDoc
 * @returns {Promise<{success: boolean, data?: object[], lastVisible?: object, hasMore?: boolean, error?: object}>}
 */
export const getPaginatedBookmarks = async (userId, limit = 10, lastDoc = null) => {
    try {
        let q = query(collection(db, "bookmarks", userId, "repos"), orderBy("bookmarkedAt", "desc"), limit(limit));
        if (lastDoc) q = query(q, startAfter(lastDoc));
        const snapshot = await getDocs(q);
        const lastVisible = snapshot.docs[snapshot.docs.length - 1];
        return {
            success: true,
            data: snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })),
            lastVisible,
            hasMore: snapshot.docs.length === limit
        };
    } catch (error) {
        return { success: false, error };
    }
};

/**
 * Batch add bookmarks for a user
 * @param {string} userId
 * @param {object[]} repos
 * @returns {Promise<{success: boolean, error?: object}>}
 */
export const batchAddBookmarks = async (userId, repos) => {
    try {
        const batch = writeBatch(db);
        repos.forEach(repo => {
            const repoRef = doc(db, "bookmarks", userId, "repos", repo.id.toString());
            batch.set(repoRef, {
                name: repo.name,
                full_name: repo.full_name,
                html_url: repo.html_url,
                description: repo.description,
                language: repo.language,
                bookmarkedAt: new Date().toISOString(),
            });
        });
        await batch.commit();
        return { success: true };
    } catch (error) {
        return { success: false, error };
    }
};

/**
 * Update bookmark metadata
 * @param {string} userId
 * @param {string|number} repoId
 * @param {object} metadata
 * @returns {Promise<{success: boolean, error?: object}>}
 */
export const updateBookmarkMetadata = async (userId, repoId, metadata) => {
    try {
        const repoRef = doc(db, "bookmarks", userId, "repos", repoId.toString());
        await updateDoc(repoRef, {
            ...metadata,
            updatedAt: new Date().toISOString()
        });
        return { success: true };
    } catch (error) {
        return { success: false, error };
    }
};
