import { Box, Tabs, TabPanel, Tab, TabList, TabPanels } from "@chakra-ui/react";
import { ResultItem } from "lib/@core/interfaces/leasing";
import DataTable from "react-data-table-component";
import { CustomTooltip } from "./CustomTooltip";

const ExpandedComponent = ({ data }: any) => {
  const entryData = Object.keys(data?.entryData).map((key: any) => {
    return {
      id: key,
      title: key,
      value: data?.entryData[key],
    };
  });

  const outputResults = Object.keys(data?.outputResults).map((key: string) => {
    const item: ResultItem = data?.outputResults[key] as ResultItem;
    return {
      id: key,
      title: item.title,
      value: item.value,
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
    <Tabs isFitted variant="enclosed" mt={2}>
      <TabList>
        <Tab>Datos Iniciales</Tab>
        <Tab>Datos Finales</Tab>
        <Tab>Tabla de cuotas</Tab>
      </TabList>
      <TabPanels>
        <TabPanel>
          {entryData.map((item: any) => {
            return (
              <Box
                key={item.id}
                mx={2}
                display="flex"
                justifyContent="space-between"
              >
                <Box as="span" mr={2}>
                  {item.title}
                </Box>
                <Box as="span">{item.value.toFixed(2)}</Box>
              </Box>
            );
          })}
        </TabPanel>
        <TabPanel>
          {outputResults.map((item: any) => {
            return (
              <Box key={item.id} display="flex" justifyContent="space-between">
                <Box as="span">{item.title}</Box>
                <Box as="span">{item.value.toFixed(2)}</Box>
              </Box>
            );
          })}
        </TabPanel>
        <TabPanel>
          <DataTable
            columns={tableColumns}
            data={data?.tableResults}
            theme="customDark"
            pagination
          />
        </TabPanel>
      </TabPanels>
    </Tabs>
  );
};

export default ExpandedComponent;
