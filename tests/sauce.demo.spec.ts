import {test, expect } from './login'
import{ AxeBuilder } from '@axe-core/playwright'
import { createHtmlReport } from 'axe-html-reporter'
import fs from 'fs'


//the following tags are the default from lighthouse
const lightHouseTags:string[] =[ 'wcag2a','wcag2aa']

//define rules for each page, you can disable specific rule by using option in AxeBuilder
const rules:string[] =["accesskeys","aria-allowed-attr","aria-allowed-role","aria-command-name",
    "aria-conditional-attr","aria-deprecated-role","aria-dialog-name", "aria-hidden-body", "aria-hidden-focus",
    "aria-input-field-name","aria-meter-name","aria-progressbar-name","aria-prohibited-attr",
    "aria-required-attr","aria-required-children","aria-required-parent","aria-roles","aria-text",
    "aria-toggle-field-name",
    "aria-tooltip-name",
    "aria-treeitem-name",
    "aria-valid-attr-value",
    "aria-valid-attr",
    "button-name",
    "bypass",
    "color-contrast",
    "definition-list",
    "dlitem",
    "document-title",
    "duplicate-id-aria",
    "form-field-multiple-labels",
    "frame-title",
    "heading-order",
    "html-has-lang",
    "html-lang-valid",
    "html-xml-lang-mismatch",
    "image-alt",
    "image-redundant-alt",
    "input-button-name",
    "input-image-alt",
    "label",
    "link-in-text-block",
    "link-name",
    "list",
    "listitem",
    "meta-refresh",
    "meta-viewport",
    "object-alt",
    "select-name",
    "skip-link",
    "tabindex",
    "table-duplicate-name",
    "target-size",
    "td-headers-attr",
    "th-has-data-cells",
    "valid-lang",
    "video-caption",
    //"focusable-controls",
    //"interactive-element-affordance",
    //"logical-tab-order",
    "visual-order-follows-dom",
    "focus-traps",
    "managed-focus",
    "use-landmarks",
    "offscreen-content-hidden",
    "custom-controls-labels",
    "custom-controls-roles",
    "empty-heading",
    "identical-links-same-purpose",
    "landmark-one-main",
    "label-content-name-mismatch",
    "table-fake-caption",
    "td-has-header"
  ]


test.describe('Accessability check for every page', () => {
    
  
test('Sign In page', async ({page, webPage }, testInfo) => {
    
    await expect(webPage.getByRole('textbox', { name: 'Username'})).toBeVisible();

    await test.step('Check the accessablity issue', async () => {
        const  result  = await new AxeBuilder({page})
       .withTags(lightHouseTags)
     //  .withRules(rules)
       .analyze()



        testInfo.attach(testInfo.title,{
            body: JSON.stringify(result.violations, null, 2),
            contentType: 'application/json'
        })

        const htmlReport = createHtmlReport({
            results: result,
             options:{
                    projectKey: testInfo.title.replace(' ','_'),
                    doNotCreateReportFile: false
            }
            });
            if (!fs.existsSync(`test-results/reports/${testInfo.title.replace(' ','_')}.html`)) {
                fs.mkdirSync('test-results/reports', {
                    recursive: true,
                });
            }
            fs.writeFileSync(`test-results/reports/${testInfo.title.replace(' ','_')}.html`, htmlReport);


        expect(result.violations).toHaveLength(4)


    })
    
   
   
})

test('product listing page', async ({ webPage, page }, testInfo) => {
    await webPage.getByRole('textbox', { name: 'Username'}).fill('standard_user')
    await webPage.getByRole('textbox', { name: 'Password'}).fill('secret_sauce')
    await webPage.getByRole('button', { name: 'Login'}).click()
    await expect(webPage.getByText('Swag Labs')).toBeVisible()

    await test.step('Check the accessablity issue', async () => {
        const  report  = await new AxeBuilder({page})
        .withTags(lightHouseTags) //
        //.withRules(rules)
        .analyze()
        
        //attach the violation output to each test methods
        testInfo.attach(testInfo.title,{
            body: JSON.stringify(report.violations, null, 2),
            contentType: 'application/json'
        })
        

        //create the axe-core html report
        const htmlReport = createHtmlReport({
            results: report,
             options:{
                    projectKey: testInfo.title,
                    doNotCreateReportFile: false
            }
            });

        //write the html report for each page
        write_accesability_output(`${testInfo.title.replace(' ','_')}.html`, htmlReport)
          
        expect(report.violations).toHaveLength(0)
    })

})
})

/**
 * Method to write accessability html report
 * @param path 
 * @param htmlReport 
 */
function write_accesability_output(path:string, htmlReport: string){
    
    if (!fs.existsSync(path)) {
        fs.mkdirSync('test-results/reports', {
            recursive: true,
        });
    }
    fs.writeFileSync(`test-results/reports/${path}.html`, htmlReport);

}



