import React from "react";
import { View, Text } from "react-native";
import { Container } from "./Container";
import { Grid } from "./Grid";
import { CheckoutState } from "../types/checkout";
import { Button } from "@rneui/base";
import { useCheckout } from "../contexts/CheckoutContext";


export const CheckoutConfirmation = ({ data }: { data?: CheckoutState }) => {
  const { state } = useCheckout();
  data = data || state;

  return (
    <Container>
      <Grid.Row>
        <View>
          <Text>
            {Object.entries(data.booking.items).map(([key, value]) => (
              <Text key={key}>
                {key}: {value}
              </Text>
            ))}
          </Text>
          <Text
            style={{
              fontWeight: "bold",
              fontSize: 18,
              marginVertical: 3,
            }}
          >
            $ {data.booking?.totalValue}
          </Text>
        </View>
        <View>
          <Button
            style={{
              width: 120,
              height: 40,
              borderRadius: 20,
              overflow: "hidden",
            }}
          >
            Book
          </Button>
        </View>
      </Grid.Row>
    </Container>
  );
};