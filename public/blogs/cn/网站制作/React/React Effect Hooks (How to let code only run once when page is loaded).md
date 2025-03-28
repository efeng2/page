# React Effect Hooks (How to let code only run once when page is loaded)
2025-02-20

Useful for async processes to not run infinitely!

import React, { useState,useEffect } from 'react';


useEffect(()=>{

console.log("in effect hook");

const url ="https://api.github.com/search/repositories?9="+queryInput;console.log("sending reguest to", url);

fetch(url)

.then(function(response){return response.json();

})

.then(function(data0bj){console.log(data0bj);setStateData(data0bj.items);

I

}，[currentUser])

//[currentUser] -> rerun whenever currentUser changes



Cleanup Function

import React,{useState,usEffect }from "react';

function MyComponent(props){//specify the effect hook functionuseEffect(()=>{

//...do persistent work,set up subscriptions, etc

//function to run when the Component is being removedconst cleanupFunc=function(){console.log("component being removed")

return cleanupFunc;//return function for React to call later}，[])

return(<div>...</div>)