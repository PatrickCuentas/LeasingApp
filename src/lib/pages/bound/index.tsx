import tableData from "../../../../public/MOCK_DATA.json";

import TablePaginated from "./components/TablePaginated";
import "./style.css";

const Bounds = () => {
  return <TablePaginated data={tableData} />;
};

export default Bounds;
