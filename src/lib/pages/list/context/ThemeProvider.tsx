import { createContext } from "react";
import { createTheme } from "react-data-table-component";
import { useColorMode } from "@chakra-ui/react";

export const ThemeContext = createContext({
  customStyles: {},
});

export const ThemeProvider = ({ children }: any) => {
  const { colorMode } = useColorMode();

  createTheme(
    "customDark",
    {
      text: {
        primary: colorMode === "dark" ? "#a0aec0" : "dark",
        secondary: "#a0aec0",
      },
      background: {
        default: colorMode === "dark" ? "#171923" : "white",
      },
      context: {
        background: colorMode === "dark" ? "#171923" : "white",
        text: colorMode === "dark" ? "#a0aec0" : "dark",
      },
      divider: {
        default: colorMode === "dark" ? "#2d3748" : "transparent",
      },
      action: {
        button: "rgba(0,0,0,.54)",
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
