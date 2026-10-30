import { searchTodos } from './searchTodos';

describe('searchTodos', () => {
  const sampleTodos = [
    { id: 1, title: 'Buy groceries', notes: 'Get milk and bread' },
    { id: 2, title: 'Read bookmark article', notes: 'Technology trends' },
    { id: 3, title: 'Call dentist', notes: 'Schedule appointment for cleaning' },
    { id: 4, title: 'Write report', notes: 'Quarterly report' },
    { id: 5, title: 'Exercise', notes: '' },
    { id: 6, title: 'Meeting with team', notes: 'Write meeting agenda' },
    { id: 7, title: 'Call mom', notes: 'Birthday wishes' },
  ];

  describe('Empty query handling', () => {
    it('returns empty array for empty query', () => {
      const result = searchTodos(sampleTodos, '');
      expect(result).toEqual([]);
    });

    it('returns empty array for whitespace-only query', () => {
      const result = searchTodos(sampleTodos, '   ');
      expect(result).toEqual([]);
    });

    it('returns empty array for tab and space query', () => {
      const result = searchTodos(sampleTodos, '\t  \n  ');
      expect(result).toEqual([]);
    });
  });

  describe('Case-insensitive matching', () => {
    it('matches title case-insensitively with lowercase query', () => {
      const result = searchTodos(sampleTodos, 'buy');
      expect(result).toHaveLength(1);
      expect(result[0].id).toBe(1);
    });

    it('matches title case-insensitively with uppercase query', () => {
      const result = searchTodos(sampleTodos, 'BUY');
      expect(result).toHaveLength(1);
      expect(result[0].id).toBe(1);
    });

    it('matches title case-insensitively with mixed case query', () => {
      const result = searchTodos(sampleTodos, 'BuY gRoCeRiEs');
      expect(result).toHaveLength(1);
      expect(result[0].id).toBe(1);
    });
  });

  describe('Matching in title field', () => {
    it('finds todos by title', () => {
      const result = searchTodos(sampleTodos, 'dentist');
      expect(result).toHaveLength(1);
      expect(result[0].id).toBe(3);
    });

    it('finds multiple todos matching in title', () => {
      const result = searchTodos(sampleTodos, 'call');
      expect(result).toHaveLength(2);
      const ids = result.map((t) => t.id);
      expect(ids).toContain(3); // "Call dentist" title
      expect(ids).toContain(7); // "Call mom" title
    });
  });

  describe('Matching in notes field', () => {
    it('finds todos by notes', () => {
      const result = searchTodos(sampleTodos, 'milk');
      expect(result).toHaveLength(1);
      expect(result[0].id).toBe(1);
    });

    it('finds todos with notes match', () => {
      const result = searchTodos(sampleTodos, 'appointment');
      expect(result).toHaveLength(1);
      expect(result[0].id).toBe(3);
    });
  });

  describe('Matching across both title and notes', () => {
    it('returns todo if query matches either title or notes', () => {
      const result = searchTodos(sampleTodos, 'quarterly');
      expect(result).toHaveLength(1);
      expect(result[0].id).toBe(4);
    });

    it('returns multiple todos matching in different fields', () => {
      const result = searchTodos(sampleTodos, 'write');
      expect(result).toHaveLength(2);
      const ids = result.map((t) => t.id);
      expect(ids).toContain(4); // Matches in title "Write report"
      expect(ids).toContain(6); // Matches in notes "Write meeting agenda"
    });
  });

  describe('Leading/trailing whitespace trimming', () => {
    it('trims leading spaces from query', () => {
      const result = searchTodos(sampleTodos, '   dentist');
      expect(result).toHaveLength(1);
      expect(result[0].id).toBe(3);
    });

    it('trims trailing spaces from query', () => {
      const result = searchTodos(sampleTodos, 'dentist   ');
      expect(result).toHaveLength(1);
      expect(result[0].id).toBe(3);
    });

    it('trims both leading and trailing spaces from query', () => {
      const result = searchTodos(sampleTodos, '  dentist  ');
      expect(result).toHaveLength(1);
      expect(result[0].id).toBe(3);
    });
  });

  describe('No matches', () => {
    it('returns empty array when no matches found', () => {
      const result = searchTodos(sampleTodos, 'nonexistent');
      expect(result).toEqual([]);
    });

    it('returns empty array for unmatched query', () => {
      const result = searchTodos(sampleTodos, 'xyz123');
      expect(result).toEqual([]);
    });
  });

  describe('Partial word matching', () => {
    it('matches partial words in title', () => {
      const result = searchTodos(sampleTodos, 'book');
      expect(result).toHaveLength(1);
      expect(result[0].id).toBe(2);
      expect(result[0].title).toBe('Read bookmark article');
    });

    it('matches partial words at the start', () => {
      const result = searchTodos(sampleTodos, 'gro');
      expect(result).toHaveLength(1);
      expect(result[0].title).toBe('Buy groceries');
    });

    it('matches partial words in the middle', () => {
      const result = searchTodos(sampleTodos, 'mark');
      expect(result).toHaveLength(1);
      expect(result[0].title).toBe('Read bookmark article');
    });

    it('matches partial words in notes', () => {
      const result = searchTodos(sampleTodos, 'point');
      expect(result).toHaveLength(1);
      expect(result[0].notes).toBe('Schedule appointment for cleaning');
    });
  });

  describe('Edge cases', () => {
    it('handles todos with empty notes field', () => {
      const result = searchTodos(sampleTodos, 'exercise');
      expect(result).toHaveLength(1);
      expect(result[0].id).toBe(5);
    });

    it('handles todos with null notes field', () => {
      const todos = [
        { id: 1, title: 'Test', notes: null },
      ];
      const result = searchTodos(todos, 'test');
      expect(result).toHaveLength(1);
      expect(result[0].id).toBe(1);
    });

    it('handles empty todos array', () => {
      const result = searchTodos([], 'query');
      expect(result).toEqual([]);
    });

    it('does not mutate original array', () => {
      const original = [...sampleTodos];
      searchTodos(sampleTodos, 'dentist');
      expect(sampleTodos).toEqual(original);
    });
  });

  describe('Input validation', () => {
    it('returns empty array if todos is not an array', () => {
      const result = searchTodos(null, 'query');
      expect(result).toEqual([]);
    });

    it('returns empty array if todos is undefined', () => {
      const result = searchTodos(undefined, 'query');
      expect(result).toEqual([]);
    });

    it('returns empty array if todos is an object', () => {
      const result = searchTodos({ id: 1, title: 'test' }, 'query');
      expect(result).toEqual([]);
    });

    it('returns empty array if query is not a string', () => {
      const result = searchTodos(sampleTodos, null);
      expect(result).toEqual([]);
    });

    it('returns empty array if query is undefined', () => {
      const result = searchTodos(sampleTodos, undefined);
      expect(result).toEqual([]);
    });

    it('returns empty array if query is a number', () => {
      const result = searchTodos(sampleTodos, 123);
      expect(result).toEqual([]);
    });

    it('handles todos with missing title field', () => {
      const todos = [
        { id: 1, notes: 'Some notes' },
      ];
      const result = searchTodos(todos, 'notes');
      expect(result).toHaveLength(1);
      expect(result[0].id).toBe(1);
    });

    it('handles todos with missing notes field', () => {
      const todos = [
        { id: 1, title: 'Test' },
      ];
      const result = searchTodos(todos, 'test');
      expect(result).toHaveLength(1);
      expect(result[0].id).toBe(1);
    });
  });
});
