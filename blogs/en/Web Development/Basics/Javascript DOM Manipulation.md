# Javascript DOM Manipulation
2025-02-03

 Document Object Model (Elements Tab)

Javascript manipulate html

Refeerencing Elements

element = document.querySelector("css_selector");

element.textContent = 'text';

element.classList.add('class');

element.classList.remove('class');



//Create

const element = document.createElement('tag');

parent.appendChild(element);



Event Listener

const button= document.querySelector('button');

button.addEventListener('click' , function(event) {

console.log("you clicked on", event.target);

});



State variables

JS Web App Structure

Data state -> dynamic content render

rerender when updated



//define data

const data = {

}



//define presentation

function renderData(){

for(let datum of state.data){

const dataCardElement =renderDataCard(datum);

document.querySelector('#main').appendChild(dataCardElement);



//define user interaction

button.addEventListener('click',function(event){

state.datali]=..;

document.querySelector('#main').innerHTML =''; //clear

renderData():

})



Form Data 

const formElement=document.querySelector('#myForm');

//listen for submit eventsformElement.addEventListener('submit',function(event){//stop normal behavior(going to a new site)

event.preventDefault();

const inputElement = document.querySelector('#name-input')

const userValue =inputElement.value;

});



Arrow Functions

Block body

const foo = (params) => {

return num*2

}

array.map((num) => {

return num*2

}

# Super sort ver (don't use)

() => console.log()

}



Destructuring

myArray = [1, 2, 3];

const [x, y, z] = myArray;