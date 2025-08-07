import 'dotenv/config';
import { ethers, network } from 'hardhat';
import fs from 'fs';
import path from 'path';

interface AgentSpec {
  handle: string;
  fileType: string;
  ipfsHash: string;
}

function buildName(handle: string, fileType: string): string {
  const first = handle.indexOf('-');
  const second = handle.indexOf('-', first + 1);
  let base = handle;
  if (second !== -1) {
    base = handle.slice(0, second) + '.' + handle.slice(second + 1);
  }
  return `AGENT.${base}.${fileType}`;
}

export default async function seedArchitectsGuild() {
  const deploymentsFile = path.join(__dirname, '..', 'deployments', `${network.name}.json`);
  const d = fs.existsSync(deploymentsFile) ? JSON.parse(fs.readFileSync(deploymentsFile, 'utf8')) : {};
  if (!d.MpNSRegistry) {
    throw new Error('MpNSRegistry address not found in deployments');
  }
  const agentsPath = path.join(__dirname, '..', '..', 'agents', 'architects-guild', 'agents.json');
  const agents: AgentSpec[] = JSON.parse(fs.readFileSync(agentsPath, 'utf8'));

  const [deployer] = await ethers.getSigners();
  const registry = await ethers.getContractAt('MpNSRegistry', d.MpNSRegistry);
  const duration = 365n * 24n * 60n * 60n; // 1 year

  for (const agent of agents) {
    const name = buildName(agent.handle, agent.fileType);
    const owner = await registry.ownerOf(name);
    if (owner === ethers.ZeroAddress) {
      const uri = `ipfs://${agent.ipfsHash}`;
      await (await registry.registerGenesis(name, deployer.address, duration, uri)).wait();
      console.log(`Registered genesis ${name}`);
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

