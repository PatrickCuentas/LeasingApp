import React, { useEffect } from "react";
import tableData from "../../../../public/MOCK_DATA.json";

import {
  Table,
  Thead,
  Tbody,
  Tfoot,
  Tr,
  Th,
  Td,
  TableCaption,
  TableContainer,
  Checkbox,
  useCheckboxGroup,
} from "@chakra-ui/react";

import CustomCheckbox from "./components/CustomCheckbox";

const Bounds = () => {
  const { value, setValue, getCheckboxProps } = useCheckboxGroup({
    defaultValue: [],
  });

  const handleSelectAll = (e: any) => {
    if (e.target.checked) {
      setValue(tableData.map((item) => item.id));
    } else {
      setValue([]);
    }
  };

  return (
    <TableContainer>
      <Table variant="simple">
        <TableCaption>Imperial to metric conversion factors</TableCaption>
        <Thead>
          <Tr>
            <Th>
              <Checkbox
                onChange={handleSelectAll}
                isChecked={value.length === tableData.length}
              />
            </Th>
            <Th
              onClick={() => {
                console.log(value);
              }}
            >
              ID
            </Th>
            <Th>Nombre</Th>
            <Th isNumeric>Valor Nominal</Th>
          </Tr>
        </Thead>
        <Tbody>
          {tableData.slice(0, 10).map((item) => (
            <Tr key={item.id}>
              <Td>
                <CustomCheckbox {...getCheckboxProps({ value: item.id })} />
              </Td>
              <Td>{item.id}</Td>
              <Td>{item.nombre}</Td>
              <Td isNumeric>{item.valorNominal}</Td>
            </Tr>
          ))}
        </Tbody>
        <Tfoot>
          <Tr>
            <Th>ID</Th>
            <Th>Nombre</Th>
            <Th isNumeric>Valor Nominal</Th>
          </Tr>
        </Tfoot>
      </Table>
    </TableContainer>
  );
};

export default Bounds;
