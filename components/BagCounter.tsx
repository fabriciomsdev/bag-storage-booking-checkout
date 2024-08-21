import React from "react";
import { View, ViewStyle } from "react-native";
import { Grid } from "./Grid";
import {
  Text,
  Button,
} from "@rneui/themed";

export const BagCounter = ({ count, onIncrement, onDecrement }: BagCounterProps) => {
  const roundedButtonStyle: ViewStyle = {
    width: 40,
    height: 40,
    borderRadius: 20,
    overflow: "hidden",
  };
  return (
    <Grid.Row>
      <Text>Number of bags:</Text>
      <View style={{ width: 120 }}>
        <Grid.Row>
          <Button onPress={onDecrement} style={roundedButtonStyle}>
            -
          </Button>
          <Text>{count}</Text>
          <Button onPress={onIncrement} style={roundedButtonStyle}>
            +
          </Button>
        </Grid.Row>
      </View>
    </Grid.Row>
  );
};

type BagCounterProps = {
  count: number;
  onIncrement: () => void;
  onDecrement: () => void;
};