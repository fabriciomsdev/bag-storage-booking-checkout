import React from "react";
import { createTheme, ThemeProvider } from "@rneui/themed";
import LuggageStoreCheckout from "./components/App";

const theme = createTheme({
  lightColors: {
    primary: "#454bed",
    secondary: "#454bed",
  },
  darkColors: {
    primary: "#454bed",
    secondary: "#454bed",
  },
  components: {
    Button: {
      buttonStyle: {
        borderRadius: 20,
        overflow: "hidden",
      }
    },
    Input: {
      inputStyle: {

      }
    },
    Text: {
      style: {
        color: "black",
      },
    },
  },
});

export default function App() {
  return (
    <ThemeProvider theme={theme}>
      <LuggageStoreCheckout/>
    </ThemeProvider>
  );
}
