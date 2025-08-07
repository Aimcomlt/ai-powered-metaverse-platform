import { ethers, upgrades } from 'hardhat';

async function main() {
  const [deployer] = await ethers.getSigners();
  const registrarAddress = process.env.REGISTRAR_ADDRESS || deployer.address;

  const Registry = await ethers.getContractFactory('MpNSRegistry');
  const registry = await upgrades.deployProxy(Registry, { initializer: 'initialize' });
  await registry.waitForDeployment();

  const role = await registry.REGISTRAR_ROLE();
  if (registrarAddress !== deployer.address) {
    await registry.grantRole(role, registrarAddress);
  }

  console.log(`MpNSRegistry deployed to ${registry.target}`);
  console.log(`Registrar role granted to ${registrarAddress}`);
  console.log(`NEXT_PUBLIC_MPNS_REGISTRY_ADDRESS=${registry.target}`);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
