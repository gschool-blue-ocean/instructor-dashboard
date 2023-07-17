import React, { useContext, useEffect, useState } from "react";
import { createContext } from "react";
import {
	createUserWithEmailAndPassword,
	signInWithEmailAndPassword,
	signOut,
	onAuthStateChanged,
} from "firebase/auth";
import { auth, db } from "../../Firebase.js";
import { doc, getDoc, setDoc } from "firebase/firestore";

const UserContext = createContext();

export const AuthContextProvider = ({ children }) => {
	const [user, setUser] = useState({});
	const [role, setRole] = useState("");

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
				return setDoc(doc(db, "users", uid), { role });
			}
		);
	};

	const signIn = (email, password) => {
		return signInWithEmailAndPassword(auth, email, password);
	};

	const logout = () => {
		return signOut(auth);
	};

	useEffect(() => {
		const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
			console.log(currentUser);
			if (currentUser) {
				const docRef = doc(db, "users", currentUser.uid);
				const docSnap = await getDoc(docRef);
				const role = docSnap.exists() ? docSnap.data().role : null;
				setUser({ ...currentUser, role });
			} else {
				setUser(null);
			}
		});
		return () => {
			unsubscribe();
		};
	}, []);
	return (
		<UserContext.Provider value={{ createUser, user, logout, signIn, role }}>
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
