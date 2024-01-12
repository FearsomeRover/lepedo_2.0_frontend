import React from 'react'
import { signIn } from 'next-auth/react'

export default function LogIn() {
    const logInWithGoogle = () => {
        signIn('google', { callbackUrl: 'http://localhost:3000' })
    }

    return (
        <>
            <h2>Bejelentkezés</h2>
            <button onClick={logInWithGoogle}>Log In with Google</button>
        </>
    )
}
