import { expect, test} from '@playwright/test'

test.describe('', () => {
    test.use({
        locale : 'ru-RU',
        timezoneId : 'Asia/Tokyo',
        baseURL: 'https://google.com'
    })
    test('launch the webiste in Russia locale', async ({ page }) => {
        
        await page.goto('/')
        await expect.soft( page.getByRole('link', { name: 'Поиск картинок'})).toBeVisible()
       const dateRes =  await page.evaluate(() => {
         return { 
            date: Date(),
            localization: navigator.language,
            timezoneId : Intl.DateTimeFormat().resolvedOptions().timeZone
        }
       });
       console.log(dateRes)
    })
    
    
})

test.describe('', () => {
    test.use({
        locale : 'de-DE',
        timezoneId : 'Europe/Berlin',
        baseURL: 'https://google.com'
    })
    test('launch the amazon webiste in German locale', async ({ page }) => {
       
        await page.goto('/')
        await expect( page.getByRole('link', { name: 'Nach Bildern suchen'})).toBeVisible()
        const dateRes =  await page.evaluate(() => {
            return { 
               date: Date(),
               localization: navigator.language,
               timezoneId : Intl.DateTimeFormat().resolvedOptions().timeZone
           }
          });
          console.log(dateRes)
    })
})
