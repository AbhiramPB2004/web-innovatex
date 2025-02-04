import React, { useContext } from 'react'
import { useState } from 'react'
import { AuthContext } from '../Authentication/context'

const Profile = () => {

  const {user, signIn, signOut} = useContext(AuthContext);

  const handleGoogleSignIn = async () => {
    try {
      if (user === null) {
        const result = await signInWithPopup(auth, provider);
        const user = result.user;
        console.log("User Info:", user);
        signIn(user);
      }
    } catch (error) {
      console.error("Error during sign-in:", error.message);
    }
  };

  return (
    <div>
      <h1>Profile</h1>
      <h2>{user.displayName}</h2>
      <h2>{user.email}</h2>
    </div>
  )
}

export default Profile