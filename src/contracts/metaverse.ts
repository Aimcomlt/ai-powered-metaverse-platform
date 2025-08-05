import { Contract, Signer, providers } from 'ethers';

export class GovernanceToken extends Contract {
  static readonly abi = [
    'function initialize(string uri_)',
    'function grantStakingRole(address stakingContract)',
    'function mintGT(address to,uint256 factionId,uint256 level,uint256 taskId,string proofURI) returns (uint256)',
    'function stakeTransferFrom(address from,address to,uint256 id,uint256 amount,bytes data)',
    'function isApprovedForAll(address,address) view returns (bool)',
    'function getUserGTs(address user) view returns (uint256[])',
    'function supportsInterface(bytes4 interfaceId) view returns (bool)',
    'function grantRole(bytes32 role,address account)',
    'function revokeRole(bytes32 role,address account)',
    'function hasRole(bytes32 role,address account) view returns (bool)',
    'event GTMinted(address indexed to,uint256 tokenId,uint256 indexed factionId,uint256 level,uint256 indexed taskId,string proofURI)',
    'event StakingRoleGranted(address indexed stakingContract)'
  ] as const;
  constructor(address: string, signerOrProvider: Signer | providers.Provider) {
    super(address, GovernanceToken.abi, signerOrProvider);
  }
}

export class FunctionalToken extends Contract {
  static readonly abi = [
    'function initialize(string uri_)',
    'function mint(address to,uint256 id,uint256 amount,bytes data)',
    'function mintWithPurpose(address to,uint256 id,uint256 amount,bytes data,string purpose)',
    'function batchRewardMint(address[] recipients,uint256 id,uint256 amount,bytes data)',
    'function balancesOf(address account,uint256[] ids) view returns (uint256[] balances)',
    'function safeTransferFrom(address from,address to,uint256 id,uint256 amount,bytes data)',
    'function safeBatchTransferFrom(address from,address to,uint256[] ids,uint256[] amounts,bytes data)',
    'function supportsInterface(bytes4 interfaceId) view returns (bool)',
    'function grantRole(bytes32 role,address account)',
    'function revokeRole(bytes32 role,address account)',
    'function hasRole(bytes32 role,address account) view returns (bool)',
    'event FunctionalTokenMinted(address indexed to,uint256 indexed id,uint256 amount,string purpose)'
  ] as const;
  constructor(address: string, signerOrProvider: Signer | providers.Provider) {
    super(address, FunctionalToken.abi, signerOrProvider);
  }
}

export class MpNSRegistry extends Contract {
  static readonly abi = [
    'function initialize()',
    'function register(string name,address owner,uint256 duration,string uri)',
    'function updateURI(string name,string newUri)',
    'function transfer(string name,address newOwner)',
    'function freezeName(string name)',
    'function ownerOf(string name) view returns (address)',
    'function expirationOf(string name) view returns (uint256)',
    'function nameToUri(string name) view returns (string)',
    'function isFrozen(string name) view returns (bool)',
    'function grantRole(bytes32 role,address account)',
    'function revokeRole(bytes32 role,address account)',
    'function hasRole(bytes32 role,address account) view returns (bool)',
    'event NameRegistered(string indexed name,address indexed owner,uint256 expiration,string uri)',
    'event URIUpdated(string indexed name,string oldUri,string newUri)',
    'event NameTransferred(string indexed name,address indexed oldOwner,address indexed newOwner)',
    'event NameFrozen(string indexed name)'
  ] as const;
  constructor(address: string, signerOrProvider: Signer | providers.Provider) {
    super(address, MpNSRegistry.abi, signerOrProvider);
  }
}

export class CrossFactionHub extends Contract {
  static readonly abi = [
    'function initialize(address governanceToken_,address poO_,uint256 tokenIdForVoting,address mpnsRegistry_)',
    'function registerFaction(string factionName)',
    'function createProposal(string factionName,string title,address target,bytes data) returns (uint256)',
    'function vote(uint256 proposalId,bool support)',
    'function executeProposal(uint256 proposalId)',
    'function getProposal(uint256 proposalId) view returns (tuple(address proposer,address target,bytes data,string title,string faction,uint256 forVotes,uint256 againstVotes,bool executed))',
    'function grantRole(bytes32 role,address account)',
    'function revokeRole(bytes32 role,address account)',
    'function hasRole(bytes32 role,address account) view returns (bool)',
    'event FactionRegistered(string indexed faction,address indexed by)',
    'event ProposalCreated(uint256 indexed id,address indexed proposer,string title,string indexed faction,address indexed target)',
    'event VoteCast(uint256 indexed id,address indexed voter,bool support,uint256 weight)',
    'event ProposalExecuted(uint256 indexed id,address indexed executor,address indexed target)'
  ] as const;
  constructor(address: string, signerOrProvider: Signer | providers.Provider) {
    super(address, CrossFactionHub.abi, signerOrProvider);
  }
}

export class GTStaking extends Contract {
  static readonly abi = [
    'function initialize(address gt_,address ft_,address config_)',
    'function setTaskMetrics(uint256 taskId,uint256 demand,uint256 supply)',
    'function stake(uint256 id,uint256 amount)',
    'function completeTask(uint256 id,uint256 amount,uint256 taskId)',
    'function calculateReward(uint256 taskId) view returns (uint256)',
    'function isStaked(address user,uint256 tokenId) view returns (bool)',
    'function unstake(address user,uint256 tokenId) returns (bool)',
    'function grantRole(bytes32 role,address account)',
    'function revokeRole(bytes32 role,address account)',
    'function hasRole(bytes32 role,address account) view returns (bool)',
    'event Staked(address indexed user,uint256 indexed tokenId,uint256 amount)',
    'event Unstaked(address indexed user,uint256 indexed tokenId,uint256 amount)',
    'event TaskCompleted(address indexed user,uint256 indexed tokenId,uint256 indexed taskId,uint256 ftReward)'
  ] as const;
  constructor(address: string, signerOrProvider: Signer | providers.Provider) {
    super(address, GTStaking.abi, signerOrProvider);
  }
}

