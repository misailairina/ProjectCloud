import React, { useState } from 'react';

function NoteForm({ onAdd }) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  const handleSubmit = e => {
    e.preventDefault();
    if (!title.trim()) {
      alert('Titlul este obligatoriu!');
      return;
    }
    onAdd(title, description);
    setTitle('');
    setDescription('');
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="note-form"
      style={{
        backgroundImage: "url('/images/main.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        backdropFilter: "blur(3px)", // opțional, pentru un efect plăcut
        padding: "25px",
        borderRadius: "12px",
        boxShadow: "0 6px 12px rgba(0,0,0,0.1)",
        display: "flex",
        flexDirection: "column",
        maxWidth: "300px",
        width: "100%",
      }}
    >
      <label htmlFor="title">Adaugă un titlu:</label>
      <input
        id="title"
        type="text"
        placeholder="Titlu"
        value={title}
        onChange={e => setTitle(e.target.value)}
      />

      <label htmlFor="description">Adaugă un mesaj:</label>
      <textarea
        id="description"
        placeholder="Mesaj"
        value={description}
        onChange={e => setDescription(e.target.value)}
        rows={6}
      />

      <div className="buttons">
        <button type="submit">Adaugă Mesaj</button>
      </div>
    </form>
  );
}

export default NoteForm;
