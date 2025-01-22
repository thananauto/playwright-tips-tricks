import { Page, expect } from "@playwright/test";
import PomTemplate from "./pom_template";

export default class DeLocalisedRegion implements PomTemplate{
    
    readonly page:Page
    private newPage: Page

    constructor(page:Page){
        this.page = page
    }

    async searchAnItem(item:string){
        await this.page.goto('/')
        await this.page.getByPlaceholder('Bei eBay finden').fill(item)
        await this.page.getByPlaceholder('Bei eBay finden').press('Enter')
        await expect(this.page.getByText(`+ Ergebnisse für ${item}`)).toBeVisible()
        
    }

   
    async waitToOpenInNewTab(){
       const [ page1 ] = await Promise.all([
            this.page.context().waitForEvent('page'),
            this.page.getByRole('link', { name: 'Sparkle Beach Barbie Puppe' }).click()
        ])
        this.newPage = page1
        await this.newPage.bringToFront()

    }

    async buyItNow(){
        await this.newPage.getByRole('link', { name: 'Sofort-Kaufen' }).click();
        await this.newPage.getByRole('link', { name: 'Als Gast kaufen' }).click();
    }

    async enterShippingAddressAndSubmit(data:{}){
            
        await this.newPage.getByLabel('Vorname').fill('Thanan');
        await this.newPage.getByLabel('Nachname').fill('Rahase');
        await this.newPage.getByLabel('Straße und Hausnummer').pressSequentially('2812');
        const addrDisplay = this.newPage.locator('.auto-address-cntr')
        await expect(addrDisplay).toBeVisible()
        await addrDisplay.locator('div').first().click()
        await this.newPage.getByLabel('E-Mail', { exact: true }).fill('test@gmail.com');
        await this.newPage.getByLabel('E-Mail bestätigen').fill('test@gmail.com');
        await this.newPage.getByLabel('Telefon (erforderlich)').fill('09852 34578');
        await this.newPage.locator('[data-test-id="ADD_ADDRESS_SUBMIT"]').click();
    }
}