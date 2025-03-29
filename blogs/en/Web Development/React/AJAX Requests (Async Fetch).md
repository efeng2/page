# AJAX Requests (Async Fetch)
**2025-02-20**  

AJAX (Asynchronous JavaScript and XML) enables web applications to send and retrieve data asynchronously without interfering with the rest of the code execution.  

## HTML Form Example  
Here’s a basic form that submits data via AJAX:  

```html
<form role="form" method="GET" action="/signup">
  <label for="unameBox">Name:</label>
  <input type="text" name="username" id="unameBox">
  <button type="submit">Sign up!</button>
</form>
```

For dynamic requests (e.g., fetching GitHub repositories):  
```html
<form method="GET" action="https://api.github.com/search/repositories" onSubmit={handleSubmit}>
  <!-- Form inputs here -->
</form>
```

## JavaScript Fetch API Example  
Using `fetch` for asynchronous requests:  

```javascript
import "whatwg-fetch";

const handleSubmit = async (event) => {
  event.preventDefault();
  
  // Get input value
  const queryInput = document.getElementById("searchInput").value;
  const url = `https://api.github.com/search/repositories?q=${queryInput}`;
  
  console.log("Sending request to", url);

  // Using Promises (.then)
  fetch(url)
    .then(function(response) {
      return response.json();
    })
    .then(function(data) {
      console.log(data);
    });

  // Using async/await (modern approach)
  try {
    const response = await fetch(url);
    const dataObj = await response.json();
    console.log(dataObj);
    // Update state (e.g., React)
    setStateData(dataObj.items);
  } catch (error) {
    console.error("Fetch error:", error);
  }
};
```
