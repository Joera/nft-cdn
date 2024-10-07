import { env } from "@/common/utils/envConfig";
import FormData from "form-data";
// @ts-ignore
import fetch from "node-fetch";

export const pin_only = async (cid: string): Promise<string> => {
  const headers = {
    "Content-Type": "application/json",
  };

  const response = await fetch(`${env.IPFS_CLUSTER_PROXY_API}/pin/add/${cid}`, {
    method: "POST",
    headers,
  });
  if (!response.ok) {
    throw new Error(`Upload failed: ${response.statusText}`);
  }
  const data: any = await response.json();
  return data.Cid["/"];
};

export const DagPutAndPin = async (dag: any): Promise<string> => {
  const form = new FormData();
  const b = Buffer.from(JSON.stringify(dag));
  form.append("file", b);
  const response = await fetch(`${env.IPFS_CLUSTER_PROXY_API}/dag/put?pin=true`, {
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

export const uploadImageAndPin = async (image: Buffer) => {
  const form = new FormData();

  form.append("file", image, {
    filename: "image.png",
    contentType: "image/png",
  });

  const response = await fetch(`${env.IPFS_CLUSTER_PROXY_API}/add`, {
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

export const pinList = async () => {
  const headers = {
    "Content-Type": "application/json",
  };

  const response = await fetch(`${env.IPFS_CLUSTER_PROXY_API}/pin/ls`, {
    method: "GET",
    headers,
  });

  const data: any = await response.json();
  return data;
};

export const pinStats = async () => {
  const headers = {
    "Content-Type": "application/json",
  };

  const response = await fetch(`${env.IPFS_CLUSTER_PROXY_API}/repo/stat`, {
    method: "GET",
    headers,
  });

  const data: any = await response.json();
  return data;
};
