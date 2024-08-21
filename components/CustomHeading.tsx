import { useThemeMode } from "@rneui/themed";
import React from "react";
import { Text } from "@rneui/themed";
export const CustomHeading = ({ children }: { children: React.ReactNode }) => {
  const theme = useThemeMode();
  return (
    <Text
      style={{
        fontSize: 16,
        fontWeight: "bold",
        marginTop: 10,
        marginBottom: 25,
      }}
    >
      {children}
    </Text>
  );
};