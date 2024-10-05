import { z } from "zod";

const ipfsCidRegex = /^(Qm[1-9A-HJ-NP-Za-km-z]{44}|bafy[1-9A-HJ-NP-Za-km-z]{50,})$/;

export const commonValidations = {
  address: z.string().refine((address) => address.length === 42, { message: "Invalid address format" }),
  tokenId: z.string().refine((value) => {
    return !Number.isNaN(Number(value));
  }),
  cid: z.string().refine((cid) => ipfsCidRegex.test(cid), { message: "Invalid IPFS CID format" }),
  // .openapi({ description: 'An IPFS CID', example: 'QmTzQ1...' })
  size: z.string(),
  // .refine((value) => {  return !isNaN(Number(value))}),
  id: z.number(),
};
