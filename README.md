## Building Todoist from Scratch Using React (Custom Hooks, Context), Firebase & React Testing Library (http://bit.ly/CognitiveSurge)

This application (a Todoist clone) was built using create-react-app as a base, and the technologies used were React (Custom Hooks, Context), Firebase & React Testing Library. I'm hoping this gives people a better understanding of React, and I've also included SCSS in this tutorial, but the main focus is to build a real application using React! If you clone this application, click the Pizza icon on the top right, it enables dark mode!

Subscribe to my YouTube channel here: http://bit.ly/CognitiveSurge where I build projects like this! And don't forget, you can contribute to this project (highly encouraged!). One thing I didn't get time to do was incorporate accessibility into this application, so I'd love to see that added!

![Preview](todoist-preview.png?raw=true)

## Contributing

We welcome contributions to this project! Follow the steps below to set up the Todoist app locally for development.

### Prerequisites

Before you begin, make sure you have the following installed:

- **Node.js** (version 12 or higher)
- **npm** (comes with Node.js) or **Yarn**
- A **Firebase project** with Firestore enabled

### Firebase Setup

This application uses Firebase for data storage. You'll need to create your own Firebase project and configure the credentials:

1. Go to the [Firebase Console](https://console.firebase.google.com/)
2. Create a new project (or use an existing one)
3. Enable **Firestore Database** in your Firebase project
4. Go to Project Settings > General > Your apps
5. Click "Add app" and select the web platform (</>) if you haven't already
6. Copy your Firebase configuration object (apiKey, authDomain, projectId, etc.)

### Local Setup

Follow these steps to get the app running on your local machine:

1. **Clone the repository**

```bash
git clone https://github.com/mikecaputowwt/todoist.git
cd todoist
```

2. **Install dependencies**

Using npm:
```bash
npm install
```

Or using Yarn:
```bash
yarn install
```

3. **Configure Firebase credentials**

Create your Firebase configuration file by copying the example:

```bash
cp src/firebase.js.example src/firebase.js
```

Open `src/firebase.js` and add your Firebase credentials from the Firebase Console:

```javascript
import firebase from "firebase/app";
import "firebase/firestore";

const firebaseConfig = firebase.initializeApp({
  apiKey: "",
  authDomain: "",
  databaseURL: "",
  projectId: "",
  storageBucket: "",
  messagingSenderId: "",
  appId: "",
});

export { firebaseConfig as firebase };
```

**Important:** The `src/firebase.js` file is already in `.gitignore` and will not be committed to version control. This keeps your Firebase credentials secure.

### Running the App

Once you've completed the setup, you can use the following commands:

#### Start the development server

Using npm:
```bash
npm start
```

Or using Yarn:
```bash
yarn start
```

The app will open in your browser at [http://localhost:3000](http://localhost:3000).

#### Run tests

Using npm:
```bash
npm test
```

Or using Yarn:
```bash
yarn test
```

Tests run in watch mode by default.

#### Build for production

Using npm:
```bash
npm run build
```

Or using Yarn:
```bash
yarn build
```

This creates an optimized production build in the `build/` directory.

### Development Tools

This project includes several development tools to maintain code quality:

- **ESLint**: Configured with Airbnb style guide and Prettier integration
- **Prettier**: Code formatting rules defined in `.prettierrc.json`
- **React Testing Library**: For component testing with high coverage requirements (90%)

The project is configured with `SKIP_PREFLIGHT_CHECK=true` in `.env` to avoid dependency conflicts.

### Project Structure

```
todoist/
├── public/           # Static files
├── src/
│   ├── components/   # React components
│   ├── context/      # React Context providers
│   ├── helpers/      # Utility functions
│   ├── hooks/        # Custom React hooks
│   ├── __tests__/    # Component tests
│   └── App.js        # Main application component
└── package.json      # Dependencies and scripts
```

### Need Help?

If you have questions or run into issues, please open an issue on GitHub. We're here to help!
