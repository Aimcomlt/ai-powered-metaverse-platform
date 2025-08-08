---
title: Platform Usage
sidebar_position: 4
---

# Usage

Guide for faction users interacting with the platform.

## AI Console

Placeholder for steps to use the AI console.

## Governance

Placeholder for governance participation instructions.

## Staking

Placeholder for staking process description.

## Task Flow

Placeholder for task flow and reward lifecycle.

## Name Registration (MpNS)

### Prerequisites

Set the following environment variables to target your network and the deployed registry:

- `RPC_URL` – HTTP endpoint of the Ethereum network.
- `CHAIN_ID` – Chain identifier for the selected network.
- `REACT_APP_MPNS_REGISTRY_ADDRESS` – Address of the `MpNSRegistry` exposed to the React front end. Use the `REACT_APP_` prefix (or `NEXT_PUBLIC_` when using Next.js) so the key is available in the browser.
- `MPNS_REGISTRY_ADDRESS` – Registry address for Node scripts or tests.
- `REGISTRAR_ADDRESS` – (optional) address to receive `REGISTRAR_ROLE` when running the deploy script.

### Roles

Registering names requires the `REGISTRAR_ROLE`. Roles can only be granted by an account holding `DEFAULT_ADMIN_ROLE` (typically a DAO multisig). Request the role from the admin or execute
`grantRole(REGISTRAR_ROLE, <your address>)` from an admin account.

### Key Conventions

- Names are unique, immutable identifiers.
- Use lowercase alphanumeric characters and hyphens (e.g., `my-faction`).
- URIs should point to IPFS, Arweave, or other resolvable locations.

### Registering a Name

1. Ensure your wallet has been granted `REGISTRAR_ROLE`.
2. Call `register(name, owner, duration, uri)` on `MpNSRegistry`.
3. The owner can later `updateURI`, `transfer`, or `freezeName` as needed.

### Resolving Names in React

Fetch contract addresses or IPFS content by name using the `useMpns` hook:

```tsx
import useMpns from '../src/hooks/useMpns';

const Example: React.FC = () => {
  const { result } = useMpns('ai-architect');
  return <span>{result.value}</span>;
};
```

