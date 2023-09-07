import React from 'react';

const TagFilter = ({ labels, selectedTags, filterMealsByTag }) => {
  return (
    <div className="tag-filter">
      <h3>Filter by Tags</h3>
      <div className="tag-buttons">
        {labels.map((label) => (
          <button
            key={label.id}
            className={`tag-button ${
              selectedTags.includes(label.id) ? 'active' : ''
            }`}
            onClick={() => filterMealsByTag(label.id)}
          >
            {label.label}
          </button>
        ))}
      </div>
    </div>
  );
};

export default TagFilter;
