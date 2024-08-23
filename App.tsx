import React from "react";
import { createTheme, ThemeProvider } from "@rneui/themed";
import LuggageStoreCheckout from "./components/App";

const theme = createTheme({
  lightColors: {
    primary: "#454bed"
  },
  darkColors: {
    primary: "#454bed"
  },
});

export default function App() {
  return (
    <ThemeProvider theme={theme}>
      <LuggageStoreCheckout/>
    </ThemeProvider>
  );
}
