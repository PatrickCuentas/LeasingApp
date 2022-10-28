import { LeasingEntryProps } from "lib/@core/interfaces/leasing";


export const parseToFloat = (data: LeasingEntryProps) => {
	return {
		precioVentaActivo: Number(data.precioVentaActivo),
		nDeAnios: Number(data.nDeAnios),
		frecuenciaDePago: Number(data.frecuenciaDePago),
		nDiasPorAnio: Number(data.nDiasPorAnio),
		porcentajeTEA: Number(data.porcentajeTEA),
		porcentajeImpuestoALaRenta: Number(
			data.porcentajeImpuestoALaRenta
		),
		porcentajeRecompra: Number(data.porcentajeRecompra),
		costesNotariales: Number(data.costesNotariales),
		costesRegistrales: Number(data.costesRegistrales),
		tasacion: Number(data.tasacion),
		comisionDeEstudio: Number(data.comisionDeEstudio),
		comisionDeActivacion: Number(data.comisionDeActivacion),
		comisionPeriodica: Number(data.comisionPeriodica),
		porcentajeDeSeguroRiesgo: Number(data.porcentajeDeSeguroRiesgo),
		tasaDescuentoKS: Number(data.tasaDescuentoKS),
		tasaDescuentoWACC: Number(data.tasaDescuentoWACC),
	};
}