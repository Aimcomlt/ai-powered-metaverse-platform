// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

contract ArbCloneFactory {
    event CloneCreated(address clone);

    function createClone(address implementation) external returns (address) {
        emit CloneCreated(implementation);
        return implementation;
    }
}
