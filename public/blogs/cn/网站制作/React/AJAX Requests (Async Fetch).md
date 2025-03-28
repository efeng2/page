# AJAX Requests (Async Fetch)
2025-02-20

AJAX is

 Asynchronous -> simultaneously with rest of code



<form role="form" method="GET"" action="/signup"'>

<label for="unameBox''>Name:</label><input type="text"'name="username" id="unameBox''>

<button type="submit'>Sign up!</button>

</form>



<form method="GET" action="https://api.github.com/search/repositories" onSubmit={handleSubmit}



XML(json)

index.js

import "whatwg-fetch"



const handleSubmit = async(event)event.preventDefault();

//do something with form input!//send the requestconst url="https://api.github.com/search/repositories?9="+queryInput;console.log("sending request to",url);

//addEventListener('buzzer goes off', callback)// fetch(url)

.then(function(response){return response.json();子)

2>>>2>

.then(function(data)

console.log(data);子)

try {

const response =await fetch(url);

const data0bj= await response.json();

console.log(data0bj);

setStateData(data0bj.items