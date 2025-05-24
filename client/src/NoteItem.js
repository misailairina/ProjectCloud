import React, { useState } from 'react';

function NoteItem({ note, index, notesLength, onDelete, onUpdate, onMove }) {
  const [editing, setEditing] = useState(false);
  const [title, setTitle] = useState(note.title);
  const [description, setDescription] = useState(note.description);

  const handleSave = () => {
    if (!title.trim()) {
      alert('Titlul este obligatoriu!');
      return;
    }
    onUpdate(note._id, title, description);
    setEditing(false);
  };

  return (
    <div className="note-box">
      {editing ? (
        <>
          <input
            className="border w-full mb-2 px-2 py-1 rounded"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <textarea
            className="border w-full mb-2 px-2 py-1 rounded"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows={4}
          />
          <div className="note-actions">
            <button
              onClick={handleSave}
              className="bg-green-600 text-white px-3 py-1 rounded hover:bg-green-700"
            >
              Salveaza
            </button>
            <button
              onClick={() => setEditing(false)}
              className="bg-gray-400 px-3 py-1 rounded hover:bg-gray-500"
            >
              Anuleaza
            </button>
          </div>
        </>
      ) : (
        <>
          <h3>{note.title}</h3>
          <p>{note.description}</p>
          <div className="note-actions">
            <button
              onClick={() => setEditing(true)}
              className="bg-yellow-400 px-3 py-1 rounded hover:bg-yellow-500"
            >
              Editeaza
            </button>
            <button
              onClick={() => onDelete(note._id)}
              className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700"
            >
              Sterge
            </button>
            <button
              onClick={() => onMove(index, index - 1)}
              disabled={index === 0}
              className="px-3 py-1 border rounded disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-100"
            >
              ↑
            </button>
            <button
              onClick={() => onMove(index, index + 1)}
              disabled={index === notesLength - 1}
              className="px-3 py-1 border rounded disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-100"
            >
              ↓
            </button>
          </div>
        </>
      )}
    </div>
  );
}

export default NoteItem;
