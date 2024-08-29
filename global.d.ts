import { ZodTypeAny } from "zod"

declare global{
 namespace PlaywrightTest {
     interface Matchers<R, T = unknown> {
        toMatchSchema(schema: ZodTypeAny): Promise<R>;
    }
  }
}