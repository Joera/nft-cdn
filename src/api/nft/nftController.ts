import { readTokenUri } from "@/eth/eth.factory";
import { getImage, resolveImageUrl } from "@/ipfs/ipfs.factory";
import type { Request, RequestHandler, Response } from "express";
import { nftService } from "./nftService";

class NFTController {
  public getNFT: RequestHandler = async (req: Request, res: Response) => {
    let image = null;
    // console.log(req.params);
    try {
      const tokenUri = await readTokenUri(req.params.address, req.params.tokenId);
      console.log(tokenUri);
      const size = req.params.size;
      const metadata = await nftService.fetchMetadata(tokenUri.split("ipfs://")[1]);
      if (!metadata) {
      } else {
        const dag = await resolveImageUrl(metadata.cdn_id, size);
        const cid = dag.Cid["/"];
        image = await getImage(cid);
      }
    } catch (error) {
      console.log(error);
    }
    res.setHeader("Content-Type", "image/jpeg");
    res.end(image, "binary");
  };
}

export const nftCtrlr = new NFTController();
