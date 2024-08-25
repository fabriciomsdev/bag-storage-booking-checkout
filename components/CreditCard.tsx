import React from "react";
import { View } from "react-native";
import { Container } from "./Container";
import { Grid } from "./Grid";
import { Input } from "@rneui/themed";
import { CustomHeading } from "./CustomHeading";
import { Card } from "../types/checkout";
import { useCheckout } from "../contexts/CheckoutContext";

export const CreditCardForm = ({ data, onChange }: CreditCardFormProps) => {
  const { state, onChangePaymentData } = useCheckout();
  data = data || state.booking.paymentOrder?.card;
  onChange = onChange || onChangePaymentData;

  return (
    <Container>
      <CustomHeading>Payment Details:</CustomHeading>
      <Input
        label="Add your credit card:"
        placeholder="0000 0000 0000 0000"
        value={data?.number}
        onChange={(e) => {
          onChange({
            ...data,
            number: e.nativeEvent.text,
          });
        }}
        testID="credit-card--number-input"
      />
      <Grid.Row>
        <View style={{ width: "40%" }}>
          <Input
            placeholder="000"
            value={data?.cvv}
            onChange={(e) => {
              onChange({
                ...data,
                cvv: e.nativeEvent.text,
              });
            }}
            testID="credit-card--cvv-input"
          />
        </View>
        <View style={{ width: "60%" }}>
          <Input
            placeholder="00/0000"
            value={data?.expiration}
            onChange={(e) => {
              onChange({
                ...data,
                expiration: e.nativeEvent.text,
              });
            }}
            testID="credit-card--expiration-input"
          />
        </View>
      </Grid.Row>
    </Container>
  );
};
type CreditCardFormProps = { data?: Card; onChange?: (data: Card) => void };