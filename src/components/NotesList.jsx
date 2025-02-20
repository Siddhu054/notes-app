import React, { useState } from 'react';

function NotesList({ notes, onAddNote, onUpdateNote, onDeleteNote, groupName }) {
  const [newNote, setNewNote] = useState('');
  const [editingNote, setEditingNote] = useState(null);
  const [editText, setEditText] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (newNote.trim()) {
      onAddNote(newNote);
      setNewNote('');
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  const startEditing = (note) => {
    setEditingNote(note.id);
    setEditText(note.text);
  };

  const saveEdit = (noteId) => {
    if (editText.trim()) {
      onUpdateNote(noteId, editText);
      setEditingNote(null);
    }
  };

  return (
    <div className="notes-container">
      <h2>{groupName}</h2>
      <form onSubmit={handleSubmit} className="note-form">
        <textarea
          value={newNote}
          onChange={(e) => setNewNote(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder="Write your note here..."
        />
        <button type="submit">
          Add Note
        </button>
      </form>

      <div className="notes-list">
        {notes.map(note => (
          <div key={note.id} className="note-item">
            {editingNote === note.id ? (
              <div className="edit-note">
                <textarea
                  value={editText}
                  onChange={(e) => setEditText(e.target.value)}
                  autoFocus
                />
                <div className="edit-actions">
                  <button onClick={() => saveEdit(note.id)}>Save</button>
                  <button onClick={() => setEditingNote(null)}>Cancel</button>
                </div>
              </div>
            ) : (
              <>
                <p>{note.text}</p>
                <div className="note-actions">
                  <button onClick={() => startEditing(note)}>Edit</button>
                  <button onClick={() => onDeleteNote(note.id)}>Delete</button>
                </div>
                <small>
                  Created: {new Date(note.createdAt).toLocaleString()}
                  <br />
                  Last Updated: {new Date(note.lastUpdated).toLocaleString()}
                </small>
              </>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default NotesList; 