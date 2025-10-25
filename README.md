# 🔄 SauceDemo Sorting Tests

Automated Web UI Testing project for [**SauceDemo Website**](https://www.saucedemo.com) using **Selenium WebDriver** and **Mocha**.

## 📋 Overview

This project automates end-to-end UI tests for the SauceDemo website, focusing on:

- ✅ Login functionality validation
- ✅ Product sorting (Name A→Z, Z→A, Price Low→High, High→Low)
- ✅ Page title and logo verification
- ✅ Dropdown interaction and element visibility checks
- ✅ Chrome browser options (e.g., Incognito mode to avoid password popups)

## ⚙️ Tech Stack

**Language:** JavaScript (Node.js)  
**Framework:** Mocha  
**Assertion Library:** Assert  
**WebDriver:** Selenium WebDriver  
**Browser:** Google Chrome  
**Report:** Mochawesome

## 🚀 How to Run the Tests

**Clone the repository:**

```bash
git clone <your-repo-url>
cd <your-folder-name>
```

**Install dependencies:**

```bash
npm install
```

**Run the tests:**

```bash
npx mocha tests --reporter mochawesome --timeout 60000
```

**View the test report:**  
Check the generated mochawesome-report folder for the HTML report.

## 📸 Test Report Screenshot

Below is an example of the generated Mochawesome report after running the tests:

![Test Report](images/test-report.png)

The report includes detailed logs, assertions, and pass/fail status for each test case.

## 👩🏻‍💻 Author

**Elsa Farah Fauzia**  
_Senior Software Quality Assurance_  
📍 Jakarta, Indonesia

🔗 [LinkedIn](https://www.linkedin.com/in/elsafarahfauzia/) | [GitHub](https://github.com/elsafarahhf)
