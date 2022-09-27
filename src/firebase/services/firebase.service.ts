import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import { auth } from "../../firebase";

// login with firebase auth
const loginUserWithEmailAndPassword = async (
  email: string,
  password: string
) => {
  // basic client side auth // firebase login functionality
  try {
    const res = await signInWithEmailAndPassword(auth, email, password);
    console.log(res); // add alert for success // add ui functionalities on successful login
  } catch (error) {
    console.log(error); // add alert for error
  }
};

// register with firebase auth
const registerUserWithEmailAndPassword = async (
  fullname: string,
  email: string,
  password: string
) => {
  // basic client side auth // firebase register functionality
  try {
    const res = await createUserWithEmailAndPassword(auth, email, password);
    if (auth.currentUser !== null) {
      await updateProfile(auth.currentUser, { displayName: fullname }).catch(
        (err) => console.log(err)
      );
    }
    console.log(res); // add alert for success // add ui functionalities on successful register
  } catch (error) {
    console.log(error); // add alert for error
  }
};

// exportar funciones
export const FirebaseService = {
  loginUserWithEmailAndPassword,
  registerUserWithEmailAndPassword,
};
