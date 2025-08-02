// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

contract StrategyRegistry {
    mapping(uint256 => address) public strategies;

    function register(uint256 id, address strategy) external {
        strategies[id] = strategy;
    }
}
