import {
	createUserWithEmailAndPassword,
	EmailAuthProvider,
	reauthenticateWithCredential,
	signInWithEmailAndPassword,
	updateEmail,
	updatePassword,
	updateProfile,
} from "firebase/auth";
import { auth } from "./firebaseConfig";
import Swal from "sweetalert2";

// if (user !== null) {
// The user object has basic properties such as display name, email, etc.
// 	const displayName = user.displayName;
// 	const email = user.email;
// 	const photoURL = user.photoURL;
// 	const emailVerified = user.emailVerified;

// The user's ID, unique to the Firebase project. Do NOT use
// this value to authenticate with your backend server, if
// you have one. Use User.getToken() instead.
// 	const uid = user.uid;
// }

const updateUserProfile = async (displayName: string, email: string, password: string) => {

	const user = auth.currentUser

	try {
		if (user !== null) {
			await updateProfile(user, { displayName: displayName });
			await updateEmail(user, email);
			await updatePassword(user, password);
		}
		Swal.fire({
			icon: "success",
			title: "Mi perfil",
			text: "Credenciales actualizadas",
		});
		return true
	} catch (error: any) {
		const errorMessage = error.message;
		console.log(errorMessage)

		if (errorMessage === 'Firebase: Error (auth/requires-recent-login).' && user !== null) {
			Swal.fire({
				title: 'Ha pasado mucho tiempo desde que iniciaste sesión, por favor ingresa de nuevo tu contraseña',
				input: 'text',
				inputAttributes: {
					autocapitalize: 'off'
				},
				showCancelButton: true,
				confirmButtonText: 'Enviar',
				showLoaderOnConfirm: true,
				preConfirm: async (password) => {

					try {

						const authCredential = EmailAuthProvider.credential(user.email as string, password);
						await reauthenticateWithCredential(user, authCredential);

						Swal.fire({
							icon: "success",
							title: "Reautenticacion correcta",
							text: "Ahora puedes actualizar tu perfil",
						});

					} catch (err: any) {
						Swal.fire({
							icon: "error",
							title: "Oops...",
							text: "Contraseña incorrecta"
						});
					}
				},
				allowOutsideClick: () => !Swal.isLoading()
			})
		}
		else {
			Swal.fire({
				icon: "error",
				title: "Oops...",
				text: errorMessage,
			});
			console.log(error);
		}
	}
};

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
			title: "Iniciar sesión",
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
	updateUserProfile
};
