
import { test } from './../init/pageFixture'

test.describe('Dynamic loading of class files', async() => {
    
    test('Dynamic English - eBay Dynamic', async ({ dynamicPage }) => {
        await dynamicPage.searchAnItem('Barbie Doll')
        await dynamicPage.waitToOpenInNewTab()
        await dynamicPage.buyItNow()
        await dynamicPage.enterShippingAddressAndSubmit({})
        
    })
    
})
