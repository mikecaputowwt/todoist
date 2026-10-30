import { sortByPriority } from './sortByPriority';

describe('sortByPriority', () => {
  describe('Priority ordering', () => {
    it('sorts todos with high priority before medium priority', () => {
      const todos = [
        { id: 1, title: 'Medium task', priority: 'medium' },
        { id: 2, title: 'High task', priority: 'high' },
      ];

      const result = sortByPriority(todos);

      expect(result[0].priority).toBe('high');
      expect(result[1].priority).toBe('medium');
    });

    it('sorts todos with medium priority before low priority', () => {
      const todos = [
        { id: 1, title: 'Low task', priority: 'low' },
        { id: 2, title: 'Medium task', priority: 'medium' },
      ];

      const result = sortByPriority(todos);

      expect(result[0].priority).toBe('medium');
      expect(result[1].priority).toBe('low');
    });

    it('sorts todos respecting full priority order: high > medium > low', () => {
      const todos = [
        { id: 1, title: 'Low task', priority: 'low' },
        { id: 2, title: 'High task', priority: 'high' },
        { id: 3, title: 'Medium task', priority: 'medium' },
      ];

      const result = sortByPriority(todos);

      expect(result[0].priority).toBe('high');
      expect(result[1].priority).toBe('medium');
      expect(result[2].priority).toBe('low');
    });
  });

  describe('Stability for equal priorities', () => {
    it('preserves original order for todos with same priority', () => {
      const todos = [
        { id: 1, title: 'First high', priority: 'high' },
        { id: 2, title: 'Second high', priority: 'high' },
        { id: 3, title: 'Third high', priority: 'high' },
      ];

      const result = sortByPriority(todos);

      expect(result[0].id).toBe(1);
      expect(result[1].id).toBe(2);
      expect(result[2].id).toBe(3);
    });

    it('maintains stability across mixed priorities', () => {
      const todos = [
        { id: 1, title: 'First medium', priority: 'medium' },
        { id: 2, title: 'First high', priority: 'high' },
        { id: 3, title: 'Second medium', priority: 'medium' },
        { id: 4, title: 'Second high', priority: 'high' },
        { id: 5, title: 'First low', priority: 'low' },
      ];

      const result = sortByPriority(todos);

      // High priority todos maintain order (2, 4)
      expect(result[0].id).toBe(2);
      expect(result[1].id).toBe(4);
      // Medium priority todos maintain order (1, 3)
      expect(result[2].id).toBe(1);
      expect(result[3].id).toBe(3);
      // Low priority todo
      expect(result[4].id).toBe(5);
    });
  });

  describe('Non-mutation of input array', () => {
    it('does not mutate the input array', () => {
      const todos = [
        { id: 1, title: 'Low task', priority: 'low' },
        { id: 2, title: 'High task', priority: 'high' },
        { id: 3, title: 'Medium task', priority: 'medium' },
      ];

      const originalOrder = todos.map(todo => todo.id);
      sortByPriority(todos);
      const afterOrder = todos.map(todo => todo.id);

      expect(afterOrder).toEqual(originalOrder);
      expect(todos[0].priority).toBe('low');
      expect(todos[1].priority).toBe('high');
      expect(todos[2].priority).toBe('medium');
    });

    it('returns a new array instance', () => {
      const todos = [
        { id: 1, title: 'Task', priority: 'medium' },
      ];

      const result = sortByPriority(todos);

      expect(result).not.toBe(todos);
    });
  });

  describe('Edge cases', () => {
    it('handles empty array', () => {
      const todos = [];
      const result = sortByPriority(todos);

      expect(result).toEqual([]);
    });

    it('handles single todo', () => {
      const todos = [
        { id: 1, title: 'Only task', priority: 'medium' },
      ];

      const result = sortByPriority(todos);

      expect(result).toEqual(todos);
      expect(result).not.toBe(todos);
    });

    it('handles complex mixed priority scenario', () => {
      const todos = [
        { id: 1, title: 'Task 1', priority: 'low' },
        { id: 2, title: 'Task 2', priority: 'high' },
        { id: 3, title: 'Task 3', priority: 'low' },
        { id: 4, title: 'Task 4', priority: 'medium' },
        { id: 5, title: 'Task 5', priority: 'high' },
        { id: 6, title: 'Task 6', priority: 'medium' },
      ];

      const result = sortByPriority(todos);

      // Verify priority grouping
      expect(result[0].priority).toBe('high');
      expect(result[1].priority).toBe('high');
      expect(result[2].priority).toBe('medium');
      expect(result[3].priority).toBe('medium');
      expect(result[4].priority).toBe('low');
      expect(result[5].priority).toBe('low');

      // Verify stability within each priority group
      expect(result[0].id).toBe(2); // First high
      expect(result[1].id).toBe(5); // Second high
      expect(result[2].id).toBe(4); // First medium
      expect(result[3].id).toBe(6); // Second medium
      expect(result[4].id).toBe(1); // First low
      expect(result[5].id).toBe(3); // Second low
    });
  });
});
