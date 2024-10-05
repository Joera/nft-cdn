import { DagPut, getImage, uploadImage } from "@/ipfs/ipfs.factory";
import type { Request, RequestHandler, Response } from "express";
import sharp from "sharp";

class ImageController {
  public postImage: RequestHandler = async (req: Request, res: Response) => {
    const og_cid = req.body.cid;
    const image = await getImage(og_cid);
    const sizes = [600, 900, 1200, 1600, 2400];
    const ipld: any = {
      Image: {},
    };
    for (const size of sizes) {
      const buffer2 = await this.convertImageSize(image, size);
      const cid = await uploadImage(buffer2);
      console.log(cid);
      ipld.Image[size] = { "/": cid };
    }
    const buffer = await this.convertImageFull(image);
    const full_cid = await uploadImage(buffer);
    ipld.Image.full = { "/": full_cid };
    const dag_cid = await DagPut(ipld);
    console.log(dag_cid);
    res.send({ dag: dag_cid, full: full_cid });
  };

  convertImageSize = async (image: Buffer, size: number) => {
    return await sharp(image).resize(size).toFormat("png").toBuffer();
  };

  convertImageFull = async (image: Buffer) => {
    return await sharp(image).toFormat("png").toBuffer();
  };
}

export const imageCtrlr = new ImageController();
