import React from "react";
import { createTheme, ThemeProvider } from "@rneui/themed";
import LuggageStoreCheckout from "./components/App";

const theme = createTheme({
  lightColors: {},
  darkColors: {},
});

export default function App() {
  return (
    <ThemeProvider theme={theme}>
      <LuggageStoreCheckout/>
    </ThemeProvider>
  );
}
