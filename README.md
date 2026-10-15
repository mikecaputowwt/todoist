## Building Todoist from Scratch Using React (Custom Hooks, Context), Firebase & React Testing Library (http://bit.ly/CognitiveSurge)

This application (a Todoist clone) was built using create-react-app as a base, and the technologies used were React (Custom Hooks, Context), Firebase & React Testing Library. I'm hoping this gives people a better understanding of React, and I've also included SCSS in this tutorial, but the main focus is to build a real application using React! If you clone this application, click the Pizza icon on the top right, it enables dark mode!

Subscribe to my YouTube channel here: http://bit.ly/CognitiveSurge where I build projects like this! And don't forget, you can contribute to this project (highly encouraged!). One thing I didn't get time to do was incorporate accessibility into this application, so I'd love to see that added!

![Preview](todoist-preview.png?raw=true)

## Local Setup

### Prerequisites

Before you begin, ensure you have the following installed on your machine:

- **Node.js** (version 12.x or higher) - [Download](https://nodejs.org/)
- **Yarn** or **npm** - Yarn is recommended for this project
- **Git** - [Download](https://git-scm.com/)
- A **Firebase account** - [Sign up free](https://firebase.google.com/)

### Installation Steps

1. **Clone the repository**
   ```bash
   git clone https://github.com/mikecaputowwt/todoist.git
   cd todoist
   ```

2. **Install dependencies**
   ```bash
   yarn install
   # or
   npm install
   ```

3. **Configure Firebase**
   - Copy the example Firebase configuration file:
     ```bash
     cp src/firebase.js.example src/firebase.js
     ```
   - Create a Firebase project at [Firebase Console](https://console.firebase.google.com/)
   - Enable Firestore Database in your Firebase project
   - Copy your Firebase configuration credentials
   - Update `src/firebase.js` with your Firebase project credentials:
     ```javascript
     const firebaseConfig = firebase.initializeApp({
       apiKey: "YOUR_API_KEY",
       authDomain: "YOUR_AUTH_DOMAIN",
       databaseURL: "YOUR_DATABASE_URL",
       projectId: "YOUR_PROJECT_ID",
       storageBucket: "YOUR_STORAGE_BUCKET",
       messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
       appId: "YOUR_APP_ID",
     });
     ```

### Running the Application

- **Start the development server:**
  ```bash
  yarn start
  # or
  npm start
  ```
  The application will open in your browser at `http://localhost:3000`

- **Run tests:**
  ```bash
  yarn test
  # or
  npm test
  ```
  This starts the test runner in interactive watch mode.

- **Build for production:**
  ```bash
  yarn build
  # or
  npm build
  ```
  Creates an optimized production build in the `build` folder.

### Features

- Create, read, update, and delete projects
- Create, read, update, and delete tasks
- Set task dates and organize by project
- Dark mode (click the Pizza icon in the top right)
- Real-time data persistence with Firebase Firestore
- Comprehensive test coverage with React Testing Library

### Project Structure

```
todoist/
├── public/              # Static files
├── src/
│   ├── components/      # React components
│   ├── context/         # Context API providers
│   ├── hooks/           # Custom React hooks
│   ├── helpers/         # Utility functions
│   ├── __tests__/       # Test files
│   ├── App.js           # Main App component
│   ├── App.scss         # App styles
│   ├── firebase.js      # Firebase configuration (create from example)
│   └── index.js         # Entry point
├── package.json         # Project dependencies and scripts
└── README.md            # This file
```

### Troubleshooting

- **Firebase configuration errors**: Ensure you've created a Firestore database in your Firebase project and that your credentials are correctly added to `src/firebase.js`
- **Port 3000 in use**: If port 3000 is already in use, you can specify a different port:
  ```bash
  PORT=3001 yarn start
  ```
- **Module not found errors**: Delete `node_modules` and reinstall:
  ```bash
  rm -rf node_modules
  yarn install
  ```
