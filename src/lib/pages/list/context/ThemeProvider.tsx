import { createContext } from "react";
import { createTheme } from "react-data-table-component";

export const ThemeContext = createContext({
  customStyles: {},
});

export const ThemeProvider = ({ children }: any) => {
  createTheme(
    "customDark",
    {
      text: {
        primary: "white",
        secondary: "white",
      },
      background: {
        default: "#2d3748",
      },
      context: {
        background: "#2d3748",
        text: "white",
      },
      divider: {
        default: "white",
      },
      action: {
        button: "red",
        hover: "rgba(0,0,0,.08)",
        disabled: "rgba(0,0,0,.12)",
      },
    },
    "dark"
  );

  const customStyles = {
    rows: {
      style: {
        minHeight: "65px", // override the row height
      },
    },
    headCells: {
      style: {
        paddingLeft: "8px", // override the cell padding for head cells
        paddingRight: "8px",
      },
    },
    cells: {
      style: {
        paddingLeft: "8px", // override the cell padding for data cells
        paddingRight: "8px",
      },
    },
  };

  return (
    <ThemeContext.Provider value={{ customStyles }}>
      {children}
    </ThemeContext.Provider>
  );
};
