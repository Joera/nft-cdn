import { OpenAPIRegistry } from "@asteasolutions/zod-to-openapi";
import express, { type Router } from "express";
import { z } from "zod";

import { createApiResponse } from "@/api-docs/openAPIResponseBuilders";
import { validateRequest } from "@/common/utils/httpHandlers";
import { imageCtrlr } from "./imgController";
import { GetImageSchema, ImageSchema } from "./imgModel";

export const imageRegistry = new OpenAPIRegistry();
export const imageRouter: Router = express.Router();

imageRegistry.register("Image", ImageSchema);

imageRegistry.registerPath({
  method: "post",
  path: "/api/v0/image",
  tags: ["Image"],
  request: { params: GetImageSchema.shape.params },
  responses: createApiResponse(ImageSchema, "Success"),
});

imageRouter.post("/", validateRequest(GetImageSchema), imageCtrlr.postImage);
