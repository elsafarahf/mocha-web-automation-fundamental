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

  // Sort selection helper function
  async function selectSort(value) {
    const dropdown = await driver
      .findElement(By.className("product_sort_container"))
      .click();

    const selectedOption = await driver
      .findElement(By.xpath(`//option[@value="${value}"]`))
      .click();

    // Verify sort option was selected correctly
    const updatedDropdown = await driver.findElement(
      By.className("product_sort_container")
    );
    const selectedValue = await updatedDropdown.getAttribute("value");
    assert.strictEqual(selectedValue, value);
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
