import React, { useState, useRef, useEffect } from 'react';

function GroupList({ groups, onAddGroup, selectedGroup, onSelectGroup }) {
  const [showPopup, setShowPopup] = useState(false);
  const [newGroupName, setNewGroupName] = useState('');
  const popupRef = useRef();

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (popupRef.current && !popupRef.current.contains(event.target)) {
        setShowPopup(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (newGroupName.trim()) {
      onAddGroup(newGroupName);
      setNewGroupName('');
      setShowPopup(false);
    }
  };

  return (
    <div className="groups-container">
      <button onClick={() => setShowPopup(true)}>Create New Group</button>
      
      {showPopup && (
        <>
          <div className="popup-overlay"></div>
          <div className="popup" ref={popupRef}>
            <form onSubmit={handleSubmit}>
              <input
                type="text"
                value={newGroupName}
                onChange={(e) => setNewGroupName(e.target.value)}
                placeholder="Enter group name"
                autoFocus
              />
              <button type="submit">Create</button>
            </form>
          </div>
        </>
      )}

      <div className="groups-list">
        {groups.map(group => (
          <div
            key={group.id}
            className={`group-item ${selectedGroup?.id === group.id ? 'selected' : ''}`}
            onClick={() => onSelectGroup(group)}
          >
            {group.name}
          </div>
        ))}
      </div>
    </div>
  );
}

export default GroupList; 
