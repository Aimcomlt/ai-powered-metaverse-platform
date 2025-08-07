import 'dotenv/config';
import { ethers, upgrades, network } from 'hardhat';
import fs from 'fs';
import path from 'path';

const file = path.join(__dirname, '..', 'deployments', `${network.name}.json`);
const dir = path.dirname(file);
const d = fs.existsSync(file) ? JSON.parse(fs.readFileSync(file, 'utf8')) : {};
const save = (n: string, a: string) => {
  d[n] = a;
  fs.mkdirSync(dir, { recursive: true });
  fs.writeFileSync(file, JSON.stringify(d, null, 2));
};

async function main() {
  if (!d.GenesisBlockFactionImpl) {
    const Faction = await ethers.getContractFactory('GenesisBlockFaction');
    const impl = await upgrades.deployImplementation(Faction);
    save('GenesisBlockFactionImpl', impl);
    console.log('GenesisBlockFaction impl:', impl);
  }
  if (!d.GenesisBlockFactory) {
    const Factory = await ethers.getContractFactory('GenesisBlockFactory');
    const factory = await Factory.deploy(d.GenesisBlockFactionImpl, d.MpNSRegistry);
    await factory.waitForDeployment(); save('GenesisBlockFactory', await factory.getAddress());
    console.log('GenesisBlockFactory:', await factory.getAddress());
  }
  if (!d.StrategyRegistry) {
    const SR = await ethers.getContractFactory('StrategyRegistry');
    const sr = await SR.deploy();
    await sr.waitForDeployment(); save('StrategyRegistry', await sr.getAddress());
    console.log('StrategyRegistry:', await sr.getAddress());
  }
}
main().catch(console.error);
