import { expect } from 'chai';
import { ethers, upgrades } from 'hardhat';

import { anyValue } from '@nomicfoundation/hardhat-chai-matchers/withArgs';

describe('MpNSRegistry - mpns', function () {
  async function deploy() {
    const [deployer, registrar, user] = await ethers.getSigners();
    const Registry = await ethers.getContractFactory('MpNSRegistry');
    const registry = await upgrades.deployProxy(Registry, { initializer: 'initialize' });
    await registry.waitForDeployment();
    await registry.grantRole(await registry.REGISTRAR_ROLE(), registrar.address);
    return { registry, registrar, user };
  }

  it('registers a name', async function () {
    const { registry, registrar, user } = await deploy();
    const duration = 60 * 60 * 24;
    await expect(
      registry.connect(registrar).register('alice', user.address, duration, 'ipfs://old')
    ).to.emit(registry, 'NameRegistered').withArgs('alice', user.address, anyValue, 'ipfs://old');
    expect(await registry.ownerOf('alice')).to.equal(user.address);
  });

  it('updates a URI', async function () {
    const { registry, registrar, user } = await deploy();
    const duration = 60 * 60 * 24;
    await registry.connect(registrar).register('alice', user.address, duration, 'ipfs://old');
    await expect(
      registry.connect(user).updateURI('alice', 'ipfs://new')
    ).to.emit(registry, 'URIUpdated').withArgs('alice', 'ipfs://old', 'ipfs://new');
    expect(await registry.nameToUri('alice')).to.equal('ipfs://new');
  });

  it('resolves a registered name', async function () {
    const { registry, registrar, user } = await deploy();
    const duration = 60 * 60 * 24;
    await registry.connect(registrar).register('alice', user.address, duration, 'ipfs://old');
    expect(await registry.nameToUri('alice')).to.equal('ipfs://old');
  });
});
