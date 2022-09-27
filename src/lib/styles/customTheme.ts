import { extendTheme } from "@chakra-ui/react";

export const theme = extendTheme({
  fonts: {
    heading: "Plus Jakarta Sans, sans-serif",
    body: "Plus Jakarta Sans, sans-serif",
  },
  components: {
    Checkbox: {
      variants: {
        "custom-checkbox": {
          control: {
            border: "1.5px solid #1a202c",
            boxShadow: "0 0 .5px .5px #ccc",
          },
        },
      },
    },
    // Button: {
    // }
  },
  config: {
    initialColorMode: "light",
  },
});
