# React Router for Single Page Apps

Single page acting as Multiple pages

npm install react-router-dom

Documentation: https://reactrouter.com/

App.jsx

import { Routes, Route } from 'react-router-dom'

return (

<>

<Nav />

<Routes>

  <Route path="Chat" element={ChatPage currentUser={currentUser} messageArray={messageArray} addMessageFunction={addMessageFunction}/>} />

  <Route path="about" element={<Static.AboutPage />} />

  <Route path="sign-in" element={<SignInPage currentUser={currentUser} changeUserFunction={changeUser}/>} />

 <Route path="*" element={ <Static.ErrorPage />} />

</Routes>

</>

)



index.js

import { BrowserRouter } from 'react-router-dom'

root.render(

<BroswerRouter>

<App />

</BroswerRouter>

)



For no reloading

import { Link } from 'react-router-dom'

a -> link

URL Structure: /products/hat



Protect Routes

function RequireAuth(props){//...determine if user is logged inif(!userIsLoggedIn){//if no user, say soreturn <p>Forbidden!</p>

else{//othewise,

show the child route content

return <Outlet />

function App(props){return (<Routes>{/* protected routes */}<Route element={<RequireAuth />}><Route path="profile" element={<ProfilePage />} /><Route path="secret"element={<SecretPage />}/></Route>{/* public routes */}<Route path="signin" element={<SignInPage />} /></Routes>



URL Parameters

/users/:username?

? - can have or not have

function App(props){return(<Routes>

<Route path="posts/:postId" element={<BlogPost />} /></Routes>

);

import {useParams }from "react-router-dom';

function BlogPost(props){const urlParams =useParams();//access the URl params as an objectconst postId = urlParams.postId; //can use destructuring instead

return({/* postId was the URL parameter from above! */}<h1>You are looking at blog post {urlParams.postId}</h1>



ChatPage.jsx

import { useParams } from 'react-router-dom'

const result = useParams(); // get :username