import React from 'react';
import PropTypes from 'prop-types';

export const TagDisplay = ({ tags }) => {
  if (!tags || tags.length === 0) return null;

  return (
    <div className="tags-display">
      {tags.map((tag, index) => (
        <span
          key={index}
          className="tag"
          style={{
            backgroundColor: tag.color || '#808080',
          }}
        >
          {tag.name}
        </span>
      ))}
    </div>
  );
};

TagDisplay.propTypes = {
  tags: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      color: PropTypes.string,
    })
  ),
};