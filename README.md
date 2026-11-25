# SauceDemo Playwright Automation

![Playwright](https://img.shields.io/badge/Playwright-Automation-2EAD33?logo=playwright&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-ES6+-yellow?logo=javascript&logoColor=black)
![Status](https://img.shields.io/badge/Status-In%20Progress-orange)

## Overview

This project contains an end-to-end test automation suite for the SauceDemo web application using Playwright and JavaScript.

The project focuses on validating critical e-commerce user flows, including authentication, product listing, shopping cart operations, and checkout functionality.

## Technologies

- JavaScript (ES6+)
- Playwright
- Node.js
- Page Object Model (POM)
- GitHub Actions (CI/CD)

## Project Structure

```text
SauceDemo-Playwright-Automation/
├── pages/
├── tests/
├── test-data/
├── .github/
│   └── workflows/
│       └── playwright.yml
├── playwright.config.js
├── package.json
└── README.md
```

## Test Coverage

### Login

- Successful login
- Invalid credentials
- Locked-out user

### Products

- Product listing validation
- Sorting products by name (A to Z)
- Sorting products by price (low to high)

### Shopping Cart

- Add product to cart
- Remove product from cart
- Continue shopping navigation

### Checkout

- Complete an order successfully
- First name validation
- Last name validation
- Postal code validation

## Browser Coverage

Tests are configured to run on:

- Chromium
- Firefox
- WebKit
- Mobile Chrome (Pixel 5)

## Design Pattern

The project follows the Page Object Model (POM) design pattern to improve test maintainability, readability, and reusability.

Page classes separate UI interactions from test scenarios.

## Running Tests

Install dependencies:

```bash
npm install
```

Install Playwright browsers:

```bash
npx playwright install
```

Run all tests:

```bash
npm test
```

Run tests on a specific browser:

```bash
npm run test:chromium
npm run test:firefox
npm run test:webkit
npm run test:mobile
```

Open the HTML report:

```bash
npm run report
```

## CI/CD

GitHub Actions is configured to execute Playwright tests automatically on pushes and pull requests targeting the main branch.

Test reports are uploaded as workflow artifacts.

## Project Status

The test suite currently includes 13 test scenarios configured across four browser projects.

Additional test scenarios and improvements may be added as the project evolves.
