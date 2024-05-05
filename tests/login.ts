import { test as base, expect } from '@playwright/test'


const test = base.extend({
    webPage: async({page}, use) =>{
        //set up
        await page.goto('https://www.saucedemo.com/');
        //use fixture
        use(page)

    }
})

export  {expect, test} 

