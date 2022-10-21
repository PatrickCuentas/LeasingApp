import { getAuth } from "firebase/auth";
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
	apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
	authDomain: "finanzas-app-c618a.firebaseapp.com",
	projectId: "finanzas-app-c618a",
	storageBucket: "finanzas-app-c618a.appspot.com",
	messagingSenderId: "883212115874",
	appId: "1:883212115874:web:33065f1b587810ac711cfb",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const database = getFirestore(app);

export {
	app,
	auth,
	database
}