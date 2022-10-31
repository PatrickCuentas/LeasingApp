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
				title: 'Para actualizar tus credenciales debes ingresar tu contraseña actual para confirmar tu identidad',
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
		let errorMessage = "";

		switch (error.message) {
			case "Firebase: Error (auth/user-not-found).":
				errorMessage = "El usuario no existe";
				break;
			case "Firebase: Error (auth/wrong-password).":
				errorMessage = "Contraseña incorrecta";
				break;
			case "Firebase: Error (auth/invalid-email).":
				errorMessage = "El email no es válido";
				break;
			case "Firebase: Error (auth/too-many-requests).":
				errorMessage = "Demasiados intentos fallidos, intenta más tarde";
				break;
			case "Firebase: Error (auth/user-disabled).":
				errorMessage = "El usuario ha sido deshabilitado";
				break;
			case "Firebase: Error (auth/operation-not-allowed).":
				errorMessage = "El inicio de sesión con email y contraseña no está habilitado";
				break
			case "Firebase: Error (auth/network-request-failed).":
				errorMessage = "No hay conexión a internet";
				break
			case "Firebase: Error (auth/weak-password).":
				errorMessage = "La contraseña debe tener al menos 6 caracteres";
				break
			case "Firebase: Error (auth/email-already-in-use).":
				errorMessage = "El email ya está en uso";
				break
		}

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
				leasings: [],
				uid: credential.user.uid,
			});
		}

		if (auth.currentUser !== null) {
			await updateProfile(auth.currentUser, { displayName: fullname })
		}
		return true;
	} catch (error: any) {
		let errorMessage = "";

		switch (error.message) {
			case "Firebase: Error (auth/email-already-in-use).":
				errorMessage = "El correo ya está en uso"
				break;
			case "Firebase: Error (auth/invalid-email).":
				errorMessage = "El correo no es válido"
				break;
			case "Firebase: Error (auth/operation-not-allowed).":
				errorMessage = "Operación no permitida"
				break;
			case "Firebase: Error (auth/weak-password).":
				errorMessage = "La contraseña debe tener al menos 6 caracteres"
				break;
			case "Firebase: Error (auth/too-many-requests).":
				errorMessage = "Demasiados intentos, intenta más tarde"
				break
			case "Firebase: Error (auth/invalid-credential).":
				errorMessage = "Credenciales inválidas"
				break
			case "Firebase: Error (auth/user-disabled).":
				errorMessage = "El usuario ha sido deshabilitado"
				break
			case "Firebase: Error (auth/user-not-found).":
				errorMessage = "El usuario no existe"
				break
			case "Firebase: Error (auth/wrong-password).":
				errorMessage = "Contraseña incorrecta"
				break
			case "Firebase: Error (auth/invalid-verification-code).":
				errorMessage = "Código de verificación inválido"
				break
			case "Firebase: Error (auth/invalid-verification-id).":
				errorMessage = "ID de verificación inválido"
				break
			case "Firebase: Error (auth/missing-verification-code).":
				errorMessage = "Código de verificación faltante"
				break
			default:
				errorMessage = "Error al crear la cuenta"
		}

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
