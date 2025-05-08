# How to Use React Effect Hooks
2025-02-20

## What are effect hooks
Effect hooks only run once when a page loads.

They are particularly useful for async processes to prevent infinite execution loops.

---

## Basic useEffect Syntax

```jsx
import React, { useState, useEffect } from 'react';

function ExampleComponent() {
  const [data, setData] = useState(null);
  const [queryInput, setQueryInput] = useState('react');

  useEffect(() => {
    console.log("Effect hook triggered");
    
    const url = `https://api.github.com/search/repositories?q=${queryInput}`;
    console.log("Sending request to", url);

    fetch(url)
      .then(response => response.json())
      .then(dataObj => {
        console.log(dataObj);
        setData(dataObj.items);
      });
  }, [queryInput]); // Dependency array - effect reruns when queryInput changes

  return (
    <div>
      {/* Render your data here */}
    </div>
  );
}
```

## Only Running Once (Empty Dependency Array)

```jsx
useEffect(() => {
  // This code will run only once when component mounts
  console.log("Component mounted");
  
  // Fetch initial data
  fetchInitialData();
  
}, []); // Empty array means run only once
```

## Cleanup Functions
Cleanup functions handle resource cleanup, prevent memory leaks, and manages states (clear event listeners, timers, aborts request)

```jsx
import React, { useState, useEffect } from "react";

function MyComponent(props) {
  useEffect(() => {
    console.log("Setting up subscriptions or event listeners");
    
    // Cleanup function
    return function() {
      console.log("Component unmounting - cleaning up");
      // Remove subscriptions, event listeners, etc.
    };
  }, []);

  return <div>My Component Content</div>;
}
```

## Key Points:
1. **Dependency Array** controls when the effect runs:
   - `[]` - Runs only on mount
   - `[var1, var2]` - Runs when those variables change
   - No array - Runs after every render

2. **Cleanup Functions** are essential for:
   - Removing event listeners
   - Cancelling API requests
   - Clearing timeouts/intervals
   - Other resource cleanup

3. **Async Patterns**:
   - Either use `.then()` chains inside useEffect
   - Or declare an async function inside the effect and call it
