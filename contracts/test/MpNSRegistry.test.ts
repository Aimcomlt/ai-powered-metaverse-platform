import { expect } from 'chai';
import { ethers, upgrades } from 'hardhat';
import { anyValue } from '@nomicfoundation/hardhat-chai-matchers/withArgs';

describe('MpNSRegistry', function () {
  async function deployRegistry() {
    const [deployer, registrar, user] = await ethers.getSigners();
    const Registry = await ethers.getContractFactory('MpNSRegistry');
    const registry = await upgrades.deployProxy(Registry, { initializer: 'initialize' });
    await registry.waitForDeployment();

    await registry.grantRole(await registry.REGISTRAR_ROLE(), registrar.address);

    return { registry, deployer, registrar, user };
  }

  it('allows registrar to register and update names', async function () {
    const { registry, registrar, user } = await deployRegistry();
    const duration = 60 * 60 * 24; // 1 day

    await expect(
      registry.connect(registrar).register('alice', user.address, duration, 'ipfs://old')
    ).to.emit(registry, 'NameRegistered').withArgs('alice', user.address, anyValue, 'ipfs://old');

    expect(await registry.ownerOf('alice')).to.equal(user.address);

    await expect(
      registry.connect(user).updateURI('alice', 'ipfs://new')
    ).to.emit(registry, 'URIUpdated').withArgs('alice', 'ipfs://old', 'ipfs://new');

    expect(await registry.nameToUri('alice')).to.equal('ipfs://new');
  });

  it('reverts register for non-registrars', async function () {
    const { registry, user } = await deployRegistry();
    const role = await registry.REGISTRAR_ROLE();
    await expect(
      registry.connect(user).register('bob', user.address, 1000, 'ipfs://test')
    )
      .to.be.revertedWithCustomError(registry, 'AccessControlUnauthorizedAccount')
      .withArgs(user.address, role);
  });
});
