import { exportTodos } from './exportTodos';

describe('exportTodos', () => {
  describe('Success', () => {
    it('should include correct header row', () => {
      const todos = [];
      const result = exportTodos(todos);
      
      expect(result).toBe('id,title,done,priority');
    });

    it('should export simple todos without special characters', () => {
      const todos = [
        { id: '1', title: 'Buy milk', done: false, priority: 'high' },
        { id: '2', title: 'Walk dog', done: true, priority: 'low' },
      ];
      const result = exportTodos(todos);
      
      const lines = result.split('\n');
      expect(lines[0]).toBe('id,title,done,priority');
      expect(lines[1]).toBe('1,Buy milk,false,high');
      expect(lines[2]).toBe('2,Walk dog,true,low');
    });

    it('should escape commas in title', () => {
      const todos = [
        { id: '1', title: 'Buy milk, eggs, and bread', done: false, priority: 'high' },
      ];
      const result = exportTodos(todos);
      
      const lines = result.split('\n');
      expect(lines[1]).toBe('1,"Buy milk, eggs, and bread",false,high');
    });

    it('should escape quotes in title', () => {
      const todos = [
        { id: '1', title: 'Buy "organic" apples', done: false, priority: 'medium' },
      ];
      const result = exportTodos(todos);
      
      const lines = result.split('\n');
      expect(lines[1]).toBe('1,"Buy ""organic"" apples",false,medium');
    });

    it('should escape combination of commas and quotes in title', () => {
      const todos = [
        { id: '1', title: 'Buy "organic" milk, eggs, and "fresh" bread', done: true, priority: 'high' },
      ];
      const result = exportTodos(todos);
      
      const lines = result.split('\n');
      expect(lines[1]).toBe('1,"Buy ""organic"" milk, eggs, and ""fresh"" bread",true,high');
    });

    it('should handle false and true boolean values for done field', () => {
      const todos = [
        { id: '1', title: 'Task one', done: false, priority: 'low' },
        { id: '2', title: 'Task two', done: true, priority: 'high' },
      ];
      const result = exportTodos(todos);
      
      const lines = result.split('\n');
      expect(lines[1]).toContain(',false,');
      expect(lines[2]).toContain(',true,');
    });

    it('should handle multiple todos correctly', () => {
      const todos = [
        { id: '1', title: 'Task one', done: false, priority: 'high' },
        { id: '2', title: 'Task two', done: true, priority: 'medium' },
        { id: '3', title: 'Task three', done: false, priority: 'low' },
      ];
      const result = exportTodos(todos);
      
      const lines = result.split('\n');
      expect(lines).toHaveLength(4); // Header + 3 data rows
      expect(lines[0]).toBe('id,title,done,priority');
      expect(lines[1]).toBe('1,Task one,false,high');
      expect(lines[2]).toBe('2,Task two,true,medium');
      expect(lines[3]).toBe('3,Task three,false,low');
    });

    it('should handle empty array with just header', () => {
      const todos = [];
      const result = exportTodos(todos);
      
      expect(result).toBe('id,title,done,priority');
    });

    it('should handle newlines in title by wrapping in quotes', () => {
      const todos = [
        { id: '1', title: 'Multi\nline\ntask', done: false, priority: 'high' },
      ];
      const result = exportTodos(todos);
      
      const lines = result.split('\n');
      // The first line should be header, second should start with 1,"Multi
      expect(lines[0]).toBe('id,title,done,priority');
      expect(lines[1]).toBe('1,"Multi');
    });
  });
});
