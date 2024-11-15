import { useEffect, useState } from "react";
import { createContext } from "react";
import PropTypes from "prop-types"; // Importamos prop-types
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
//import { getAuth } from "firebase/auth";
import { auth } from "../firebase/firebase";
export const UserContext = createContext();

const UserProvider = (props) => {
  const [user, setUser] = useState(false);

  //con firebase
  const registerUser = (email, password) =>
    createUserWithEmailAndPassword(auth, email, password);

  //login con firebase

  const loginUser = (email, password) =>
    signInWithEmailAndPassword(auth, email, password);

  //cerrar sesion  con firebase

  const signOutUser = () => {
    signOut(auth);
  };

  //metodo para manterner el usuario presente

  useEffect(() => {
    const unsuscribe = onAuthStateChanged(auth, (user) => {
      console.log("user:_____________>", user);
      if (user) {
        const { email, photoURL, displayName, uid } = user;
        setUser({ email, photoURL, displayName, uid });
      } else {
        setUser(null);
      }
    });

    return () => unsuscribe();
  }, []);
  return (
    <UserContext.Provider
      value={{ user, setUser, registerUser, loginUser, signOutUser }}
    >
      {props.children}
    </UserContext.Provider>
  );
};
// Validación de las props
UserProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default UserProvider;