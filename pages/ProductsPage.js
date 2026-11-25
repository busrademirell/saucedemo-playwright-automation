import { expect } from "@playwright/test";

export class ProductsPage {
  constructor(page) {
    this.page = page;

    this.pageTitle = page.locator('[data-test="title"]');
    this.productItems = page.locator('[data-test="inventory-item"]');
    this.productNames = page.locator('[data-test="inventory-item-name"]');
    this.productPrices = page.locator('[data-test="inventory-item-price"]');
    this.sortDropdown = page.locator('[data-test="product-sort-container"]');
    this.addToCartButtons = page.locator('[data-test^="add-to-cart"]');
    this.cartBadge = page.locator('[data-test="shopping-cart-badge"]');
  }

  async expectProductsPageVisible() {
    await expect(this.pageTitle).toHaveText("Products");
  }

  async expectProductCount(count) {
    await expect(this.productItems).toHaveCount(count);
  }

  async sortProducts(option) {
    await this.sortDropdown.selectOption(option);
  }

  async addFirstProductToCart() {
    await this.addToCartButtons.first().click();
  }

  async expectCartBadge(count) {
    await expect(this.cartBadge).toHaveText(String(count));
  }

  async expectProductsSortedByNameAscending() {
    const names = await this.productNames.allTextContents();

    const sortedNames = [...names].sort((a, b) => a.localeCompare(b));

    expect(names).toEqual(sortedNames);
  }

  async expectProductsSortedByPriceAscending() {
    const prices = await this.productPrices.allTextContents();

    const numericPrices = prices.map((price) => Number(price.replace("$", "")));

    const sortedPrices = [...numericPrices].sort((a, b) => a - b);

    expect(numericPrices).toEqual(sortedPrices);
  }
}
