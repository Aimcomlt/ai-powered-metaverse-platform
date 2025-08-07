---
title: Deployment Guide
sidebar_position: 3
---

# Deployment

Instructions for deploying and verifying contracts and configuring environment variables.

## Deploying Contracts

Placeholder steps for contract deployment.

## Verification

Placeholder steps for contract verification.

## Environment Variables

Placeholder for required environment variable configuration.

## Genesis Agent Seeding

The bootstrap process seeds the Architects Guild with genesis agent handles.
Run the following during deployment:

```
npx hardhat run scripts/deploy-genesis-block.ts
```

This invokes `scripts/seed-architects-guild.ts`, which reads `agents/architects-guild/agents.json`, registers each handle via the registry's `registerGenesis` function, and freezes the names so `isGenesis` remains true.

