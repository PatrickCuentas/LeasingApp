export interface ResultItem {
	type: string;
	value: number
	title: string;
}

export interface LeasingTableProps {
	id: string;
	periodoGracia: 'T' | 'P' | 'S' | '';
	saldoInicial: string;
	interes: string;
	cuota: string;
	amortizacion: string;
	seguroRiesgo: string;
	comision: string;
	recompra: string;
	saldoFinal: string;
	depreciacion: string;
	ahorroTributario: string;
	igv: string;
	flujoBruto: string;
	flujoConIGV: string;
	flujoNeto: string;
	flujoTCEA: string;
}


export interface LeasingInitialOutputProps {
	igv: ResultItem;
	valorVentaActivo: ResultItem;
	montoDelLeasing: ResultItem;
	porcentajeTEP: ResultItem;
	numeroCuotasPorAnio: ResultItem;
	numeroTotalDeCuotas: ResultItem;
	seguroRiesgo: ResultItem;
}

export interface LeasingFinalOutputProps {
	intereses: ResultItem;
	amortizacionDelCapital: ResultItem;
	seguroContraTodoRiesgo: ResultItem;
	comisionesPeriodicas: ResultItem;
	recompra: ResultItem;
	desembolsoTotal: ResultItem;
	tceaFlujoBruto: ResultItem;
	tceaFlujoNeto: ResultItem;
	vanFlujoBruto: ResultItem;
	vanFlujoNeto: ResultItem;
}

export interface LeasingEntryProps {
	precioVentaActivo: number
	nDeAnios: number
	frecuenciaDePago: number
	nDiasPorAnio: number
	porcentajeTEA: number
	porcentajeImpuestoALaRenta: number
	porcentajeRecompra: number
	costesNotariales: number
	costesRegistrales: number
	tasacion: number
	comisionDeEstudio: number
	comisionDeActivacion: number
	comisionPeriodica: number
	porcentajeDeSeguroRiesgo: number
	tasaDescuentoKS: number
	tasaDescuentoWACC: number,
}

