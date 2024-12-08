import { test, expect } from '@playwright/test'
import { parse } from 'node-html-parser'

test.describe('Broken link validation', ()=>{
    test.use({baseURL: 'https://www.amazon.in/', navigationTimeout: 10000 })
    test('Validate all test', { tag: '@broken' }, async({ page, baseURL })=>{
        await page.goto('/')
        await page.getByRole('searchbox' , { name : 'Search Amazon.in'}).fill('iphone 14')
        await page.locator('#nav-search-submit-button').click()
        await expect(page.locator('[data-component-type="s-result-info-bar"]').locator(`span:has-text('iphone 14')`)).toBeVisible({ timeout: 10000 })
        
        const links = await  page.locator(`[data-component-type='s-search-result']`)
                        .locator(`h2>a[target='_blank']`).all()
        const href_links = await Promise.all(
            links.map(link=>link.getAttribute('href'))
        )      
        //add the base url

        const full_urls = await Promise.all(
            href_links.map(url => new URL(url as string, baseURL).href)
        )
        const op = await Promise.all(
            full_urls.map(async url=>{
                    //validate the response status code
                    const response =  await page.request.get(url)
                    expect.soft(response.ok(), `${url} has no green status code`).toBeTruthy()
                    //parsing reponse body and validate have 'BODY' tag
                    const root = parse(await response.text())
                    const body = root.querySelector('body')?.tagName
                    expect.soft(body?.toLowerCase()).toEqual('body')        
                     return { 'url' : url, 'status' : response.status()}
            })
        )

        const finalop = op.filter(e => e.status != 200)
        console.log(`Broken links array size ${finalop.length}`)
    
    
    })

            

})