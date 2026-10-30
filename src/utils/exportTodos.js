/**
 * Escape a CSV field value according to RFC 4180
 * @param {string|number|boolean} value - The value to escape
 * @returns {string} - The escaped value
 */
const escapeCSVField = (value) => {
  const stringValue = String(value);
  
  // If the value contains comma, quote, or newline, wrap in quotes
  if (stringValue.includes(',') || stringValue.includes('"') || stringValue.includes('\n')) {
    // Escape internal quotes by doubling them
    return `"${stringValue.replace(/"/g, '""')}"`;
  }
  
  return stringValue;
};

/**
 * Export an array of todo objects to CSV format
 * @param {Array} todos - Array of todo objects with id, title, done, priority
 * @returns {string} - CSV formatted string
 */
export const exportTodos = (todos) => {
  // Header row
  const header = 'id,title,done,priority';
  
  // Convert each todo to a CSV row
  const rows = todos.map((todo) => {
    const id = escapeCSVField(todo.id);
    const title = escapeCSVField(todo.title);
    const done = escapeCSVField(todo.done);
    const priority = escapeCSVField(todo.priority);
    
    return `${id},${title},${done},${priority}`;
  });
  
  // Combine header and rows
  return [header, ...rows].join('\n');
};
