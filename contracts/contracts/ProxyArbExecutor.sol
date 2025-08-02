// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

contract ProxyArbExecutor {
    address public owner;

    constructor() {
        owner = msg.sender;
    }

    function execute() external {
        // placeholder for execution logic
    }
}
