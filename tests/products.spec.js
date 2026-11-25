import { test } from "@playwright/test";
import { LoginPage } from "../pages/LoginPage.js";
import { ProductsPage } from "../pages/ProductsPage.js";
import { users } from "../test-data/users.js";

test.beforeEach(async ({ page }) => {
  const loginPage = new LoginPage(page);

  await loginPage.goto();
  await loginPage.login(users.standard.username, users.standard.password);
});

test("should display six products on the products page", async ({ page }) => {
  const productsPage = new ProductsPage(page);

  await productsPage.expectProductsPageVisible();
  await productsPage.expectProductCount(6);
});

test("should sort products by name from A to Z", async ({ page }) => {
  const productsPage = new ProductsPage(page);

  await productsPage.sortProducts("az");

  await productsPage.expectProductsSortedByNameAscending();
});

test("should sort products by price from low to high", async ({ page }) => {
  const productsPage = new ProductsPage(page);

  await productsPage.sortProducts("lohi");

  await productsPage.expectProductsSortedByPriceAscending();
});