export class HouseOfTheLaw extends Contract {
  static readonly abi = [
    'function initialize(address functionalToken_,address governanceToken_,address aiGate_,uint256 alphaBps_,uint256 reserveRatioBps_)',
    'function setProofOfObservation(address poO)',
    'function setAlpha(uint256 newAlpha)',
    'function setReserveRatio(uint256 newRatio)',
    'function validateTask(address user,uint256 taskId,uint256 ftId,uint256 gtReward)',
    'function createProposal(string description,string ipfsHash,uint256 eligibleGTId,address target,bytes data) returns (uint256)',
    'function vote(uint256 proposalId,uint256 votes)',
    'function executeProposal(uint256 proposalId)',
    'function grantRole(bytes32 role,address account)',
    'function revokeRole(bytes32 role,address account)',
    'function hasRole(bytes32 role,address account) view returns (bool)',
    'event TaskRewarded(address indexed user,uint256 indexed taskId,uint256 indexed ftId,uint256 ftAmount,uint256 gtReward)',
    'event ProposalCreated(uint256 indexed proposalId,address indexed proposer,string ipfsHash,uint256 indexed eligibleGTId)',
    'event ProposalExecuted(uint256 indexed proposalId,address indexed executor,address target,uint256 indexed gtId)',
    'event Voted(uint256 indexed proposalId,address indexed voter,uint256 votes,uint256 cost,uint256 indexed gtId)',
    'event AlphaUpdated(uint256 oldAlpha,uint256 newAlpha,address indexed caller)',
    'event ReserveRatioUpdated(uint256 oldRatio,uint256 newRatio,address indexed caller)'
  ] as const;
  constructor(address: string, signerOrProvider: Signer | providers.Provider) {
    super(address, HouseOfTheLaw.abi, signerOrProvider);
  }
}

export class ProofOfObservation extends Contract {
  static readonly abi = [
    'function initialize(address houseOfTheLawAddress)',
    'function submitTask(uint256 taskId,string proof)',
    'function validateTask(address user,uint256 taskId,uint256 ftId,uint256 gtReward)',
    'function isValidated(address user) view returns (bool)',
    'function grantRole(bytes32 role,address account)',
    'function revokeRole(bytes32 role,address account)',
    'function hasRole(bytes32 role,address account) view returns (bool)',
    'event TaskSubmitted(address indexed user,uint256 indexed taskId,string proof)',
    'event TaskValidated(address indexed validator,address indexed user,uint256 indexed taskId,uint256 gtReward)'
  ] as const;
  constructor(address: string, signerOrProvider: Signer | providers.Provider) {
    super(address, ProofOfObservation.abi, signerOrProvider);
  }
}

export class PoO_TaskFlow extends Contract {
  static readonly abi = [
    'function initialize(address ftAddr,address stakingAddr,address pooAddr,address aiGateAddr)',
    'function rewardAfterTask(address user,uint256 tokenId,uint256 taskId,uint256 ftId,uint256 ftAmount,bool moderationPassed,bool uniqueSubmission)',
    'function grantRole(bytes32 role,address account)',
    'function revokeRole(bytes32 role,address account)',
    'function hasRole(bytes32 role,address account) view returns (bool)',
    'event TaskRewarded(address indexed user,uint256 indexed taskId,uint256 indexed ftId,uint256 amount)',
    'event TaskOffchainValidated(address indexed user,uint256 indexed taskId,bool moderationPassed,bool uniqueSubmission)'
  ] as const;
  constructor(address: string, signerOrProvider: Signer | providers.Provider) {
    super(address, PoO_TaskFlow.abi, signerOrProvider);
  }
}

export class GenesisBlockFaction extends Contract {
  static readonly abi = [
    'function initialize(address mpnsAddress,address creatorAddress,string factionName)',
    'function mpns() view returns (address)',
    'function creator() view returns (address)',
    'function name() view returns (string)',
    'function uri() view returns (string)',
    'function timestamp() view returns (uint256)',
    'function grantRole(bytes32 role,address account)',
    'function revokeRole(bytes32 role,address account)',
    'function hasRole(bytes32 role,address account) view returns (bool)',
    'event FactionInitialized(string indexed name,address indexed creator,string uri,uint256 timestamp)'
  ] as const;
  constructor(address: string, signerOrProvider: Signer | providers.Provider) {
    super(address, GenesisBlockFaction.abi, signerOrProvider);
  }
}

export class GenesisBlockFactory extends Contract {
  static readonly abi = [
    'function createFaction(string name) returns (address)',
    'function getAllFactions() view returns (string[])',
    'function grantRole(bytes32 role,address account)',
    'function revokeRole(bytes32 role,address account)',
    'function hasRole(bytes32 role,address account) view returns (bool)',
    'event FactionCreated(string indexed name,address indexed faction,address indexed creator,string uri,uint256 timestamp)'
  ] as const;
  constructor(address: string, signerOrProvider: Signer | providers.Provider) {
    super(address, GenesisBlockFactory.abi, signerOrProvider);
  }
}

