import './App.css';
import { CopilotChat } from '@copilotkit/react-ui';
import { useRenderToolCall } from '@copilotkit/react-core';
import { WeatherCard } from './components/weather.tsx';

function App() {
  //🪁 Generative UI: https://docs.copilotkit.ai/pydantic-ai/generative-ui
  useRenderToolCall({
    name: 'get_weather',
    description: 'Get the weather for a given location.',
    parameters: [
      { name: 'location', type: 'string', required: true },
      { name: 'temperature', type: 'string', required: false },
      { name: 'condition', type: 'string', required: false },
      { name: 'humidity', type: 'string', required: false },
      { name: 'wind', type: 'string', required: false },
      { name: 'feels_like', type: 'string', required: false },
    ],
    render: ({ args }) => {
      return (
        <WeatherCard
          location={args.location}
          temperature={args.temperature}
          condition={args.condition}
          humidity={args.humidity}
          wind={args.wind}
          feels_like={args.feels_like}
        />
      );
    },
  });

  return (
    <div className="app-container">
      <CopilotChat />
    </div>
  );
}

export default App;
