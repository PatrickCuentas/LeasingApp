import { useState, useEffect, useContext } from "react";
import { Box, Button, Icon, Text } from "@chakra-ui/react";

//firebase
import {
  deleteLeasingToFirestore,
  loadUserDocumentFromFirestore,
} from "lib/@core/firebase";

// interfaces

// components
import DataTable from "react-data-table-component";
import ExpandedComponent from "./components/ExpandedComponent";

// context
import { ThemeContext } from "./context/ThemeProvider";

// Icons
import { FiFrown } from "react-icons/fi";

// others
import moment from "moment";
import { FiTrash2 } from "react-icons/fi";
import { GridLoader } from "react-spinners";

// css
import "./index.css";
import { useNavigate } from "react-router-dom";

const LeasingList = () => {
  const [pending, setPending] = useState(true);
  const [rows, setRows] = useState<any>([]);
  const { customStyles } = useContext(ThemeContext);
  const navigate = useNavigate();
  const handleBackToHome = () => navigate("/");

  const tooglePending = () => {
    setPending(!pending);
  };

  const columns = [
    {
      name: "Titulo",
      selector: (row: any) => row.titulo,
      sortable: true,
      minWidth: "200px",
    },
    {
      name: "Fecha de creacion",
      selector: (row: any) => row?.fechaCreacion,
      sortable: true,
      minWidth: "200px",
    },
    {
      name: "",
      cell: (row: any) => (
        <>
          <Button
            colorScheme="gray"
            onClick={() => deleteLeasingToFirestore(row.id, tooglePending)}
          >
            <Icon as={FiTrash2} />
          </Button>
        </>
      ),
      right: true,
    },
  ];

  useEffect(() => {
    loadUserDocumentFromFirestore().then((data: any) => {
      const leasings = data.leasings;
      const rowsMapped = leasings.map((item: any, i: any) => {
        return {
          id: item.uid || i + 1,
          titulo: item?.titulo || "Leasing " + (i + 1),
          fechaCreacion:
            moment(item?.fechaCreacion?.toDate()).format("DD/MM/YYYY") ||
            new Date(),
          entryData: item?.entryData || {}, // objeto Number
          outputResults: item?.outputResults || {}, // objeto ResultItem
          tableResults: item?.tableResults || [], // array Number LeasingTableProps
        };
      });
      setRows(rowsMapped);
      setPending(false);
    });
  }, [pending]);

  return (
    <Box mx={16} my={4} id="leasing-table">
      <DataTable
        title="Leasings"
        columns={columns}
        data={rows}
        expandableRows
        expandableRowsComponent={ExpandedComponent}
        theme="customDark"
        customStyles={customStyles}
        progressPending={pending}
        progressComponent={
          <Box
            minH="70vh"
            display="flex"
            justifyContent="center"
            alignItems="center"
          >
            <GridLoader color="tomato" size={40} />
          </Box>
        }
        // custom empty message
        noDataComponent={
          <Box
            display="flex"
            flexDirection="column"
            justifyContent="center"
            alignItems="center"
            h="300px"
          >
            <Icon as={FiFrown} w={10} h={10} />
            <Text mb={4} mt={2}>
              No hay nada por aquí.
            </Text>
            <Button onClick={handleBackToHome}>Quiero crear uno</Button>
          </Box>
        }
      />
    </Box>
  );
};

export default LeasingList;
