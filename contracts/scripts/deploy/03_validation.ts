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
  if (!d.ProofOfObservation) {
    const PoO = await ethers.getContractFactory('ProofOfObservation');
    const poo = await upgrades.deployProxy(PoO, [d.HouseOfTheLaw], { kind: 'uups' });
    await poo.waitForDeployment();
    save('ProofOfObservation', await poo.getAddress());
    console.log('ProofOfObservation:', await poo.getAddress());
  }
  if (!d.PoO_TaskFlow) {
    const TF = await ethers.getContractFactory('PoO_TaskFlow');
    const tf = await upgrades.deployProxy(
      TF,
      [d.FunctionalToken, d.GTStaking, d.ProofOfObservation, d.AIAssistantGate],
      { kind: 'uups' }
    );
    await tf.waitForDeployment();
    save('PoO_TaskFlow', await tf.getAddress());
    console.log('PoO_TaskFlow:', await tf.getAddress());
  }
  if (!d.CrossFactionHub) {
    const Hub = await ethers.getContractFactory('CrossFactionHub');
    const hub = await upgrades.deployProxy(
      Hub,
      [
        d.GovernanceToken,
        d.ProofOfObservation,
        BigInt(process.env.VOTING_TOKEN_ID || '1'),
        d.MpNSRegistry,
      ],
      { kind: 'uups' }
    );
    await hub.waitForDeployment();
    save('CrossFactionHub', await hub.getAddress());
    console.log('CrossFactionHub:', await hub.getAddress());
  }
}

main().catch(console.error);
