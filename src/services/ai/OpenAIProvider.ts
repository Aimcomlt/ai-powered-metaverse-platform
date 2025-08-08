import OpenAI from 'openai';
import { AIProvider } from './AIProvider';

export default class OpenAIProvider implements AIProvider {
  private client: OpenAI;

  constructor() {
    this.client = new OpenAI({
      apiKey: process.env.REACT_APP_OPENAI_API_KEY,
      dangerouslyAllowBrowser: true,
    });
  }

  async initializeAIAgents(coreData: any) {
    try {
      const messages = [
        { role: 'system', content: 'You are an AI agent initialized with the following core data.' },
        { role: 'user', content: `Initialize with core data: ${JSON.stringify(coreData)}` },
      ];

      const response = await this.client.chat.completions.create({
        model: 'gpt-4',
        messages,
        temperature: 0.7,
        max_tokens: 256,
      });

      return response;
    } catch (error) {
      console.error('Error initializing AI agents:', error);
      throw error;
    }
  }

  async proposeTasks(factionData: any) {
    try {
      const messages = [
        { role: 'system', content: 'You are an AI agent tasked with proposing new tasks based on faction data.' },
        { role: 'user', content: `Propose tasks for faction data: ${JSON.stringify(factionData)}` },
      ];

      const response = await this.client.chat.completions.create({
        model: 'gpt-4',
        messages,
        temperature: 0.7,
        max_tokens: 256,
      });

      return response;
    } catch (error) {
      console.error('Error proposing tasks:', error);
      throw error;
    }
  }

  async recommendProposals(state: any) {
    try {
      const messages = [
        {
          role: 'system',
          content:
            'You are a Codex agent that suggests improvement proposals. Respond in JSON with {"proposals": [{"title": string, "details": string}]}.',
        },
        { role: 'user', content: `State: ${JSON.stringify(state)}` },
      ];

      const response = await this.client.chat.completions.create({
        model: 'gpt-4',
        messages,
        temperature: 0.7,
        max_tokens: 256,
      });

      const content = (response as any).choices?.[0]?.message?.content || '{}';
      return JSON.parse(content);
    } catch (error) {
      console.error('Error recommending proposals:', error);
      throw error;
    }
  }

  async optimizeDocument(document: string) {
    try {
      const messages = [
        { role: 'system', content: 'You are an AI agent tasked with optimizing documents for clarity and quality.' },
        { role: 'user', content: `Optimize the following document: ${document}` },
      ];

      const response = await this.client.chat.completions.create({
        model: 'gpt-4',
        messages,
        temperature: 0.7,
        max_tokens: 256,
      });

      return response;
    } catch (error) {
      console.error('Error optimizing document:', error);
      throw error;
    }
  }

  async analyzePolicy(policyText: string) {
    try {
      const messages = [
        { role: 'system', content: 'You are an AI agent that analyzes policy documents and provides recommendations.' },
        { role: 'user', content: `Analyze the following policy document and provide recommendations: ${policyText}` },
      ];

      const response = await this.client.chat.completions.create({
        model: 'gpt-4',
        messages,
        temperature: 0.7,
        max_tokens: 512,
      });

      return response;
    } catch (error) {
      console.error('Error analyzing policy document:', error);
      throw error;
    }
  }

  async allocateResources(projectData: any) {
    try {
      const messages = [
        { role: 'system', content: 'You are an AI agent that allocates resources for projects.' },
        { role: 'user', content: `Allocate resources for the following project: ${JSON.stringify(projectData)}` },
      ];

      const response = await this.client.chat.completions.create({
        model: 'gpt-4',
        messages,
        temperature: 0.7,
        max_tokens: 256,
      });

      return response;
    } catch (error) {
      console.error('Error allocating resources:', error);
      throw error;
    }
  }

  async getMonitoringData() {
    try {
      const messages = [
        { role: 'system', content: 'You are an AI agent that monitors project status and resource utilization.' },
        { role: 'user', content: 'Provide the current monitoring data for all projects.' },
      ];

      const response = await this.client.chat.completions.create({
        model: 'gpt-4',
        messages,
        temperature: 0.7,
        max_tokens: 512,
      });

      return response;
    } catch (error) {
      console.error('Error fetching monitoring data:', error);
      throw error;
    }
  }

  async observeTaskStatus(task: any) {
    try {
      const messages = [
        {
          role: 'system',
          content:
            'You are a Codex agent that summarizes task metrics. Respond in JSON with {"status": string, "observations": string}.',
        },
        { role: 'user', content: `Task metrics: ${JSON.stringify(task)}` },
      ];

      const response = await this.client.chat.completions.create({
        model: 'gpt-4',
        messages,
        temperature: 0.7,
        max_tokens: 256,
      });

      const content = (response as any).choices?.[0]?.message?.content || '{}';
      return JSON.parse(content);
    } catch (error) {
      console.error('Error observing task status:', error);
      throw error;
    }
  }

  async learnFromFeedback(feedback: any) {
    try {
      const messages = [
        {
          role: 'system',
          content:
            'You are an AI agent that learns from user feedback to improve task propositions and document optimizations.',
        },
        { role: 'user', content: `Learn from the following feedback: ${JSON.stringify(feedback)}` },
      ];

      const response = await this.client.chat.completions.create({
        model: 'gpt-4',
        messages,
        temperature: 0.7,
        max_tokens: 256,
      });

      return response;
    } catch (error) {
      console.error('Error processing feedback:', error);
      throw error;
    }
  }
}
