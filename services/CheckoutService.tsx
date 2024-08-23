import { StorePoint, CheckoutState, ItensClassification } from "../types/checkout";

export class CheckoutService {
  baseUrl: string;
  defaultHeaders = {
    'Content-Type': 'application/json'
  };

  constructor(baseUrl: string) {
    this.baseUrl = baseUrl;
  }

  async start(store: StorePoint) {
    const payload = {
      "store_id": store.id,
    };

    const response = await fetch(`${this.baseUrl}/orders`, {
      method: 'POST',
      body: JSON.stringify(payload),
      headers: this.defaultHeaders
    });

    return response.json() as Promise<{ id: string }>;
  }


  /*
  * Order DTO Example:
  * {
      "store": {
        "id": "236584ee-58e2-42fd-a4d4-e08133bbbb6b"
      },
      "items": [
        {
          "name": "Bags Storage",
          "quantity": 3
        }
      ],
      "customer": {
        "name": "John Doe",
        "email": "fabricioms.dev@gmail.com",
        "phone": "123456789"
      },
      "payment_order": {
        "credit_card": "1234 1412 4134 1412",
        "cvv": "112",
        "expiration_date": "21/2023"
      }
    }
  *
  */
  _parseCheckoutToOrderDTO(data: CheckoutState) {
    const { booking } = data;

    if (booking) {
      const creditCardData = booking?.paymentOrder?.card;

      return {
        "store": {
          "id": data.storePoint.id
        },
        "items": [
          {
            "name": "Bags Storage",
            "quantity": booking.items.bags
          }
        ],
        "customer": {
          "name": booking?.customer?.name,
          "email": booking?.customer?.email,
          "phone": booking?.customer?.phoneNumber
        },
        "payment_order": {
          "credit_card": creditCardData?.number,
          "cvv": creditCardData?.cvv,
          "expiration_date": creditCardData?.expiration
        }
      };
    }

  }

  async finish(orderId: string, data: CheckoutState) {
    const orderDto = this._parseCheckoutToOrderDTO(data);

    const response = await fetch(`${this.baseUrl}/orders/${orderId}`, {
      method: 'PUT',
      body: JSON.stringify(orderDto),
      headers: this.defaultHeaders
    });

    return {
      order: await response.json()
    }
  }

  async getOrder(orderId: string) {
    const response = await fetch(`${this.baseUrl}/orders/${orderId}`, {
      method: 'GET',
      headers: this.defaultHeaders
    });

    return response.json();
  }

  async getPossibleItemsKindToStore() {
    const response = await fetch(`${this.baseUrl}/classifications`, {
      method: 'GET',
      headers: this.defaultHeaders
    });

    const data = await response.json();

    // TODO: add a DTO to this data
    return data?.map((classfication: any) => {
      return {
        id: classfication.id,
        name: classfication.name,
        valueToStore: classfication.value_to_store
      } as ItensClassification;
    });
  }
}
