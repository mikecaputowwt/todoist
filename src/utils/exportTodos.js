// RFC 4180 CSV field escaping
const escapeCSVField = (value) => {
  const stringValue = String(value);
  if (
    stringValue.includes(',') ||
    stringValue.includes('"') ||
    stringValue.includes('\n')
  ) {
    return `"${stringValue.replace(/"/g, '""')}"`;
  }
  return stringValue;
};

export const exportTodos = (todos) => {
  const header = 'id,title,done,priority';
  const rows = todos.map((todo) => {
    const id = escapeCSVField(todo.id);
    const title = escapeCSVField(todo.title);
    const done = escapeCSVField(todo.done);
    const priority = escapeCSVField(todo.priority);
    return `${id},${title},${done},${priority}`;
  });
  return [header, ...rows].join('\n');
};
