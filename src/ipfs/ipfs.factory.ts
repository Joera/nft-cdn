import { env } from "@/common/utils/envConfig";
import FormData from "form-data";
// @ts-ignore
import fetch from "node-fetch";

export const getJson = async (cid: string): Promise<any> => {
  return new Promise((resolve, reject) => {
    fetch(`${env.IPFS_RPC}/api/v0/cat?arg=${cid}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response: any) => {
        return response.json();
      })
      .then((data: any) => {
        resolve(data);
      })
      .catch((error: any) => {
        reject(error);
      });
  });
};

export const getDag = async (cid: string): Promise<any> => {
  return new Promise((resolve, reject) => {
    fetch(`${env.IPFS_RPC}/api/v0/dag/get?arg=${cid}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response: any) => {
        return response.json();
      })
      .then((data: any) => {
        resolve(data);
      })
      .catch((error: any) => {
        reject(error);
      });
  });
};

export const getImage = async (cid: string) => {
  console.log(`fetching: ${cid}`);
  const response = await fetch(`${env.IPFS_RPC}/api/v0/cat?arg=${cid}`, {
    method: "POST",
  });
  if (!response.ok) {
    throw new Error("Failed to fetch image from IPFS RPC");
  }
  console.log(`done fetching: ${cid}`);
  const arrayBuffer = await response.arrayBuffer();
  return Buffer.from(arrayBuffer);
};

export const uploadImage = async (image: Buffer) => {
  const form = new FormData();

  form.append("file", image, {
    filename: "image.png",
    contentType: "image/png",
  });

  const response = await fetch(`${env.IPFS_RPC}/api/v0/add`, {
    method: "POST",
    headers: form.getHeaders(),
    body: form,
  });
  if (!response.ok) {
    throw new Error(`Upload failed: ${response.statusText}`);
  }
  const data: any = await response.json();
  return data.Hash;
};

export const DagPut = async (dag: any): Promise<string> => {
  const form = new FormData();
  const b = Buffer.from(JSON.stringify(dag));
  form.append("file", b);
  const response = await fetch(`${env.IPFS_RPC}/api/v0/dag/put`, {
    method: "POST",
    headers: form.getHeaders(),
    body: form,
  });
  if (!response.ok) {
    throw new Error(`Upload failed: ${response.statusText}`);
  }
  const data: any = await response.json();
  return data.Cid["/"];
};

export const resolveImageUrl = async (cid: string, size: string): Promise<any> => {
  return new Promise((resolve, reject) => {
    fetch(`${env.IPFS_RPC}/api/v0/dag/resolve?arg=${cid}/Image/${size}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response: any) => {
        return response.json();
      })
      .then((data: any) => {
        resolve(data);
      })
      .catch((error: any) => {
        reject(error);
      });
  });
};
