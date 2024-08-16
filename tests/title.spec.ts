import { test, expect } from '@playwright/test'

 
test.describe.configure({mode: 'serial'})

test.describe('Check test flow',{ tag: '@pw-test'}, async () => {
    type objperson ={
        id: string,
        name: string,
        data : {}
    }

   
   
    test('first test', { tag: '@google'}, async ( { page }, testInfo) => {
        
       // await page.go(')
       await page.goto('https://www.google.com')
        await expect(page).toHaveURL(/google/)
        
       
        
    })
    test('second test', async ( { page, browserName}, testInfo) => {
        //skip the test case
        test.fixme(browserName === 'chromium', 'Test need to be fixed')
        await page.goto('https://www.amazon.com')
        await expect( page).toHaveURL(/amazon/)
        await expect( page).toHaveURL(/amazon/)
        
        
    })

    test('third test', async ( {page}, testInfo) => {
        await page.goto('https://www.ebay.com')
        await expect( page).toHaveURL(/ebay/)
    })

   
    
})
