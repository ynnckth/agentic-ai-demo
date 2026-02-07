import express, {type Request, type Response} from 'express';
import cors from 'cors';
import {CopilotRuntime, copilotRuntimeNodeHttpEndpoint, ExperimentalEmptyAdapter,} from '@copilotkit/runtime';
import {HttpAgent} from '@ag-ui/client';

const app = express();
const PORT = 4000;

// Enable CORS for the frontend
app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true,
}));

app.use(express.json());

const serviceAdapter = new ExperimentalEmptyAdapter();

const runtime = new CopilotRuntime({
  agents: {
    demo_agent: new HttpAgent({ url: 'http://localhost:8000/' }),
  },
});

app.all('/api/copilotkit', (req: Request, res: Response) => {
  const handler = copilotRuntimeNodeHttpEndpoint({
    endpoint: '/api/copilotkit',
    runtime,
    serviceAdapter,
  });

  return handler(req, res);
});

app.listen(PORT, () => {
  console.log(`Copilot runtime listening at http://localhost:${PORT}/api/copilotkit`);
});
