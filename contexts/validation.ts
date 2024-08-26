import * as Yup from "yup";
import { CheckoutState } from "../types/checkout";

export const bookingValidation = Yup.object().shape({
  items: Yup.object().shape({
    bags: Yup.number()
      .min(1, "You must store at least one bag")
      .required("You must store at least one bag"),
  }),
  customer: Yup.object().shape({
    name: Yup.string().required("Full name is required"),
    email: Yup.string()
      .email("Invalid email address")
      .required("Email is required"),
  }),
  paymentOrder: Yup.object().shape({
    card: Yup.object().shape({
      number: Yup.string()
        .matches(/^\d{16}$/, "Card number must be 16 digits")
        .required("Card number is required"),
      expiration: Yup.string()
        .matches(
          /^(0[1-9]|1[0-2])\/?([0-9]{4}|[0-9]{2})$/,
          "Invalid expiry date"
        )
        .required("Expiry date is required"),
      cvv: Yup.string()
        .matches(/^\d{3,4}$/, "CVV must be 3 or 4 digits")
        .required("CVV is required"),
    }),
  }),
});


export const validateCheckout = async (data: CheckoutState) => {
  try {
    await bookingValidation.validate(data, { abortEarly: false });
    return { isValid: true, error: "" };
  } catch (error) {
    if (error instanceof Yup.ValidationError) {
      return {
        isValid: false,
        error: error.inner.reduce(
          (acc, current) => `${acc}${current.message}\n`,
          ""
        ),
      };
    }

    return { isValid: false, error: "An error occurred" };
  }
}