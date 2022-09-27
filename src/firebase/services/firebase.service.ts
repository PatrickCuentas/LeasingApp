import { getAuth, signInWithEmailAndPassword } from "firebase/auth";

const auth = getAuth();

type UserCredentials = {
  email: string;
  password: string;
};

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

// exportar funciones
export const FirebaseService = { loginUserWithEmailAndPassword };
