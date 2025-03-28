# Firebase Realtime Database
2025-02-20

 Config with React

Web backend solution

Web Hosting

Databases

User Authentication

firebase.google.com

console.firebase.google.com



- Project Overview

  - Web

    Register app

    Add Firebase SDK

    - npm install firebase

    - Copy initialization to index.js after imports 

- Build

Realtime Database

rules

locked mode

test mode

read: who's allowed to read it/ when

write: who's allowed to write it/ when

Database

Default Null

Add key value pairs



Adding to database

import { getDatabase,ref,set as firebaseSet, push asfirebasePush, onValue } from "firebase/database'



//add into firebase

const db= getDatabase();

console.log(db);

const messageRef = ref(db,"message")//addressconstfirstNameRef = ref(db,"name/first")const multiSegRef= ref(db, "path/to/data");const allMessagesRef =ref(db,"allMessages")//address

console.log(messageRef);

//firebaseSet(messageRef, newMessage0bj);firebasePush(allMessagesRef,newMessage0bj);



// Add 

useEffect(()=>{

//subscribe to the database

const db = getDatabase();const allMessagesRef =ref(db,"allMessages")//address

//addEventListener("firebase value change', function)onValue(allMessagesRef,(snapshot)二>const data0bj= snapshot.val();console.log(data0bj);//is an {}

const keyArray =0bject.keys(data0bj);console.log(keyArray);//['','",""const dataArray = keyArray.map((keyString)=>{const transformed = data0bj[keyString]; //get valueat that key

return transformed; //put into new array

4)

console.log(dataArray);

setMsgStateArray(dataArray);//needs to be an [{},{},()]});



Authentication

Sign-in methods: Providers - enable

Because Google added security features in 2023, When development, Go to Firebase Auth settings, user actions, disable email enumeration protection

FirebaseUI library

//import auth functions and variables from Firebase

import { getAuth, EmailAuthProvider, GoogleAuthProvider } from 'firebase/auth'



//import the component -- pick one!

import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth'; //install option 1

import StyledFirebaseAuth from './StyledFirebaseAuth'; //install option 2



//an object of configuration values

const firebaseUIConfig = {

  signInOptions: [ //array of sign in options supported

    //array can include just "Provider IDs", or objects with the IDs and options

    GoogleAuthProvider.PROVIDER_ID,

    { provider: EmailAuthProvider.PROVIDER_ID, requiredDisplayName: true },

  ],

  signInFlow: 'popup', //don't redirect to authenticate

  credentialHelper: 'none', //don't show the email account chooser

  callbacks: { //"lifecycle" callbacks

    signInSuccessWithAuthResult: () => {

      return false; //don't redirect after authentication

    }

  }

}



//the React compnent to render

function MySignInScreen() {



  const auth = getAuth(); //access the "authenticator"



  return (

    <div>

      <h1>My App</h1>

      <p>Please sign-in:</p>

      <StyledFirebaseAuth uiConfig={firebaseUIConfig} firebaseAuth={auth} />

    </div>

  );

}

