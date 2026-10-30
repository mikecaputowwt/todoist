/**
 * Search todos by title and notes fields (case-insensitive)
 * @param {Array} todos - Array of todo objects
 * @param {string} query - Search query string
 * @returns {Array} Filtered array of matching todos
 */
export const searchTodos = (todos, query) => {
  // Validate inputs
  if (!Array.isArray(todos)) {
    return [];
  }
  if (typeof query !== 'string') {
    return [];
  }

  // Trim leading and trailing whitespace
  const trimmedQuery = query.trim();

  // Return empty array if query is empty or only whitespace
  if (!trimmedQuery) {
    return [];
  }

  // Convert query to lowercase for case-insensitive search
  const lowerQuery = trimmedQuery.toLowerCase();

  // Filter todos that match the query in title or notes
  return todos.filter((todo) => {
    const titleMatch =
      todo.title && todo.title.toLowerCase().includes(lowerQuery);
    const notesMatch =
      todo.notes && todo.notes.toLowerCase().includes(lowerQuery);

    return titleMatch || notesMatch;
  });
};
