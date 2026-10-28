import { summarizeTasks } from '../helpers/summarizeTasks';

describe('summarizeTasks', () => {
  describe('Empty and default parameters', () => {
    it('returns zero counts for an empty array', () => {
      const result = summarizeTasks([]);
      expect(result).toEqual({
        total: 0,
        archived: 0,
        active: 0,
      });
    });

    it('returns zero counts when called with no arguments (default parameter)', () => {
      const result = summarizeTasks();
      expect(result).toEqual({
        total: 0,
        archived: 0,
        active: 0,
      });
    });
  });

  describe('Single task scenarios', () => {
    it('counts a single archived task correctly', () => {
      const tasks = [{ id: '1', task: 'Test task', archived: true }];
      const result = summarizeTasks(tasks);
      expect(result).toEqual({
        total: 1,
        archived: 1,
        active: 0,
      });
    });

    it('counts a single active task correctly', () => {
      const tasks = [{ id: '1', task: 'Test task', archived: false }];
      const result = summarizeTasks(tasks);
      expect(result).toEqual({
        total: 1,
        archived: 0,
        active: 1,
      });
    });

    it('treats undefined archived property as active', () => {
      const tasks = [{ id: '1', task: 'Test task' }];
      const result = summarizeTasks(tasks);
      expect(result).toEqual({
        total: 1,
        archived: 0,
        active: 1,
      });
    });
  });

  describe('Multiple tasks with mixed archived flags', () => {
    it('handles a mix of archived true, false, and undefined', () => {
      const tasks = [
        { id: '1', task: 'Archived task', archived: true },
        { id: '2', task: 'Active task', archived: false },
        { id: '3', task: 'No flag task' },
        { id: '4', task: 'Another archived', archived: true },
        { id: '5', task: 'Another active', archived: false },
      ];
      const result = summarizeTasks(tasks);
      expect(result).toEqual({
        total: 5,
        archived: 2,
        active: 3,
      });
    });

    it('handles all archived tasks', () => {
      const tasks = [
        { id: '1', task: 'Task 1', archived: true },
        { id: '2', task: 'Task 2', archived: true },
        { id: '3', task: 'Task 3', archived: true },
      ];
      const result = summarizeTasks(tasks);
      expect(result).toEqual({
        total: 3,
        archived: 3,
        active: 0,
      });
    });

    it('handles all active tasks', () => {
      const tasks = [
        { id: '1', task: 'Task 1', archived: false },
        { id: '2', task: 'Task 2', archived: false },
        { id: '3', task: 'Task 3' },
      ];
      const result = summarizeTasks(tasks);
      expect(result).toEqual({
        total: 3,
        archived: 0,
        active: 3,
      });
    });
  });

  describe('Strict equality check for archived flag', () => {
    it('only counts archived: true, not truthy values', () => {
      const tasks = [
        { id: '1', task: 'Task 1', archived: true },
        { id: '2', task: 'Task 2', archived: 1 },
        { id: '3', task: 'Task 3', archived: 'yes' },
        { id: '4', task: 'Task 4', archived: {} },
      ];
      const result = summarizeTasks(tasks);
      expect(result).toEqual({
        total: 4,
        archived: 1,
        active: 3,
      });
    });

    it('treats false and null as not archived', () => {
      const tasks = [
        { id: '1', task: 'Task 1', archived: false },
        { id: '2', task: 'Task 2', archived: null },
        { id: '3', task: 'Task 3', archived: 0 },
      ];
      const result = summarizeTasks(tasks);
      expect(result).toEqual({
        total: 3,
        archived: 0,
        active: 3,
      });
    });
  });

  describe('No mutation verification', () => {
    it('does not mutate the input array', () => {
      const tasks = [
        { id: '1', task: 'Task 1', archived: true },
        { id: '2', task: 'Task 2', archived: false },
      ];
      const originalLength = tasks.length;
      const originalTasksCopy = JSON.parse(JSON.stringify(tasks));

      summarizeTasks(tasks);

      expect(tasks.length).toBe(originalLength);
      expect(tasks).toEqual(originalTasksCopy);
    });

    it('does not mutate task objects', () => {
      const task1 = { id: '1', task: 'Task 1', archived: true };
      const task2 = { id: '2', task: 'Task 2', archived: false };
      const tasks = [task1, task2];

      const task1Copy = { ...task1 };
      const task2Copy = { ...task2 };

      summarizeTasks(tasks);

      expect(task1).toEqual(task1Copy);
      expect(task2).toEqual(task2Copy);
      expect(tasks[0]).toBe(task1); // Check reference hasn't changed
      expect(tasks[1]).toBe(task2);
    });

    it('preserves the original array reference', () => {
      const tasks = [
        { id: '1', task: 'Task 1', archived: true },
        { id: '2', task: 'Task 2', archived: false },
      ];
      const originalReference = tasks;

      summarizeTasks(tasks);

      expect(tasks).toBe(originalReference);
    });
  });
});
