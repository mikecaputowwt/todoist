import React, { useState } from 'react';
import { FaTag, FaTimes } from 'react-icons/fa';
import PropTypes from 'prop-types';
import { useTagsValue } from '../context/tags-context';
import { firebase } from '../firebase';

export const TagOverlay = ({
  showTagOverlay,
  setShowTagOverlay,
  selectedTags,
  setSelectedTags
}) => {
  const { tags } = useTagsValue();
  const [showNewTag, setShowNewTag] = useState(false);
  const [newTagName, setNewTagName] = useState('');
  const [newTagColor, setNewTagColor] = useState('#808080');

  const predefinedColors = [
    { color: '#ff6565', name: 'Red' },
    { color: '#ff9932', name: 'Orange' },
    { color: '#fad003', name: 'Yellow' },
    { color: '#6accbc', name: 'Green' },
    { color: '#4073ff', name: 'Blue' },
    { color: '#af38eb', name: 'Purple' }
  ];

  const addNewTag = () => {
    if (newTagName) {
      firebase
        .firestore()
        .collection('tags')
        .add({
          name: newTagName,
          color: newTagColor,
          userId: 'jlIFXIwyAL3tzHMtzRbw'
        })
        .then((docRef) => {
          const newTag = {
            id: docRef.id,
            name: newTagName,
            color: newTagColor
          };
          setSelectedTags([...(selectedTags || []), newTag]);
          setNewTagName('');
          setNewTagColor('#808080');
          setShowNewTag(false);
        });
    }
  };

  const toggleTagSelection = (tag) => {
    const foundIndex = selectedTags.findIndex(t => t.id === tag.docId);
    let newSelectedTags;
    
    if (foundIndex === -1) {
      newSelectedTags = [...selectedTags, {
        id: tag.docId,
        name: tag.name,
        color: tag.color
      }];
    } else {
      newSelectedTags = selectedTags.filter(t => t.id !== tag.docId);
    }
    
    setSelectedTags(newSelectedTags);
  };

  return showTagOverlay ? (
    <div className="tag-overlay" data-testid="tag-overlay">
      <ul className="tag-overlay__list">
        {tags.map(tag => (
          <li
            key={tag.docId}
            onClick={() => toggleTagSelection(tag)}
            onKeyDown={e => {
              if (e.key === 'Enter') toggleTagSelection(tag);
            }}
            role="button"
            tabIndex="0"
            className={`tag-overlay__item ${
              selectedTags.some(s => s.id === tag.docId) ? 'active' : ''
            }`}
            data-testid="tag-item"
          >
            <div>
              <div 
                className="tag-overlay__tag-dot"
                style={{
                  backgroundColor: tag.color || '#808080'
                }}
              />
              <span>{tag.name}</span>
            </div>
          </li>
        ))}
      
        {!showNewTag && (
          <li 
            className="tag-overlay__add-new"
            onClick={() => setShowNewTag(true)}
            onKeyDown={e => {
              if (e.key === 'Enter') setShowNewTag(true);
            }}
            role="button"
            tabIndex="0"
          >
            <FaTag />
            <span>Add new tag</span>
          </li>
        )}
      </ul>

      {showNewTag && (
        <div className="tag-overlay__new">
          <input
            type="text"
            placeholder="Enter tag name"
            className="tag-overlay__new-name"
            value={newTagName}
            data-testid="new-tag-name"
            onChange={(e) => setNewTagName(e.target.value)}
          />
          
          <div className="tag-overlay__colors">
            {predefinedColors.map(color => (
              <div
                key={color.color}
                className="tag-overlay__color"
                onClick={() => setNewTagColor(color.color)}
              >
                <div 
                  className={`tag-overlay__color-sample ${
                    newTagColor === color.color ? 'active' : ''
                  }`}
                  title={color.name}
                  style={{ backgroundColor: color.color }}
                />
              </div>
            ))}
          </div>
          
          <button
            type="button"
            className="tag-overlay__add"
            data-testid="add-new-tag"
            onClick={addNewTag}
          >
            Add Tag
          </button>
          
          <button
            type="button"
            className="tag-overlay__cancel"
            onClick={() => {
              setNewTagName('');
              setNewTagColor('#808080');
              setShowNewTag(false);
            }}
          >
            Cancel
          </button>
        </div>
      )}
    </div>
  ) : null;
};

TagOverlay.propTypes = {
  showTagOverlay: PropTypes.bool,
  setShowTagOverlay: PropTypes.func,
  selectedTags: PropTypes.array,
  setSelectedTags: PropTypes.func
};