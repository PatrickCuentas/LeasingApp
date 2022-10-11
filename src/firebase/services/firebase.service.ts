import {
	createUserWithEmailAndPassword,
	signInWithEmailAndPassword,
	updateProfile,
} from "firebase/auth";
import { auth } from "../../firebase";
import Swal from "sweetalert2";

const loginUserWithEmailAndPassword = async (
	email: string,
	password: string
) => {
	try {
		const res = await signInWithEmailAndPassword(auth, email, password);
		console.log(res);
		return true
	} catch (error: any) {
		const errorMessage = error.message;
		Swal.fire({
			icon: "error",
			title: "Oops...",
			text: errorMessage,
		});
		console.log(error);
		return false
	}
};

const registerUserWithEmailAndPassword = async (
	fullname: string,
	email: string,
	password: string
) => {
	try {
		const res = await createUserWithEmailAndPassword(auth, email, password);
		if (auth.currentUser !== null) {
			await updateProfile(auth.currentUser, { displayName: fullname })
		}
		console.log(res);
		return true;
	} catch (error: any) {
		const errorMessage = error.message;
		Swal.fire({
			icon: "error",
			title: "Oops...",
			text: errorMessage,
		});
		console.log(error);
		return false
	}
};

// exportar funciones
export const FirebaseService = {
	loginUserWithEmailAndPassword,
	registerUserWithEmailAndPassword,
};
