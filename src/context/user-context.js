import React, { createContext, useContext, useState } from 'react';
import PropTypes from 'prop-types';

export const UserContext = createContext();
export const UserProvider = ({ children }) => {
  // In a real app, this would be set by Firebase authentication
  // For now, we generate a unique session ID
  const [userId] = useState(() => {
    const storedId = localStorage.getItem('todoist_user_id');
    if (storedId) {
      return storedId;
    }
    const newId = `user_${Math.random().toString(36).substr(2, 9)}`;
    localStorage.setItem('todoist_user_id', newId);
    return newId;
  });

  return (
    <UserContext.Provider value={{ userId }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUserValue = () => useContext(UserContext);

UserProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
