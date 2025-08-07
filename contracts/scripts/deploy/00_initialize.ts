import 'dotenv/config';
import { ethers, network } from 'hardhat';
import fs from 'fs'; import path from 'path';

async function main() {
  const [deployer] = await ethers.getSigners();
  console.log(`Deployer: ${deployer.address} on ${network.name}`);

  const dir = path.join(__dirname, '..', 'deployments');
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
  const file = path.join(dir, `${network.name}.json`);
  if (!fs.existsSync(file)) fs.writeFileSync(file, '{}');
}
main().catch(console.error);
