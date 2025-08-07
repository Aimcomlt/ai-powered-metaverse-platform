import { expect } from 'chai';
import { ethers, upgrades } from 'hardhat';
import { anyValue } from '@nomicfoundation/hardhat-chai-matchers/withArgs';

describe('MpNSRegistry', function () {
  async function deployRegistry() {
    const [deployer, registrar, user, other, genesisGov] = await ethers.getSigners();
    const Registry = await ethers.getContractFactory('MpNSRegistry');
    const registry = await upgrades.deployProxy(Registry, { initializer: 'initialize' });
    await registry.waitForDeployment();

    await registry.grantRole(await registry.REGISTRAR_ROLE(), registrar.address);
    await registry.grantRole(await registry.GENESIS_GOVERNANCE_ROLE(), genesisGov.address);

    return { registry, deployer, registrar, user, other, genesisGov };
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
    expect(await registry.isGenesis('alice')).to.equal(false);
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

  it('marks genesis records and restricts mutations', async function () {
    const { registry, registrar, user, other, genesisGov } = await deployRegistry();
    const duration = 60 * 60 * 24; // 1 day

    await registry.connect(registrar).registerGenesis('gen', user.address, duration, 'ipfs://gen');

    expect(await registry.isGenesis('gen')).to.equal(true);

    await expect(
      registry.connect(user).updateURI('gen', 'ipfs://new')
    ).to.be.revertedWith('Genesis governance only');

    await expect(
      registry.connect(user).transfer('gen', other.address)
    ).to.be.revertedWith('Genesis governance only');

    await expect(
      registry.connect(genesisGov).updateURI('gen', 'ipfs://new')
    ).to.emit(registry, 'URIUpdated').withArgs('gen', 'ipfs://gen', 'ipfs://new');

    await expect(
      registry.connect(genesisGov).transfer('gen', other.address)
    ).to.emit(registry, 'NameTransferred').withArgs('gen', user.address, other.address);

    expect(await registry.ownerOf('gen')).to.equal(other.address);
  });
});
