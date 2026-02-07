import { useState, useEffect } from 'react';
import { useCopilotAction } from '@copilotkit/react-core';
import { PIANO_KEYS, getBlackKeyPosition } from '../lib/pianoKeys';
import { audioEngine } from '../lib/audioEngine';

const PianoKeyboard = () => {
  const [activeKey, setActiveKey] = useState<string | null>(null);

  // Initialize Audio Context on mount
  useEffect(() => {
    // Initialize on first click (browser requirement)
    const initAudio = () => audioEngine.initialize();
    document.addEventListener('click', initAudio, { once: true });

    return () => {
      audioEngine.close();
    };
  }, []);

  const whiteKeys = PIANO_KEYS.filter((key) => !key.isBlack);
  const blackKeys = PIANO_KEYS.filter((key) => key.isBlack);

  const handleKeyPress = (note: string, duration = 200) => {
    setActiveKey(note);

    // Find the frequency for this note and play it
    const key = PIANO_KEYS.find((k) => k.note === note);
    if (key) {
      audioEngine.playSound(key.frequency);
      console.log('Playing note:', note, 'at', key.frequency, 'Hz');
    }

    // Reset active key after a short delay
    setTimeout(() => setActiveKey(null), duration);
  };

  const handleChord = (notes: string[]) => {
    console.log('Playing chord:', notes);
    // Play all notes simultaneously
    notes.forEach((note) => {
      const key = PIANO_KEYS.find((k) => k.note === note);
      if (key) {
        audioEngine.playSound(key.frequency);
      }
    });
  };

  const handleMelody = async (notes: string[], tempo = 500) => {
    console.log('Playing melody:', notes, 'at tempo:', tempo, 'ms');
    // Play notes one at a time with a delay
    for (const note of notes) {
      handleKeyPress(note, tempo);
      await new Promise((resolve) => setTimeout(resolve, tempo));
    }
  };

  // Define CopilotKit action for the agent to play notes
  useCopilotAction({
    name: 'playNote',
    description:
      'Play a single note on the piano keyboard. Use this for playing individual notes. Available notes are C4, C#4, D4, D#4, E4, F4, F#4, G4, G#4, A4, A#4, B4, C5, C#5, D5, D#5, E5, F5, F#5, G5, G#5, A5, A#5, B5',
    available: 'remote',
    parameters: [
      {
        name: 'note',
        type: 'string',
        description: "The note to play (e.g., 'C4', 'D#5'). Must be a valid note from C4 to B5.",
        required: true,
      },
    ],
    handler: async ({ note }) => {
      // Validate that the note exists
      const validNote = PIANO_KEYS.find((key) => key.note === note);
      if (!validNote) {
        console.error(`Invalid note: ${note}`);
        return `Invalid note: ${note}. Valid notes are C4 to B5.`;
      }

      handleKeyPress(note);
      return `Played note: ${note}`;
    },
  });

  // Define CopilotKit action for playing chords (multiple notes at once)
  useCopilotAction({
    name: 'playChord',
    description:
      'Play multiple notes simultaneously as a chord. Use this when the user asks for chords (e.g., "C major chord", "play a G chord"). Available notes are C4 to B5.',
    available: 'remote',
    parameters: [
      {
        name: 'notes',
        type: 'object',
        description: 'Array of notes to play together (e.g., ["C4", "E4", "G4"] for C major)',
        required: true,
      },
    ],
    handler: async ({ notes }) => {
      // Validate input is an array
      if (!Array.isArray(notes)) {
        return 'Error: notes must be an array';
      }

      // Validate all notes exist
      const invalidNotes = notes.filter((note) => !PIANO_KEYS.find((k) => k.note === note));
      if (invalidNotes.length > 0) {
        return `Invalid notes: ${invalidNotes.join(', ')}`;
      }

      handleChord(notes);
      return `Played chord: ${notes.join(', ')}`;
    },
  });

  // Define CopilotKit action for playing melodies (sequential notes)
  useCopilotAction({
    name: 'playMelody',
    description:
      'Play a sequence of notes one after another as a melody. Use this when the user asks for melodies, tunes, or songs (e.g., "play Happy Birthday", "play a scale"). Available notes are C4 to B5.',
    available: 'remote',
    parameters: [
      {
        name: 'notes',
        type: 'object',
        description: 'Array of notes to play in sequence (e.g., ["C4", "D4", "E4", "F4", "G4"])',
        required: true,
      },
      {
        name: 'tempo',
        type: 'number',
        description:
          'Time between notes in milliseconds. Default is 500ms. Use 300-400 for fast, 500-600 for medium, 700-1000 for slow.',
        required: false,
      },
    ],
    handler: async ({ notes, tempo }) => {
      // Validate input is an array
      if (!Array.isArray(notes)) {
        return 'Error: notes must be an array';
      }

      // Validate all notes exist
      const invalidNotes = notes.filter((note) => !PIANO_KEYS.find((k) => k.note === note));
      if (invalidNotes.length > 0) {
        return `Invalid notes: ${invalidNotes.join(', ')}`;
      }

      await handleMelody(notes, tempo || 500);
      return `Played melody: ${notes.join(', ')} at ${tempo || 500}ms tempo`;
    },
  });

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '100vh',
        gap: '20px',
      }}
    >
      <div
        style={{
          position: 'relative',
          display: 'inline-block',
          padding: '20px',
          backgroundColor: '#2a2a2a',
          borderRadius: '10px',
          boxShadow: '0 4px 6px rgba(0,0,0,0.3)',
        }}
      >
        {/* White Keys */}
        <div style={{ display: 'flex', position: 'relative' }}>
          {whiteKeys.map((key) => (
            <button
              key={key.note}
              onClick={() => handleKeyPress(key.note)}
              style={{
                width: '50px',
                height: '200px',
                backgroundColor: activeKey === key.note ? '#e0e0e0' : 'white',
                border: '2px solid #333',
                borderRadius: '0 0 5px 5px',
                cursor: 'pointer',
                transition: 'all 0.1s',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'flex-end',
                alignItems: 'center',
                paddingBottom: '10px',
                fontSize: '12px',
                fontWeight: 'bold',
                color: '#666',
                boxShadow: activeKey === key.note ? 'inset 0 2px 5px rgba(0,0,0,0.3)' : '0 2px 3px rgba(0,0,0,0.2)',
              }}
              onMouseDown={(e) => (e.currentTarget.style.transform = 'translateY(2px)')}
              onMouseUp={(e) => (e.currentTarget.style.transform = 'translateY(0)')}
              onMouseLeave={(e) => (e.currentTarget.style.transform = 'translateY(0)')}
            >
              {key.note}
            </button>
          ))}
        </div>

        {/* Black Keys */}
        <div
          style={{
            position: 'absolute',
            top: '20px',
            left: '20px',
            pointerEvents: 'none',
          }}
        >
          {blackKeys.map((key) => (
            <button
              key={key.note}
              onClick={() => handleKeyPress(key.note)}
              style={{
                position: 'absolute',
                left: `${getBlackKeyPosition(key.note) * 50 + 35}px`,
                width: '30px',
                height: '120px',
                backgroundColor: activeKey === key.note ? '#4a4a4a' : '#000',
                border: '2px solid #000',
                borderRadius: '0 0 3px 3px',
                cursor: 'pointer',
                transition: 'all 0.1s',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'flex-end',
                alignItems: 'center',
                paddingBottom: '8px',
                fontSize: '10px',
                fontWeight: 'bold',
                color: '#fff',
                zIndex: 1,
                pointerEvents: 'auto',
                boxShadow:
                  activeKey === key.note ? 'inset 0 2px 5px rgba(255,255,255,0.2)' : '0 3px 5px rgba(0,0,0,0.5)',
              }}
              onMouseDown={(e) => (e.currentTarget.style.transform = 'translateY(2px)')}
              onMouseUp={(e) => (e.currentTarget.style.transform = 'translateY(0)')}
              onMouseLeave={(e) => (e.currentTarget.style.transform = 'translateY(0)')}
            >
              {key.note}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export { PianoKeyboard };
