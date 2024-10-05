import { extendZodWithOpenApi } from "@asteasolutions/zod-to-openapi";
import { z } from "zod";

import { commonValidations } from "@/common/utils/commonValidation";

extendZodWithOpenApi(z);

export type Image = z.infer<typeof ImageSchema>;
export const ImageSchema = z.object({
  // id: z.number(),
  // name: z.string(),
  // email: z.string().email(),
  // age: z.number(),
  // createdAt: z.date(),
  // updatedAt: z.date(),
});

// Input Validation for 'GET users/:id' endpoint
export const GetImageSchema = z.object({
  params: z.object({
    // cid: z.object({ cid: commonValidations.cid })
  }),
});
