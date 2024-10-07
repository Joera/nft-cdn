import { DagPut, getImage, uploadImage } from "@/ipfs/ipfs.factory";
import { pinList, pinStats } from "@/ipfs/pin.factory";
import type { Request, RequestHandler, Response } from "express";
import sharp from "sharp";

class PinController {
  list = async () => {
    return await pinList();
  };

  stats = async () => {
    return await pinStats();
  };
}

export const pinCtrlr = new PinController();
