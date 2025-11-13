
import {
  Reporter,FullResult
} from "@playwright/test/reporter";
import * as fs from 'fs';
import * as path from 'path';

class MyHtmlReporter implements Reporter {
  private outputPath: string;
  private inputJsonPath?: string;

  constructor(options: { outputPath?: string; inputJsonPath?: string } = {}) {
    // Default to test-results if no path provided
    this.outputPath = options.outputPath || './test-results';
    // Optional: specify exact input JSON path, otherwise auto-detect latest
    this.inputJsonPath = options.inputJsonPath;
  }

  async onEnd(result: FullResult) {
    try {
      console.log('🎭 Generating custom HTML report...');
      
      // Ensure test-results directory exists
      if (!fs.existsSync(this.outputPath)) {
        fs.mkdirSync(this.outputPath, { recursive: true });
      }

      // Read the template HTML file
      const templatePath = path.join(__dirname, '../report-template.html');
      let htmlContent = fs.readFileSync(templatePath, 'utf-8');

      let sourceResultsPath: string;

      // Use provided inputJsonPath or auto-detect the latest results.json
      if (this.inputJsonPath) {
        // Use the specified input JSON path
        if (!fs.existsSync(this.inputJsonPath)) {
          console.error(`❌ Specified input JSON file not found: ${this.inputJsonPath}`);
          return;
        }
        sourceResultsPath = this.inputJsonPath;
        console.log(`📄 Using specified results file: ${this.inputJsonPath}`);
      } else {
        // Auto-detect the latest results.json file in playwright-report directory
        const playwrightReportDir = './playwright-report';
        
        if (!fs.existsSync(playwrightReportDir)) {
          console.error(`❌ Playwright report directory not found: ${playwrightReportDir}`);
          return;
        }

        const files = fs.readdirSync(playwrightReportDir)
          .filter(file => file.startsWith('results_') && file.endsWith('.json'))
          .map(file => ({
            name: file,
            path: path.join(playwrightReportDir, file),
            time: fs.statSync(path.join(playwrightReportDir, file)).mtime.getTime()
          }))
          .sort((a, b) => b.time - a.time);

        if (files.length === 0) {
          console.error('❌ No results.json file found in playwright-report directory');
          return;
        }

        const latestResultsFile = files[0].name;
        sourceResultsPath = files[0].path;
        
        console.log(`📄 Using latest results file: ${latestResultsFile}`);
      }

      // Copy the results.json to test-results directory and replace paths
      const destResultsPath = path.join(this.outputPath, 'results.json');
      
      // Read the JSON file
      let jsonContent = fs.readFileSync(sourceResultsPath, 'utf-8');
      
      // Get the current working directory
      const cwd = process.cwd();
      
      // Replace all occurrences of the current working directory with empty string
      const regex = new RegExp(cwd.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'g');
      jsonContent = jsonContent.replace(regex, '');
      
      // Write the modified JSON to destination
      fs.writeFileSync(destResultsPath, jsonContent);
      console.log(`✅ Copied results.json to ${this.outputPath} (paths sanitized)`);

      // Update the fetch path in HTML to use relative path
      htmlContent = htmlContent.replace(
        "const response = await fetch('results.json');",
        "const response = await fetch('results.json');"
      );

      // Generate timestamp for the report
      const timestamp = new Date().toUTCString().replace(/ /gi, '_').replace(/:/gi, '').replace(/,/gi, '');
      const outputHtmlPath = path.join(this.outputPath, `custom-report-${timestamp}.html`);

      // Write the final HTML file
      fs.writeFileSync(outputHtmlPath, htmlContent);
      
      console.log(`✅ Custom HTML report generated: ${outputHtmlPath}`);
      console.log(`🌐 Open the report in your browser or run: open ${outputHtmlPath}`);
      
    } catch (error) {
      console.error('❌ Error generating custom HTML report:', error);
    }
  }
}

export default MyHtmlReporter;