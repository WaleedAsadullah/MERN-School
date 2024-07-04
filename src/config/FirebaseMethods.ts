// src/firebaseService.ts

import { getFirestore, collection, getDocs, addDoc, updateDoc, deleteDoc, doc, DocumentData, CollectionReference } from 'firebase/firestore';
import app from "./FirebaseConfig"
const db = getFirestore(app)
// Firestore CRUD Functions

// Generic function to get a collection reference with the correct type
const getCollection = <T = DocumentData>(collectionName: string): CollectionReference<T> => {
  return collection(db, collectionName) as CollectionReference<T>;
};

// Create a new document
const addDocument = async <T = DocumentData>(collectionName: string, data: T) => {
  try {
    const docRef = await addDoc(getCollection<T>(collectionName), data);
    console.log("Document written with ID: ", docRef.id);
  } catch (e) {
    console.error("Error adding document: ", e);
  }
};

// Read all documents from a collection
const getAllDocuments = async <T = DocumentData>(collectionName: string): Promise<T[]> => {
  const querySnapshot = await getDocs(getCollection<T>(collectionName));
  return querySnapshot.docs.map(doc => ({ ...doc.data(), id: doc.id } as T));
};

// Update a document
const updateDocument = async <T = DocumentData>(collectionName: string, id: string, updatedData: Partial<T>) => {
  const docRef = doc(db, collectionName, id);
  try {
    await updateDoc(docRef, updatedData);
    console.log("Document updated with ID: ", id);
  } catch (e) {
    console.error("Error updating document: ", e);
  }
};

// Delete a document
const deleteDocument = async (collectionName: string, id: string) => {
  const docRef = doc(db, collectionName, id);
  try {
    await deleteDoc(docRef);
    console.log("Document deleted with ID: ", id);
  } catch (e) {
    console.error("Error deleting document: ", e);
  }
};

export { addDocument, getAllDocuments, updateDocument, deleteDocument };
