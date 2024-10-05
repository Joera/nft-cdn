import { OpenAPIRegistry } from "@asteasolutions/zod-to-openapi";
import express, { type Router } from "express";
import { z } from "zod";

import { createApiResponse } from "@/api-docs/openAPIResponseBuilders";
import { validateRequest } from "@/common/utils/httpHandlers";
import { nftCtrlr } from "./nftController";
import { GetNFTSchema, NFTSchema } from "./nftModel";

export const nftRegistry = new OpenAPIRegistry();
export const nftRouter: Router = express.Router();

nftRegistry.register("NFT", NFTSchema);

nftRegistry.registerPath({
  method: "get",
  path: "/api/v0/nft/{address}/{tokenId}/{size}",
  tags: ["NFT"],
  request: { params: GetNFTSchema.shape.params },
  responses: createApiResponse(NFTSchema, "Success"),
});

nftRouter.get("/:address/:tokenId/:size", validateRequest(GetNFTSchema), nftCtrlr.getNFT);
