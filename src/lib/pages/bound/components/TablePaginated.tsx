import React, { useMemo } from "react";
import { Table } from "react-chakra-pagination";
import {
  Box,
  Icon,
  Button,
  Heading,
  Checkbox,
  useCheckboxGroup,
} from "@chakra-ui/react";

// Sweet alert 2
import Swal from "sweetalert2";

// Recommended for icons
import { FiTrash2, FiFrown } from "react-icons/fi";
import CustomCheckbox from "./CustomCheckbox";

type Bono = {
  id: number;
  nombre: string;
  valorNominal: number;
};

const TablePaginated = ({ data }: { data: any }) => {
  // Control current Page
  const [page, setPage] = React.useState(1);

  const { value, setValue, getCheckboxProps } = useCheckboxGroup({
    defaultValue: [],
  });

  const handleSelectAll = (e: any) => {
    if (e.target.checked) {
      setValue(data.map((item: any) => item.id));
    } else {
      setValue([]);
    }
  };

  // Accessor to get a data in bound object
  const tableColumns = [
    {
      Header: <Checkbox onChange={handleSelectAll} variant="custom-checkbox" />,
      accessor: "checkbox" as const,
    },
    {
      Header: "Id",
      accessor: "id" as const,
    },
    {
      Header: "Nombre",
      accessor: "nombre" as const,
    },
    {
      Header: "Valor Nominal",
      accessor: "valorNominal" as const,
    },
    {
      Header: "",
      accessor: "action" as const,
    },
  ];

  // Formatter for each bound
  const tableData = useMemo(
    () =>
      data.map((item: any) => ({
        checkbox: (
          <CustomCheckbox
            key={item.id}
            {...getCheckboxProps({ value: item.id })}
          />
        ),
        id: item.id,
        nombre: item.nombre,
        valorNominal: item.valorNominal,
        action: (
          <Button
            colorScheme="gray"
            onClick={() => {
              Swal.fire({
                title: "¿Estás seguro?",
                text: "No podrás revertir esta acción",
                icon: "warning",
                showCancelButton: true,
                confirmButtonColor: "#3085d6",
                cancelButtonColor: "#d33",
                confirmButtonText: "Sí, eliminar",
                cancelButtonText: "Cancelar",
              }).then((result) => {
                console.log(result);
                if (result.isConfirmed) {
                  Swal.fire(
                    "Eliminado!",
                    "El bono ha sido eliminado.",
                    "success"
                  );
                }
              });
            }}
          >
            <Icon as={FiTrash2} />
          </Button>
        ),
      })),
    [data, getCheckboxProps, setValue]
  );

  return (
    <Box p="12">
      <Heading size="sm" as="h3">
        Mis Bonos {value.sort().join(" and ")}
      </Heading>

      <Box mt="6">
        <Table
          colorScheme="facebook"
          // Fallback component when list is empty
          emptyData={{
            icon: FiFrown,
            text: "No tienes bonos aún.",
          }}
          totalRegisters={data.length}
          page={page}
          // Listen change page event and control the current page using state
          onPageChange={(page) => setPage(page)}
          columns={tableColumns}
          data={tableData}
        />
      </Box>
    </Box>
  );
};

export default TablePaginated;
