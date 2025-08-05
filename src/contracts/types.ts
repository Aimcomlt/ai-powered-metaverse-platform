export interface Proposal {
  proposer: string;
  target: string;
  data: string;
  title: string;
  faction: string;
  forVotes: bigint;
  againstVotes: bigint;
  executed: boolean;
}

export interface ProposalCreatedEvent {
  id: bigint;
  proposer: string;
  title: string;
  faction: string;
  target: string;
}

export interface VoteCastEvent {
  id: bigint;
  voter: string;
  support: boolean;
  weight: bigint;
}

export interface TaskMetrics {
  demand: bigint;
  supply: bigint;
}

