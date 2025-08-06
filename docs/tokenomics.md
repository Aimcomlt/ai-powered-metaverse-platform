---
title: Tokenomics
sidebar_position: 2
---

# Tokenomics

Overview of the platform's dual-token economy, staking mechanisms, and reward flows.

## Dual-Token Model

The platform issues a Governance Token (GT) and a Functional Token (FT).
GT powers governance and long-term incentives, while FT is used for in-world utility such as AI console access and task payments.

## Staking

Users stake GT to gain voting power and unlock higher reward tiers.
Staked tokens are subject to lockup periods and can earn additional GT as staking rewards.
Early withdrawal forfeits pending rewards.

## Wallet Connection Reward

Connecting a wallet is treated as an initial contribution to the ecosystem.
A successful connection mints approximately 10 GT to the participant.
These tokens are automatically staked, granting the user access to their first task.

## GT Tagging

Every minted GT is tagged with the participant's level, contribution type, and faction.
These tags let a wallet serve as a ledger of a user's accomplishments across the platform.

## Proof of Observation

User-submitted tasks are validated through the Proof of Observation (PoO) mechanism.
Validated contributions mint FT to the participant and may grant GT bonuses for sustained engagement.

## AI Console Gating

Access to the AI console requires holding or staking a minimum FT balance.
Usage consumes FT credits; additional staking enables extended or higher-priority access.

## Task Reward Flows

1. A participant completes a task and submits results to PoO.
2. Validators call [`ProofOfObservation.validateTask`](../contracts/contracts/metaverse/validation/ProofOfObservation.sol) to record a valid submission.
3. The [`PoO_TaskFlow` contract](../contracts/contracts/metaverse/validation/PoO_TaslkFlow.sol) confirms the validated task via `rewardAfterTask` and checks the user's staked GT.
4. `PoO_TaskFlow` unstakes the GT and mints FT/GT rewards according to the platform's reward matrix.
