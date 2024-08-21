import React from "react";
import { View } from "react-native";
import { Container } from "./Container";
import { Grid } from "./Grid";
import { Input } from "@rneui/base";
import { CustomHeading } from "./CustomHeading";
import { Card } from "../types/checkout";

export const CreditCardForm = ({ data, onChange }: CreditCardFormProps) => {
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
      />
      <Grid.Row>
        <View style={{ width: "50%" }}>
          <Input
            placeholder="000"
            value={data?.cvv}
            onChange={(e) => {
              onChange({
                ...data,
                number: e.nativeEvent.text,
              });
            }}
          />
        </View>
        <View style={{ width: "50%" }}>
          <Input
            placeholder="00/0000"
            value={data?.expiration}
            onChange={(e) => {
              onChange({
                ...data,
                number: e.nativeEvent.text,
              });
            }}
          />
        </View>
      </Grid.Row>
    </Container>
  );
};
type CreditCardFormProps = { data?: Card; onChange: (data: Card) => void };