/**
 * Testing:

Components test ids:

bag-counter-decrement-button
bag-counter-bag-quantity
bag-counter-increment-button

confirmation--total-value
confirmation--book-button

credit-card--number-input
credit-card--cvv-input
credit-card--expiration-input

customer-info--name-input
customer-info--email-input

checkout-success-feedback
checkout-loading-feedback

Test data:
{
    storePoint: {
      id: "236584ee-58e2-42fd-a4d4-e08133bbbb6b",
      name: "Cody's Cookie Store",
    },
    possibleItemsToStore: [],
    success: false,
    loading: false,
    error: undefined,
    isValid: false,
    booking: {
      id: undefined,
      items: {
        bags: 1,
      },
      customer: {
        name: "Cody",
        email: "fabricioms.dev@gmail.com",
      },
      storePoint: {
        id: "1x",
        name: "Cody's Cookie Store",
      },
      paymentOrder: {
        kind: "creditCard",
        card: {
          number: "1234567890123456",
          cvv: "123",
          expiration: "12/2023",
        },
      },
      totalValue: 0,
    },
  }

Use cases scenarios:

1. When the user clicks on the increment button, the bag quantity should increase by 1.
2. When the user clicks on the decrement button, the bag quantity should decrease by 1.
3. User should be allowed to input name and email.
4. User should be allowed to input credit card number, cvv and expiration.
5. total value should update when the user changes the bag quantity.
6. When the user clicks on the book button, the checkout should be loading.
7. When the user clicks on the book button, the checkout should be successful or get a error msg.
 */


import { test, expect } from "@playwright/test";

const appUrl = "http://localhost:19006/";
const testData = {
  storePoint: {
    id: "236584ee-58e2-42fd-a4d4-e08133bbbb6b",
    name: "Cody's Cookie Store",
  },
  possibleItemsToStore: [],
  success: false,
  loading: false,
  error: undefined,
  isValid: false,
  booking: {
    id: undefined,
    items: {
      bags: 1,
    },
    customer: {
      name: "Cody",
      email: "fabricioms.dev@gmail.com",
    },
    storePoint: {
      id: "1x",
      name: "Cody's Cookie Store",
    },
    paymentOrder: {
      kind: "creditCard",
      card: {
        number: "1234567890123456",
        cvv: "123",
        expiration: "12/2023",
      },
    },
    totalValue: 0,
  },
};

const components = {
  bagCounter: {
    decrementButton: "[data-testid='bag-counter-decrement-button']",
    incrementButton: "[data-testid='bag-counter-increment-button']",
    quantity: "[data-testid='bag-counter-bag-quantity']",
  },
  confirmation: {
    totalValue: "[data-testid='confirmation--total-value']",
    bookButton: "[data-testid='confirmation--book-button']",
  },
  creditCard: {
    numberInput: "[data-testid='credit-card--number-input']",
    cvvInput: "[data-testid='credit-card--cvv-input']",
    expirationInput: "[data-testid='credit-card--expiration-input']",
  },
  customerInfo: {
    nameInput: "[data-testid='customer-info--name-input']",
    emailInput: "[data-testid='customer-info--email-input']",
  },
  checkoutFeedback: {
    success: "[data-testid='checkout-success-feedback']",
    loading: "[data-testid='checkout-loading-feedback']",
  },
};



test.describe("Checkout Use Cases", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto(appUrl);
  });

  test("should display the correct store name", async ({ page }) => {
    const allPageContent = await page.textContent("body");
    expect(allPageContent).toContain("Cody's Cookie Store");
  });

  test("should increase bag quantity when increment button is clicked", async ({
    page,
  }) => {
    await page.click(components.bagCounter.incrementButton);

    const newBagQuantity = await page.textContent(
      components.bagCounter.quantity
    );

    expect(newBagQuantity).toBe('2');
  });

  test("should decrease bag quantity when decrement button is clicked", async ({
    page,
  }) => {
    await page.click(components.bagCounter.incrementButton); // Ensure there's at least 1 bag
    await page.click(components.bagCounter.decrementButton);
    const bagQuantity = await page.textContent(components.bagCounter.quantity);

    expect(bagQuantity).toBe("1");
  });

  test("should allow user to input name and email", async ({ page }) => {
    await page.fill(
      "[data-testid='customer-info--name-input']",
      testData.booking.customer.name
    );
    await page.fill(
      "[data-testid='customer-info--email-input']",
      testData.booking.customer.email
    );

    const name = await page.inputValue(
      "[data-testid='customer-info--name-input']"
    );
    const email = await page.inputValue(
      "[data-testid='customer-info--email-input']"
    );

    expect(name).toBe(testData.booking.customer.name);
    expect(email).toBe(testData.booking.customer.email);
  });

  test("should allow user to input credit card details", async ({ page }) => {
    await page.fill(
      "[data-testid='credit-card--number-input']",
      testData.booking.paymentOrder.card.number
    );
    await page.fill(
      "[data-testid='credit-card--cvv-input']",
      testData.booking.paymentOrder.card.cvv
    );
    await page.fill(
      "[data-testid='credit-card--expiration-input']",
      testData.booking.paymentOrder.card.expiration
    );

    const cardNumber = await page.inputValue(
      "[data-testid='credit-card--number-input']"
    );
    const cvv = await page.inputValue("[data-testid='credit-card--cvv-input']");
    const expiration = await page.inputValue(
      "[data-testid='credit-card--expiration-input']"
    );

    expect(cardNumber).toBe(testData.booking.paymentOrder.card.number);
    expect(cvv).toBe(testData.booking.paymentOrder.card.cvv);
    expect(expiration).toBe(testData.booking.paymentOrder.card.expiration);
  });

  test("should update total value when bag quantity changes", async ({
    page,
  }) => {
    await page.click("[data-testid='bag-counter-increment-button']");
    const totalValue = await page.textContent(
      "[data-testid='confirmation--total-value']"
    );
    expect(totalValue).not.toBe("0"); // Adjust the expected value as needed
  });

  test("should show loading feedback when book button is clicked", async ({
    page,
  }) => {
    // fill all required fields
    await page.fill(
      "[data-testid='customer-info--name-input']",
      testData.booking.customer.name
    );
    await page.fill(
      "[data-testid='customer-info--email-input']",
      testData.booking.customer.email
    );
    await page.fill(
      "[data-testid='credit-card--number-input']",
      testData.booking.paymentOrder.card.number
    );
    await page.fill(
      "[data-testid='credit-card--cvv-input']",
      testData.booking.paymentOrder.card.cvv
    );
    await page.fill(
      "[data-testid='credit-card--expiration-input']",
      testData.booking.paymentOrder.card.expiration
    );
    // click
    await page.click("[data-testid='confirmation--book-button']");
    const loadingFeedback = await page.isVisible(
      "[data-testid='checkout-loading-feedback']"
    );
    expect(loadingFeedback).toBe(true);
  });
});
