// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import {Initializable} from "@openzeppelin/contracts-upgradeable/proxy/utils/Initializable.sol";
import {UUPSUpgradeable} from "@openzeppelin/contracts-upgradeable/proxy/utils/UUPSUpgradeable.sol";
import {AccessControlUpgradeable} from "@openzeppelin/contracts-upgradeable/access/AccessControlUpgradeable.sol";

interface IHouseOfTheLaw {
    /// @notice Credits GT and mints FTs for a validated task.
    function validateTask(
        address user,
        uint256 taskId,
        uint256 ftId,
        uint256 gtReward
    ) external;
}

/**
 * @title ProofOfObservation
 * @notice Verifies that a user has truly completed a task and then rewards them via HouseOfTheLaw.
 */
contract ProofOfObservation is Initializable, UUPSUpgradeable, AccessControlUpgradeable {
    bytes32 public constant VALIDATOR_ROLE = keccak256("VALIDATOR_ROLE");
    bytes32 public constant UPGRADER_ROLE = keccak256("UPGRADER_ROLE");

    IHouseOfTheLaw public houseOfTheLaw;

    struct TaskSubmission {
        address user;
        uint256 taskId;
        string proof; // IPFS hash or other off-chain reference
        bool validated;
    }

    mapping(address => mapping(uint256 => TaskSubmission)) public taskSubmissions; // user -> (taskId → submission)
    mapping(address => uint256[]) public userTasks;

    event TaskSubmitted(address indexed user, uint256 indexed taskId, string proof);
    event TaskValidated(address indexed validator, address indexed user, uint256 taskId, uint256 gtReward);

    /// @custom:oz-upgrades-unsafe-allow constructor
    constructor() {
        _disableInitializers();
    }

    function initialize(address houseOfTheLawAddress) public initializer {
        __AccessControl_init();
        __UUPSUpgradeable_init();

        _grantRole(DEFAULT_ADMIN_ROLE, msg.sender);
        _grantRole(VALIDATOR_ROLE, msg.sender);
        _grantRole(UPGRADER_ROLE, msg.sender);

        houseOfTheLaw = IHouseOfTheLaw(houseOfTheLawAddress);
    }

    function submitTask(uint256 taskId, string calldata proof) external {
        require(taskSubmissions[msg.sender][taskId].user == address(0), "Task already submitted");

        taskSubmissions[msg.sender][taskId] = TaskSubmission({
            user: msg.sender,
            taskId: taskId,
            proof: proof,
            validated: false
        });

        userTasks[msg.sender].push(taskId);

        emit TaskSubmitted(msg.sender, taskId, proof);
    }

    function validateTask(address user, uint256 taskId, uint256 ftId, uint256 gtReward) external onlyRole(VALIDATOR_ROLE) {
        TaskSubmission storage submission = taskSubmissions[user][taskId];
        require(!submission.validated, "Already validated");
        require(submission.user != address(0), "Task not found");

        submission.validated = true;

        // Trigger reward via HouseOfTheLaw
        houseOfTheLaw.validateTask(submission.user, taskId, ftId, gtReward);

        emit TaskValidated(msg.sender, submission.user, taskId, gtReward);
    }

    /// @notice Returns true if the user has at least one validated task submission.
    function isValidated(address user) external view returns (bool) {
        uint256[] storage tasks = userTasks[user];
        for (uint256 i = 0; i < tasks.length; i++) {
            if (taskSubmissions[user][tasks[i]].validated) {
                return true;
            }
        }
        return false;
    }

    function _authorizeUpgrade(address newImplementation) internal override onlyRole(UPGRADER_ROLE) {}

    /// @dev Reserve storage space to allow layout changes in the future.
    /// New variables must be appended at the end and the gap size adjusted if used.
    uint256[50] private __gap;
}
