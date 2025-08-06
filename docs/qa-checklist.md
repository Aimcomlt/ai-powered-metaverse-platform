---
title: QA Checklist
sidebar_position: 6
---

# QA Checklist

This checklist covers end-to-end testing of governance and reward flows. Note: the AI console requires only GTs to be staked. FTs are the platform's main currency and behave like any network token, including safeTransfer operations.

## Test Flows
- **Staking**: stake GT to enable AI console access and accrue rewards.
- **Voting**: submit ballots on active proposals and verify vote tallying.
- **Proposal Creation**: draft and submit governance proposals; ensure lifecycle progression.

## Edge Cases
- Attempt actions with insufficient GT balance.
- Perform operations as an unstaked user.
- Try to vote twice on the same proposal.

## Suggested Testnet Scripts
- Deploy mock DAO contracts and initialize sample proposals.
- Simulate FT reward distribution for validated tasks.
- Automate GT staking, proposal submission, and voting flows.

## Contract Interaction Checklist
- **contracts/**: confirm contract addresses, ABIs, and network settings.
- **contracts/scripts/**: verify deployment parameters and upgrade paths.
- **contracts/test/**: maintain coverage for staking, voting, and rewards.
- **src/services/**: ensure safeTransfer usage and error handling when interacting with contracts.

