const { Builder, By } = require("selenium-webdriver");
const assert = require("assert");
const chrome = require("selenium-webdriver/chrome");

describe("Saucedemo Sorting Tests", function () {
  let driver;

  // Setup Chrome driver with incognito mode
  async function setupDriver() {
    const options = new chrome.Options();
    options.addArguments("--incognito");
    driver = await new Builder()
      .forBrowser("chrome")
      .setChromeOptions(options)
      .build();
  }

  // Login helper function with logo verification
  async function login() {
    await driver.get("https://www.saucedemo.com/");
    await driver.findElement(By.id("user-name")).sendKeys("standard_user");
    await driver.findElement(By.id("password")).sendKeys("secret_sauce");
    await driver.findElement(By.className("submit-button btn_action")).click();

    // Verify logo text
    const logoElement = await driver.findElement(By.className("app_logo"));
    const logoText = await logoElement.getText();
    assert.strictEqual(logoText, "Swag Labs");
  }

  // Sort selection and verification
  async function selectSort(value) {
    // Click dropdown and select sorting option
    const dropdown = await driver.findElement(
      By.className("product_sort_container")
    );
    await dropdown.click();

    const option = await driver.findElement(
      By.xpath(`//option[@value="${value}"]`)
    );
    await option.click();

    // Verify the correct option was selected
    const updatedDropdown = await driver.findElement(
      By.className("product_sort_container")
    );
    const selectedValue = await updatedDropdown.getAttribute("value");
    assert.strictEqual(selectedValue, value);

    // Check if sorting by name (A-Z or Z-A)
    if (value === "az" || value === "za") {
      // Get all product names from the page
      const productElements = await driver.findElements(
        By.className("inventory_item_name")
      );
      const productNames = [];

      for (let element of productElements) {
        const name = await element.getText();
        productNames.push(name);
      }

      // Create expected sorted order
      let expectedOrder;
      if (value === "az") {
        expectedOrder = [...productNames].sort(); // A to Z
      } else {
        expectedOrder = [...productNames].sort().reverse(); // Z to A
      }

      // Verify products are in correct order
      assert.deepStrictEqual(productNames, expectedOrder);
    }
    // Check if sorting by price (Low-High or High-Low)
    else {
      // Get all product prices from the page
      const priceElements = await driver.findElements(
        By.className("inventory_item_price")
      );
      const productPrices = [];

      for (let element of priceElements) {
        const priceText = await element.getText();
        const price = parseFloat(priceText.replace("$", ""));
        productPrices.push(price);
      }

      // Create expected sorted order
      let expectedOrder;
      if (value === "lohi") {
        expectedOrder = [...productPrices].sort((a, b) => a - b); // Low to High
      } else {
        expectedOrder = [...productPrices].sort((a, b) => b - a); // High to Low
      }

      // Verify prices are in correct order
      assert.deepStrictEqual(productPrices, expectedOrder);
    }
  }

  // Sorting test cases
  it("Sort by Name A to Z (default)", async function () {
    await setupDriver();
    await login();
    await selectSort("az");
  });

  it("Sort by Name Z to A", async function () {
    await selectSort("za");
  });

  it("Sort by Price Low to High", async function () {
    await selectSort("lohi");
  });

  it("Sort by Price High to Low", async function () {
    await selectSort("hilo");
    await driver.quit();
  });
});
