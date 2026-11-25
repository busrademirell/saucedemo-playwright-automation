import { expect } from "@playwright/test";

export class CheckoutPage {
  constructor(page) {
    this.page = page;

    this.firstNameInput = page.locator('[data-test="firstName"]');
    this.lastNameInput = page.locator('[data-test="lastName"]');
    this.postalCodeInput = page.locator('[data-test="postalCode"]');

    this.continueButton = page.locator('[data-test="continue"]');
    this.finishButton = page.locator('[data-test="finish"]');

    this.errorMessage = page.locator('[data-test="error"]');
    this.orderConfirmation = page.locator('[data-test="complete-header"]');
    this.overviewTitle = page.locator('[data-test="title"]');
  }

  async fillCheckoutInformation(firstName, lastName, postalCode) {
    await this.firstNameInput.fill(firstName);
    await this.lastNameInput.fill(lastName);
    await this.postalCodeInput.fill(postalCode);
  }

  async continueToOverview() {
    await this.continueButton.click();
  }

  async finishOrder() {
    await this.finishButton.click();
  }

  async expectErrorMessage(message) {
    await expect(this.errorMessage).toHaveText(message);
  }

  async expectOrderConfirmation() {
    await expect(this.orderConfirmation).toHaveText(
      "Thank you for your order!",
    );
  }
  async expectOverviewPageVisible() {
    await expect(this.overviewTitle).toHaveText("Checkout: Overview");
  }
}
