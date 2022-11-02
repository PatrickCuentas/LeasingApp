import {
  Box,
  Tabs,
  TabPanel,
  Tab,
  TabList,
  TabPanels,
  useColorModeValue,
} from "@chakra-ui/react";
import { PREFIX, ResultItem } from "lib/@core/interfaces/leasing";
import DataTable, { createTheme } from "react-data-table-component";
import { CustomTooltip } from "./CustomTooltip";
import {
  LeasingEntryProps,
  LeasingTableProps,
} from "../../../@core/interfaces/leasing";

interface IData {
  entryData: LeasingEntryProps;
  outputResults: any;
  tableResults: LeasingTableProps[];
}

const formatCurrency = (value: number, prefix: string): string => {
  if (prefix === PREFIX.MONEY) {
    return new Intl.NumberFormat("es-PE", {
      style: "currency",
      currency: "PEN",
    }).format(value);
  } else if (prefix === PREFIX.PERCENTAGE) {
    return `${value.toFixed(4)} %`;
  } else {
    return value.toString();
  }
};

const ExpandedComponent = ({ data }: { data: IData }) => {
  const entryDataOptions = {
    precioVentaActivo: {
      title: "Precio de venta del activo",
      prefix: PREFIX.MONEY,
    },
    nDeAnios: {
      title: "N° de años",
      prefix: PREFIX.NONE,
    },
    frecuenciaDePago: {
      title: "Frecuencia de pago",
      prefix: PREFIX.NONE,
    },
    nDiasPorAnio: {
      title: "N° de días por año",
      prefix: PREFIX.NONE,
    },
    porcentajeTEA: {
      title: "Porcentaje TEA",
      prefix: PREFIX.PERCENTAGE,
    },
    porcentajeImpuestoALaRenta: {
      title: "Porcentaje impuesto a la renta",
      prefix: PREFIX.PERCENTAGE,
    },
    porcentajeRecompra: {
      title: "Porcentaje recompra",
      prefix: PREFIX.PERCENTAGE,
    },
    costesNotariales: {
      title: "Costes notariales",
      prefix: PREFIX.MONEY,
    },
    costesRegistrales: {
      title: "Costes registrales",
      prefix: PREFIX.MONEY,
    },
    tasacion: {
      title: "Tasación",
      prefix: PREFIX.MONEY,
    },
    comisionDeEstudio: {
      title: "Comisión de estudio",
      prefix: PREFIX.MONEY,
    },
    comisionDeActivacion: {
      title: "Comisión de activación",
      prefix: PREFIX.MONEY,
    },
    comisionPeriodica: {
      title: "Comisión periódica",
      prefix: PREFIX.MONEY,
    },
    porcentajeDeSeguroRiesgo: {
      title: "Porcentaje de seguro de riesgo",
      prefix: PREFIX.PERCENTAGE,
    },
    tasaDescuentoKS: {
      title: "Tasa de descuento KS",
      prefix: PREFIX.PERCENTAGE,
    },
    tasaDescuentoWACC: {
      title: "Tasa de descuento WACC",
      prefix: PREFIX.PERCENTAGE,
    },
  };

  const entryData = Object.keys(data?.entryData).map((key: string) => {
    const value = data?.entryData[key as keyof LeasingEntryProps];

    return {
      id: key,
      title: entryDataOptions[key as keyof LeasingEntryProps].title,
      value: formatCurrency(
        value,
        entryDataOptions[key as keyof LeasingEntryProps].prefix
      ),
    };
  });

  const outputResults = Object.keys(data?.outputResults).map((key: string) => {
    const item: ResultItem = data?.outputResults[key] as ResultItem;
    return {
      id: key,
      title: item.title,
      value: formatCurrency(item.value, item.type),
    };
  });

  const tableColumns = [
    {
      name: "N°",
      selector: (row: any) => row.id,
    },
    {
      name: "Periodo de Gracia",
      cell: (row: any) => <CustomTooltip periodoGracia={row.periodoGracia} />,
    },
    {
      name: "Saldo Inicial",
      selector: (row: any) => row.saldoInicial,
    },
    {
      name: "Interes",
      selector: (row: any) => row.interes,
    },
    {
      name: "Cuota",
      selector: (row: any) => row.cuota,
    },
    {
      name: "Amortizacion",
      selector: (row: any) => row.amortizacion,
    },
    {
      name: "Seguro Riesgo",
      selector: (row: any) => row.seguroRiesgo,
    },
    {
      name: "Comision",
      selector: (row: any) => row.comision,
    },
    {
      name: "Recompra",
      selector: (row: any) => row.recompra,
    },
    {
      name: "Saldo Final",
      selector: (row: any) => row.saldoFinal,
    },
    {
      name: "Depreciacion",
      selector: (row: any) => row.depreciacion,
    },
    {
      name: "Ahorro Tributario",
      selector: (row: any) => row.ahorroTributario,
    },
    {
      name: "IGV",
      selector: (row: any) => row.igv,
    },
    {
      name: "Flujo Bruto",
      selector: (row: any) => row.flujoBruto,
    },
    {
      name: "Flujo con IGV",
      selector: (row: any) => row.flujoConIGV,
    },
    {
      name: "Flujo Neto",
      selector: (row: any) => row.flujoNeto,
    },
    {
      name: "Flujo TCEA",
      selector: (row: any) => row.flujoTCEA,
    },
  ];

  return (
    <Tabs isFitted variant="line" orientation="vertical" minHeight={700} isLazy>
      <TabList>
        <Tab
          style={{ minWidth: "180px" }}
          _selected={{
            backgroundColor: useColorModeValue("#2c7a7b", "#3182ce"),
          }}
        >
          Datos Iniciales
        </Tab>
        <Tab
          style={{ minWidth: "180px" }}
          _selected={{
            backgroundColor: useColorModeValue("#2c7a7b", "#3182ce"),
          }}
        >
          Datos Finales
        </Tab>
        <Tab
          style={{ minWidth: "180px" }}
          _selected={{
            backgroundColor: useColorModeValue("#2c7a7b", "#3182ce"),
          }}
        >
          Tabla de cuotas
        </Tab>
      </TabList>
      <TabPanels>
        <TabPanel>
          {entryData.map(
            (item: { id: string; title: string; value: string }) => {
              return (
                <Box
                  key={item.id}
                  mx={16}
                  my={3}
                  display="flex"
                  justifyContent="space-between"
                >
                  <Box as="span" mr={2}>
                    {item.title}
                  </Box>
                  <Box as="span">{item.value}</Box>
                </Box>
              );
            }
          )}
        </TabPanel>
        <TabPanel>
          {outputResults.map(
            (item: { id: string; title: string; value: string }) => {
              return (
                <Box
                  key={item.id}
                  display="flex"
                  mx={16}
                  my={3}
                  justifyContent="space-between"
                >
                  <Box as="span">{item.title}</Box>
                  <Box as="span">{item.value}</Box>
                </Box>
              );
            }
          )}
        </TabPanel>
        <TabPanel>
          <Box mx={16} my={4}>
            <DataTable
              columns={tableColumns}
              data={data?.tableResults}
              theme="customDark"
              pagination
              paginationComponentOptions={{
                rowsPerPageText: "Filas por página:",
                rangeSeparatorText: "de",
                selectAllRowsItem: true,
                selectAllRowsItemText: "Todos",
              }}
            />
          </Box>
        </TabPanel>
      </TabPanels>
    </Tabs>
  );
};

export default ExpandedComponent;
