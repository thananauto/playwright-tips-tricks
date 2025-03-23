import { test, expect } from '@playwright/test'
import { request, RequestOptions } from 'urllib';

test.describe('Basic Authentication with - use option', async()=>{
        test.use({
            baseURL: 'https://the-internet.herokuapp.com',
            httpCredentials :{
                username: 'admin',
                password: 'admin',
            }
            
        })
       
        test('Basic Authetication',  {tag : '@basic' }, async({page}) =>{

            await page.goto('/')
            await page.getByRole('link', { name : 'Basic Auth', exact : true}).click();
        //  await page.setExtraHTTPHeaders( Headers)
        await expect(page.getByRole('heading', { name: 'Basic Auth'})).toBeVisible()

        })
})

test.describe('Basic Authetication with -  Extra HTTP headers', async()=>{
    test.use({
        baseURL: 'https://the-internet.herokuapp.com'
    })


    test('Basic Authetication', {tag : '@basic' }, async({page}) =>{

        await page.goto('/')
        await page.setExtraHTTPHeaders({
            Authorization: 'Basic '+btoa('admin:admin')
       })
       await page.getByRole('link', { name : 'Basic Auth', exact : true}).click();
       await expect(page.getByRole('heading', { name: 'Basic Auth'})).toBeVisible()

    })

})


test.describe('Basic Authetication using route', async()=>{
    test.use({
        baseURL: 'https://the-internet.herokuapp.com'
    })

   
    const options: RequestOptions  ={
        auth: 'admin:admin',
        method: 'GET',
        headers : { 
            'Content-Type': 'application/json',
        }
    }
   
    test('Digest Authetication - HTTP Headers', {tag : '@basic' },  async({page}) =>{
        
        await page.route('**/basic_auth', async(route, req)=>{
            const { res, data }= await request(req.url(), options);
            const headers:any ={
                ... res.headers
            }
            await route.fulfill({
                status: res.statusCode,
                headers: headers,
                contentType: res.headers['content-type'],
                body: data
              });
        })

        await page.goto('/')
       
        await page.getByRole('link', { name : 'Basic Auth', exact : true}).click();
        await expect(page.getByRole('heading', { name: 'Basic Auth'})).toBeVisible()

    })

})

test.describe('Digest Authetication using route', async()=>{
    test.use({
        baseURL: 'https://the-internet.herokuapp.com'
    })

    const options : RequestOptions ={
        digestAuth : 'admin:fake',
        method: 'GET'
    
    }
   
    test('Digest Authetication ', {tag : '@basic' }, async({page}) =>{
        
        await page.route('**/digest_auth', async(route, req)=>{
          
            const { res, data }= await request(req.url(), options);
            const headers:any ={
                ... res.headers
            }
            await route.fulfill({
                status: res.statusCode,
                headers: headers,
                contentType: res.headers['content-type'],
                body: data
              });
        })

        await page.goto('/')
       
       await page.getByRole('link', { name : 'Digest Authentication', exact : true}).click();
       await expect(page.getByRole('heading', { name: 'Digest Auth'})).toBeVisible()

    })

})