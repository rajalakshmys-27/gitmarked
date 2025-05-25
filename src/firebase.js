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

import { config } from './config/config';

// Firebase configuration is imported from config.js
const firebaseConfig = config.firebase;

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

export const db = getFirestore(app);

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
        console.error("Error adding bookmark:", error);
        return { success: false, error };
    }
};

export const getUserBookmarks = async (userId) => {
    try {
        const reposRef = collection(db, "bookmarks", userId, "repos");
        const snapshot = await getDocs(reposRef);
        return {
            success: true,
            data: snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }))
        };
    } catch (error) {
        console.error("Error getting bookmarks:", error);
        return { success: false, error };
    }
};

export const removeBookmark = async (userId, repoId) => {
    try {
        const repoRef = doc(db, "bookmarks", userId, "repos", repoId.toString());
        await deleteDoc(repoRef);
        return { success: true };
    } catch (error) {
        console.error("Error removing bookmark:", error);
        return { success: false, error };
    }
};

export const isRepoBookmarked = async (userId, repoId) => {
    try {
        const repoRef = doc(db, "bookmarks", userId, "repos", repoId.toString());
        const docSnap = await getDoc(repoRef);
        return { success: true, exists: docSnap.exists() };
    } catch (error) {
        console.error("Error checking bookmark:", error);
        return { success: false, error };
    }
};

export const getPaginatedBookmarks = async (userId, limit = 10, lastDoc = null) => {
    try {
        let q = query(collection(db, "bookmarks", userId, "repos"), orderBy("bookmarkedAt", "desc"), limit(limit));

        if (lastDoc) {
            q = query(q, startAfter(lastDoc));
        }

        const snapshot = await getDocs(q);
        const lastVisible = snapshot.docs[snapshot.docs.length - 1];

        return {
            success: true,
            data: snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })),
            lastVisible,
            hasMore: snapshot.docs.length === limit
        };
    } catch (error) {
        console.error("Error getting paginated bookmarks:", error);
        return { success: false, error };
    }
};

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
        console.error("Error batch adding bookmarks:", error);
        return { success: false, error };
    }
};

export const updateBookmarkMetadata = async (userId, repoId, metadata) => {
    try {
        const repoRef = doc(db, "bookmarks", userId, "repos", repoId.toString());
        await updateDoc(repoRef, {
            ...metadata,
            updatedAt: new Date().toISOString()
        });
        return { success: true };
    } catch (error) {
        console.error("Error updating bookmark metadata:", error);
        return { success: false, error };
    }
};