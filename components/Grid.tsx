
import React from "react";
import { View, ViewStyle } from "react-native";

export const Grid = {
  Row: ({ children }: { children: React.ReactNode }) => {
    const style = {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        width: "100%",
    } as ViewStyle

    return (
      <View style={style} >
        {children}
      </View>
    );
  },
};