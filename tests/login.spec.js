import { test } from "@playwright/test";
import { LoginPage } from "../pages/LoginPage.js";
import { ProductsPage } from "../pages/ProductsPage.js";
import { users } from "../test-data/users.js";

test("should allow a standard user to log in successfully", async ({
  page,
}) => {
  const loginPage = new LoginPage(page);
  const productsPage = new ProductsPage(page);

  await loginPage.goto();

  await loginPage.login(users.standard.username, users.standard.password);

  await productsPage.expectProductsPageVisible();
});

test("should display an error message for invalid credentials", async ({
  page,
}) => {
  const loginPage = new LoginPage(page);

  await loginPage.goto();

  await loginPage.login(users.invalid.username, users.invalid.password);

  await loginPage.expectErrorMessage(
    "Epic sadface: Username and password do not match any user in this service",
  );
});

test("should display an error message for a locked out user", async ({
  page,
}) => {
  const loginPage = new LoginPage(page);

  await loginPage.goto();

  await loginPage.login(users.lockedOut.username, users.lockedOut.password);

  await loginPage.expectErrorMessage(
    "Epic sadface: Sorry, this user has been locked out.",
  );
});
