import { useState, useMemo } from "react";
import PropTypes from "prop-types";

// Chakra UI
import {
  Box,
  Heading,
  Skeleton,
  Tooltip,
  useColorModeValue,
} from "@chakra-ui/react";
import { Table } from "react-chakra-pagination";

// Components
import RadioInputForm from "./components/RadioInputForm";

// Icons
import { FiFrown } from "react-icons/fi";

// Interfaces
import { LeasingTableProps } from "./interfaces/leasing";

// Others
import uuid4 from "uuid4";
import { GridLoader } from "react-spinners";

// Styles
import "./style.css";

const LastRadioInputForm = () => {
  return (
    <Box as="label" display="flex" justifyContent="center">
      <Box
        cursor="pointer"
        borderWidth="1px"
        borderRadius="md"
        boxShadow="md"
        background="teal.600"
        _focus={{
          boxShadow: "outline",
        }}
        px={5}
        py={3}
      >
        <Tooltip
          label={"Sin periodo de Gracia"}
          placement="top"
          as="label"
          aria-label="A tooltip"
        >
          S
        </Tooltip>
      </Box>
    </Box>
  );
};

const LeasingTablePaginated = (props: any) => {
  const { data, handler, isLoading } = props;

  // Control current Page
  const [page, setPage] = useState(1);

  // Accessor to get a data in bound object
  const tableColumns = [
    {
      Header: "N",
      accessor: "id" as const,
    },
    {
      Header: "Periodo de Gracia",
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

    return data.map((item: LeasingTableProps, i: number) => {
      return {
        ...item,
        periodoGracia:
          i === data.length - 1 ? (
            <LastRadioInputForm />
          ) : i > 0 ? (
            <RadioInputForm
              periodoGracia={item.periodoGracia}
              handler={handler}
              index={i}
            />
          ) : null,
      };
    });
  }, [data]);

  return (
    <Box p="12">
      <Heading size="sm" as="h3">
        Cuotas
      </Heading>

      <Skeleton
        bg={useColorModeValue("white", "gray.900")}
        isLoaded={!isLoading}
        height="auto"
        fadeDuration={3.5}
        overflow="auto"
        mt={6}
      >
        <Table
          colorScheme="twitter"
          key={uuid4()}
          emptyData={{
            icon: FiFrown,
            text: "No hay nada por aquí.",
          }}
          totalRegisters={data.length}
          page={page}
          onPageChange={(page) => setPage(page)}
          columns={tableColumns}
          data={tableData as any}
        />
      </Skeleton>
    </Box>
  );
};

// set types to props
LeasingTablePaginated.propTypes = {
  isLoading: PropTypes.bool.isRequired,
  data: PropTypes.array.isRequired,
  handler: PropTypes.func.isRequired,
};

export default LeasingTablePaginated;
