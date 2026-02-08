import './App.css';
import { CopilotSidebar } from '@copilotkit/react-ui';
import { PianoKeyboard } from './components/PianoKeyboard.tsx';

function App() {
  return (
    <div className="app-container">
      <CopilotSidebar
        defaultOpen={true}
        hitEscapeToClose={false}
        disableSystemMessage={true}
        clickOutsideToClose={false}
        suggestions={[
          {
            title: 'Play a C major chord',
            message: 'Play a C major chord',
          },
          {
            title: "Play 'Für Elise'",
            message: 'Play the main melody of Beethoven’s "Für Elise"',
          },
        ]}
      >
        <PianoKeyboard />
      </CopilotSidebar>
    </div>
  );
}

export default App;
