import {
  Table,
  TableCaption,
  TableContainer,
  Tbody,
  Td,
  Tfoot,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";

type HeaderProps = {
  posicion: number;
  periodoDeGracia: "T" | "P" | "S";
  saldoInicial: number;
  interes: number;
  cuota: number;
  amortizacion: number;
  seguroRiesgo: number;
  comision: number;
  recompra: number;
  saldoFinal: number;
  depreciacion: number;
  ahorroTributario: number;
  flujoBruto: number;
  flujoConIGV: number;
  flujoNeto: number;
  flujoTCEA: number;
};

const TableResults = ({ data }: { data?: HeaderProps[] }) => {
  const headers = [
    "posicion",
    "periodoDeGracia",
    "saldoInicial",
    "interes",
    "cuota",
    "amortizacion",
    "seguroRiesgo",
    "comision",
    "recompra",
    "saldoFinal",
    "depreciacion",
    "ahorroTributario",
    "flujoBruto",
    "flujoConIGV",
    "flujoNeto",
    "flujoTCEA",
  ];

  return (
    <TableContainer>
      <Table variant="striped" colorScheme="teal">
        <TableCaption>Imperial to metric conversion factors</TableCaption>
        <Thead>
          <Tr>
            {headers.map((header) => (
              <Th key={header}>{header}</Th>
            ))}
          </Tr>
        </Thead>
        <Tbody>
          <Tr>
            <Td>inches</Td>
            <Td>millimetres (mm)</Td>
            <Td isNumeric>25.4</Td>
          </Tr>
          <Tr>
            <Td>feet</Td>
            <Td>centimetres (cm)</Td>
            <Td isNumeric>30.48</Td>
          </Tr>
          <Tr>
            <Td>yards</Td>
            <Td>metres (m)</Td>
            <Td isNumeric>0.91444</Td>
          </Tr>
        </Tbody>
        <Tfoot>
          <Tr>
            <Th>To convert</Th>
            <Th>into</Th>
            <Th isNumeric>multiply by</Th>
          </Tr>
        </Tfoot>
      </Table>
    </TableContainer>
  );
};

export default TableResults;
