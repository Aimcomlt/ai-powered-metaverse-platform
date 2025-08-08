export interface AIProvider {
  initializeAIAgents(coreData: any): Promise<any>;
  proposeTasks(factionData: any): Promise<any>;
  recommendProposals(state: any): Promise<any>;
  optimizeDocument?(document: string): Promise<any>;
  analyzePolicy?(policyText: string): Promise<any>;
  allocateResources?(projectData: any): Promise<any>;
  getMonitoringData?(): Promise<any>;
  observeTaskStatus?(task: any): Promise<any>;
  learnFromFeedback?(feedback: any): Promise<any>;
}
