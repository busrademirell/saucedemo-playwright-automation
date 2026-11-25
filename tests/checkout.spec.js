import { test } from "@playwright/test";
import { LoginPage } from "../pages/LoginPage.js";
import { ProductsPage } from "../pages/ProductsPage.js";
import { CartPage } from "../pages/CartPage.js";
import { CheckoutPage } from "../pages/CheckoutPage.js";
import { users } from "../test-data/users.js";

test.beforeEach(async ({ page }) => {
  const loginPage = new LoginPage(page);

  await loginPage.goto();
  await loginPage.login(users.standard.username, users.standard.password);
});

test("should complete an order successfully", async ({ page }) => {
  const productsPage = new ProductsPage(page);
  const cartPage = new CartPage(page);
  const checkoutPage = new CheckoutPage(page);

  await productsPage.addFirstProductToCart();
  await cartPage.openCart();
  await cartPage.clickCheckout();

  await checkoutPage.fillCheckoutInformation("Test", "User", "06000");

  await checkoutPage.continueToOverview();
  await checkoutPage.expectOverviewPageVisible();
  await checkoutPage.finishOrder();
  await checkoutPage.expectOrderConfirmation();
});

test("should display an error when first name is missing", async ({ page }) => {
  const productsPage = new ProductsPage(page);
  const cartPage = new CartPage(page);
  const checkoutPage = new CheckoutPage(page);

  await productsPage.addFirstProductToCart();
  await cartPage.openCart();
  await cartPage.clickCheckout();

  await checkoutPage.fillCheckoutInformation("", "User", "06000");

  await checkoutPage.continueToOverview();

  await checkoutPage.expectErrorMessage("Error: First Name is required");
});

test("should display an error when last name is missing", async ({ page }) => {
  const productsPage = new ProductsPage(page);
  const cartPage = new CartPage(page);
  const checkoutPage = new CheckoutPage(page);

  await productsPage.addFirstProductToCart();
  await cartPage.openCart();
  await cartPage.clickCheckout();

  await checkoutPage.fillCheckoutInformation("Test", "", "06000");

  await checkoutPage.continueToOverview();

  await checkoutPage.expectErrorMessage("Error: Last Name is required");
});

test("should display an error when postal code is missing", async ({
  page,
}) => {
  const productsPage = new ProductsPage(page);
  const cartPage = new CartPage(page);
  const checkoutPage = new CheckoutPage(page);

  await productsPage.addFirstProductToCart();
  await cartPage.openCart();
  await cartPage.clickCheckout();

  await checkoutPage.fillCheckoutInformation("Test", "User", "");

  await checkoutPage.continueToOverview();

  await checkoutPage.expectErrorMessage("Error: Postal Code is required");
});
