import { LeasingEntryProps, LeasingTableProps } from "../interfaces/leasing";

function porcentajeADecimal(percent: number): number {
	return percent / 100;
}

function decimalAPorcentaje(decimal: number): number {
	return decimal * 100;
}

export const calcularIGV = (precioVentaActivo: number, PORCENTAJE_IGV: number): number => {
	return (precioVentaActivo / (1 + porcentajeADecimal(PORCENTAJE_IGV))) * porcentajeADecimal(PORCENTAJE_IGV)
}

export const calcularValorVentaActivo = (precioVentaActivo: number, igv: number): number => {
	return precioVentaActivo - igv
}

export const calcularMontoDelLeasing = (valorVentaActivo: number, costesNotariales: number, costesRegistrales: number, tasacion: number, comisionDeEstudio: number, comisionDeActivacion: number): number => {
	return valorVentaActivo + (costesNotariales + costesRegistrales + tasacion + comisionDeEstudio + comisionDeActivacion)
}

export const calcularPorcentajeTEP = (porcentajeTEA: number, frecuenciaDePago: number, nDiasPorAnio: number): number => {
	return decimalAPorcentaje((1 + porcentajeADecimal(porcentajeTEA)) ** (frecuenciaDePago / nDiasPorAnio) - 1)
}

export const calcularNumeroCuotasPorAnio = (nDiasPorAnio: number, frecuenciaDePago: number): number => {
	return nDiasPorAnio / frecuenciaDePago
}

export const calcularNumeroTotalDeCuotas = (numeroCuotasPorAnio: number, nDeAnios: number): number => {
	return numeroCuotasPorAnio * nDeAnios
}

export const calcularSeguroRiesgo = (porcentajeDeSeguroRiesgo: number, precioVentaActivo: number, numeroCuotasPorAnio: number): number => {
	return (porcentajeADecimal(porcentajeDeSeguroRiesgo) * precioVentaActivo) / numeroCuotasPorAnio
}

export const calcularIntereses = (tableResults: LeasingTableProps[]): number => {
	return tableResults.reduce((acc, curr) => {
		if (curr.periodoGracia !== 'T') {
			return acc + parseFloat(curr.interes)
		}
		return acc;
	}, 0);
}

export const calcularAmortizacionDelCapital = (tableResults: LeasingTableProps[]) => {
	return tableResults.reduce((acc, curr) => acc + parseFloat(curr.amortizacion), 0);
}

export const calcularSeguroContraTodoRiesgo = (tableResults: LeasingTableProps[]) => {
	return tableResults.reduce((acc, curr) => acc + parseFloat(curr.seguroRiesgo), 0);
}

export const calcularComisionesPeriodicas = (tableResults: LeasingTableProps[]) => {
	return tableResults.reduce((acc, curr) => acc + parseFloat(curr.comision), 0);
}

export const calcularRecompra = (tableResults: LeasingTableProps[]) => {
	return tableResults.reduce((acc, curr) => acc + parseFloat(curr.recompra), 0);
}

export const calcularDesembolsoTotal = (intereses: number, amortizacion_capital: number, seguro_riesgo: number, comisiones_periodicas: number, recompra: number) => {
	return intereses + amortizacion_capital + seguro_riesgo + comisiones_periodicas + recompra
}

export const calcularTCEAFlujoBruto = (values: LeasingEntryProps, tir: number): number => {
	const nDiasPorAnio = values.nDiasPorAnio;
	const frecuenciaDePago = values.frecuenciaDePago;

	const result = ((1 + (tir / 100)) ** (nDiasPorAnio / frecuenciaDePago)) - 1;

	return result * 100;
}

export const calcularTCEAFlujoNeto = (values: LeasingEntryProps, tir: number): number => {
	const nDiasPorAnio = values.nDiasPorAnio;
	const frecuenciaDePago = values.frecuenciaDePago;

	const result = ((1 + (tir / 100)) ** (nDiasPorAnio / frecuenciaDePago)) - 1;

	return result * 100;
}

export const calcularVANFlujoBruto = (tableResults: LeasingTableProps[], vna: number, key: string): number => {
	const van = (parseFloat(tableResults[0][key as keyof LeasingTableProps])) - vna;
	return van;
}

export const calcularVANFlujoNeto = (tableResults: LeasingTableProps[], vna: number, key: string): number => {
	const van = parseFloat(tableResults[0][key as keyof LeasingTableProps]) - vna;
	return van;
}