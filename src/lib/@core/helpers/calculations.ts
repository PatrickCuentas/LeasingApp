import { LeasingEntryProps, LeasingFinalOutputProps, LeasingInitialOutputProps, LeasingTableProps, PREFIX } from "../interfaces/leasing";
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
const TABLE_DECIMALS = 2;

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
			saldoInicial: saldoInicial.toFixed(TABLE_DECIMALS),
			interes: interes.toFixed(TABLE_DECIMALS),
			cuota: cuota.toFixed(TABLE_DECIMALS),
			amortizacion: amortizacion.toFixed(TABLE_DECIMALS),
			seguroRiesgo: seguroRiesgo.toFixed(TABLE_DECIMALS),
			comision: comision.toFixed(TABLE_DECIMALS),
			recompra: recompra.toFixed(TABLE_DECIMALS),
			saldoFinal: saldoFinal.toFixed(TABLE_DECIMALS),
			depreciacion: depreciacion.toFixed(TABLE_DECIMALS),
			ahorroTributario: ahorroTributario.toFixed(TABLE_DECIMALS),
			igv: igv.toFixed(TABLE_DECIMALS),
			flujoBruto: flujoBruto.toFixed(TABLE_DECIMALS),
			flujoConIGV: flujoConIGV.toFixed(TABLE_DECIMALS),
			flujoNeto: flujoNeto.toFixed(TABLE_DECIMALS),
			flujoTCEA: flujoTCEA.toFixed(TABLE_DECIMALS),
		};
		results.push(row);
	}

	return results as LeasingTableProps[];
}

function calculateTableResults(
	values: LeasingEntryProps,
	initialOutputResults: LeasingInitialOutputProps,
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
			saldoInicial: saldoInicial.toFixed(TABLE_DECIMALS),
			interes: interes.toFixed(TABLE_DECIMALS),
			cuota: cuota.toFixed(TABLE_DECIMALS),
			amortizacion: amortizacion.toFixed(TABLE_DECIMALS),
			seguroRiesgo: seguroRiesgo.toFixed(TABLE_DECIMALS),
			comision: comision.toFixed(TABLE_DECIMALS),
			recompra: recompra.toFixed(TABLE_DECIMALS),
			saldoFinal: saldoFinal.toFixed(TABLE_DECIMALS),
			depreciacion: depreciacion.toFixed(TABLE_DECIMALS),
			ahorroTributario: ahorroTributario.toFixed(TABLE_DECIMALS),
			igv: igv.toFixed(TABLE_DECIMALS),
			flujoBruto: flujoBruto.toFixed(TABLE_DECIMALS),
			flujoConIGV: flujoConIGV.toFixed(TABLE_DECIMALS),
			flujoNeto: flujoNeto.toFixed(TABLE_DECIMALS),
			flujoTCEA: flujoTCEA.toFixed(TABLE_DECIMALS),
		};
		results.push(row);
	}

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
			type: PREFIX.MONEY
		},
		valorVentaActivo: {
			title: 'Valor de venta del activo',
			value: valorVentaActivo,
			type: PREFIX.MONEY
		},
		montoDelLeasing: {
			title: 'Monto del leasing',
			value: montoDelLeasing,
			type: PREFIX.MONEY
		},
		porcentajeTEP: {
			title: 'Porcentaje TEP',
			value: porcentajeTEP,
			type: PREFIX.PERCENTAGE
		},
		numeroCuotasPorAnio: {
			title: 'N??mero de cuotas por a??o',
			value: numeroCuotasPorAnio,
			type: PREFIX.NONE
		},
		numeroTotalDeCuotas: {
			title: 'N??mero total de cuotas',
			value: numeroTotalDeCuotas,
			type: PREFIX.NONE
		},
		seguroRiesgo: {
			title: 'Seguro de riesgo',
			value: seguroRiesgo,
			type: PREFIX.MONEY
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
			type: PREFIX.MONEY
		},
		amortizacionDelCapital: {
			title: 'Amortizaci??n del capital',
			value: amortizacion,
			type: PREFIX.MONEY
		},
		seguroContraTodoRiesgo: {
			title: 'Seguro contra todo riesgo',
			value: seguroRiesgo,
			type: PREFIX.MONEY
		},
		comisionesPeriodicas: {
			title: 'Comisiones peri??dicas',
			value: comision,
			type: PREFIX.MONEY
		},
		recompra: {
			title: 'Recompra',
			value: recompra,
			type: PREFIX.MONEY
		},
		desembolsoTotal: {
			title: 'Desembolso total',
			value: desembolsoTotal,
			type: PREFIX.MONEY
		},
		tceaFlujoBruto: {
			title: 'TCEA (Flujo bruto)',
			value: porcentajeTCEAFlujoBruto,
			type: PREFIX.PERCENTAGE
		},
		tceaFlujoNeto: {
			title: 'TCEA (Flujo neto)',
			value: porcentajeTCEAFlujoNeto,
			type: PREFIX.PERCENTAGE
		},
		vanFlujoBruto: {
			title: 'VAN (Flujo bruto)',
			value: vanFlujoBruto,
			type: PREFIX.MONEY
		},
		vanFlujoNeto: {
			title: 'VAN (Flujo neto)',
			value: vanFlujoNeto,
			type: PREFIX.MONEY
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