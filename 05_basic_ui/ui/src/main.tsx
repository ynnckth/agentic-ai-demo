import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import '@copilotkit/react-ui/styles.css';
import App from './App.tsx';
import { CopilotKit } from '@copilotkit/react-core';

const copilotKitRuntimeUrl = import.meta.env.VITE_COPILOTKIT_RUNTIME_URL;
const copilotKitAgentName = import.meta.env.VITE_COPILOTKIT_AGENT_NAME;

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <CopilotKit runtimeUrl={copilotKitRuntimeUrl} agent={copilotKitAgentName}>
      <App />
    </CopilotKit>
  </StrictMode>,
);
