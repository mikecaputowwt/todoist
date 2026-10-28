# Local Development Guide

## Project Overview

This is a Todoist clone application built with React (Custom Hooks, Context API), Firebase, and SCSS. Built on Create React App with comprehensive test coverage using React Testing Library and Jest.

## Prerequisites

- Node.js (v12 or higher)
- npm or yarn
- Firebase account and project

## Setup

### 1. Clone and Install

```bash
git clone https://github.com/mikecaputowwt/todoist.git
cd todoist
yarn install    # or: npm install
```

### 2. Firebase Configuration

1. Copy the example configuration: `cp src/firebase.js.example src/firebase.js`
2. Edit `src/firebase.js` with your Firebase credentials (apiKey, authDomain, projectId, etc.)
3. **Important**: `src/firebase.js` is in `.gitignore` - never commit real credentials

## Commands

**Start development server:**
```bash
yarn start      # or: npm start
```
Opens [http://localhost:3000](http://localhost:3000) with hot reload.

**Run tests:**
```bash
yarn test       # or: npm test
```
Interactive test runner with 90% coverage thresholds. Tests run in watch mode by default.

**Build for production:**
```bash
yarn build      # or: npm run build
```
Optimized build output to `build/` folder.

## Project Structure

- `src/components/` - React components (including `layout/` subdirectory)
- `src/context/` - Context providers
- `src/helpers/` - Utility functions
- `src/hooks/` - Custom hooks
- `src/__tests__/` - Jest test files
- `src/firebase.js.example` - Firebase config template

## More Information

See [README.md](../README.md) for additional details. Click the Pizza icon (top right) to enable dark mode!
