import { LeasingEntryProps } from "lib/@core/interfaces/leasing";
import { auth, database as db } from "lib/@auth/firebase/firebaseConfig";
import { arrayUnion, getDoc, updateDoc, collection, doc, getDocs, query, where } from "firebase/firestore";
import uuid4 from "uuid4";
import Swal from "sweetalert2";

const loadUserDocumentFromFirestore = async () => {
	const q = query(
		collection(db, "users"),
		where("uid", "==", auth?.currentUser?.uid)
	);
	let data = {};

	const querySnapshot = await getDocs(q);
	querySnapshot.forEach((doc) => {
		data = doc.data();
	});

	return data;
};

const saveLeasingToFirestore = async (values: any, entryData: LeasingEntryProps, initialOutputResultsState: any, finalOutputResultsState: any, tableResults: any) => {
	try {
		const leasingRef = doc(db, "users", `${auth?.currentUser?.uid}`);
		const leasingRefSnapshot = await getDoc(leasingRef);
		const leasingRefData = leasingRefSnapshot.data();

		const leasingData = {
			uid: uuid4(),
			titulo: values.titulo,
			fechaCreacion: new Date(),
			entryData: entryData,
			outputResults: {
				...initialOutputResultsState,
				...finalOutputResultsState,
			},
			tableResults
		};

		if (!leasingRefData?.leasings) {
			await updateDoc(leasingRef, {
				"leasings": []
			});
		}

		if (leasingRefData?.leasings?.length >= 10) {
			throw new Error("No se pueden agregar mas de 10 leasings");
		}

		await updateDoc(leasingRef, {
			"leasings": arrayUnion(leasingData)
		});

		Swal.fire({
			icon: "success",
			title: "Leasing guardado",
			text: "El leasing ha sido guardado correctamente",
		});

	}
	catch (e: any) {
		Swal.fire({
			icon: "error",
			title: "Error al guardar el leasing",
			text: e.message,
		});
	}

}

const deleteLeasingToFirestore = async (id: string | Number, tooglePending: any) => {
	const result = await Swal.fire({
		title: "¿Estás seguro?",
		text: "No podrás revertir esta acción",
		icon: "warning",
		showCancelButton: true,
		confirmButtonColor: "#3085d6",
		cancelButtonColor: "#d33",
		confirmButtonText: "Sí, eliminar",
		cancelButtonText: "Cancelar",
	})

	if (result.isConfirmed) {
		try {
			const leasingRef = doc(db, "users", `${auth?.currentUser?.uid}`);
			const leasingRefSnapshot = await getDoc(leasingRef);
			const leasingRefData = leasingRefSnapshot.data();

			const leasings = leasingRefData?.leasings.filter((leasing: any) => leasing.uid !== id);

			await updateDoc(leasingRef, {
				"leasings": leasings
			});

			Swal.fire({
				icon: "success",
				title: "Leasing eliminado",
				text: "El leasing ha sido eliminado correctamente",
			});
			tooglePending();
		} catch (e: any) {
			Swal.fire({
				icon: "error",
				title: "Error al eliminar el leasing",
				text: e.message,
			});
		}
	}


};


export {
	saveLeasingToFirestore,
	loadUserDocumentFromFirestore,
	deleteLeasingToFirestore
}