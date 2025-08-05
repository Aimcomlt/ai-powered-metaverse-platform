import { ethers } from 'hardhat';

async function main() {
  const Registry = await ethers.getContractFactory('StrategyRegistry');
  const registry = await Registry.deploy();
  await registry.waitForDeployment();
  console.log(`StrategyRegistry deployed to ${registry.target}`);

  const ALPHA_BPS = 10_000n; // 1:1 FT to GT
  const RESERVE_RATIO_BPS = 1_000n; // 10% reserve

  const House = await ethers.getContractFactory('HouseOfTheLaw');
  const house = await House.deploy();
  await house.waitForDeployment();
  await house.initialize(
    ethers.ZeroAddress,
    ethers.ZeroAddress,
    ethers.ZeroAddress,
    ALPHA_BPS,
    RESERVE_RATIO_BPS
  );
  console.log(
    `HouseOfTheLaw initialized with alpha ${ALPHA_BPS} and reserve ratio ${RESERVE_RATIO_BPS}`
  );
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
