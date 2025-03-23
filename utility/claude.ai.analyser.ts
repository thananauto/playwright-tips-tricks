import { Anthropic } from '@anthropic-ai/sdk';
import { load as cheerioLoad } from 'cheerio';
import * as fs from 'fs';

interface AISummary {
  summary: string;
  code_issues: string[];
  timeout_issues: string[];
  application_issues: string[];
  recommendations: string[];
}

function loadJsonReport(jsonFile: string): any {
  /** Load Playwright JSON report */
  const fileContent = fs.readFileSync(jsonFile, 'utf-8');
  return JSON.parse(fileContent);
}

function loadHtmlReport(htmlFile: string): string {
  /** Extract text content from Playwright HTML report */
  const fileContent = fs.readFileSync(htmlFile, 'utf-8');
  const $ = cheerioLoad(fileContent);
  return $('body').text();
}

function generateOpenaiPrompt(reportContent: string): string {
  /** Generate a structured prompt for Claude */
  return `
    You are an AI Playwright test report analyst. Analyze the following Playwright test report and generate a structured summary.

    - Identify **Code Issues** (syntax errors, exceptions, failures)
    - Identify **Timeout Issues** (long-running tests, delays)
    - Identify **Application Issues** (UI/Backend failures, HTTP errors)
    - Provide **Recommendations** to improve test reliability.

    **Playwright Test Report:**
    \`\`\`
    ${reportContent}
    \`\`\`

    **Return the summary in JSON format with the following structure:**
    {
      "summary": "...",
      "code_issues": [...],
      "timeout_issues": [...],
      "application_issues": [...],
      "recommendations": [...]
    }
    And return the summary only in JSON for further processing
    `;
}

function removeFirstAndLastLineFromString(inputString: string): string {
  // Split the input string by newline characters to get a list of lines
  const lines = inputString.split('\n');
  
  // Check if there are more than two lines to remove the first and last lines
  if (lines.length > 2) {
    // Remove the first and last line
    return lines.slice(1, -1).join('\n');
  }
  
  // Return the original string if it has 2 or fewer lines
  return inputString;
}

function convertJsonToMarkdown(aiSummary: AISummary): string {
  /**Convert AI-generated JSON summary to a beautiful Markdown format.*/
  
  // Start the Markdown formatted string
  let mdReport = `## 📝 Playwright Test Report Summary
**Summary:**  
${aiSummary.summary}

### 🚨 Code Issues
`;
  // Add the code issues list
  if (aiSummary.code_issues) {
    mdReport += aiSummary.code_issues.map(issue => `- ${issue}`).join('\n') + '\n';
  }
  
  mdReport += `
### ⏳ Timeout Issues
`;
  // Add the timeout issues list
  if (aiSummary.timeout_issues) {
    mdReport += aiSummary.timeout_issues.map(issue => `- ${issue}`).join('\n') + '\n';
  }

  mdReport += `
### 🛠 Application Issues
`;
  // Add the application issues list
  if (aiSummary.application_issues) {
    mdReport += aiSummary.application_issues.map(issue => `- ${issue}`).join('\n') + '\n';
  }

  mdReport += `
### ✅ Recommendations
`;
  // Add the recommendations list
  if (aiSummary.recommendations) {
    mdReport += aiSummary.recommendations.map(rec => `- ${rec}`).join('\n') + '\n';
  }

  return mdReport;
}

async function main() {
  const content = loadJsonReport("results.json");
  
  const prompt = generateOpenaiPrompt(JSON.stringify(content, null, 2));
  
  const client = new Anthropic({
    // defaults to process.env.ANTHROPIC_API_KEY
    apiKey: process.env.ANTHROPIC_API_KEY
  });
  
  const message = await client.messages.create({
    model: "claude-3-7-sonnet-20250219",
    max_tokens: 1024,
    temperature: 1,
    system: "You are an AI Playwright test report analyst. Analyze the following Playwright test report and generate a structured summary",
    messages: [
      { 
        role: "user", 
        content: prompt
      }
    ]
  });
  
  const op = message.content[0].type === "text" ? message.content[0].text : message.content[0];
  const data = removeFirstAndLastLineFromString(op as string);
  const data1 = JSON.parse(data) as AISummary;
  // Generate Markdown Report
  const mdReport = convertJsonToMarkdown(data1);
  fs.writeFileSync("summary.txt", mdReport);
  
}

// Execute the main function
main().catch(console.error);