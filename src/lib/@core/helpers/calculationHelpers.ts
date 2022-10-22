import { LeasingEntryProps, LeasingFinalOutputProps, LeasingInitialOutputProps, LeasingTableProps } from "../interfaces/leasing";
import { TABLE_EMPTY_ROW } from "../utils/initialStates";
import {
	obtenerAhorroTributario,
	obtenerAmortizacion,
	obtenerComision,
	obtenerCuota,
	obtenerDepreciacion,
	obtenerFlujoBruto,
	obtenerFlujoConIGV,
	obtenerFlujoNeto,
	obtenerFlujoTCEA,
	obtenerIGV,
	obtenerIntereses,
	obtenerRecompra,
	obtenerSaldoFinal,
	obtenerSaldoInicial,
	obtenerSeguroRiesgo,
} from "./tableHelpers";

import {
	calcularIGV,
	calcularMontoDelLeasing,
	calcularNumeroCuotasPorAnio,
	calcularNumeroTotalDeCuotas,
	calcularPorcentajeTEP,
	calcularSeguroRiesgo,
	calcularValorVentaActivo,
} from "./resultHelpers";

const PORCENTAJE_IGV = 18;

function recalculateTableResults(currentTablaData: LeasingTableProps[], values: LeasingEntryProps, initialOutputResults: LeasingInitialOutputProps): LeasingTableProps[] {
	const results: LeasingTableProps[] = [];

	// Primera fila de la tabla
	const initialRow: LeasingTableProps = {
		...TABLE_EMPTY_ROW,
		id: "0",
		periodoGracia: "",
		flujoBruto: initialOutputResults.montoDelLeasing.value.toFixed(2),
		flujoConIGV: initialOutputResults.montoDelLeasing.value.toFixed(2),
		flujoNeto: initialOutputResults.montoDelLeasing.value.toFixed(2),
		flujoTCEA: initialOutputResults.montoDelLeasing.value.toFixed(2),
	};

	results.push(initialRow);

	/* Datos iniciales */
	const numeroTotalDeCuotas: number = initialOutputResults.numeroTotalDeCuotas.value;

	for (let numeroCuotaActual = 1; numeroCuotaActual <= numeroTotalDeCuotas; numeroCuotaActual++) {
		const id: string = numeroCuotaActual.toString();
		const periodoGracia = currentTablaData[numeroCuotaActual]?.periodoGracia || "";
		const saldoInicial: number = obtenerSaldoInicial(
			numeroCuotaActual,
			numeroTotalDeCuotas,
			[...results],
			initialOutputResults.montoDelLeasing.value
		);
		const interes: number = obtenerIntereses(
			saldoInicial,
			initialOutputResults.porcentajeTEP.value
		);
		const cuota: number = obtenerCuota(
			numeroCuotaActual,
			numeroTotalDeCuotas,
			periodoGracia,
			interes,
			initialOutputResults.porcentajeTEP.value,
			saldoInicial
		);
		const amortizacion: number = obtenerAmortizacion(
			numeroCuotaActual,
			numeroTotalDeCuotas,
			periodoGracia,
			cuota,
			interes
		);
		const seguroRiesgo: number = obtenerSeguroRiesgo(
			numeroCuotaActual,
			numeroTotalDeCuotas,
			initialOutputResults.seguroRiesgo.value
		);
		const comision: number = obtenerComision(
			numeroCuotaActual,
			numeroTotalDeCuotas,
			values.comisionPeriodica
		);
		const recompra: number = obtenerRecompra(
			numeroCuotaActual,
			numeroTotalDeCuotas,
			values.porcentajeRecompra,
			initialOutputResults.valorVentaActivo.value
		);
		const saldoFinal: number = obtenerSaldoFinal(
			periodoGracia,
			saldoInicial,
			interes,
			amortizacion
		);
		const depreciacion: number = obtenerDepreciacion(
			numeroCuotaActual,
			numeroTotalDeCuotas,
			initialOutputResults.valorVentaActivo.value
		);
		const ahorroTributario: number = obtenerAhorroTributario(
			numeroCuotaActual,
			numeroTotalDeCuotas,
			interes,
			seguroRiesgo,
			comision,
			depreciacion,
			values.porcentajeImpuestoALaRenta
		);
		const igv: number = obtenerIGV(
			cuota,
			seguroRiesgo,
			comision,
			recompra,
			PORCENTAJE_IGV
		);
		const flujoBruto: number = obtenerFlujoBruto(
			cuota,
			seguroRiesgo,
			comision,
			recompra
		);
		const flujoConIGV: number = obtenerFlujoConIGV(igv, flujoBruto);
		const flujoNeto: number = obtenerFlujoNeto(
			flujoConIGV,
			ahorroTributario
		);
		const flujoTCEA: number = obtenerFlujoTCEA(cuota);

		const row: LeasingTableProps = {
			...TABLE_EMPTY_ROW,
			id: id,
			periodoGracia: periodoGracia,
			saldoInicial: saldoInicial.toFixed(2),
			interes: interes.toFixed(2),
			cuota: cuota.toFixed(2),
			amortizacion: amortizacion.toFixed(2),
			seguroRiesgo: seguroRiesgo.toFixed(2),
			comision: comision.toFixed(2),
			recompra: recompra.toFixed(2),
			saldoFinal: saldoFinal.toFixed(2),
			depreciacion: depreciacion.toFixed(2),
			ahorroTributario: ahorroTributario.toFixed(2),
			igv: igv.toFixed(2),
			flujoBruto: flujoBruto.toFixed(2),
			flujoConIGV: flujoConIGV.toFixed(2),
			flujoNeto: flujoNeto.toFixed(2),
			flujoTCEA: flujoTCEA.toFixed(2),
		};
		results.push(row);
	}

	return results as LeasingTableProps[];
}

