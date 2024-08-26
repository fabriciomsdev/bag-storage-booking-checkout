import { useThemeMode } from "@rneui/themed";
import React from "react";
import { Text } from "@rneui/themed";
import { TextStyle } from "react-native";
export const CustomHeading = ({ children, style : customStyle }: CustomHeadingProps) => {
  const style = {
    fontSize: 16,
    fontWeight: "bold",
    marginTop: 10,
    marginBottom: 15,
    ...customStyle
  } as TextStyle;

  return <Text style={style}>{children}</Text>;
};

type CustomHeadingProps = {
  children: React.ReactNode;
  style?: TextStyle;
};