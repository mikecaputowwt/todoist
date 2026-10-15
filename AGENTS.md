# Agent Guidelines for Development

This document provides guidelines and best practices for coding agents (such as Forge or Claude) working on this repository.

## Table of Contents

- [General Principles](#general-principles)
- [Project Overview](#project-overview)
- [Development Workflow](#development-workflow)
- [Code Quality Standards](#code-quality-standards)
- [Testing Requirements](#testing-requirements)
- [Common Tasks](#common-tasks)
- [Troubleshooting](#troubleshooting)

## General Principles

### Core Values

1. **Clarity First**: All code should be easy to understand and maintain
2. **Test Coverage**: New features must include comprehensive tests
3. **Backwards Compatibility**: Changes should not break existing functionality
4. **Documentation**: Update relevant docs when making changes
5. **Incremental Changes**: Prefer small, focused commits over large monolithic ones

### Before Starting Work

- Review `README.md` for project context and local setup instructions
- Check the current branch and ensure you're on a feature branch (not `master`)
- Run existing tests to ensure the baseline is passing
- Review related code and tests before making changes

## Project Overview

### Tech Stack

- **Frontend Framework**: React with Custom Hooks and Context API
- **Backend/Database**: Firebase (Firestore)
- **Styling**: SCSS
- **Testing**: React Testing Library
- **Build Tool**: Create React App

### Key Features

- Multi-project task management
- Real-time data persistence with Firebase
- Dark mode support
- Comprehensive test coverage

### Project Structure

```
src/
├── components/          # React functional components
├── context/            # Context API providers and hooks
├── hooks/              # Custom React hooks
├── helpers/            # Utility functions
├── __tests__/          # Jest/RTL test files (parallel to source)
├── constants/          # App constants
├── App.js              # Root component
├── index.js            # Entry point
└── firebase.js         # Firebase config (created from .example)
```

## Development Workflow

### Creating a Feature Branch

```bash
git checkout master
git pull origin master
git checkout -b feature/description-of-change
```

### Development Loop

1. **Plan**: Create a numbered plan for the task
2. **Explore**: Use `list_files` and `read_file` to understand the codebase
3. **Implement**: Make focused, atomic changes
4. **Test**: Run tests locally and verify coverage
5. **Commit**: Write clear, descriptive commit messages
6. **Push**: Push to the feature branch
7. **PR**: Create a pull request with a detailed description

### Commit Message Format

Follow conventional commits:

```
type(scope): description

- Bullet point details if needed
- Keep it concise but descriptive
```

Examples:
- `feat(tasks): add task filtering by due date`
- `fix(context): prevent state mutation in projects context`
- `test(components): improve AddTask component test coverage`
- `docs(readme): add troubleshooting section`

### Pull Request Requirements

Every PR must include:

1. **Clear Title**: Describe the feature or fix in one line
2. **Description**: Explain what changed and why
3. **Testing**: Describe how the changes were tested
4. **References**: Link to any related issues or PRs
5. **Breaking Changes**: Call out any breaking changes

Example PR template:

```markdown
## Description
Brief description of the change and why it was made.

## Changes
- Change 1
- Change 2
- Change 3

## How to Test
Step-by-step instructions for testing the feature.

## Testing Verification
- [x] Unit tests pass
- [x] Integration tests pass
- [x] Manual testing completed
- [x] No breaking changes

## Screenshots (if applicable)
Add screenshots or GIFs showing the feature in action.
```

## Code Quality Standards

### React Best Practices

1. **Use Functional Components**: All components should be functional with hooks
2. **Props Validation**: Use PropTypes or TypeScript (if applicable)
3. **Avoid Prop Drilling**: Use Context API for deeply nested state
4. **Custom Hooks**: Extract complex logic into custom hooks in `src/hooks/`
5. **Naming**: Use clear, descriptive names (e.g., `useProjects` not `useP`)

### JavaScript Standards

1. **ESLint Config**: Follow `.eslintrc.json` configuration
2. **Prettier Format**: Code should be formatted with Prettier (`.prettierrc.json`)
3. **Constants**: Define magic strings/numbers in `src/constants/index.js`
4. **Helpers**: Reusable utility functions go in `src/helpers/index.js`

### CSS/SCSS Standards

1. **BEM Naming**: Use Block-Element-Modifier pattern for class names
2. **Scoped Styles**: Keep styles close to components when possible
3. **Variables**: Define colors and sizing in SCSS variables
4. **Dark Mode**: Ensure new styles support both light and dark modes

### Example Component Structure

```javascript
import React, { useState, useContext } from 'react';
import PropTypes from 'prop-types';
import { ProjectContext } from '../context';
import { useProjects } from '../hooks';
import './ComponentName.scss';

/**
 * Brief description of what this component does.
 * @param {Object} props - Component props
 */
function ComponentName({ propOne, propTwo }) {
  const [localState, setLocalState] = useState(null);
  const { contextValue } = useContext(ProjectContext);
  const { data } = useProjects();

  const handleClick = () => {
    // Handler logic
  };

  return (
    <div className="component-name">
      <div className="component-name__header">
        {/* Content */}
      </div>
      <div className="component-name__body">
        {/* Content */}
      </div>
    </div>
  );
}

ComponentName.propTypes = {
  propOne: PropTypes.string.isRequired,
  propTwo: PropTypes.number,
};

ComponentName.defaultProps = {
  propTwo: 0,
};

export default ComponentName;
```

## Testing Requirements

### Testing Philosophy

- **High Coverage**: Aim for 80%+ code coverage
- **User-Centric**: Test user interactions, not implementation details
- **Integration Over Unit**: Prefer integration tests over pure unit tests
- **Descriptive Names**: Test names should clearly describe what is being tested

### Test File Structure

Test files live in `src/__tests__/` with the same name as the component:
- Component: `src/components/Tasks.js`
- Test: `src/__tests__/Tasks.spec.js`

### Example Test

```javascript
import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { ProjectProvider } from '../context';
import Tasks from '../components/Tasks';

describe('Tasks Component', () => {
  it('renders task list', () => {
    render(
      <ProjectProvider>
        <Tasks />
      </ProjectProvider>
    );
    
    expect(screen.getByText(/my tasks/i)).toBeInTheDocument();
  });

  it('adds a new task when user submits form', async () => {
    render(
      <ProjectProvider>
        <Tasks />
      </ProjectProvider>
    );

    const input = screen.getByPlaceholderText(/add a new task/i);
    await userEvent.type(input, 'New task');
    fireEvent.click(screen.getByText(/add/i));

    expect(screen.getByText('New task')).toBeInTheDocument();
  });
});
```

### Running Tests

```bash
# Run all tests in watch mode
yarn test

# Run tests for a specific file
yarn test AddTask.spec.js

# Run tests with coverage
yarn test --coverage

# Run tests once (CI mode)
yarn test --watchAll=false
```

## Common Tasks

### Adding a New Component

1. Create the component file in `src/components/ComponentName.js`
2. Create a test file in `src/__tests__/ComponentName.spec.js`
3. Write tests first (TDD approach recommended)
4. Implement the component
5. Export from `src/components/index.js` if creating an index file
6. Use in parent components as needed

### Adding a New Hook

1. Create the hook in `src/hooks/useHookName.js`
2. Write tests for the hook in `src/__tests__/useHookName.spec.js`
3. Export from `src/hooks/index.js`
4. Document the hook's purpose and usage

### Modifying Context

1. Identify which context file needs modification (`projects-context.js`, etc.)
2. Update the provider and hook
3. Add/update tests for the context changes
4. Update any components using that context
5. Ensure backwards compatibility

### Updating Firebase Integration

1. Changes to Firebase queries go in `src/firebase.js`
2. Document any new queries or operations
3. Test Firebase operations with mock data
4. Update related tests
5. Consider performance implications

## Troubleshooting

### Common Issues

#### "Firebase configuration error"
- Ensure `src/firebase.js` exists and is properly configured
- Check that Firebase project has Firestore enabled
- Verify credentials are correct

#### "Tests failing after changes"
- Run `yarn test` to see which tests are failing
- Update snapshots if intentional changes were made: `yarn test -u`
- Check that new features have corresponding tests

#### "Port 3000 already in use"
```bash
# Use a different port
PORT=3001 yarn start

# Or kill the process on port 3000 (macOS/Linux)
lsof -ti:3000 | xargs kill -9
```

#### "node_modules issues"
```bash
# Clean install
rm -rf node_modules yarn.lock
yarn install
```

#### "Prettier/ESLint conflicts"
- Run `yarn format` if available in package.json
- Or manually format: `npx prettier --write .`
- Fix linting: `npx eslint src --fix`

### Getting Help

1. Check existing PRs and issues for similar problems
2. Review the React Testing Library documentation: https://testing-library.com/react
3. Firebase documentation: https://firebase.google.com/docs
4. React documentation: https://react.dev

## Accessibility (ARIA)

When adding new features, consider accessibility:

- Use semantic HTML (`<button>`, `<input>`, etc.)
- Add `aria-label` to icon-only buttons
- Ensure color contrasts meet WCAG standards
- Test with keyboard navigation
- Use `role` attributes appropriately

## Performance Considerations

1. **Memoization**: Use `React.memo` for expensive components
2. **Code Splitting**: Lazy load components if necessary
3. **Context Splitting**: Avoid putting all state in one context
4. **Firebase Queries**: Optimize Firestore queries to reduce reads
5. **Re-renders**: Profile components for unnecessary re-renders

## Resources

- [React Documentation](https://react.dev)
- [Firebase Documentation](https://firebase.google.com/docs)
- [React Testing Library](https://testing-library.com/react)
- [Jest Documentation](https://jestjs.io)
- [SCSS Documentation](https://sass-lang.com/documentation)
- [BEM Methodology](http://getbem.com)
