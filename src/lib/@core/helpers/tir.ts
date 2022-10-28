import { LeasingTableProps } from "../interfaces/leasing";

export function calcularTasaAproximada(inversion: number, flujosDeCaja: number[], numeroDePeriodos: number): number {
	const suma_flujos_de_caja: number = Math.abs(flujosDeCaja.reduce((a, b) => a + b, 0));
	const tasaAproximada: number = (Math.abs(inversion) / suma_flujos_de_caja - 1) / numeroDePeriodos;
	return Math.round(tasaAproximada * 100);
}

export function calcularSumaDelFlujoDeCajaDescontada(inversion: number, flujosDeCaja: number[], tasa: number) {
	let suma_flujo_caja_descontada = 0;
	const suma_flujos_de_caja = flujosDeCaja.reduce((a, b, i) => {
		return a + Math.abs(b / (1 + tasa / 100) ** (i + 1))
	}, 0);
	suma_flujo_caja_descontada = Math.abs(inversion) * -1 + suma_flujos_de_caja;
	return suma_flujo_caja_descontada;
}

export function calcularTIR(tasaMenor: number, tasaMayor: number, vanMenor: number, vanMayor: number) {
	let tir = 0;
	tir =
		tasaMenor +
		((tasaMayor - tasaMenor) / (Math.abs(vanMayor) + Math.abs(vanMenor))) *
		vanMenor;
	return tir;
}

export function calcularTIRPorInterpolacion(data: LeasingTableProps[], key: string) {
	const data_copy = [...data];

	const inversion = parseFloat(data_copy[0][key as keyof LeasingTableProps]);

	data_copy.splice(0, 1)

	const flujos_de_caja = data_copy.map((item: LeasingTableProps) => parseFloat(item[key as keyof LeasingTableProps]));

	const numeroDePeriodos = flujos_de_caja.length;

	let tasa = calcularTasaAproximada(inversion, flujos_de_caja, numeroDePeriodos);

	let tir = 0;
	let van1 = 0;
	let van2 = 0;
	let tasaVAN1 = 0;
	let tasaVAN2 = 0;
	let aumento = 5 / 1000000;
	let contador = 0;

	do {
		van1 = calcularSumaDelFlujoDeCajaDescontada(inversion, flujos_de_caja, tasa);
		tasa -= aumento;
		contador += aumento;
		if (contador === 5000) {
			alert('stop van1');
			return -1;
		}
	} while (van1 < 0)

	do {
		van2 = calcularSumaDelFlujoDeCajaDescontada(inversion, flujos_de_caja, tasa);
		tasa += aumento;
		contador += 1;
		if (contador === 5000) {
			alert('stop van2');
			return -1;
		}
		if (van2 > 0) van1 = van2;
	} while (van2 > 0);

	tasaVAN1 = tasa - aumento;
	tasaVAN2 = tasa;

	tir = calcularTIR(tasaVAN1, tasaVAN2, van1, van2);

	return tir;
}