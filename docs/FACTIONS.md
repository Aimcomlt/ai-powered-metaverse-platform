---
title: Factions
sidebar_position: 5
---

# Factions

Example usage of MpNS records for faction content:

```tsx
import FactionContentList from '../src/components/factions/FactionContentList';

export const Tasks = () => (
  <FactionContentList mpnsName="ai-architect.tasks.mpns" title="AI Architect Tasks" />
);
```

The `mpnsName` value is resolved at runtime via `useMpns`, allowing faction pages to reference content by name rather than hardcoding IPFS hashes.
