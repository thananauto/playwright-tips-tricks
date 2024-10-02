

import { ZodTypeAny } from "zod"
import { expect as exp, APIResponse } from '@playwright/test'

const expect = exp.extend({
    async toMatchSchema( response: APIResponse, schema: ZodTypeAny){
        const json = await response.json()
        const result = await schema.safeParseAsync(json) 
            if(result.success){
                return {
                    'message' : ()=>'success',
                    'pass' : true,


                }
             }else{
                return {
                    'message' : ()=>'Result not matching schema '+result.error.issues.map(e=> e.message).join("\n")+
                                "\n" +
                                "Details: " +
                                JSON.stringify(result.error, null, 2),
                    'pass' : false

                }
             }
    }
})

export { expect }




