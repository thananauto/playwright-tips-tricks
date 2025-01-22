import { Page, expect } from '@playwright/test'
import PomTemplate from "./pom_template";

export default class EnLocalisedRegion implements PomTemplate {

    readonly page:Page
    private newPage: Page

  

    constructor(page:Page){
        this.page = page
    }

    async searchAnItem(item:string){
        await this.page.goto('/')
        await this.page.getByPlaceholder('Search for anything').fill(item)
        await this.page.getByPlaceholder('Search for anything').press('Enter')
        await expect(this.page.getByRole('heading', { name: '+ results for '+item })).toBeVisible()
    }

    async clickAnyItem(){
        await this.page.getByRole('link', { name: 'New Listing Pair of Vintage' }).click();
    }

    async waitToOpenInNewTab(){
       const [ page1 ] = await Promise.all([
            this.page.waitForEvent('popup'),
            this.page.getByRole('link', { name: 'Mattel JAL Uniform Barbie doll Japan Airlines Stewardess Flight Attendant Opens' }).click()
        ])
        this.newPage = page1
        await this.newPage.bringToFront()

    }

    async buyItNow(){
        await this.newPage.getByRole('link', { name: 'Buy It Now' }).click();
        await this.newPage.getByRole('link', { name: 'Check out as guest' }).click();
    }

    async enterShippingAddressAndSubmit(data:{}){
            
        await this.newPage.getByLabel('First name').fill('Thanan');
        await this.newPage.getByLabel('Last name').fill('Rahase');
        await this.newPage.getByLabel('Street address', { exact: true }).fill('Kamraj road perumal perr');
        await this.newPage.getByLabel('City').fill('Chennai');
        await this.newPage.getByLabel('State/Province/Region').selectOption('TN');
        await this.newPage.getByLabel('Email', { exact: true }).fill('test@gmail.com');
        await this.newPage.getByLabel('Confirm email').fill('test@gmail.com');
        await this.newPage.getByLabel('Phone number (required)').fill('8765423891');
        await this.newPage.locator('[data-test-id="ADD_ADDRESS_SUBMIT"]').click();
    }
}