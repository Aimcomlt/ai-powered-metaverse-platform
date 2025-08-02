import { ethers } from 'hardhat';

async function main() {
  const Registry = await ethers.getContractFactory('StrategyRegistry');
  const registry = await Registry.deploy();
  await registry.deployed();
  console.log(`StrategyRegistry deployed to ${registry.address}`);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
