import {
	createUserWithEmailAndPassword,
	EmailAuthProvider,
	reauthenticateWithCredential,
	signInWithEmailAndPassword,
	updateEmail,
	updatePassword,
	updateProfile,
} from "firebase/auth";
import { auth, database } from "./firebaseConfig";
import Swal from "sweetalert2";
import { doc, setDoc } from "firebase/firestore";

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
		}
	}
};

const loginUserWithEmailAndPassword = async (
	email: string,
	password: string
) => {
	try {
		await signInWithEmailAndPassword(auth, email, password);
		return true
	} catch (error: any) {
		const errorMessage = error.message;
		Swal.fire({
			icon: "error",
			title: "Iniciar sesión",
			text: errorMessage,
		});
		return false
	}
};

const registerUserWithEmailAndPassword = async (
	fullname: string,
	email: string,
	password: string
) => {
	try {
		const credential = await createUserWithEmailAndPassword(auth, email, password)

		if (credential && credential.user) {
			await setDoc(doc(database, "users", credential.user.uid), {
				fullname: fullname,
				email: email,
				uid: credential.user.uid,
			});
		}

		if (auth.currentUser !== null) {
			await updateProfile(auth.currentUser, { displayName: fullname })
		}
		return true;
	} catch (error: any) {
		const errorMessage = error.message;
		Swal.fire({
			icon: "error",
			title: "Oops...",
			text: errorMessage,
		});
		return false
	}
};

// exportar funciones
export const FirebaseService = {
	loginUserWithEmailAndPassword,
	registerUserWithEmailAndPassword,
	updateUserProfile
};
