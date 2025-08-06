# Component Overview

This directory houses React components for the AI-Powered Metaverse Platform. Each section below summarizes a component's purpose, the Redux slice(s) it touches, whether it calls smart-contract helpers/hooks or AI services, and possible extension points.

## ErrorBoundary.js
- **UI purpose:** Wraps children and displays a fallback message when a render error occurs.
- **Redux slices:** none.
- **Smart-contract or AI:** none.
- **Extension points:** accept a custom fallback component or error-reporting callback.

## Footer.js
- **UI purpose:** Static footer with contact details, social links, and a newsletter form.
- **Redux slices:** none.
- **Smart-contract or AI:** none.
- **Extension points:** drive content from props or CMS and hook form submission to an API.

## HeroSection.js
- **UI purpose:** Landing page hero with introductory copy and a call-to-action button.
- **Redux slices:** none.
- **Smart-contract or AI:** none.
- **Extension points:** parameterize heading text, button label, and click handler.

## KeyFeatures.js
- **UI purpose:** Highlights platform features in a grid layout.
- **Redux slices:** none.
- **Smart-contract or AI:** none.
- **Extension points:** accept a features array prop to customize items.

## Testimonials.js
- **UI purpose:** Carousel of user testimonials.
- **Redux slices:** none.
- **Smart-contract or AI:** none.
- **Extension points:** load testimonials from an API or enable navigation controls.

## FeaturedFactions.js
- **UI purpose:** Grid of featured faction cards linking to faction pages.
- **Redux slices:** none.
- **Smart-contract or AI:** none.
- **Extension points:** provide factions via props or fetch from a service.

## Introduction.js
- **UI purpose:** Explains platform tokenomics and smart-contract workflow.
- **Redux slices:** none.
- **Smart-contract or AI:** none.
- **Extension points:** source copy from markdown or CMS, expose anchors for navigation.

## Header.js
- **UI purpose:** Top navigation bar with links and a minimize toggle.
- **Redux slices:** none.
- **Smart-contract or AI:** none.
- **Extension points:** inject navigation items or integrate wallet controls.

## Loader.js
- **UI purpose:** Generic loading indicator using Material UI.
- **Redux slices:** none.
- **Smart-contract or AI:** none.
- **Extension points:** expose size/color props.

## ToastProvider.js
- **UI purpose:** Context provider for showing toast notifications.
- **Redux slices:** none.
- **Smart-contract or AI:** none.
- **Extension points:** configure auto-hide duration or swap underlying UI library.

## ai/AiAssistantConsole.tsx
- **UI purpose:** Displays AI-generated recommendations and action buttons for eligible users.
- **Redux slices:** reads `gt` to check staked balance.
- **Smart-contract or AI:** calls `useAiRecommendations` to fetch AI advice.
- **Extension points:** customize stake threshold, surface additional AI actions.

## gt/GTBalanceDisplay.tsx
- **UI purpose:** Shows the user's governance token balance.
- **Redux slices:** dispatches and reads from `gt`.
- **Smart-contract or AI:** uses `gtService.fetchUserGTs` to query the blockchain.
- **Extension points:** add manual refresh or display multiple token IDs.

## gt/GTStakingPanel.tsx
- **UI purpose:** Form to stake or unstake governance tokens.
- **Redux slices:** dispatches `stakeGT` and `unstakeGT` to `gt`.
- **Smart-contract or AI:** invokes `useStakeGT` and `useUnstakeGT` hooks.
- **Extension points:** expose callbacks for transaction completion or validation.

## mpns/MpnsViewer.tsx
- **UI purpose:** Resolves and displays MpNS name registrations and metadata.
- **Redux slices:** none.
- **Smart-contract or AI:** uses `useContract` to call `MpNSRegistry` and `axios` for metadata.
- **Extension points:** support additional query parameters or custom metadata rendering.

## shared/ConnectWalletButton.tsx
- **UI purpose:** Connects to a user's wallet and shows the abbreviated address.
- **Redux slices:** updates `wallet` with `setAddress`.
- **Smart-contract or AI:** retrieves a signer via `getSigner`.
- **Extension points:** accept callbacks for connection events or custom button styles.

## shared/LoadingSpinner.tsx
- **UI purpose:** Chakra UI spinner with optional label.
- **Redux slices:** none.
- **Smart-contract or AI:** none.
- **Extension points:** allow color or speed adjustments.

## shared/Modal.tsx
- **UI purpose:** Lightweight modal portal using Chakra UI components.
- **Redux slices:** none.
- **Smart-contract or AI:** none.
- **Extension points:** add animations, ESC-key handling, or size variants.

## tasks/TaskBrowser.tsx
- **UI purpose:** Lists tasks, shows metrics, and lets users complete tasks for rewards.
- **Redux slices:** consumes `task` state and dispatches `fetchTaskMetrics` and `setCurrentTask`.
- **Smart-contract or AI:** calls `taskService` and the `usePoOFlow` hook.
- **Extension points:** plug in real task APIs, custom filters, or completion handlers.

## tasks/TaskMetricsCard.tsx
- **UI purpose:** Displays task progress and reward information.
- **Redux slices:** none.
- **Smart-contract or AI:** none.
- **Extension points:** show additional metrics or theme colors.

## factions/GenesisBlockDeployer.tsx
- **UI purpose:** Form for deploying a new faction's Genesis Block contract.
- **Redux slices:** dispatches `addGenesisBlockFactoryEvent` to `eventSlices`.
- **Smart-contract or AI:** leverages `useFactionDeploy` to deploy contracts.
- **Extension points:** capture more faction parameters or surface deployment callbacks.

## factions/FactionConsole.tsx
- **UI purpose:** Dashboard for managing faction data and actions.
- **Redux slices:** reads `gt` for faction ID and level.
- **Smart-contract or AI:** embeds `GenesisBlockDeployer` and uses placeholder data.
- **Extension points:** replace placeholders with service calls and plug in additional faction tools.

## law/ProposalCreator.tsx
- **UI purpose:** Form to submit governance proposals after AI validation.
- **Redux slices:** reads `ai` to ensure proposal creation is allowed.
- **Smart-contract or AI:** uses `useCreateProposal` to call the governance contract.
- **Extension points:** add form fields, validation hooks, or success callbacks.

## law/VotePanel.tsx
- **UI purpose:** Buttons for yes/no/abstain votes on a proposal.
- **Redux slices:** none.
- **Smart-contract or AI:** executes votes through `useVote`.
- **Extension points:** display vote counts or disable voting based on store state.

## law/ProposalList.tsx
- **UI purpose:** Renders a list of proposals with status tags.
- **Redux slices:** none.
- **Smart-contract or AI:** none.
- **Extension points:** wire to Redux or API sources and add pagination.

