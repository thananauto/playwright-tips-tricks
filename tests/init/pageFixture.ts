import { test as PageFixture, expect } from '@playwright/test'
import  PomTemplate  from '../pages/pom_template'

  type Pages = {
    [key: string]: PomTemplate
  }

const test = PageFixture.extend< Pages >({
   
    dynamicPage: [ async({ page, baseURL }, use)=>{
        await page.goto(baseURL as string)
        //get the website language details
        const pageLanguage = await page.evaluate(() => document.documentElement.lang || "Not set");
        const flowPage = await loadclass( pageLanguage, [page])
        await use(flowPage)
    }, { scope: 'test'}],
})

const loadclass =async (lang: string, args: any[])=>{
        const module = await import(`./../pages/${lang}_flow.page`);
        const newClass:{ new (...args:any[]):PomTemplate} = module.default;
        return new newClass(...args);       
}

export { test, expect }