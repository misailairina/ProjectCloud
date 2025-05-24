import React from 'react';
import NoteItem from './NoteItem';

function NoteList({ notes, onDelete, onUpdate, onMove }) {
  const backgroundStyle = {
    flex: 2,
    display: 'flex',
    flexDirection: 'column',
    gap: '15px',
    backgroundImage: "url('/images/mesaj.jpg')",
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center center',
    backgroundSize: 'cover',
    borderRadius: '12px',
    padding: '20px',
    boxShadow: '0 6px 12px rgba(0, 0, 0, 0.1)',
    color: 'white',
  };

  const textShadowStyle = {
    textShadow: '0 0 5px rgba(0, 0, 0, 0.7)',
    color: 'white',
  };

  return (
    <div style={backgroundStyle}>
      {notes.map((note, index) => {
        const key = note._id || note.id || index;
        return (
          <NoteItem
            key={key}
            note={note}
            index={index}
            notesLength={notes.length}
            onDelete={onDelete}
            onUpdate={onUpdate}
            onMove={onMove}
            textShadowStyle={textShadowStyle} // dacă vrei să-l trimiți pentru text
          />
        );
      })}
    </div>
  );
}

export default NoteList;
