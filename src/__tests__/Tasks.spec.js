import React from 'react';
import { render, cleanup } from '@testing-library/react';
import { Tasks } from '../components/Tasks';
import { useSelectedProjectValue } from '../context';

// Create a module-level variable to store mock tasks
let mockTasks = [
  {
    id: 'mx2taaXpF38vYqMGbVtY',
    archived: false,
    date: '21/07/2019',
    projectId: '1',
    task:
      'Would I rather be feared or loved? Easy. Both. I want people to be afraid of how much they love me.',
    userId: 'jlIFXIwyAL3tzHMtzRbw',
  },
];

jest.mock('../context', () => ({
  useSelectedProjectValue: jest.fn(),
  useProjectsValue: jest.fn(() => ({
    projects: [
      {
        name: '🙌 THE OFFICE',
        projectId: '1',
        userId: 'jlIFXIwyAL3tzHMtzRbw',
        docId: 'michael-scott',
      },
      {
        name: '🚀 DAILY',
        projectId: '2',
        userId: 'jlIFXIwyAL3tzHMtzRbw',
        docId: 'daily-office',
      },
      {
        name: '🎯 FUTURE',
        projectId: '3',
        userId: 'jlIFXIwyAL3tzHMtzRbw',
        docId: 'wake-up',
      },
      {
        name: '📚 WORDS',
        projectId: '4',
        userId: 'jlIFXIwyAL3tzHMtzRbw',
        docId: 'arcade-fire',
      },
      {
        name: '🎵 MUSIC',
        projectId: '5',
        userId: 'jlIFXIwyAL3tzHMtzRbw',
        docId: 'bella-ciao',
      },
    ],
  })),
}));

jest.mock('../hooks', () => ({
  useTasks: () => ({
    tasks: mockTasks,
  }),
}));

beforeEach(cleanup);

describe('<Tasks />', () => {
  afterEach(() => {
    jest.clearAllMocks();
    // Reset mock tasks to default
    mockTasks = [
      {
        id: 'mx2taaXpF38vYqMGbVtY',
        archived: false,
        date: '21/07/2019',
        projectId: '1',
        task:
          'Would I rather be feared or loved? Easy. Both. I want people to be afraid of how much they love me.',
        userId: 'jlIFXIwyAL3tzHMtzRbw',
      },
    ];
  });

  it('renders tasks', () => {
    useSelectedProjectValue.mockImplementation(() => ({
      setSelectedProject: jest.fn(() => 'INBOX'),
      selectedProject: 'INBOX',
    }));

    const { queryByTestId } = render(<Tasks />);
    expect(queryByTestId('tasks')).toBeTruthy();
    expect(queryByTestId('project-name').textContent).toBe('Inbox');
  });

  it('renders a task with a project title', () => {
    useSelectedProjectValue.mockImplementation(() => ({
      setSelectedProject: jest.fn(() => '1'),
      selectedProject: '1',
    }));

    const { queryByTestId } = render(<Tasks />);
    expect(queryByTestId('tasks')).toBeTruthy();
    expect(queryByTestId('project-name').textContent).toBe('🙌 THE OFFICE');
  });

  it('renders a task with a collated title', () => {
    useSelectedProjectValue.mockImplementation(() => ({
      setSelectedProject: jest.fn(() => 'INBOX'),
      selectedProject: 'INBOX',
    }));

    const { queryByTestId } = render(<Tasks />);
    expect(queryByTestId('tasks')).toBeTruthy();
    expect(queryByTestId('project-name').textContent).toBe('Inbox');
  });

  it('renders tasks in alphabetical order (A-Z)', () => {
    useSelectedProjectValue.mockImplementation(() => ({
      setSelectedProject: jest.fn(() => '1'),
      selectedProject: '1',
    }));

    // Set up tasks in non-alphabetical order
    mockTasks = [
      {
        id: '1',
        archived: false,
        date: '21/07/2019',
        projectId: '1',
        task: 'Zebra task',
        userId: 'jlIFXIwyAL3tzHMtzRbw',
      },
      {
        id: '2',
        archived: false,
        date: '21/07/2019',
        projectId: '1',
        task: 'Apple task',
        userId: 'jlIFXIwyAL3tzHMtzRbw',
      },
      {
        id: '3',
        archived: false,
        date: '21/07/2019',
        projectId: '1',
        task: 'Banana task',
        userId: 'jlIFXIwyAL3tzHMtzRbw',
      },
    ];

    const { container } = render(<Tasks />);

    // Get all task items
    const taskItems = container.querySelectorAll('.tasks__list li span');

    // Verify tasks are rendered in alphabetical order
    expect(taskItems).toHaveLength(3);
    expect(taskItems[0].textContent).toBe('Apple task');
    expect(taskItems[1].textContent).toBe('Banana task');
    expect(taskItems[2].textContent).toBe('Zebra task');
  });

  it('sorts tasks case-insensitively', () => {
    useSelectedProjectValue.mockImplementation(() => ({
      setSelectedProject: jest.fn(() => '1'),
      selectedProject: '1',
    }));

    // Set up tasks with mixed case
    mockTasks = [
      {
        id: '1',
        archived: false,
        date: '21/07/2019',
        projectId: '1',
        task: 'zebra task',
        userId: 'jlIFXIwyAL3tzHMtzRbw',
      },
      {
        id: '2',
        archived: false,
        date: '21/07/2019',
        projectId: '1',
        task: 'APPLE task',
        userId: 'jlIFXIwyAL3tzHMtzRbw',
      },
      {
        id: '3',
        archived: false,
        date: '21/07/2019',
        projectId: '1',
        task: 'BaNaNa task',
        userId: 'jlIFXIwyAL3tzHMtzRbw',
      },
    ];

    const { container } = render(<Tasks />);

    // Get all task items
    const taskItems = container.querySelectorAll('.tasks__list li span');

    // Verify tasks are rendered in alphabetical order (case-insensitive)
    expect(taskItems).toHaveLength(3);
    expect(taskItems[0].textContent).toBe('APPLE task');
    expect(taskItems[1].textContent).toBe('BaNaNa task');
    expect(taskItems[2].textContent).toBe('zebra task');
  });
});
