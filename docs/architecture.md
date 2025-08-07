---
title: Architecture Overview
sidebar_position: 1
---

# Architecture

This document outlines the high-level architecture of the platform.

## Backend

Placeholder for backend service description.

## Frontend

Placeholder for frontend structure description.

### IPFS and Charters

`ipfsService.uploadAgentMd` pins an `AGENTS.md` file to IPFS and returns a CID.
During faction creation the frontend uses this CID to call
`FactionCharterRegistry.registerCharter`, linking the charter to the
newly deployed faction. A simple `AgentMdUploader` component also exposes
the upload utility for manual submissions.

## Smart Contracts

Placeholder for smart contract layout description.

