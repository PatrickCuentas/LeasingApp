import { LeasingEntryProps, LeasingFinalOutputProps, LeasingInitialOutputProps, LeasingTableProps } from "../interfaces/leasing";
import { TABLE_EMPTY_ROW } from "../utils/states";
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
} from "./tables";

import {
	calcularAmortizacionDelCapital,
	calcularComisionesPeriodicas,
	calcularDesembolsoTotal,
	calcularIGV,
	calcularIntereses,
	calcularMontoDelLeasing,
	calcularNumeroCuotasPorAnio,
	calcularNumeroTotalDeCuotas,
	calcularPorcentajeTEP,
	calcularRecompra,
	calcularSeguroContraTodoRiesgo,
	calcularSeguroRiesgo,
	calcularTCEAFlujoBruto,
	calcularTCEAFlujoNeto,
	calcularValorVentaActivo,
	calcularVANFlujoBruto,
	calcularVANFlujoNeto,
} from "./results";
import { calcularTIRPorInterpolacion } from "./tir";
import { calcularVNAFlujoBruto, calcularVNAFlujoNeto } from "./vna";

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
		const periodoGracia = currentTablaData[numeroCuotaActual]?.periodoGracia;
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
			flujoBruto,
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
			flujoBruto,
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

	const table_results: LeasingTableProps[] = tableResults.slice(1, tableResults.length)

	const intereses: number = calcularIntereses(table_results);
	const amortizacion: number = calcularAmortizacionDelCapital(table_results);
	const seguroRiesgo: number = calcularSeguroContraTodoRiesgo(table_results);
	const comision: number = calcularComisionesPeriodicas(table_results);
	const recompra: number = calcularRecompra(table_results);
	const desembolsoTotal: number = calcularDesembolsoTotal(intereses, amortizacion, seguroRiesgo, comision, recompra);

	// Ya en porcentaje
	const tir_TCEAFlujoBruto = calcularTIRPorInterpolacion(tableResults, "flujoBruto")
	const tir_TCEAFlujoNeto = calcularTIRPorInterpolacion(tableResults, "flujoNeto")
	const vna_VANFlujoBruto = calcularVNAFlujoBruto(values, tableResults, "flujoBruto")
	const vna_VANFlujoNeto = calcularVNAFlujoNeto(values, tableResults, "flujoNeto")

	const porcentajeTCEAFlujoBruto = calcularTCEAFlujoBruto(values, tir_TCEAFlujoBruto)
	const porcentajeTCEAFlujoNeto = calcularTCEAFlujoNeto(values, tir_TCEAFlujoNeto)
	const vanFlujoBruto = calcularVANFlujoBruto(tableResults, vna_VANFlujoBruto, 'flujoBruto')
	const vanFlujoNeto = calcularVANFlujoNeto(tableResults, vna_VANFlujoNeto, 'flujoNeto')


	const results: LeasingFinalOutputProps = {
		intereses: {
			title: 'Intereses',
			value: intereses,
			type: 'N'
		},
		amortizacionDelCapital: {
			title: 'Amortización del capital',
			value: amortizacion,
			type: 'N'
		},
		seguroContraTodoRiesgo: {
			title: 'Seguro contra todo riesgo',
			value: seguroRiesgo,
			type: 'N'
		},
		comisionesPeriodicas: {
			title: 'Comisiones periódicas',
			value: comision,
			type: 'N'
		},
		recompra: {
			title: 'Recompra',
			value: recompra,
			type: 'N'
		},
		desembolsoTotal: {
			title: 'Desembolso total',
			value: desembolsoTotal,
			type: 'N'
		},
		tceaFlujoBruto: {
			title: 'TCEA (Flujo bruto)',
			value: porcentajeTCEAFlujoBruto,
			type: 'P'
		},
		tceaFlujoNeto: {
			title: 'TCEA (Flujo neto)',
			value: porcentajeTCEAFlujoNeto,
			type: 'P'
		},
		vanFlujoBruto: {
			title: 'VAN (Flujo bruto)',
			value: vanFlujoBruto,
			type: 'N'
		},
		vanFlujoNeto: {
			title: 'VAN (Flujo neto)',
			value: vanFlujoNeto,
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