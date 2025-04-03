import { collection, addDoc, getDocs, query, orderBy } from 'firebase/firestore';
import { db } from './config';

// Save a new snippet
export const saveSnippet = async (snippetData) => {
  try {
    console.log('Starting saveSnippet function');
    console.log('Database instance:', db);
    console.log('Snippet data:', snippetData);

    // Check if db is initialized
    if (!db) {
      throw new Error('Firestore database not initialized');
    }

    const snippetsRef = collection(db, 'snippets');
    console.log('Collection reference created');

    const docRef = await addDoc(snippetsRef, {
      code: snippetData.code,
      prompt: snippetData.prompt,
      createdAt: new Date().toISOString(),
    });

    console.log('Document written with ID:', docRef.id);
    return docRef.id;
  } catch (error) {
    console.error('Error in saveSnippet:', error);
    throw error;
  }
};

// Get all snippets
export const getSnippets = async () => {
  try {
    const q = query(collection(db, 'snippets'), orderBy('createdAt', 'desc'));
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
  } catch (error) {
    console.error('Error getting snippets:', error);
    throw error;
  }
}; 