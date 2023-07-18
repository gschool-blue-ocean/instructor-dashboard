import React, { useContext, useEffect, useState } from "react";
import { createContext } from "react";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  sendEmailVerification,
  sendPasswordResetEmail,
} from "firebase/auth";
import { auth, db } from "../../Firebase.js";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";

const UserContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const [user, setUser] = useState({});
  const [role, setRole] = useState("");
  const navigate = useNavigate();
  const [isUserNew, setIsUserNew] = useState(false);
  const [hasJustVerified, setHasJustVerified] = useState(false);

  const getUserRole = async (uid) => {
    const docRef = doc(db, "users", uid);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      return docSnap.data().role;
    } else {
      console.error("No such document!");
      return null;
    }
  };

  const createUser = (email, password, role = "student") => {
    return createUserWithEmailAndPassword(auth, email, password).then(
      (response) => {
        const uid = response.user.uid;
        setIsUserNew(true);
        navigate("/");

        const actionCodeSettings = {
          url: "http://localhost:3000/login",
        };

        sendEmailVerification(response.user, actionCodeSettings)
          .then(() => {
            console.log("Verification email sent");
            navigate("/");
          })
          .catch((error) => {
            console.log("Error sending verification email", error);
          });

        return setDoc(doc(db, "users", uid), { role });
      }
    );
  };

  const signIn = (email, password) => {
    setHasJustVerified(false);
    return signInWithEmailAndPassword(auth, email, password);
  };

  const logout = () => {
    return signOut(auth);
  };

  const sendResetPasswordEmail = (email) => {
    return sendPasswordResetEmail(auth, email);
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      console.log(currentUser);
      setIsUserNew(false);
      if (currentUser) {
        const docRef = doc(db, "users", currentUser.uid);
        const docSnap = await getDoc(docRef);
        const role = docSnap.exists() ? docSnap.data().role : null;
        setUser({ ...currentUser, role });
        if (currentUser.emailVerified && !hasJustVerified) {
          if (role === "instructor") {
            navigate("/instructoroverview");
          } else if (role === "student") {
            navigate("/studentoverview");
          }
        } else {
          setHasJustVerified(true);
          navigate("/");
        }
      } else {
        setUser(null);
      }
    });
    return () => {
      unsubscribe();
    };
  }, [navigate]);
  return (
    <UserContext.Provider
      value={{
        createUser,
        user,
        logout,
        signIn,
        role,
        isUserNew,
        sendResetPasswordEmail,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export const UserAuth = () => {
  return useContext(UserContext);
};

export const useRole = () => {
  const { user } = useContext(UserContext);
  return user?.role;
};
