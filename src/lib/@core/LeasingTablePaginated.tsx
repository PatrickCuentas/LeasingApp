import { useState, useMemo } from "react";
import PropTypes from "prop-types";

// Chakra UI
import { Box, Heading, useColorModeValue } from "@chakra-ui/react";
import { Table } from "react-chakra-pagination";

// Components
import Example from "./components/Example";

// Icons
import { FiFrown } from "react-icons/fi";

// Interfaces
import { LeasingTableProps } from "./interfaces/leasing";

// Helpers
import { recalculateTableResults } from "./helpers/calculationHelpers";

import "./style.css";

const LeasingTablePaginated = (props: any) => {
  const { data, setTableResults, values, initialOutputResultsState } = props;

  // Control current Page
  const [page, setPage] = useState(1);

  // Accessor to get a data in bound object
  const tableColumns = [
    {
      Header: "N°",
      accessor: "id" as const,
    },
    {
      Header: "P.G.",
      accessor: "periodoGracia" as const,
    },
    {
      Header: "Saldo Inicial",
      accessor: "saldoInicial" as const,
    },
    {
      Header: "Interes",
      accessor: "interes" as const,
    },
    {
      Header: "Cuota",
      accessor: "cuota" as const,
    },
    {
      Header: "Amortizacion",
      accessor: "amortizacion" as const,
    },
    {
      Header: "Seguro Riesgo",
      accessor: "seguroRiesgo" as const,
    },
    {
      Header: "Comision",
      accessor: "comision" as const,
    },
    {
      Header: "Recompra",
      accessor: "recompra" as const,
    },
    {
      Header: "Saldo Final",
      accessor: "saldoFinal" as const,
    },
    {
      Header: "Depreciacion",
      accessor: "depreciacion" as const,
    },
    {
      Header: "Ahorro Tributario",
      accessor: "ahorroTributario" as const,
    },
    {
      Header: "IGV",
      accessor: "igv" as const,
    },
    {
      Header: "Flujo Bruto",
      accessor: "flujoBruto" as const,
    },
    {
      Header: "Flujo con IGV",
      accessor: "flujoConIGV" as const,
    },
    {
      Header: "Flujo Neto",
      accessor: "flujoNeto" as const,
    },
    {
      Header: "Flujo TCEA",
      accessor: "flujoTCEA" as const,
    },
  ];

  // Formatter for each bound
  const tableData = useMemo(() => {
    if (data.length === 0) return [];

    return recalculateTableResults(data, values, initialOutputResultsState).map(
      (item: LeasingTableProps, i: number) => ({
        ...item,
        periodoGracia: i > 0 && (
          <Example setTableResults={setTableResults} index={i} />
        ),
      })
    );
  }, [data]);

  return (
    <Box p="12">
      <Heading size="sm" as="h3">
        Cuotas
      </Heading>

      <Box mt="6" bg={useColorModeValue("white", "gray.900")} overflow="auto">
        <Table
          colorScheme="twitter"
          // Fallback component when list is empty
          emptyData={{
            icon: FiFrown,
            text: "No hay nada por aquí.",
          }}
          totalRegisters={data.length}
          page={page}
          // Listen change page event and control the current page using state
          onPageChange={(page) => setPage(page)}
          columns={tableColumns}
          data={tableData as any}
        />
      </Box>
    </Box>
  );
};

// set types to props
LeasingTablePaginated.propTypes = {
  data: PropTypes.array.isRequired,
  setTableResults: PropTypes.func.isRequired,
  values: PropTypes.object.isRequired,
  initialOutputResultsState: PropTypes.object.isRequired,
};

export default LeasingTablePaginated;
