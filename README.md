# playwright-tips-tricks
This repo consist of best practises and code which we might usefull in our day to life.

## Installation
1. Clone this project
2. Run `npm install` to install all dependencies
3. Install the chromium browser `npx playwright install chromium`
4. Run the test `npx playwright test`
5. After successsfull execution, we can find reports in `playwright-report` and `test-result` 


## Contents

Under the `tests` folder
* `accessability` - Code snippets for to find accesability score of the test application by using the standars `wcag2a`,`wcag2aa`.
* `api` - Sample code snippets to do API test with mocking the test data
* `auth` - Different ways to bypass `Basic` and `Digest` authentication
* `brokenlinks` - Code snippets to find broken url in the webpage
* `customlocator` - Example to show how can create a custom locator, then register and how to use in test method
*  `dynamicClassLoad` - Test method for how to use same test for different localised website, refer fixture and `pages` folder for dependency
* `localisation` - How to test different localised websites
* `uimock` - Mock UI API resonse and how to validate the edge scenarios in testing.


If you like to contribute with any new topic, please create a PR with code or changes. And if you want me to add any new topic drop a note at thananjayan1988@gmail.com or text me in [linkedin](https://www.linkedin.com/in/thananjayan-rajasekaran/)