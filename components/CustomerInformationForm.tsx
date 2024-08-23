import React from "react";
import { Input } from "@rneui/themed";
import { CustomHeading } from "./CustomHeading";
import { Container } from "./Container";
import { Customer } from "../types/checkout";
import { useCheckout } from "../contexts/CheckoutContext";


export const CustomerInformationForm = ({
  data,
  onChange,
}: CustomerInformationFormProps) => {
  const { state, onChangeCustomerData } = useCheckout();
  data = data || state.booking.customer;
  onChange = onChange || onChangeCustomerData;

  return (
    <Container>
      <CustomHeading>Personal Details:</CustomHeading>
      <Input
        placeholder="Enter your name"
        value={data?.name}
        onChange={(e) => {
          onChange({
            ...data,
            name: e.nativeEvent.text,
          });
        }}
      />
      <Input
        placeholder="Enter your email"
        value={data?.email}
        onChange={(e) => {
          onChange({
            ...data,
            email: e.nativeEvent.text,
          });
        }}
        textContentType="emailAddress"
      />
    </Container>
  );
};

type CustomerInformationFormProps = {
  data?: Customer;
  onChange?: (data: Customer) => void;
};