import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore, collection, addDoc, serverTimestamp } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyC-s5COZKlsqv_mqxD3EotSjCUpI7jGuFU",
  authDomain: "coding-night-d4670.firebaseapp.com",
  projectId: "coding-night-d4670",
  storageBucket: "coding-night-d4670.firebasestorage.app",
  messagingSenderId: "920671026921",
  appId: "1:920671026921:web:5aa798e9d5576b28f03a78",
  measurementId: "G-4E08E44XJ1"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);

// ✅ NEW: Firestore save function
export const savePitchToFirestore = async (userId, userInput, geminiResponse) => {
  try {
    const docRef = await addDoc(collection(db, "pitches"), {
      userId: userId,
      userInput: userInput,
      geminiResponse: geminiResponse,
      createdAt: serverTimestamp(),
      status: "completed"
    });
    console.log("✅ Pitch saved with ID: ", docRef.id);
    return docRef.id;
  } catch (error) {
    console.error("❌ Error saving pitch: ", error);
    throw error;
  }
};