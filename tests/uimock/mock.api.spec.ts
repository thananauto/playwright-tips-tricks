import { test, expect } from '@playwright/test'
test.use({baseURL: 'https://practicesoftwaretesting.com'})
test.describe('Mock the brand category', () => {

    test('Validate category with subcategoty', async ({ page, request }) => {
        await page.route('https://api.practicesoftwaretesting.com/categories/tree', async(route)=>{
                const response = await route.fetch();
                //configuration for local server can found in playwright.config.ts files
                const mockres = await request.get('http://localhost:3001/brands')
                const mockJson = await mockres.json()
                await route.fulfill({ response:response, json:mockJson});

        })
        await page.goto('/')
        await page.waitForTimeout(2000)
        await expect(page.getByRole('textbox', { name: 'Search'})).toBeVisible()
        await expect(page.getByRole('checkbox', { name: 'Hand Tools'})).not.toBeVisible()
     
    })
    test('Validate category only with Hand tools', async ({ page, request }) => {

        await page.route('https://api.practicesoftwaretesting.com/categories/tree', async(route)=>{
        //fetch the live response and post it to the mock server        
                const response = await route.fetch();
                await response.json().then(reqjson =>{
                    reqjson.map(async ele =>{
                        const mocReq = await request.post('http://localhost:3001/brands',{
                            data : JSON.stringify(ele),
                            headers : {"Content-Type" : "application/json" }
                        })
                        expect(mocReq.status()).toBe(201)
                    })

                })

                const mockres = await request.get('http://localhost:3001/brands/name_like=Power')
                const mockJson = await mockres.json()
                await route.fulfill({ response:response, json:mockJson});
                

        })
        // page.setDefaultNavigationTimeout(10000)
        await page.goto('/')
        
        await expect(page.getByLabel(' Sander ', {exact: true})).toBeVisible()
       
       

    })

    test('Test Mock API', async ({ page, request }) => {
        await page.route('http://localhost:3001/brands', async route =>{

                      const response = await route.response();
                      const json = {
                        "id" : 100,
                        "name" : "mock api",
                        "person" : []
                      }

                      await route.fulfill({ response, json})
                 })
        
        const res = await request.get('http://localhost:3001/brands')
        expect(res.status()).toBe(200)
        const responseBody = await res.json();
        expect(responseBody[0].id).toBe(100)
        
    })
    
    
})