function calculateTableResults(
	values: LeasingEntryProps,
	initialOutputResults: LeasingInitialOutputProps,
	handleEndCalculation: (results: LeasingTableProps[]) => void
): LeasingTableProps[] {
	// const PERIODO_GRACIA = "S";
	const results: LeasingTableProps[] = [];

	// Primera fila de la tabla
	const initialRow: LeasingTableProps = {
		...TABLE_EMPTY_ROW,
		id: "0",
		periodoGracia: "",
		flujoBruto: initialOutputResults.montoDelLeasing.value.toFixed(2),
		flujoConIGV: initialOutputResults.montoDelLeasing.value.toFixed(2),
		flujoNeto: initialOutputResults.montoDelLeasing.value.toFixed(2),
		flujoTCEA: initialOutputResults.montoDelLeasing.value.toFixed(2),
	};

	results.push(initialRow);

	/* Datos iniciales */
	const numeroTotalDeCuotas: number = initialOutputResults.numeroTotalDeCuotas.value;

	/* Algoritmo Leasing metodo Frances */
	for (
		let numeroCuotaActual = 1;
		numeroCuotaActual <= numeroTotalDeCuotas;
		numeroCuotaActual++
	) {
		const id: string = numeroCuotaActual.toString();
		const periodoGracia = 'S'
		const saldoInicial: number = obtenerSaldoInicial(
			numeroCuotaActual,
			numeroTotalDeCuotas,
			[...results],
			initialOutputResults.montoDelLeasing.value
		);
		const interes: number = obtenerIntereses(
			saldoInicial,
			initialOutputResults.porcentajeTEP.value
		);
		const cuota: number = obtenerCuota(
			numeroCuotaActual,
			numeroTotalDeCuotas,
			periodoGracia,
			interes,
			initialOutputResults.porcentajeTEP.value,
			saldoInicial
		);
		const amortizacion: number = obtenerAmortizacion(
			numeroCuotaActual,
			numeroTotalDeCuotas,
			periodoGracia,
			cuota,
			interes
		);
		const seguroRiesgo: number = obtenerSeguroRiesgo(
			numeroCuotaActual,
			numeroTotalDeCuotas,
			initialOutputResults.seguroRiesgo.value
		);
		const comision: number = obtenerComision(
			numeroCuotaActual,
			numeroTotalDeCuotas,
			values.comisionPeriodica
		);
		const recompra: number = obtenerRecompra(
			numeroCuotaActual,
			numeroTotalDeCuotas,
			values.porcentajeRecompra,
			initialOutputResults.valorVentaActivo.value
		);
		const saldoFinal: number = obtenerSaldoFinal(
			periodoGracia,
			saldoInicial,
			interes,
			amortizacion
		);
		const depreciacion: number = obtenerDepreciacion(
			numeroCuotaActual,
			numeroTotalDeCuotas,
			initialOutputResults.valorVentaActivo.value
		);
		const ahorroTributario: number = obtenerAhorroTributario(
			numeroCuotaActual,
			numeroTotalDeCuotas,
			interes,
			seguroRiesgo,
			comision,
			depreciacion,
			values.porcentajeImpuestoALaRenta
		);
		const igv: number = obtenerIGV(
			cuota,
			seguroRiesgo,
			comision,
			recompra,
			PORCENTAJE_IGV
		);
		const flujoBruto: number = obtenerFlujoBruto(
			cuota,
			seguroRiesgo,
			comision,
			recompra
		);
		const flujoConIGV: number = obtenerFlujoConIGV(igv, flujoBruto);
		const flujoNeto: number = obtenerFlujoNeto(
			flujoConIGV,
			ahorroTributario
		);
		const flujoTCEA: number = obtenerFlujoTCEA(cuota);

		const row: LeasingTableProps = {
			...TABLE_EMPTY_ROW,
			id: id,
			periodoGracia: periodoGracia,
			saldoInicial: saldoInicial.toFixed(2),
			interes: interes.toFixed(2),
			cuota: cuota.toFixed(2),
			amortizacion: amortizacion.toFixed(2),
			seguroRiesgo: seguroRiesgo.toFixed(2),
			comision: comision.toFixed(2),
			recompra: recompra.toFixed(2),
			saldoFinal: saldoFinal.toFixed(2),
			depreciacion: depreciacion.toFixed(2),
			ahorroTributario: ahorroTributario.toFixed(2),
			igv: igv.toFixed(2),
			flujoBruto: flujoBruto.toFixed(2),
			flujoConIGV: flujoConIGV.toFixed(2),
			flujoNeto: flujoNeto.toFixed(2),
			flujoTCEA: flujoTCEA.toFixed(2),
		};
		results.push(row);
	}
	handleEndCalculation(results)

	return results as LeasingTableProps[];
};

