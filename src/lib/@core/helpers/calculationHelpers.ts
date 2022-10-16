import { LeasingEntryProps, LeasingInitialOutputProps, LeasingTableProps } from "../interfaces/leasing";
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

	setTimeout(() => {
		/* Algoritmo Leasing metodo Frances */
		for (
			let numeroCuotaActual = 1;
			numeroCuotaActual <= numeroTotalDeCuotas;
			numeroCuotaActual++
		) {
			const id: string = numeroCuotaActual.toString();
			// const periodoGracia: "T" | "P" | "S" | "" =
			// 	numeroCuotaActual === 1 ? "T" : numeroCuotaActual === 2 ? "P" : "S";
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
		// console.log(results);
		// setIsCalculating(false);
		// setHasResults(true);
		// setTableResults(results);
		handleEndCalculation(results)
	}, 1000);

	console.log('results', results)

	return results as LeasingTableProps[];
};

function calculateInitialOutputResults(values: LeasingEntryProps, handleEndCalculation: (results: LeasingInitialOutputProps) => void): LeasingInitialOutputProps {

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

	handleEndCalculation(results)

	return results as LeasingInitialOutputProps;
}

// const calculateOutputResults = (values: LeasingEntryProps) => {
//   setIsCalculating(true);
//   setTimeout(() => {
//     setIsCalculating(false);
//     const IGV = calcularIGV(
//       parseInt(values.precioVentaActivo),
//       PORCENTAJE_IGV
//     );
//     const VALOR_VENTA_ACTIVO = calcularValorVentaActivo(
//       parseInt(values.precioVentaActivo),
//       IGV
//     );
//     const MONTO_LEASING = calcularMontoDelLeasing(
//       VALOR_VENTA_ACTIVO,
//       parseInt(values.costesNotariales),
//       parseInt(values.costesRegistrales),
//       parseInt(values.tasacion),
//       parseInt(values.comisionDeEstudio),
//       parseInt(values.comisionDeActivacion)
//     );
//     const PORCENTAJE_TEP = calcularPorcentajeTEP(
//       parseInt(values.porcentajeTEA) / 100,
//       parseInt(values.frecuenciaDePago),
//       parseInt(values.nDiasPorAnio)
//     );
//     const N_CUOTAS_ANIO = calcularNumeroCuotasPorAnio(
//       parseInt(values.nDiasPorAnio),
//       parseInt(values.frecuenciaDePago)
//     );
//     const N_TOTAL_CUOTAS = calcularNumeroTotalDeCuotas(
//       N_CUOTAS_ANIO,
//       parseInt(values.nDeAnios)
//     );
//     const SEGURO_RIESGO = calcularSeguroRiesgo(
//       parseInt(values.porcentajeDeSeguroRiesgo) / 100,
//       parseInt(values.precioVentaActivo),
//       N_CUOTAS_ANIO
//     );

//     // start with the igv
//     setOutputResults({
//       ...outputResults,
//       igv: {
//         ...outputResults.igv,
//         value: IGV,
//       },
//       valorVentaActivo: {
//         ...outputResults.valorVentaActivo,
//         value: VALOR_VENTA_ACTIVO,
//       },
//     });

//     setHasResults(true);
//   }, 2000);
// };

export {
	calculateTableResults,
	calculateInitialOutputResults,
	recalculateTableResults
	// calculateFinalOutputResults,
}