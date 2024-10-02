
import { test, expect} from '@playwright/test'
import { z } from 'zod'

test.use({ baseURL: 'https://api.restful-api.dev'})
test.describe('Check the custom schema', async() => {

    test('Validate the schema of the response', async ({ request }) => {
        const schema = z.object({
            id: z.number(),
            name: z.string(),
            data: z.object({ color: z.string(), capacity: z.string() })
          })
        
        const response = await request.get('/objects/1')
        expect(response.ok()).toBeTruthy()
        const json  = await response.json()

        await expect(json).toMatchSchema(schema)
    })
    
    
})
