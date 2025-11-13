# Playwright Tips & Tricks

This repository consists of best practices, useful code snippets, and advanced techniques that can be applied in our day-to-day Playwright automation testing. Whether you are working on UI automation, API testing, accessibility testing, authentication handling, localization, or advanced test strategies, this repository provides ready-to-use solutions.

## 📌 Installation

To set up and run the tests in this repository, follow these steps:

1. **Clone the repository:**
   ```sh
   git clone https://github.com/your-repo/playwright-tips-tricks.git
   cd playwright-tips-tricks
   ```
2. **Install dependencies:**
   ```sh
   npm install
   ```
3. **Install Playwright browsers (Chromium, Firefox, WebKit):**
   ```sh
   npx playwright install chromium
   ```
4. **Run the tests:**
   ```sh
   npx playwright test
   ```
5. **View test reports:**
   - After successful execution, Playwright generates reports in the following locations:
     - **HTML Report:** `playwright-report/`
     - **Test Results (JSON, traces, and screenshots):** `test-results/`

## 📂 Repository Contents

All test-related code is organized inside the `tests` folder. Below is an overview of the key topics covered in this repository:

### 1️⃣ Accessibility Testing (`accessibility/`)
- Playwright allows checking web accessibility compliance using industry standards such as **WCAG 2.0 (A, AA, AAA)**.
- Code snippets in this folder help in evaluating the accessibility score of your application.
- Example:
   ```typescript
   await page.accessibility.snapshot();
   ```
