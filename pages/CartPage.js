import { expect } from "@playwright/test";

export class CartPage {
  constructor(page) {
    this.page = page;

    this.cartLink = page.locator('[data-test="shopping-cart-link"]');
    this.cartItems = page.locator('[data-test="inventory-item"]');
    this.removeButtons = page.locator('[data-test^="remove"]');
    this.checkoutButton = page.locator('[data-test="checkout"]');
    this.continueShoppingButton = page.locator(
      '[data-test="continue-shopping"]',
    );
  }

  async openCart() {
    await this.cartLink.click();
  }

  async expectCartItemCount(count) {
    await expect(this.cartItems).toHaveCount(count);
  }

  async removeFirstProduct() {
    await this.removeButtons.first().click();
  }

  async clickCheckout() {
    await this.checkoutButton.click();
  }

  async continueShopping() {
    await this.continueShoppingButton.click();
  }
}
