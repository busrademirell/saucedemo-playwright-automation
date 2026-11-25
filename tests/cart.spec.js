import { test } from "@playwright/test";
import { LoginPage } from "../pages/LoginPage.js";
import { ProductsPage } from "../pages/ProductsPage.js";
import { CartPage } from "../pages/CartPage.js";
import { users } from "../test-data/users.js";

test.beforeEach(async ({ page }) => {
  const loginPage = new LoginPage(page);

  await loginPage.goto();
  await loginPage.login(users.standard.username, users.standard.password);
});

test("should add a product to the cart", async ({ page }) => {
  const productsPage = new ProductsPage(page);

  await productsPage.addFirstProductToCart();
  await productsPage.expectCartBadge(1);
});

test("should remove a product from the cart", async ({ page }) => {
  const productsPage = new ProductsPage(page);
  const cartPage = new CartPage(page);

  await productsPage.addFirstProductToCart();
  await cartPage.openCart();

  await cartPage.expectCartItemCount(1);
  await cartPage.removeFirstProduct();

  await cartPage.expectCartItemCount(0);
});

test("should return to products page when clicking continue shopping", async ({
  page,
}) => {
  const productsPage = new ProductsPage(page);
  const cartPage = new CartPage(page);

  await productsPage.addFirstProductToCart();
  await cartPage.openCart();

  await cartPage.continueShopping();

  await productsPage.expectProductsPageVisible();
});
