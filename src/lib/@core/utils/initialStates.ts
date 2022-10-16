
const NUMBER_RESULT = {
	type: 'N',
	value: 0,
}

const PERCENT_RESULT = {
	type: 'P',
	value: 0,
}

export const LEASING_ENTRY_DATA = {
	precioVentaActivo: "",
	nDeAnios: "",
	frecuenciaDePago: "",
	nDiasPorAnio: "",
	porcentajeTEA: "",
	porcentajeImpuestoALaRenta: "",
	porcentajeRecompra: "",
	costesNotariales: "",
	costesRegistrales: "",
	tasacion: "",
	comisionDeEstudio: "",
	comisionDeActivacion: "",
	comisionPeriodica: "",
	porcentajeDeSeguroRiesgo: "",
	tasaDescuentoKS: "",
	tasaDescuentoWACC: "",
}

export const LEASING_INITIAL_OUTPUT_DATA = {
	igv: ({ ...NUMBER_RESULT, title: 'IGV' }),
	valorVentaActivo: ({ ...NUMBER_RESULT, title: 'Valor de venta del activo' }),
	montoDelLeasing: ({ ...NUMBER_RESULT, title: 'Monto del leasing' }),
	porcentajeTEP: ({ ...PERCENT_RESULT, title: 'Porcentaje TEP' }),
	numeroCuotasPorAnio: ({ ...NUMBER_RESULT, title: 'Número de cuotas por año' }),
	numeroTotalDeCuotas: ({ ...NUMBER_RESULT, title: 'Número total de cuotas' }),
	seguroRiesgo: ({ ...NUMBER_RESULT, title: 'Seguro de riesgo' }),
}

export const LEASING_FINAL_OUTPUT_DATA = {
	intereses: ({ ...NUMBER_RESULT, title: 'Intereses' }),
	amortizacionDelCapital: ({ ...NUMBER_RESULT, title: 'Amortización del capital' }),
	seguroContraTodoRiesgo: ({ ...NUMBER_RESULT, title: 'Seguro contra todo riesgo' }),
	comisionesPeriodicas: ({ ...NUMBER_RESULT, title: 'Comisiones periódicas' }),
	recompra: ({ ...NUMBER_RESULT, title: 'Recompra' }),
	desembolsoTotal: ({ ...NUMBER_RESULT, title: 'Desembolso total' }),
	tceaFlujoBruto: ({ ...PERCENT_RESULT, title: 'TCEA (Flujo bruto)' }),
	tceaFlujoNeto: ({ ...PERCENT_RESULT, title: 'TCEA (Flujo neto)' }),
	vanFlujoBruto: ({ ...NUMBER_RESULT, title: 'VAN (Flujo bruto)' }),
	vanFlujoNeto: ({ ...NUMBER_RESULT, title: 'VAN (Flujo neto)' }),
}

export const TABLE_EMPTY_ROW = {
	id: '',
	periodoGracia: '',
	saldoInicial: '',
	interes: '',
	cuota: '',
	amortizacion: '',
	seguroRiesgo: '',
	comision: '',
	recompra: '',
	saldoFinal: '',
	depreciacion: '',
	ahorroTributario: '',
	igv: '',
	flujoBruto: '',
	flujoConIGV: '',
	flujoNeto: '',
	flujoTCEA: '',
}

export const DEMO_ENTRY_DATA = {
	precioVentaActivo: 11800,
	nDeAnios: 3,
	frecuenciaDePago: 30,
	nDiasPorAnio: 360,
	porcentajeTEA: 12,
	porcentajeImpuestoALaRenta: 30,
	porcentajeRecompra: 1,
	costesNotariales: 250,
	costesRegistrales: 150,
	tasacion: 80,
	comisionDeEstudio: 100,
	comisionDeActivacion: 50,
	comisionPeriodica: 10,
	porcentajeDeSeguroRiesgo: 0.30,
	tasaDescuentoKS: 17.50,
	tasaDescuentoWACC: 10.00,
}

export const DEMO_INITIAL_OUTPUT_DATA = {
	igv: {
		title: 'IGV',
		value: 1800,
		type: 'N'
	},
	valorVentaActivo: {
		title: 'Valor de venta del activo',
		value: 10000,
		type: 'N'
	},
	montoDelLeasing: {
		title: 'Monto del leasing',
		value: 10630,
		type: 'N'
	},
	porcentajeTEP: {
		title: 'Porcentaje TEP',
		value: 0.9488793,
		type: 'P'
	},
	numeroCuotasPorAnio: {
		title: 'Número de cuotas por año',
		value: 12,
		type: 'E'
	},
	numeroTotalDeCuotas: {
		title: 'Número total de cuotas',
		value: 36,
		type: 'E'
	},
	seguroRiesgo: {
		title: 'Seguro de riesgo',
		value: 2.95,
		type: 'N'
	},
}

export const DEMO_FINAL_OUTPUT_DATA = {
	intereses: {
		title: 'Intereses',
		value: 1976.12,
		type: 'N'
	},
	amortizacionDelCapital: {
		title: 'Amortización del capital',
		value: 10730.87,
		type: 'N'
	},
	seguroContraTodoRiesgo: {
		title: 'Seguro contra todo riesgo',
		value: 106.20,
		type: 'N'
	},
	comisionesPeriodicas: {
		title: 'Comisiones periódicas',
		value: 360,
		type: 'N'
	},
	recompra: {
		title: 'Recompra',
		value: 100,
		type: 'N'
	},
	desembolsoTotal: {
		title: 'Desembolso total',
		value: 13273.19,
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
}