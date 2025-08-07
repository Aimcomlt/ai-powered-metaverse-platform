import 'dotenv/config';
import { ethers, network } from 'hardhat';
import fs from 'fs'; import path from 'path';

const file = path.join(__dirname, '..', 'deployments', `${network.name}.json`);
const d = fs.existsSync(file) ? JSON.parse(fs.readFileSync(file,'utf8')) : {};

async function main() {
  const ft = await ethers.getContractAt('FunctionalToken', d.FunctionalToken);
  const house = await ethers.getContractAt('HouseOfTheLaw', d.HouseOfTheLaw);
  const taskFlow = await ethers.getContractAt('PoO_TaskFlow', d.PoO_TaskFlow);
  const poo = await ethers.getContractAt('ProofOfObservation', d.ProofOfObservation);

  const minter = await ft.MINTER_ROLE();
  if (!(await ft.hasRole(minter, d.HouseOfTheLaw))) {
    await (await ft.grantRole(minter, d.HouseOfTheLaw)).wait();
    console.log('Granted MINTER_ROLE to HouseOfTheLaw');
  }
  if (!(await ft.hasRole(minter, d.PoO_TaskFlow))) {
    await (await ft.grantRole(minter, d.PoO_TaskFlow)).wait();
    console.log('Granted MINTER_ROLE to PoO_TaskFlow');
  }
  if ((await house.proofOfObservation()) !== d.ProofOfObservation) {
    await (await house.setProofOfObservation(d.ProofOfObservation)).wait();
    console.log('Linked ProofOfObservation to HouseOfTheLaw');
  }
}
main().catch(console.error);