function calculateInitialOutputResults(values: LeasingEntryProps): LeasingInitialOutputProps {

	const igv: number = calcularIGV(values.precioVentaActivo, PORCENTAJE_IGV)
	const valorVentaActivo: number = calcularValorVentaActivo(values.precioVentaActivo, igv)
	const montoDelLeasing: number = calcularMontoDelLeasing(valorVentaActivo, values.costesNotariales, values.costesRegistrales, values.tasacion, values.comisionDeEstudio, values.comisionDeActivacion)
	const porcentajeTEP: number = calcularPorcentajeTEP(values.porcentajeTEA, values.frecuenciaDePago, values.nDiasPorAnio)
	const numeroCuotasPorAnio: number = calcularNumeroCuotasPorAnio(values.nDiasPorAnio, values.frecuenciaDePago)
	const numeroTotalDeCuotas: number = calcularNumeroTotalDeCuotas(numeroCuotasPorAnio, values.nDeAnios)
	const seguroRiesgo: number = calcularSeguroRiesgo(values.porcentajeDeSeguroRiesgo, values.precioVentaActivo, numeroCuotasPorAnio)

	const results: LeasingInitialOutputProps = {
		igv: {
			title: 'IGV',
			value: igv,
			type: 'N'
		},
		valorVentaActivo: {
			title: 'Valor de venta del activo',
			value: valorVentaActivo,
			type: 'N'
		},
		montoDelLeasing: {
			title: 'Monto del leasing',
			value: montoDelLeasing,
			type: 'N'
		},
		porcentajeTEP: {
			title: 'Porcentaje TEP',
			value: porcentajeTEP,
			type: 'P'
		},
		numeroCuotasPorAnio: {
			title: 'Número de cuotas por año',
			value: numeroCuotasPorAnio,
			type: 'E'
		},
		numeroTotalDeCuotas: {
			title: 'Número total de cuotas',
			value: numeroTotalDeCuotas,
			type: 'E'
		},
		seguroRiesgo: {
			title: 'Seguro de riesgo',
			value: seguroRiesgo,
			type: 'N'
		},
	};

	return results as LeasingInitialOutputProps;
}

