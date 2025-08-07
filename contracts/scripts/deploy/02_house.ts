import 'dotenv/config';
import { ethers, upgrades, network } from 'hardhat';
import fs from 'fs'; import path from 'path';

const file = path.join(__dirname, '..', 'deployments', `${network.name}.json`);
const d = fs.existsSync(file) ? JSON.parse(fs.readFileSync(file,'utf8')) : {};
const save = (n:string,a:string)=>{ d[n]=a; fs.writeFileSync(file, JSON.stringify(d,null,2)); };

async function main() {
  if (!d.AIAssistantGate) {
    const Gate = await ethers.getContractFactory('MockAIAssistantGate');
    const gate = await Gate.deploy(); await gate.waitForDeployment();
    save('AIAssistantGate', await gate.getAddress());
    console.log('AIAssistantGate:', await gate.getAddress());
  }
  if (!d.HouseOfTheLaw) {
    const House = await ethers.getContractFactory('HouseOfTheLaw');
    const house = await upgrades.deployProxy(House, [
      d.FunctionalToken,
      d.GovernanceToken,
      d.AIAssistantGate,
      BigInt(process.env.ALPHA_BPS || '10000'),
      BigInt(process.env.RESERVE_RATIO_BPS || '1000')
    ], { kind:'uups' });
    await house.waitForDeployment(); save('HouseOfTheLaw', await house.getAddress());
    console.log('HouseOfTheLaw:', await house.getAddress());
  }
  if (!d.GTStaking) {
    const GTStaking = await ethers.getContractFactory('GTStaking');
    const staking = await upgrades.deployProxy(GTStaking, { kind:'uups', initializer:false });
    await staking.waitForDeployment();
    const ft = await ethers.getContractAt('FunctionalToken', d.FunctionalToken);
    await (await ft.grantRole(await ft.MINTER_ROLE(), staking.address)).wait();
    await staking.initialize(d.GovernanceToken, d.FunctionalToken, d.HouseOfTheLaw);
    const gt = await ethers.getContractAt('GovernanceToken', d.GovernanceToken);
    await (await gt.grantStakingRole(staking.address)).wait();
    save('GTStaking', await staking.getAddress());
    console.log('GTStaking:', await staking.getAddress());
  }
}
main().catch(console.error);
