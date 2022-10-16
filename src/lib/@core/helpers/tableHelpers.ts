import { LeasingTableProps } from "../interfaces/leasing"

function porcentajeADecimal(percent: number) {
	return percent / 100;
}

function obtenerSaldoInicial(numeroCuotaActual: number, numeroTotalCuotas: number, results: LeasingTableProps[], montoDelLeasing: number): number {
	let saldo_inicial: number = 0
	if (numeroCuotaActual === 1) { saldo_inicial = montoDelLeasing }
	else if (numeroCuotaActual <= numeroTotalCuotas) {
		saldo_inicial = parseFloat(results[numeroCuotaActual - 1].saldoFinal)
	}
	else saldo_inicial = 0

	return saldo_inicial
}

function obtenerIntereses(saldoInicial: number, porcentajeTEP: number): number {
	return parseFloat((saldoInicial * porcentajeADecimal(porcentajeTEP)).toFixed(2)) * -1
}

function obtenerCuota(numeroCuotaActual: number, numeroTotalCuotas: number, periodoGracia: string, interes: number, tasaEfectivaPeriodo: number, saldoInicial: number): number {
	let cuota = 0
	let nPeriodos = numeroTotalCuotas - numeroCuotaActual + 1

	if (numeroCuotaActual <= numeroTotalCuotas) {
		if (periodoGracia === 'T') {
			cuota = 0
		}
		else {
			if (periodoGracia === 'P') {
				cuota = interes
			} else {
				cuota = ((porcentajeADecimal(tasaEfectivaPeriodo) * (1 + porcentajeADecimal(tasaEfectivaPeriodo)) ** nPeriodos) * saldoInicial) / (((1 + porcentajeADecimal(tasaEfectivaPeriodo)) ** nPeriodos) - 1)
			}
		}
	}
	else {
		cuota = 0
	}

	return cuota * -1
}

function obtenerAmortizacion(numeroCuotaActual: number, numeroTotalCuotas: number, periodoGracia: string, cuota: number, interes: number): number {
	let amortizacion: number = 0

	if (numeroCuotaActual <= numeroTotalCuotas) {
		if (periodoGracia === 'T' || periodoGracia === 'P') amortizacion = 0
		else amortizacion = cuota - interes
	}
	else amortizacion = 0
	return amortizacion
}

function obtenerSeguroRiesgo(numeroCuotaActual: number, numeroTotalCuotas: number, seguroRiesgo: number): number {
	let seguro_riesgo: number = 0
	if (numeroCuotaActual <= numeroTotalCuotas) seguro_riesgo = seguroRiesgo * -1
	else seguro_riesgo = 0
	return seguro_riesgo
}

function obtenerComision(numeroCuotaActual: number, numeroTotalCuotas: number, comisionPeriodica: number): number {
	let comision: number = 0
	if (numeroCuotaActual <= numeroTotalCuotas) comision = comisionPeriodica * -1
	else comision = 0
	return comision
}

function obtenerRecompra(numeroCuotaActual: number, numeroTotalCuotas: number, porcentajeRecompra: number, valorVentaActivo: number): number {
	let recompra: number = 0
	if (numeroCuotaActual === numeroTotalCuotas) recompra = porcentajeADecimal(porcentajeRecompra) * valorVentaActivo * -1
	else recompra = 0
	return recompra
}

function obtenerSaldoFinal(periodoGracia: string, saldoInicial: number, interes: number, amortizacion: number) {
	let saldo_final: number = 0
	if (periodoGracia === 'T') saldo_final = saldoInicial - interes
	else saldo_final = saldoInicial + amortizacion
	return saldo_final
}

function obtenerDepreciacion(numeroCuotaActual: number, numeroTotalCuotas: number, valorVentaActivo: number): number {
	let depreciacion_cuota: number = 0
	if (numeroCuotaActual <= numeroTotalCuotas) depreciacion_cuota = (valorVentaActivo * -1) / numeroTotalCuotas
	else depreciacion_cuota = 0
	return depreciacion_cuota
}

function obtenerAhorroTributario(numeroCuotaActual: number, numeroTotalCuotas: number, interes: number, seguroRiesgo: number, comision: number, depreciacion: number, porcentajeImpuestoALaRenta: number): number {
	let ahorro_tributario = 0
	if (numeroCuotaActual <= numeroTotalCuotas) ahorro_tributario = (interes + seguroRiesgo + comision + depreciacion) * porcentajeADecimal(porcentajeImpuestoALaRenta)
	else ahorro_tributario = 0
	return ahorro_tributario
}

function obtenerIGV(cuota: number, seguroRiesgo: number, comision: number, recompra: number, porcentajeIGV: number): number {
	let igv = 0
	igv = (cuota + seguroRiesgo + comision + recompra) * porcentajeADecimal(porcentajeIGV)
	return igv
}

function obtenerFlujoBruto(cuota: number, seguroRiesgo: number, comision: number, recompra: number): number {
	let flujo_bruto = 0
	flujo_bruto = cuota + seguroRiesgo + comision + recompra
	return flujo_bruto
}

function obtenerFlujoConIGV(igv: number, flujoBruto: number): number {
	let flujo_con_igv = 0
	flujo_con_igv = igv + flujoBruto
	return flujo_con_igv
}

function obtenerFlujoNeto(flujoConIGV: number, ahorroTributario: number): number {
	let flujo_neto = 0
	flujo_neto = flujoConIGV - ahorroTributario
	return flujo_neto
}

function obtenerFlujoTCEA(cuota: number): number {
	let flujo_tcea = 0
	flujo_tcea = cuota
	return flujo_tcea
}

export {
	obtenerSaldoInicial,
	obtenerIntereses,
	obtenerCuota,
	obtenerAmortizacion,
	obtenerSeguroRiesgo,
	obtenerComision,
	obtenerRecompra,
	obtenerSaldoFinal,
	obtenerDepreciacion,
	obtenerAhorroTributario,
	obtenerIGV,
	obtenerFlujoBruto,
	obtenerFlujoConIGV,
	obtenerFlujoNeto,
	obtenerFlujoTCEA
}