const calculateFinalOutputResults = (values: LeasingEntryProps, tableResults: LeasingTableProps[]): LeasingFinalOutputProps => {

	const table_results = tableResults.slice(1, tableResults.length)

	const intereses: number = table_results.reduce((acc, curr) => {
		if (curr.periodoGracia !== 'T') {
			return acc + parseFloat(curr.interes)
		}
		return acc;
	}, 0);

	const amortizacion: number = table_results.reduce((acc, curr) => {
		return acc + parseFloat(curr.amortizacion)
	}, 0);

	const seguroRiesgo: number = table_results.reduce((acc, curr) => {
		return acc + parseFloat(curr.seguroRiesgo);
	}, 0);

	const comision: number = table_results.reduce((acc, curr) => {
		return acc + parseFloat(curr.comision);
	}, 0);

	const recompra: number = table_results.reduce((acc, curr) => {
		return acc + parseFloat(curr.recompra);
	}, 0);

	const desembolsoTotal: number = intereses + amortizacion + seguroRiesgo + comision + recompra;

	// !TODO Faltan calcular los valores para:

	/*

		Calculo del TIR
		------

		------

		TCEA Flujo Bruto -> %
			POTENCIA(1+TIR(N26:N326;1%);NDiasxAgno/frec)-1

			(1 + TIR(Columna Flujo Bruto Tabla;1%) ) ^ (N de dias por anio / frecuencia de pago ) - 1

		TCEA Flujo Neto -> %

			POTENCIA(1+TIR(P26:P326;1%);NDiasxAgno/frec)-1

			(1 + TIR(Columna Flujo Neto Tabla;1%) ) ^ (N de dias por anio / frecuencia de pago ) - 1


		VAN Flujo Bruto -> -> double

			N26+VNA((1+COK)^(frec/NDiasxAgno)-1;N27:N326)

			Flujo Bruto P0 + VNA( (1 + COK) ^ (frecuencia de pago / n de dias por anio) - 1 , RANGO FLUJO BRUTO P1-PN


		VAN Flujo Neto -> double

			P26+VNA((1+WACC)^(frec/NDiasxAgno)-1;P27:P326)

			Flujo Neto P0 + VNA( (1 + WACC) ^ (frecuencia de pago / n de dias por anio) - 1 , RANGO FLUJO NETO P1-PN
*/

	const results: LeasingFinalOutputProps = {
		intereses: {
			title: 'Intereses',
			value: Math.abs(intereses),
			type: 'N'
		},
		amortizacionDelCapital: {
			title: 'Amortización del capital',
			value: Math.abs(amortizacion),
			type: 'N'
		},
		seguroContraTodoRiesgo: {
			title: 'Seguro contra todo riesgo',
			value: Math.abs(seguroRiesgo),
			type: 'N'
		},
		comisionesPeriodicas: {
			title: 'Comisiones periódicas',
			value: Math.abs(comision),
			type: 'N'
		},
		recompra: {
			title: 'Recompra',
			value: Math.abs(recompra),
			type: 'N'
		},
		desembolsoTotal: {
			title: 'Desembolso total',
			value: Math.abs(desembolsoTotal),
			type: 'N'
		},
		tceaFlujoBruto: {
			title: 'TCEA (Flujo bruto)',
			value: 15.168,
			type: 'P'
		},
		tceaFlujoNeto: {
			title: 'TCEA (Flujo neto)',
			value: -6.324,
			type: 'P'
		},
		vanFlujoBruto: {
			title: 'VAN (Flujo bruto)',
			value: 318.36,
			type: 'N'
		},
		vanFlujoNeto: {
			title: 'VAN (Flujo neto)',
			value: 2504.49,
			type: 'N'
		},
	};

	return results as LeasingFinalOutputProps;
}
export {
	calculateTableResults,
	calculateInitialOutputResults,
	calculateFinalOutputResults,
	recalculateTableResults,
}