import 'dotenv/config';
import { ethers, upgrades, network } from 'hardhat';
import fs from 'fs'; import path from 'path';

const file = path.join(__dirname, '..', 'deployments', `${network.name}.json`);
const d = fs.existsSync(file) ? JSON.parse(fs.readFileSync(file,'utf8')) : {};
const save = (n:string,a:string)=>{ d[n]=a; fs.writeFileSync(file, JSON.stringify(d,null,2)); };

async function main() {
  if (!d.FunctionalToken) {
    const FT = await ethers.getContractFactory('FunctionalToken');
    const ft = await upgrades.deployProxy(FT, [process.env.FT_URI || ''], { kind:'uups' });
    await ft.waitForDeployment(); save('FunctionalToken', await ft.getAddress());
    console.log('FunctionalToken:', await ft.getAddress());
  }
  if (!d.GovernanceToken) {
    const GT = await ethers.getContractFactory('GovernanceToken');
    const gt = await upgrades.deployProxy(GT, [process.env.GT_URI || ''], { kind:'uups' });
    await gt.waitForDeployment(); save('GovernanceToken', await gt.getAddress());
    console.log('GovernanceToken:', await gt.getAddress());
  }
  if (!d.MpNSRegistry) {
    const R = await ethers.getContractFactory('MpNSRegistry');
    const r = await upgrades.deployProxy(R, [], { kind:'uups' });
    await r.waitForDeployment(); save('MpNSRegistry', await r.getAddress());
    console.log('MpNSRegistry:', await r.getAddress());
  }
}
main().catch(console.error);
