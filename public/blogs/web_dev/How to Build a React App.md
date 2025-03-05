# How to Build a React App
2025-02-09

## Start New React Project
To start a new React project, use the following command:

```bash
npx create-next-app@latest
```
After running the above command, follow the on-screen instructions to set up your React app.

## Start Your App
Navigate to the project folder:

```bash
cd path/to/react

# set up react
npm create vite@latest . -- --template react 

npm install

# Run the server
npm run dev
```

# Basic React Setup
In your index.js file, you will typically import the necessary React libraries and create a root element for rendering:

```jsx
// src/main.jsx

import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './components/App';

// css file
import './css/styles.css';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
        <App />
);
```

## Components - Create Your Own Tags
React components are the building blocks of a React app. They allow you to define custom HTML tags. Each component should be capitalized.

Components are written in JSX
JSX - XML Syntax Extension
JSX is an extension of JavaScript that looks like HTML, but is actually JavaScript syntax. It is transpiled using Babel and Webpack.

```jsx
// src/components/HeaderComponent.jsx

// Define a function for the component, props are passed in
function HeaderComponent(props) {
    return (
        <div>
            <header>
                <h1>React Demo Header</h1>
            </header>
        </div>
    );
}

```

```jsx
// src/components/App.jsx

import React from 'react';
import { HeaderComponent } from './HeaderComponent.jsx';

function App() {
    return (
        <>
            <HeaderComponent />
        </>
    );
}
export default App;
```