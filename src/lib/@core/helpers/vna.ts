import { LeasingEntryProps, LeasingTableProps } from "../interfaces/leasing";

export function calcularVNAFlujoBruto(values: LeasingEntryProps, tableResults: LeasingTableProps[], key: string) {
	const COK_porcentaje = values.tasaDescuentoKS;
	const frecuenciaDePago = values.frecuenciaDePago;
	const nDiasPorAnio = values.nDiasPorAnio;

	let table_results = [...tableResults];
	table_results.splice(0, 1)
	let flujos_de_caja = table_results.map((item) => parseFloat(item[key as keyof LeasingTableProps]));
	let tasa_real = (1 + (COK_porcentaje / 100)) ** (frecuenciaDePago / nDiasPorAnio) - 1;
	let tasa_porcentaje = tasa_real * 100;
	let vna = calcularSumaDelFlujoDeCajaDescontada(flujos_de_caja, tasa_porcentaje);

	return vna;
}

export function calcularVNAFlujoNeto(values: LeasingEntryProps, tableResults: LeasingTableProps[], key: string) {
	const WACC_porcentaje = values.tasaDescuentoWACC;
	const frecuenciaDePago = values.frecuenciaDePago;
	const nDiasPorAnio = values.nDiasPorAnio;

	let table_results = [...tableResults];
	table_results.splice(0, 1)
	let flujos_de_caja = table_results.map((item) => parseFloat(item[key as keyof LeasingTableProps]));
	let tasa_real = (1 + (WACC_porcentaje / 100)) ** (frecuenciaDePago / nDiasPorAnio) - 1;
	let tasa_porcentaje = tasa_real * 100;
	let vna = calcularSumaDelFlujoDeCajaDescontada(flujos_de_caja, tasa_porcentaje);

	return vna;
}

function calcularSumaDelFlujoDeCajaDescontada(flujosDeCaja: number[], tasa: number) {
	let suma_flujo_caja_descontada = 0;
	suma_flujo_caja_descontada = flujosDeCaja.reduce((a, b, i) => {
		const val = a + Math.abs(b / (1 + tasa / 100) ** (i + 1));
		return val;
	}, 0);
	return suma_flujo_caja_descontada;
}