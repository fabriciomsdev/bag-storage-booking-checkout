import React from "react";
import { View, Text } from "react-native";
import { Container } from "./Container";
import { Grid } from "./Grid";
import { CheckoutState } from "../types/checkout";
import { useCheckout } from "../contexts/CheckoutContext";
import { makeStyles, Button } from "@rneui/themed";


export const CheckoutConfirmation = ({ data }: { data?: CheckoutState }) => {
  const styles = useStyles();
  const { state, finishCheckout } = useCheckout();
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
          <Text style={styles.price}>
            $ {data.booking?.totalValue}
          </Text>
        </View>
        <View>
          <Button
            style={styles.button}
            onPress={finishCheckout}
            color='primary'
          >
            Book
          </Button>
        </View>
      </Grid.Row>
    </Container>
  );
};


const useStyles = makeStyles((theme) => ({
  price: {
    fontWeight: "bold",
    fontSize: 18,
    marginVertical: 3,
  },
  button: {
    width: 120,
    height: 40,
    borderRadius: 20,
    overflow: "hidden",
  }
}));
