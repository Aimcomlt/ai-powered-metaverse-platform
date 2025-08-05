import { expect } from 'chai';
import { ethers } from 'hardhat';

describe('HouseOfTheLaw parameter updates', function () {
  async function deployFixture() {
    const [admin, aiUser, other] = await ethers.getSigners();

    const Gate = await ethers.getContractFactory('MockAIAssistantGate');
    const gate = await Gate.deploy();
    await gate.waitForDeployment();

    const House = await ethers.getContractFactory('HouseOfTheLaw');
    const house = await House.deploy();
    await house.waitForDeployment();

    await house.initialize(
      ethers.ZeroAddress,
      ethers.ZeroAddress,
      gate.target,
      10_000n,
      1_000n
    );

    return { house, gate, admin, aiUser, other };
  }

  it('allows admin to update alpha', async function () {
    const { house, admin } = await deployFixture();
    await expect(house.connect(admin).setAlpha(5_000n))
      .to.emit(house, 'AlphaUpdated')
      .withArgs(10_000n, 5_000n, admin.address);
    expect(await house.alpha()).to.equal(5_000n);
  });

  it('allows AI controller to update reserve ratio', async function () {
    const { house, gate, aiUser } = await deployFixture();
    await gate.setOpen(aiUser.address, true);
    await expect(house.connect(aiUser).setReserveRatio(3_000n))
      .to.emit(house, 'ReserveRatioUpdated')
      .withArgs(1_000n, 3_000n, aiUser.address);
    expect(await house.reserveRatio()).to.equal(3_000n);
  });

  it('reverts for unauthorized callers', async function () {
    const { house, other } = await deployFixture();
    await expect(house.connect(other).setAlpha(1n)).to.be.revertedWith(
      'AI console not active'
    );
    await expect(
      house.connect(other).setReserveRatio(1n)
    ).to.be.revertedWith('AI console not active');
  });

  it('rejects reserve ratio above 10000', async function () {
    const { house, admin } = await deployFixture();
    await expect(
      house.connect(admin).setReserveRatio(10_001n)
    ).to.be.revertedWith('reserve too high');
  });
});
