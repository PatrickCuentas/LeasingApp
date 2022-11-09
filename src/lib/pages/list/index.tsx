import { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { Box, Button, Icon, Skeleton, Text } from "@chakra-ui/react";

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

// css
import "./index.css";

const LeasingList = () => {
  const [pending, setPending] = useState(false);
  const [rows, setRows] = useState([]);
  const { customStyles } = useContext(ThemeContext);
  const navigate = useNavigate();

  const handleBackToHome = () => navigate("/");
  const tooglePending = () => setPending(!pending);

  const columns = [
    {
      name: "Título",
      selector: (row: any) => row.titulo,
      sortable: true,
      minWidth: "200px",
    },
    {
      name: "Fecha de creación",
      selector: (row: any) => row?.fechaCreacion,
      sortable: true,
      minWidth: "200px",
    },
    {
      name: "",
      cell: (row: any) => (
        <>
          <Button
            colorScheme="white"
            variant="ghost"
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
      const { leasings } = data;
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
      setPending(true);
    });
  }, [pending]);

  return (
    <Box mx={[0, 0, 16]} my={4} id="leasing-table">
      <Skeleton height="70vh" isLoaded={pending} fadeDuration={1}>
        <DataTable
          columns={columns}
          data={rows}
          expandableRows
          expandableRowsComponent={ExpandedComponent}
          theme="customDark"
          customStyles={customStyles}
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
      </Skeleton>
    </Box>
  );
};

export default LeasingList;
