import { expect } from 'chai';
import { ethers } from 'hardhat';

describe('GTStaking rewards', function () {
  it('references HouseOfTheLaw params and bonding curve', async function () {
    const [deployer, user] = await ethers.getSigners();

    const GT = await ethers.getContractFactory('GovernanceToken');
    const gt = await GT.deploy();
    await gt.waitForDeployment();
    await gt.initialize('');

    const FT = await ethers.getContractFactory('FunctionalToken');
    const ft = await FT.deploy();
    await ft.waitForDeployment();
    await ft.initialize('');

    const House = await ethers.getContractFactory('HouseOfTheLaw');
    const house = await House.deploy();
    await house.waitForDeployment();
    await house.initialize(ft.target, gt.target, deployer.address, 1_000, 500);

    const Staking = await ethers.getContractFactory('GTStaking');
    const staking = await Staking.deploy();
    await staking.waitForDeployment();

    await gt.grantStakingRole(staking.target);
    await ft.grantRole(await ft.MINTER_ROLE(), staking.target);

    await staking.initialize(gt.target, ft.target, house.target);

    await staking.setTaskMetrics(1, 1, 1);

    await gt.mintGT(user.address, 0, 0, 0, '');
    const tokenId = 1n;
    await staking.connect(user).stake(tokenId, 1);

    const reward1 = await staking.calculateReward(1);
    expect(reward1).to.equal(1050000000000000000n);

    await staking.connect(user).completeTask(tokenId, 1, 1);

    const reward2 = await staking.calculateReward(1);
    expect(reward2 < reward1).to.be.true;
  });
});
