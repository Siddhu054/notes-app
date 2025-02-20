import React, { useState, useEffect } from 'react';
import GroupList from './components/GroupList';
import NotesList from './components/NotesList';
import './App.css';

function App() {
  const [groups, setGroups] = useState(() => {
    const savedGroups = localStorage.getItem('noteGroups');
    return savedGroups ? JSON.parse(savedGroups) : [];
  });
  
  const [selectedGroup, setSelectedGroup] = useState(null);
  const [notes, setNotes] = useState(() => {
    const savedNotes = localStorage.getItem('notes');
    return savedNotes ? JSON.parse(savedNotes) : {};
  });

  // Save groups to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('noteGroups', JSON.stringify(groups));
  }, [groups]);

  // Save notes to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('notes', JSON.stringify(notes));
  }, [notes]);

  const addGroup = (groupName) => {
    const newGroup = {
      id: Date.now(),
      name: groupName,
      createdAt: new Date().toISOString(),
    };
    setGroups([...groups, newGroup]);
  };

  const addNote = (groupId, noteText) => {
    const newNote = {
      id: Date.now(),
      text: noteText,
      createdAt: new Date().toISOString(),
      lastUpdated: new Date().toISOString(),
    };

    setNotes(prev => ({
      ...prev,
      [groupId]: [...(prev[groupId] || []), newNote]
    }));
  };

  const updateNote = (groupId, noteId, newText) => {
    setNotes(prev => ({
      ...prev,
      [groupId]: prev[groupId].map(note => 
        note.id === noteId 
          ? { ...note, text: newText, lastUpdated: new Date().toISOString() }
          : note
      )
    }));
  };

  const deleteNote = (groupId, noteId) => {
    setNotes(prev => ({
      ...prev,
      [groupId]: prev[groupId].filter(note => note.id !== noteId)
    }));
  };

  return (
    <div className="app">
      <GroupList 
        groups={groups} 
        onAddGroup={addGroup}
        selectedGroup={selectedGroup}
        onSelectGroup={setSelectedGroup}
      />
      {selectedGroup ? (
        <NotesList 
          notes={notes[selectedGroup.id] || []}
          onAddNote={(note) => addNote(selectedGroup.id, note)}
          onUpdateNote={(noteId, text) => updateNote(selectedGroup.id, noteId, text)}
          onDeleteNote={(noteId) => deleteNote(selectedGroup.id, noteId)}
          groupName={selectedGroup.name}
        />
      ) : (
        <div className="no-selection">
          <h2>Select a group or create a new one to start taking notes!</h2>
        </div>
      )}
    </div>
  );
}

export default App; 