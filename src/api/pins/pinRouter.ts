import { OpenAPIRegistry } from "@asteasolutions/zod-to-openapi";
import express, { type Router } from "express";
import { z } from "zod";

import { createApiResponse } from "@/api-docs/openAPIResponseBuilders";
import { validateRequest } from "@/common/utils/httpHandlers";
import { pinCtrlr } from "./pinController";
import { GetPinSchema, PinSchema } from "./pinModel";

export const pinRegistry = new OpenAPIRegistry();
export const pinRouter: Router = express.Router();

pinRegistry.register("Pin", PinSchema);

pinRegistry.registerPath({
  method: "get",
  path: "/api/v0/pins",
  tags: ["Pin"],
  request: { params: GetPinSchema.shape.params },
  responses: createApiResponse(PinSchema, "Success"),
});

pinRouter.get("/list", validateRequest(GetPinSchema), pinCtrlr.list);
pinRouter.get("/stats", validateRequest(GetPinSchema), pinCtrlr.stats);
