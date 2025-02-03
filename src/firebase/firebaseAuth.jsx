import auth from "./firebase";
import {useEffect, useState} from "react";
import { onAuthStateChanged } from "firebase/auth";
import { GoogleAuthProvider } from "firebase/auth/web-extension";

export const DosinginWithGoogle = async () => {
    const provider = new GoogleAuthProvider();
    const result = await auth.signInWithPopup(auth, provider);
    return result;
}

export const SignOput = async () => {
    const result = await auth.signOut(auth);
    return result;
}
