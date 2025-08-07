import 'dotenv/config';
import { ethers, network } from 'hardhat';
import fs from 'fs';
import path from 'path';

const names = [
  'AGENT.architects-guild.charter.mpns',
  'AGENT.chartermentor.gpt.md',
  'AGENT.token-audit.gpt.md',
  'AGENT.faction-template.content-creator.mpns',
  'AGENT.faction-template.labelDAO.mpns'
];

async function uploadPlaceholder(): Promise<string> {
  // Optional IPFS upload for placeholder metadata
  const endpoint = process.env.IPFS_API_ENDPOINT;
  if (!endpoint) return 'ipfs://placeholder';
  try {
    const body = new URLSearchParams();
    body.set('data', JSON.stringify({ note: 'placeholder' }));
    const res = await fetch(`${endpoint}/api/v0/add`, { method: 'POST', body });
    const data = await res.json();
    return data.Hash ? `ipfs://${data.Hash}` : 'ipfs://placeholder';
  } catch (e) {
    console.warn('IPFS upload failed, using placeholder URI');
    return 'ipfs://placeholder';
  }
}

export default async function seedArchitectsGuild() {
  const file = path.join(__dirname, '..', 'deployments', `${network.name}.json`);
  const d = fs.existsSync(file) ? JSON.parse(fs.readFileSync(file, 'utf8')) : {};
  if (!d.MpNSRegistry) {
    throw new Error('MpNSRegistry address not found in deployments');
  }
  const [deployer] = await ethers.getSigners();
  const registry = await ethers.getContractAt('MpNSRegistry', d.MpNSRegistry);
  const uri = await uploadPlaceholder();
  const duration = 365n * 24n * 60n * 60n; // 1 year

  for (const name of names) {
    const owner = await registry.ownerOf(name);
    if (owner === ethers.ZeroAddress) {
      await (await registry.register(name, deployer.address, duration, uri)).wait();
      console.log(`Registered ${name}`);
    }
    const frozen = await registry.isFrozen(name);
    if (!frozen) {
      await (await registry.freezeName(name)).wait();
      console.log(`Frozen ${name}`);
    }
  }
}

if (require.main === module) {
  seedArchitectsGuild().catch((e) => {
    console.error(e);
    process.exitCode = 1;
  });
}

