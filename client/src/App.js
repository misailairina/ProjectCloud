import React, { useEffect, useState } from 'react';
import NoteForm from './NoteForm';
import NoteList from './NoteList';
import { db } from './firebase';
import { ref, onValue, push, set, remove, update } from 'firebase/database';
import BackgroundMessages from "./BackgroundMessages";
import './App.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  const [notes, setNotes] = useState([]);

  useEffect(() => {
    const notesRef = ref(db, 'notes');
    const unsubscribe = onValue(notesRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        const loadedNotes = Object.entries(data).map(([key, value]) => ({
          _id: key,
          ...value,
        }));
        setNotes(loadedNotes.reverse());
      } else {
        setNotes([]);
      }
    });

    return () => unsubscribe();
  }, []);

  const addNote = async (title, description) => {
    const notesRef = ref(db, 'notes');
    const newNoteRef = push(notesRef);
    const newNote = {
      title,
      description,
      createdAt: new Date().toISOString(),
    };

    try {
      await set(newNoteRef, newNote);
      toast.success('Mesajul a fost adaugat cu succes!');
    } catch (err) {
      console.error(err);
      toast.error('Eroare la adaugare mesaj.');
    }
  };

  const updateNote = async (id, title, description) => {
    try {
      await update(ref(db, `notes/${id}`), { title, description });
      toast.success('Mesajul a fost actualizat cu succes!');
    } catch (err) {
      toast.error('Eroare la actualizare mesaj.');
    }
  };

  const deleteNote = async (id) => {
    try {
      await remove(ref(db, `notes/${id}`));
      toast.info('Mesajul a fost sters.');
    } catch (err) {
      toast.error('Eroare la stergere mesaj.');
    }
  };

  const moveNote = (fromIndex, toIndex) => {
    if (toIndex < 0 || toIndex >= notes.length) return;
    const updated = [...notes];
    const [moved] = updated.splice(fromIndex, 1);
    updated.splice(toIndex, 0, moved);
    setNotes(updated);
  };

  return (
    <div className="app-wrapper p-6 max-w-3xl mx-auto relative">
      {/* Mesaje de fundal */}
      <BackgroundMessages />

      {/* Conținutul principal */}
      <h1 className="text-2xl font-bold mb-4 relative z-10">Mesaje de Incurajare</h1>
      <div className={`container ${notes.length === 0 ? 'empty' : ''} relative z-10`}>
        <NoteForm onAdd={addNote} />
        {notes.length > 0 && (
          <NoteList
            notes={notes}
            onDelete={deleteNote}
            onUpdate={updateNote}
            onMove={moveNote}
          />
        )}
      </div>

      <ToastContainer
        position="top-right"
        autoClose={3000}
        theme="colored"
      />
    </div>
  );
}

export default App;
