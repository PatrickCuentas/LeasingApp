function porcentajeADecimal(percent: number): number {
	return percent / 100;
}

function decimalAPorcentaje(decimal: number): number {
	return decimal * 100;
}

/*
	NOTE: Calculo de los datos iniciales
*/

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

/*
	TODO: Falta realizar las funciones para obtener los calculos finales
*/

export const calcularIntereses = () => {
	// necesito generar todos los datos de la tabla para hallar los intereses
}

export const calcularAmortizacionDelCapital = () => {
	// necesito generar todos los datos de la tabla para hallar los intereses
}

export const calcularSeguroContraTodoRiesgo = () => {
	// necesito generar todos los datos de la tabla para hallar los intereses
}

export const calcularComisionesPeriodicas = () => {
	// necesito generar todos los datos de la tabla para hallar los intereses
}

export const calcularRecompra = () => {
	// necesito generar todos los datos de la tabla para hallar los intereses
}

export const calcularDesembolsoTotal = (intereses: number, amortizacion_capital: number, seguro_riesgo: number, comisiones_periodicas: number, recompra: number) => {
	return intereses + amortizacion_capital + seguro_riesgo + comisiones_periodicas + recompra
}

export const calcularTceaFlujoBruto = () => {

}

export const calcularTceaFlujoNeto = () => {

}

export const calcularVanFlujoBruto = () => {

}

export const calcularVanFlujoNeto = () => {

}


