import { AIProvider } from './AIProvider';
import OpenAIProvider from './OpenAIProvider';

const providerName = (process.env.REACT_APP_AI_PROVIDER || 'openai').toLowerCase();

let provider: AIProvider;

switch (providerName) {
  case 'openai':
  default:
    provider = new OpenAIProvider();
    break;
}

export default provider;
export type { AIProvider };
