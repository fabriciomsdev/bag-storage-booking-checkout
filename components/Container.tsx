import React from "react";
import { View } from "react-native";

export const Container = ({ children }: { children: React.ReactNode }) => {
  return (
    <View
      style={{
        width: "100%",
        paddingHorizontal: 30,
        paddingVertical: 20,
      }}
    >
      {children}
    </View>
  );
};