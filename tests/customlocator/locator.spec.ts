import { selectors, test, expect } from '@playwright/test'

test.use({ baseURL : 'https://practicesoftwaretesting.com' })
test.describe('Playwright custom selector', () => {
  
    test('Select previous label', async ({ page }) => {
        const prvsLabelElement =()=>(
            {  
                queryAll(root: Document, selector: string){
                    let all = root.evaluate(`//label[contains(.,'${selector}')]/../preceding-sibling::div//label`, root, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null)
                    return Array.from({ length: all.snapshotLength }, (_, i)=> all.snapshotItem(i))    
                }
    
            }
         )
         //register the customised locator function
        await selectors.register('preceding-label', prvsLabelElement)
        await page.goto('/')
        const loc = page.locator('preceding-label=Wrench')
        await loc.nth(1).click()
        await expect(loc.nth(1)).toBeChecked()
        
        
    })
    
})
