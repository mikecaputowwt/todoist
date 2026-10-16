import React, { createContext, useContext } from 'react';
import PropTypes from 'prop-types';
import { useTags } from '../hooks';

export const TagsContext = createContext();
export const TagsProvider = ({ children }) => {
  const { tags, setTags } = useTags();

  return (
    <TagsContext.Provider value={{ tags, setTags }}>
      {children}
    </TagsContext.Provider>
  );
};

export const useTagsValue = () => useContext(TagsContext);

TagsProvider.propTypes = {
  children: PropTypes.node.isRequired,
};