import './App.css';
import { CopilotSidebar } from '@copilotkit/react-ui';
import { PianoKeyboard } from './components/PianoKeyboard.tsx';

function App() {
  return (
    <div className="app-container">
      <CopilotSidebar
        disableSystemMessage={true}
        clickOutsideToClose={false}
        suggestions={[
          {
            title: 'Play a C major chord',
            message: 'Play a C major chord',
          },
        ]}
      >
        <PianoKeyboard />
      </CopilotSidebar>
    </div>
  );
}

export default App;
