import { extendZodWithOpenApi } from "@asteasolutions/zod-to-openapi";
import { z } from "zod";

import { commonValidations } from "@/common/utils/commonValidation";

extendZodWithOpenApi(z);

export type NFT = z.infer<typeof NFTSchema>;
export const NFTSchema = z.object({
  // id: z.number(),
  // name: z.string(),
  // email: z.string().email(),
  // age: z.number(),
  // createdAt: z.date(),
  // updatedAt: z.date(),
});

// Input Validation for 'GET users/:id' endpoint
export const GetNFTSchema = z.object({
  params: z.object({
    // address: z.object({ address: commonValidations.address }),
    // tokenId: z.object({ tokenId:  commonValidations.tokenId }),
    // size: z.object({ size:  commonValidations.size })
  }),
});
