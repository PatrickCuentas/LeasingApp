import { IAuthLoginErrors, IAuthRegisterErrors } from "lib/@auth/interfaces/Auth";

function validateEmail(email: string) {
	const re = /\S+@\S+\.\S+/;
	return re.test(email);
}

function validatePassword(password: string) {
	return password.length > 6;
}

export function getAuthLoginErrors(
	email: string,
	password: string
): IAuthLoginErrors {
	if (email === "" && password === "") {
		return {
			email: {
				error: email === "" ? true : false,
				message: email === "" ? "Correo es requerido" : "",
			},
			password: {
				error: password === "" ? true : false,
				message: password === "" ? "Contraseña es requerida" : "",
			},
		};
	} else if (email === "") {
		return {
			email: {
				error: true,
				message: "Correo es requerido",
			},
			password: {
				error: false,
				message: "",
			},
		};
	} else if (password === "") {
		return {
			email: {
				error: false,
				message: "",
			},
			password: {
				error: true,
				message: "Contraseña es requerida",
			},
		};
	} else {
		return {
			email: {
				error: false,
				message: "",
			},
			password: {
				error: false,
				message: "",
			},
		};
	}
}

export function getAuthRegisterErrors(
	email: string,
	password: string,
	confirmPassword: string
): IAuthRegisterErrors {
	if (email === "" && password === "" && confirmPassword === "") {
		return {
			email: {
				error: email === "" ? true : false,
				message: email === "" ? "Correo es requerido" : "",
			},
			password: {
				error: password === "" ? true : false,
				message: password === "" ? "Contraseña es requerida" : "",
			},
			confirmPassword: {
				error: confirmPassword === "" ? true : false,
				message: confirmPassword === "" ? "Contraseña es requerida" : "",
			},
		};
	} else if (email === "") {
		return {
			email: {
				error: true,
				message: "Correo es requerido",
			},
			password: {
				error: false,
				message: "",
			},
			confirmPassword: {
				error: false,
				message: "",
			},
		};
	} else if (password === "") {
		return {
			email: {
				error: false,
				message: "",
			},
			password: {
				error: true,
				message: "Contraseña es requerida",
			},
			confirmPassword: {
				error: false,
				message: "",
			},
		};
	} else if (confirmPassword === "") {
		return {
			email: {
				error: false,
				message: "",
			},
			password: {
				error: false,
				message: "",
			},
			confirmPassword: {
				error: true,
				message: "Contraseña es requerida",
			},
		};
	} else if (password !== confirmPassword) {
		return {
			email: {
				error: false,
				message: "",
			},
			password: {
				error: true,
				message: "Las contraseñas no coinciden",
			},
			confirmPassword: {
				error: true,
				message: "Las contraseñas no coinciden",
			},
		};
	} else {
		if (!validateEmail(email)) {
			return {
				email: {
					error: true,
					message: "Email invalido",
				},
				password: {
					error: false,
					message: "",
				},
				confirmPassword: {
					error: false,
					message: "",
				},
			};
		} else if (!validatePassword(password)) {
			return {
				email: {
					error: false,
					message: "",
				},
				password: {
					error: true,
					message: "La contraseña debe tener al menos 6 caracteres",
				},
				confirmPassword: {
					error: false,
					message: "",
				},
			};
		} else if (!validatePassword(confirmPassword)) {
			return {
				email: {
					error: false,
					message: "",
				},
				password: {
					error: false,
					message: "",
				},
				confirmPassword: {
					error: true,
					message: "La contraseña debe tener al menos 6 caracteres",
				},
			};
		}


		return {
			email: {
				error: false,
				message: "",
			},
			password: {
				error: false,
				message: "",
			},
			confirmPassword: {
				error: false,
				message: "",
			},
		};
	}
}
