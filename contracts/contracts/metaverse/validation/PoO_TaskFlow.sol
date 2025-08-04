// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import {AccessControlUpgradeable} from "@openzeppelin/contracts-upgradeable/access/AccessControlUpgradeable.sol";
import {Initializable} from "@openzeppelin/contracts-upgradeable/proxy/utils/Initializable.sol";
import {UUPSUpgradeable} from "@openzeppelin/contracts-upgradeable/proxy/utils/UUPSUpgradeable.sol";

interface IFunctionalToken {
    function mint(address to, uint256 id, uint256 amount, bytes calldata data) external;
}

interface IGTStaking {
    function unstake(address user, uint256 tokenId) external returns (bool);
    function isStaked(address user, uint256 tokenId) external view returns (bool);
}

interface IProofOfObservation {
    function taskSubmissions(uint256 taskId)
        external
        view
        returns (address user, uint256 id, string memory proof, bool validated);
}

contract PoO_TaskFlow is Initializable, UUPSUpgradeable, AccessControlUpgradeable {
    bytes32 public constant VALIDATOR_ROLE = keccak256("VALIDATOR_ROLE");
    bytes32 public constant UPGRADER_ROLE = keccak256("UPGRADER_ROLE");

    IFunctionalToken public functionalToken;
    IGTStaking public gtStaking;
    IProofOfObservation public proofOfObservation;

    mapping(uint256 => bool) public rewardedTasks;

    event TaskRewarded(address indexed user, uint256 taskId, uint256 ftId, uint256 amount);

    constructor() {
        _disableInitializers();
    }

    function initialize(address ftAddr, address stakingAddr, address pooAddr) public initializer {
        __AccessControl_init();
        __UUPSUpgradeable_init();

        functionalToken = IFunctionalToken(ftAddr);
        gtStaking = IGTStaking(stakingAddr);
        proofOfObservation = IProofOfObservation(pooAddr);

        _grantRole(DEFAULT_ADMIN_ROLE, msg.sender);
        _grantRole(VALIDATOR_ROLE, msg.sender);
        _grantRole(UPGRADER_ROLE, msg.sender);
    }

    function rewardAfterTask(
        address user,
        uint256 tokenId,  // GT used to unlock task
        uint256 taskId,
        uint256 ftId,
        uint256 ftAmount
    ) external onlyRole(VALIDATOR_ROLE) {
        require(gtStaking.isStaked(user, tokenId), "GT not staked");
        require(!rewardedTasks[taskId], "Task already rewarded");

        (address recordedUser, , , bool validated) = proofOfObservation.taskSubmissions(taskId);
        require(validated && recordedUser == user, "Invalid task");

        bool unstaked = gtStaking.unstake(user, tokenId);
        require(unstaked, "Unstake failed");

        functionalToken.mint(user, ftId, ftAmount, bytes(""));

        rewardedTasks[taskId] = true;

        emit TaskRewarded(user, taskId, ftId, ftAmount);
    }

    function _authorizeUpgrade(address newImplementation) internal override onlyRole(UPGRADER_ROLE) {}
}
