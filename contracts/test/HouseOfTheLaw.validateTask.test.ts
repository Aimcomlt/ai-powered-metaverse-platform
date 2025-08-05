import { expect } from 'chai';
import { ethers } from 'hardhat';

describe('HouseOfTheLaw validateTask formula', function () {
  async function deployFixture() {
    const [admin, poo, user1, user2] = await ethers.getSigners();

    const Gate = await ethers.getContractFactory('MockAIAssistantGate');
    const gate = await Gate.deploy();
    await gate.waitForDeployment();

    const FT = await ethers.getContractFactory('FunctionalToken');
    const ft = await FT.deploy();
    await ft.waitForDeployment();
    await ft.initialize('');

    const House = await ethers.getContractFactory('HouseOfTheLaw');
    const house = await House.deploy();
    await house.waitForDeployment();
    const alpha = 10_000n; // 100% FT per GT
    const reserveRatio = 2_000n; // 20% held in reserve
    await house.initialize(ft.target, ethers.ZeroAddress, gate.target, alpha, reserveRatio);

    // allow HouseOfTheLaw to mint FTs
    const MINTER_ROLE = await ft.MINTER_ROLE();
    await ft.grantRole(MINTER_ROLE, house.target);

    // set PoO address
    await house.setProofOfObservation(poo.address);

    const ftId = await ft.FT_START_ID();
    return { house, ft, poo, user1, user2, ftId, alpha, reserveRatio };
  }

  it('mints FTs based solely on gtReward', async function () {
    const { house, ft, poo, user1, user2, ftId, alpha, reserveRatio } = await deployFixture();

    const gtReward = 100n;
    const expectedFt = (gtReward * alpha * (10_000n - reserveRatio)) / 10_000n / 10_000n;

    await house.connect(poo).validateTask(user1.address, 1, ftId, gtReward);
    expect(await ft.balanceOf(user1.address, ftId)).to.equal(expectedFt);

    await house.connect(poo).validateTask(user2.address, 2, ftId, gtReward);
    expect(await ft.balanceOf(user2.address, ftId)).to.equal(expectedFt);

    // totalGT accumulates across tasks but does not affect individual FT rewards
    expect(await house.totalGT()).to.equal(gtReward * 2n);
  });
});
