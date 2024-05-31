import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.REACT_APP_OPENAI_API_KEY, dangerouslyAllowBrowser: true
});

// Function to initialize AI agents with core data
export const initializeAIAgents = async (coreData) => {
    try {
      const messages = [
        {
          role: "system",
          content: "You are an AI agent initialized with the following core data.",
        },
        {
          role: "user",
          content: `Initialize with core data: ${JSON.stringify(coreData)}`,
        },
      ];
  
      const response = await openai.chat.completions.create({
        model: "gpt-4",
        messages,
        temperature: 0.7,
        max_tokens: 256,
      });
  
      return response.data;
    } catch (error) {
      console.error('Error initializing AI agents:', error);
      throw error;
    };
}

// Function to propose tasks
export const proposeTasks = async (factionData) => {
    try {
      const messages = [
        {
          role: "system",
          content: "You are an AI agent tasked with proposing new tasks based on faction data.",
        },
        {
          role: "user",
          content: `Propose tasks for faction data: ${JSON.stringify(factionData)}`,
        },
      ];
  
      const response = await openai.chat.completions.create({
        model: "gpt-4",
        messages,
        temperature: 0.7,
        max_tokens: 256,
      });
  
      return response.data;
    } catch (error) {
      console.error('Error proposing tasks:', error);
      throw error;
    }
  };

  // Function to optimize documents
export const optimizeDocument = async (document) => {
    try {
      const messages = [
        {
          role: "system",
          content: "You are an AI agent tasked with optimizing documents for clarity and quality.",
        },
        {
          role: "user",
          content: `Optimize the following document: ${document}`,
        },
      ];
  
      const response = await openai.chat.completions.create({
        model: "gpt-4",
        messages,
        temperature: 0.7,
        max_tokens: 256,
      });
  
      return response.data;
    } catch (error) {
      console.error('Error optimizing document:', error);
      throw error;
    }
  };
  
  
// Function to analyze policy document
export const analyzePolicy = async (policyText) => {
    try {
      const messages = [
        {
          role: "system",
          content: "You are an AI agent that analyzes policy documents and provides recommendations.",
        },
        {
          role: "user",
          content: `Analyze the following policy document and provide recommendations: ${policyText}`,
        },
      ];
  
      const response = await openai.chat.completions.create({
        model: "gpt-4",
        messages,
        temperature: 0.7,
        max_tokens: 512,
      });
  
      return response.data;
    } catch (error) {
      console.error('Error analyzing policy document:', error);
      throw error;
    }
  };

// Function to allocate resources for a project
export const allocateResources = async (projectData) => {
  try {
    const messages = [
      {
        role: "system",
        content: "You are an AI agent that allocates resources for projects.",
      },
      {
        role: "user",
        content: `Allocate resources for the following project: ${JSON.stringify(projectData)}`,
      },
    ];

    const response = await openai.chat.completions.create({
      model: "gpt-4",
      messages,
      temperature: 0.7,
      max_tokens: 256,
    });

    return response.data;
  } catch (error) {
    console.error('Error allocating resources:', error);
    throw error;
  }
};

// Function to get project monitoring data
export const getMonitoringData = async () => {
  try {
    const messages = [
      {
        role: "system",
        content: "You are an AI agent that monitors project status and resource utilization.",
      },
      {
        role: "user",
        content: "Provide the current monitoring data for all projects.",
      },
    ];

    const response = await openai.chat.completions.create({
      model: "gpt-4",
      messages,
      temperature: 0.7,
      max_tokens: 512,
    });

    return response.data;
  } catch (error) {
    console.error('Error fetching monitoring data:', error);
    throw error;
  }
};

// Function for continuous learning from feedback
export const learnFromFeedback = async (feedback) => {
    try {
      const messages = [
        {
          role: "system",
          content: "You are an AI agent that learns from user feedback to improve task propositions and document optimizations.",
        },
        {
          role: "user",
          content: `Learn from the following feedback: ${JSON.stringify(feedback)}`,
        },
      ];
  
      const response = await openai.chat.completions.create({
        model: "gpt-4",
        messages,
        temperature: 0.7,
        max_tokens: 256,
      });
  
      return response.data;
    } catch (error) {
      console.error('Error processing feedback:', error);
      throw error;
    }
  };

export default {
  analyzePolicy,
  allocateResources,
  getMonitoringData,
  initializeAIAgents,
  proposeTasks,
  optimizeDocument,
  learnFromFeedback
  // other functions
};

