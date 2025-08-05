// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

interface IAIAssistantGate {
    function isConsoleOpen(address user) external view returns (bool);
}

contract MockAIAssistantGate is IAIAssistantGate {
    mapping(address => bool) public open;

    function setOpen(address user, bool status) external {
        open[user] = status;
    }

    function isConsoleOpen(address user) external view returns (bool) {
        return open[user];
    }
}
