# React Router for Single Page Applications (SPAs)
2025-02-02

## Introduction to React Router

React Router is the standard routing library for React applications that enables **single-page application (SPA)** behavior - where your app feels like it has multiple pages but actually doesn't reload the browser.

### Key Benefits:
- **No page reloads** (smoother user experience)
- **Preserved application state** between "page" changes
- **SEO-friendly** URL structures
- **Programmatic navigation** capabilities

## Installation

```bash
npm install react-router-dom
```

Official Documentation: [https://reactrouter.com/](https://reactrouter.com/)

## Basic Setup

### 1. Wrap Your App with BrowserRouter

In your `index.js` or main entry file:

```jsx
import { BrowserRouter } from 'react-router-dom';
import App from './App';

root.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>
);
```

### 2. Define Routes in Your App

```jsx
import { Routes, Route } from 'react-router-dom';

function App() {
  return (
    <>
      <Nav />
      <Routes>
        <Route 
          path="chat" 
          element={<ChatPage 
            currentUser={currentUser} 
            messageArray={messageArray} 
            addMessageFunction={addMessageFunction}
          />} 
        />
        <Route path="about" element={<Static.AboutPage />} />
        <Route 
          path="sign-in" 
          element={<SignInPage 
            currentUser={currentUser} 
            changeUserFunction={changeUser}
          />} 
        />
        <Route path="*" element={<Static.ErrorPage />} />
      </Routes>
    </>
  );
}
```