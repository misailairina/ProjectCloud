// src/firebaseUtils.js
import { ref, push, onValue } from "firebase/database";
import { db } from "./firebase";

export const addNoteToFirebase = (title, description) => {
  const notesRef = ref(db, 'notes');
  const newNote = {
    title,
    description,
    createdAt: new Date().toISOString(),
  };

  return push(notesRef, newNote);
};

export const subscribeToNotes = (callback) => {
  const notesRef = ref(db, 'notes');
  onValue(notesRef, snapshot => {
    const data = snapshot.val();
    const parsed = data
      ? Object.entries(data).map(([id, val]) => ({ id, ...val }))
      : [];
    callback(parsed.reverse());
  });
};
