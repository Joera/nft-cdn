import { ServiceResponse } from "@/common/models/serviceResponse";
import { getDag, getJson } from "@/ipfs/ipfs.factory";
import { logger } from "@/server";
import { StatusCodes } from "http-status-codes";

export class ImageService {
  // constructor() {}

  async fetchMetadata(cid: string) {
    const metadata = await getJson(cid);
    // console.log(metadata);
    const cdn = await getDag(metadata.cdn_id);
    // console.log(cdn);
    return metadata;
  }
}

export const nftService = new ImageService();
