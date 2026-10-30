/**
 * Sort todos by priority (high > medium > low)
 * Uses stable sort to preserve original order for equal priorities
 * Does not mutate the input array
 * 
 * @param {Array} todos - Array of todo objects with priority field
 * @returns {Array} New sorted array
 */
export const sortByPriority = (todos) => {
  const priorityOrder = {
    high: 1,
    medium: 2,
    low: 3,
  };

  // Create a shallow copy to avoid mutating the input
  return [...todos].sort((a, b) => {
    const priorityA = priorityOrder[a.priority] || 4;
    const priorityB = priorityOrder[b.priority] || 4;
    return priorityA - priorityB;
  });
};
