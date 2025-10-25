const { Builder, By } = require("selenium-webdriver");
const assert = require("assert");
const chrome = require("selenium-webdriver/chrome");

describe("Saucedemo Sorting Tests", function () {
  let driver;

  async function setupDriver() {
    const options = new chrome.Options();
    options.addArguments("--incognito");
    driver = await new Builder()
      .forBrowser("chrome")
      .setChromeOptions(options)
      .build();
  }

  async function login() {
    await driver.get("https://www.saucedemo.com/");
    await driver.findElement(By.id("user-name")).sendKeys("standard_user");
    await driver.findElement(By.id("password")).sendKeys("secret_sauce");
    await driver.findElement(By.className("submit-button btn_action")).click();

    const logoText = await driver
      .findElement(By.className("app_logo"))
      .getText();
    assert.strictEqual(logoText, "Swag Labs");
  }

  async function selectSort(value) {
    const dropdown = await driver.findElement(
      By.className("product_sort_container")
    );
    await dropdown.click();
    await driver.findElement(By.xpath(`//option[@value="${value}"]`)).click();

    const updatedDropdown = await driver.findElement(
      By.className("product_sort_container")
    );
    const selectedValue = await updatedDropdown.getAttribute("value");
    assert.strictEqual(selectedValue, value);
  }

  it("Sort by Name A to Z (default)", async function () {
    await setupDriver();
    await login();
    await selectSort("az");
    await driver.quit();
  });

  it("Sort by Name Z to A", async function () {
    await setupDriver();
    await login();
    await selectSort("za");
    await driver.quit();
  });

  it("Sort by Price Low to High", async function () {
    await setupDriver();
    await login();
    await selectSort("lohi");
    await driver.quit();
  });

  it("Sort by Price High to Low", async function () {
    await setupDriver();
    await login();
    await selectSort("hilo");
    await driver.quit();
  });
});
