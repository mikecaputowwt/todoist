export const summarizeTasks = (tasks = []) => {
  const total = tasks.length;
  const archived = tasks.filter(task => task.archived === true).length;
  const active = total - archived;

  return {
    total,
    archived,
    active,
  };
};
