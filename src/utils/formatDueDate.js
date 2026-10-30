/**
 * Format a due date into a human-readable string
 * @param {Date} date - The date to format
 * @returns {string} Formatted date string
 */
export const formatDueDate = (date) => {
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const inputDate = new Date(date);
  inputDate.setHours(0, 0, 0, 0);

  const diffTime = inputDate - today;
  const diffDays = Math.round(diffTime / (1000 * 60 * 60 * 24));

  if (diffDays === 0) {
    return 'Today';
  }

  if (diffDays === 1) {
    return 'Tomorrow';
  }

  if (diffDays < 0) {
    const daysOverdue = Math.abs(diffDays);
    return `Overdue by ${daysOverdue} days`;
  }

  // For dates more than 1 day in the future, return "Mon DD" format
  const monthNames = [
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'May',
    'Jun',
    'Jul',
    'Aug',
    'Sep',
    'Oct',
    'Nov',
    'Dec',
  ];

  const month = monthNames[inputDate.getMonth()];
  const day = inputDate.getDate();

  return `${month} ${day}`;
};
