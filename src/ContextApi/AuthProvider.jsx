import React, { useEffect, useState } from "react";
import {
  createUserWithEmailAndPassword,
  getAuth,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { Authcontext } from "./AuthContext";
import { app } from "../Firebase/firebase.config";

const auth = getAuth(app);

const AuthProvider = ({ children }) => {
  const [user, setuser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [token, settoken] = useState(null);
  console.log(user);

  const SignInFunc = (email, password) => {
    return createUserWithEmailAndPassword(auth, email, password);
  };

  const LogInFunc = (email, password) => {
    return signInWithEmailAndPassword(auth, email, password);
  };
  const LogOutFunc = () => {
    return signOut(auth);
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (curUser) => {
      setuser(curUser);
      setLoading(false);
      if (curUser) {
        const token = await curUser.getIdToken();
        settoken(token);
      } else {
        settoken(null);
      }
    });
    return () => {
      unsubscribe();
    };
  }, []);

  const AuthData = {
    auth,
    user,
    SignInFunc,
    LogInFunc,
    loading,
    LogOutFunc,
    token,
  };
  return <Authcontext value={AuthData}>{children}</Authcontext>;
};

export default AuthProvider;