- Refer my article [here](https://medium.com/@thananjayan1988/lighthouse-accessibility-test-by-playwright-e5258eb9f3ba)

### 2️⃣ API Testing (`api/`)
- Playwright supports API testing and response validation alongside UI automation.
- This folder includes examples of how to:
  - **Mock API responses**
  - **Intercept network requests**
  - **Validate API behavior in different scenarios**
- Example:
   ```typescript
   await page.route('**/api/users', async (route) => {
       await route.fulfill({ json: { id: 1, name: 'John Doe' } });
   });
   ```
- Refer my article [here](https://medium.com/@thananjayan1988/playwright-mastery-integrating-web-servers-api-schemas-geolocation-and-localization-d6de093b6a4e)

### 3️⃣ Authentication Testing (`auth/`)
- Covers bypassing authentication mechanisms such as:
  - **Basic Authentication**
  - **Digest Authentication**
- This is useful when testing protected routes without manually entering credentials.
- Example:
   ```typescript
   await page.authenticate({ username: 'user', password: 'pass' });
   ```
- Refer my article [here](https://medium.com/@thananjayan1988/web-authentication-with-playwright-basic-and-digest-explained-aab9ce78dc3e)

### 4️⃣ Broken Link Detection (`brokenlinks/`)
- Includes scripts to scan a webpage and identify broken links by checking HTTP response status codes.
- Useful for SEO testing and web maintenance.
- Example:
   ```typescript
   const response = await page.goto(url);
   if (response.status() !== 200) {
       console.log(`Broken link detected: ${url}`);
   }
   ```
- Refer my article [here](https://medium.com/@thananjayan1988/automatic-broken-link-detection-with-playwright-a241a6f41973)

### 5️⃣ Custom Locator Implementation (`customlocator/`)
- Demonstrates how to create custom locators in Playwright for non-standard UI elements.
- Example:
   ```typescript
   class CustomLocator extends Locator {
       async customMethod() {
           return this.locator('.custom-element').click();
       }
   }
   ```
- Refer my article [here](https://medium.com/@thananjayan1988/how-to-write-custom-selector-in-playwright-4bd96e8e559f)

### 6️⃣ Dynamic Class Loading (`dynamicClassLoad/`)
- Shows how to load different page object classes dynamically to handle localized web applications.
- Uses Playwright fixtures to load classes dynamically.
- Refer my article [here](https://medium.com/@thananjayan1988/optimizing-playwright-tests-with-dynamic-page-object-loading-dfda67be81e4)

### 7️⃣ Localization Testing (`localisation/`)
- Includes examples of testing multilingual applications across different regions.
- Demonstrates how to:
  - **Change browser language settings**
  - **Validate translated content**
- Example:
   ```typescript
   await page.evaluate(() => navigator.language);
   ```
- Refer my article [here](https://medium.com/@thananjayan1988/playwright-mastery-alert-slider-drag-and-drop-handler-and-evaluate-part-ii-ecd14bd5e2cb)


### 8️⃣ UI Mocking (`uimock/`)
- Explains how to mock API responses on the frontend for edge-case scenario testing.
- Helps in creating test environments without an actual backend.
- Example:
   ```typescript
   await page.route('**/api/products', (route) => {
       route.fulfill({ json: { products: [] } });
   });
   ```
- Refer my article [here](https://medium.com/@thananjayan1988/playwright-mastery-integrating-web-servers-api-schemas-geolocation-and-localization-d6de093b6a4e)

### 9️⃣ Report analysis by AI
- Ask the AI to analyse the `**.json` report
- Add the Summary report as PR comment for every build breaks
- Refer my article [here]([https://medium.com/@thananjayan1988](https://medium.com/@thananjayan1988/ai-powered-test-report-analysis-generating-execution-summaries-5010dbbb1991))

### 🔟 Configure your test data in different places in framework
- Explains how to configure test data based on different scenario
- And explain the each use cases with exammple
- Refer this article for more [details](https://medium.com/@thananjayan1988/efficiently-configuring-test-data-in-playwright-framework-65b1d3ad6bb6)

### 1️⃣1️⃣ Analyse the HAR to capture network error
- Capture the slow request, failed endpoints as part of UI test
- Record those details in HTML report
- Added custom fixture to capture this details
- Refer this article for more [details](https://medium.com/@thananjayan1988/transforming-ui-testing-harnessing-har-files-in-playwright-520ae03227da)

### 1️⃣2️⃣ Create a customised interactive html report(`custom_report/`)
- Visual Storytelling
- Smart error tracking
- Zero typing
- Refer this article for more [details](https://medium.com/@thananjayan1988/transforming-ui-testing-harnessing-har-files-in-playwright-520ae03227da)

## 📌 Contribution Guidelines

🚀 **Want to contribute?** If you have any useful Playwright tips or code snippets, feel free to **submit a PR**!

1. **Fork the repository**
2. **Create a feature branch**
3. **Add your code and documentation**
4. **Submit a Pull Request (PR)**

💡 If you have suggestions for new topics, reach out to me via email at **thananjayan1988@gmail.com** or send a message on [LinkedIn](https://www.linkedin.com/in/thananjayan-rajasekaran/).

## 📖 Additional Resources

📌 Here are some of my Playwright-related articles that you may find useful:

- [Executing Tests on Remote Browser and Browser in Servers](https://medium.com/@thananjayan1988/playwright-executing-tests-on-remote-browser-and-browser-in-servers-48c9979b5b4f)
- [Reusing Browser Sessions for Debugging in Playwright](https://medium.com/@thananjayan1988/reusing-browser-sessions-for-debugging-in-playwright-bac94cd6d999)
- [Efficient Playwright test execution in minimal docker images](https://medium.com/@thananjayan1988/optimize-the-docker-image-for-playwright-tests-3688c7d4be5f)
- [Live Visualization of Test Results Using Playwright and InfluxDB 2.0](https://medium.com/@thananjayan1988/live-visualization-of-test-results-using-playwright-and-influxdb-2-0-2a193656dda2)
- [Integrating Playwright in CI with GitHub Actions and Docker](https://medium.com/@thananjayan1988/integrating-playwright-in-ci-with-github-actions-and-docker-7baafe76de99)
- [Report portal integration with Playwright](https://medium.com/@thananjayan1988/report-portal-with-playwright-typescript-5f0d69bfe202)
- [Playwright test in Jenkins CI](https://medium.com/@thananjayan1988/ci-cd-pipeline-running-playwright-tests-in-jenkins-with-docker-f9f08fda4bfc)

📌 **Stay updated with more Playwright tips & insights by following me on** [Medium](https://medium.com/@thananjayan1988)! 🚀

## 📌 License

This project is licensed under the **MIT License** – you are free to use, modify, and distribute the code with proper attribution.

### 🎯 Happy Testing with Playwright! 🚀
