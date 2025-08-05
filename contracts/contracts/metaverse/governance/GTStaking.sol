// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import {AccessControlUpgradeable} from "@openzeppelin/contracts-upgradeable/access/AccessControlUpgradeable.sol";
import {Initializable} from "@openzeppelin/contracts-upgradeable/proxy/utils/Initializable.sol";
import {UUPSUpgradeable} from "@openzeppelin/contracts-upgradeable/proxy/utils/UUPSUpgradeable.sol";

import {GovernanceToken} from "../tokens/GovernanceToken.sol";
import {FunctionalToken} from "../tokens/FunctionalToken.sol";

/**
 * @title GTStaking
 * @notice Locks Governance Tokens while a task is being completed and mints
 *         Functional Tokens as rewards once finished.
 */
contract GTStaking is Initializable, AccessControlUpgradeable, UUPSUpgradeable {
    bytes32 public constant UPGRADER_ROLE = keccak256("UPGRADER_ROLE");

    GovernanceToken public gt;
    FunctionalToken public ft;

    event Staked(address indexed user, uint256 indexed tokenId, uint256 amount);
    event Unstaked(address indexed user, uint256 indexed tokenId, uint256 amount);

    struct TaskMetrics { uint256 demand; uint256 supply; }
    mapping(uint256 => TaskMetrics) public taskMetrics;
    mapping(address => mapping(uint256 => uint256)) public staked; // user => tokenId => amount

    /// @custom:oz-upgrades-unsafe-allow constructor
    constructor() { _disableInitializers(); }

    function initialize(address gt_, address ft_) public initializer {
        __AccessControl_init();
        __UUPSUpgradeable_init();
        gt = GovernanceToken(gt_);
        ft = FunctionalToken(ft_);
        require(ft.hasRole(ft.MINTER_ROLE(), address(this)), "missing minter role");
        _grantRole(DEFAULT_ADMIN_ROLE, msg.sender);
        _grantRole(UPGRADER_ROLE, msg.sender);
    }

    function setTaskMetrics(uint256 taskId, uint256 demand, uint256 supply) external onlyRole(DEFAULT_ADMIN_ROLE) {
        taskMetrics[taskId] = TaskMetrics(demand, supply);
    }

    function stake(uint256 id, uint256 amount) external {
        require(amount > 0, "amount=0");
        gt.stakeTransferFrom(msg.sender, address(this), id, amount, "");
        staked[msg.sender][id] += amount;
        emit Staked(msg.sender, id, amount);
    }

    function completeTask(uint256 id, uint256 amount, uint256 taskId) external {
        require(amount > 0, "amount=0");
        require(staked[msg.sender][id] >= amount, "insufficient stake");
        staked[msg.sender][id] -= amount;
        gt.stakeTransferFrom(address(this), msg.sender, id, amount, "");
        uint256 reward = calculateReward(taskId) * amount / 1e18;
        ft.mint(msg.sender, id, reward, "");
    }

    function calculateReward(uint256 taskId) public view returns (uint256) {
        TaskMetrics memory m = taskMetrics[taskId];
        if (m.demand > m.supply) return 125e16; // 1.25 * 1e18
        if (m.supply > m.demand) return 75e16;  // 0.75 * 1e18
        return 1e18; // 1 * 1e18
    }

    function isStaked(address user, uint256 tokenId) external view returns (bool) {
        return staked[user][tokenId] > 0;
    }

    function unstake(address user, uint256 tokenId) external returns (bool) {
        require(msg.sender == user, "unauthorized");
        uint256 amount = staked[user][tokenId];
        require(amount > 0, "no stake");
        staked[user][tokenId] = 0;
        gt.stakeTransferFrom(address(this), user, tokenId, amount, "");
        emit Unstaked(user, tokenId, amount);
        return true;
    }

    function _authorizeUpgrade(address newImplementation) internal override onlyRole(UPGRADER_ROLE) {}

    /// @dev Reserve storage space to allow layout changes in the future.
    /// New variables must be appended at the end and the gap size adjusted if used.
    uint256[50] private __gap;
}

