# How to Set Up Firebase User Authentication
2025-02-20

Use StyledFirebaseAuth for style and firebase for authentication
Don't forget to import firebaseConfig in main.jsx

```{jsx}
import React from 'react';
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';
import { EmailAuthProvider, GoogleAuthProvider, getAuth, signInWithEmailAndPassword, onAuthStateChanged } from 'firebase/auth';

export const Login = () => {
    const configObj = {

        signInOptions: [
            {
            provider: EmailAuthProvider.PROVIDER_ID,
            requireDisplayName: true,
        },
        {
            provider: GoogleAuthProvider.PROVIDER_ID
        }
        ],
        signInFlow: 'popup',
        credentialHelper:'none',
        callbacks: {
            signInSuccessWithAuthResult: () => {
                
                return false; 
            },
        },
    };

    return (
        <div className='m-4 d-flex flex-column align-items-center justify-content-center vh-50'>
            <div className="mb-3">
                <h2 className="mb-2 text-center">Login</h2>
            </div>
            <StyledFirebaseAuth uiConfig={configObj} firebaseAuth={getAuth()} />
        </div>
    );
};
```