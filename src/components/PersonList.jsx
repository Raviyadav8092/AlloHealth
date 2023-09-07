import React, { useState } from 'react';

const PersonSelector = ({ setSelectedPerson }) => {
  const [selected, setSelected] = useState(null);

  const handleSelect = () => {
    if (!selected) {
      alert('Please select a person first.');
      return;
    }

    setSelectedPerson(selected);
  };

  return (
    <div className="person-selector">
      <h3>Select a Person</h3>
      <select onChange={(e) => setSelected(e.target.value)}>
        <option value="">Select Person</option>
        <option value="Person 1">Person 1</option>
        <option value="Person 2">Person 2</option>
      </select>
      <button onClick={handleSelect}>Select</button>
    </div>
  );
};

export default PersonSelector;
