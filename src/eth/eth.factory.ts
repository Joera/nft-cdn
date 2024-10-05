import { env } from "@/common/utils/envConfig";
import { ethers } from "ethers";

const provider = ethers.getDefaultProvider(`https://arb-sepolia.g.alchemy.com/v2/${env.ALCHEMY_KEY}`, {
  alchemy: env.ALCHEMY_KEY,
});

export const readTokenUri = async (contract_address: string, tokenId: string) => {
  const contractABI = ["function tokenURI(uint256 tokenId) external view returns (string memory)"];

  const contract = new ethers.Contract(contract_address, contractABI, provider);
  try {
    const tokenURI = await contract.tokenURI(tokenId);
    console.log(`Token URI for tokenId ${tokenId}:`, tokenURI);
    return tokenURI;
  } catch (error) {
    console.error(`Failed to fetch tokenURI for tokenId ${tokenId}:`, error);
    throw error;
  }
};
