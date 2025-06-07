/**
 * Firebase Firestore service module for bookmark operations
 * Handles all Firestore-related logic for bookmarks.
 */
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
import { app } from "./firebaseApp";

export const db = getFirestore(app);

/**
 * Add a bookmark for a user
 * @param {string} userId
 * @param {{ id: string|number, name: string, full_name: string, html_url: string, description: string, language: string }} repo
 * @returns {Promise<{success: boolean, error?: { code: string, message: string }}>} 
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
        return { success: false, error: { code: error.code, message: error.message } };
    }
};

/**
 * Get all bookmarks for a user
 * @param {string} userId
 * @returns {Promise<{success: boolean, data?: object[], error?: { code: string, message: string }}>} 
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
        return { success: false, error: { code: error.code, message: error.message } };
    }
};

/**
 * Remove a bookmark for a user
 * @param {string} userId
 * @param {string|number} repoId
 * @returns {Promise<{success: boolean, error?: { code: string, message: string }}>} 
 */
export const removeBookmark = async (userId, repoId) => {
    try {
        const repoRef = doc(db, "bookmarks", userId, "repos", repoId.toString());
        await deleteDoc(repoRef);
        return { success: true };
    } catch (error) {
        return { success: false, error: { code: error.code, message: error.message } };
    }
};

/**
 * Check if a repo is bookmarked
 * @param {string} userId
 * @param {string|number} repoId
 * @returns {Promise<{success: boolean, exists?: boolean, error?: { code: string, message: string }}>} 
 */
export const isRepoBookmarked = async (userId, repoId) => {
    try {
        const repoRef = doc(db, "bookmarks", userId, "repos", repoId.toString());
        const docSnap = await getDoc(repoRef);
        return { success: true, exists: docSnap.exists() };
    } catch (error) {
        return { success: false, error: { code: error.code, message: error.message } };
    }
};

/**
 * Get paginated bookmarks for a user
 * @param {string} userId
 * @param {number} [limit=10]
 * @param {object|null} lastDoc
 * @returns {Promise<{success: boolean, data?: object[], lastVisible?: object, hasMore?: boolean, error?: { code: string, message: string }}>} 
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
        return { success: false, error: { code: error.code, message: error.message } };
    }
};

/**
 * Batch add bookmarks for a user
 * @param {string} userId
 * @param {Array<{ id: string|number, name: string, full_name: string, html_url: string, description: string, language: string }>} repos
 * @returns {Promise<{success: boolean, error?: { code: string, message: string }}>} 
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
        return { success: false, error: { code: error.code, message: error.message } };
    }
};

/**
 * Update bookmark metadata
 * @param {string} userId
 * @param {string|number} repoId
 * @param {object} metadata
 * @returns {Promise<{success: boolean, error?: { code: string, message: string }}>} 
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
        return { success: false, error: { code: error.code, message: error.message } };
    }
};
