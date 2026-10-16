# Tags Feature Documentation

This document describes the implementation of the tags feature for the Todoist clone. The feature adds a tagging system to tasks, allowing users to organize and categorize their tasks with custom tags.

## Features

- **Tag Creation**: Create custom tags with names and colors
- **Tag Assignment**: Assign multiple tags when adding or editing tasks
- **Tag Display**: Visual representation of tags with colored badges
- **Tag Storage**: Tags stored as an array on each task document with a separate `tags` collection for tag definitions

## Implementation Details

### Data Structure

#### Tasks Collection (Modified)
Each task now includes a new `tags` field:
```javascript
{
  id: "task123",
  archived: false,
  projectId: "PROJECT_ID",
  task: "Buy groceries",
  date: "25/12/2023",
  userId: "jlIFXIwyAL3tzHMtzRbw",
  tags: ["urgent", "personal"]  // Array of tag IDs
}
```

#### Tags Collection (New)
A new collection that stores tag definitions:
```javascript
{
  id: "tag123",
  name: "urgent",
  color: "#ff5858",  // Hex color for visual distinction
  userId: "jlIFXIwyAL3tzHMtzRbw"
}
```

## New Components

### TagOverlay (`src/components/TagOverlay.js`)
- An overlay UI for selecting existing tags
- Adds functionality to create new tags inline
- Displays tags with colored indicators
- Toggles tag selection by clicking

### TagDisplay (`src/components/TagDisplay.js`)
- Displays tags as colored badges on tasks
- Shows tags inline with task text
- Responsive layout that wraps for multiple tags

## Context & Hooks

### Tags Context (`src/context/tags-context.js`)
- Manages global state for all tags
- Fetches tags from Firestore
- Provides tags data to all components via React context

### useTags Hook (`src/hooks/useTags.js`)
- Custom React hook for fetching tags from Firebase
- Returns current user's tags
- Real-time updates via Firestore listeners

## Modified Files

The following components have been updated:

1. **`src/components/AddTask.js`**
   - Added tag icon and overlay toggling
   - Integrates TagOverlay component
   - Saves tags array with task

2. **`src/components/Tasks.js`**
   - Displays tags for each task in list
   - Integrates TagDisplay component

3. **`src/context/index.js`**
   - Exports tags context and provider

4. **`src/hooks/index.js`**
   - Exports the useTags hook

5. **`src/App.js`**
   - Wraps app with TagsProvider

6. **`src/App.scss`**
   - Adds comprehensive styles for tag display, overlay, and color selection

## Configuration

### Firebase Setup

1. **Create Tags Collection**
   - Create a `tags` collection in your Firestore database
   - Each tag document should have: `name`, `color`, and `userId` fields

2. **Update Firebase Rules**
   Add security rules for the tags collection:
   ```javascript
   match /tags/{tagId} {
     allow read: if request.auth != null && request.auth.uid == resource.data.userId;
     allow write: if request.auth != null && request.auth.uid == request.resource.data.userId;
     allow delete: if request.auth != null && request.auth.uid == resource.data.userId;
   }
   ```

## Usage

### Creating a New Tag
1. Click the tag icon when adding a task
2. Click "Add new tag" at the bottom of the overlay
3. Enter tag name and select a color
4. Click "Add" to create the tag

### Assigning Tags to Tasks
1. Click the tag icon when adding/editing a task
2. Select one or more tags from the list
3. Selected tags will be highlighted
4. Tags will be saved with the task

### Viewing Tags
- Tags appear as colored badges below each task
- Tag colors help with visual organization
- Multiple tags are displayed horizontally

## Color Palette

The following colors are available for tags:
- Red: `#ff5858`
- Orange: `#ff9500`
- Yellow: `#ffd60a`
- Green: `#16a34a`
- Blue: `#3b82f6`
- Purple: `#a855f7`
- Pink: `#ec4899`
- Gray: `#6b7280`

## Future Enhancements

Potential improvements for the tags feature:
- Filter tasks by tags
- Bulk tag management (update multiple tasks at once)
- Tag search functionality
- Suggested tags based on usage frequency
- Tag sharing between users
- Export tasks by tag
- Tag groups/categories