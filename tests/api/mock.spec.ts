import { test, expect } from '@playwright/test'

test.describe.configure({ mode: 'parallel' })
test.use({ baseURL: 'https://api.restful-api.dev' })
test.describe('Mock API response and validate', { tag: '@mock' }, () => {
    type resId = {
        id: string
        name: string
        data: {
            year: number
            price: number
            'CPU model': string
            'Hard disk size': string
        }
    }
    test.beforeEach('Mock some API resonse', async ({ page }) => {
        await page.route('*/**/objects/100', async (route, request) => {
            const json = [
                {
                    id: '100',
                    name: 'Apple MacBook Pro 16',
                    data: {
                        year: 2032,
                        price: 100.99,
                        'CPU model': 'Intel Core i7',
                        'Hard disk size': '2 TB',
                    },
                },
            ]
            // let response = await route.fetch()

            await route.fulfill({ json })
        })
    })
    test('check for response', async ({ request }) => {
        const res = await request.get(`https://api.restful-api.dev/objects/1`)
        expect.soft(res.status()).toBe(200)

        await res.json().then((e: resId) => {
            expect.soft(e.id).toMatch(/\d/)
            expect.soft(e.id).toBe('1')
            expect.soft(e.name).toMatch(/[^0-9]/)
        })
    })
})
