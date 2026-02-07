import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import "@copilotkit/react-ui/styles.css";
import App from './App.tsx'
import { CopilotKit } from "@copilotkit/react-core"

// TODO: Extract as environment variable
const copilotKitRuntimeUrl = "http://localhost:4000/api/copilotkit";

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <CopilotKit runtimeUrl={copilotKitRuntimeUrl} agent="demo_agent">
       <App />
    </CopilotKit>
  </StrictMode>,
)
