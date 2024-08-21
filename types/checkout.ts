export interface BookOrderDTO {
  items: Items;
  customer?: Customer;
  storePoint?: StorePoint;
  paymentOrder?: PaymentOrder;
  totalValue?: number;
}

export interface Customer {
  name?: string;
  email?: string;
}

export interface Items {
  bags: number;
}

export interface PaymentOrder {
  kind?: string;
  card?: Card;
}

export interface Card {
  number?: string;
  cvv?: string;
  expiration?: string;
}

export interface StorePoint {
  id?: string;
  name?: string;
}

export interface CheckoutState {
  booking: BookOrderDTO;
  storePoint: StorePoint;
}
