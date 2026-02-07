import './App.css';
import { CopilotChat } from '@copilotkit/react-ui';
import { useRenderToolCall } from '@copilotkit/react-core';
import { WeatherCard } from './components/weather.tsx';

function App() {
  //🪁 Generative UI: https://docs.copilotkit.ai/pydantic-ai/generative-ui
  useRenderToolCall({
    name: 'get_weather',
    description: 'Get the weather for a given location.',
    parameters: [{ name: 'location', type: 'string', required: true }],
    render: ({ args }) => {
      return <WeatherCard location={args.location} />;
    },
  });

  return (
    <div className="app-container">
      <CopilotChat />
    </div>
  );
}

export default App;
