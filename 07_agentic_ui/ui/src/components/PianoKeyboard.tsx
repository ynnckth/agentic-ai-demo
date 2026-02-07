import { useState, useRef, useEffect } from 'react';
import { useCopilotAction } from '@copilotkit/react-core';

interface PianoKey {
  note: string;
  frequency: number;
  isBlack: boolean;
}

const PianoKeyboard = () => {
  const [activeKey, setActiveKey] = useState<string | null>(null);
  const audioContextRef = useRef<AudioContext | null>(null);

  // Initialize Audio Context
  useEffect(() => {
    // Create AudioContext on first user interaction (browser requirement)
    const initAudioContext = () => {
      if (!audioContextRef.current) {
        audioContextRef.current = new (window.AudioContext || (window as any).webkitAudioContext)();
      }
    };

    // Initialize on first click
    document.addEventListener('click', initAudioContext, { once: true });

    return () => {
      if (audioContextRef.current) {
        audioContextRef.current.close();
      }
    };
  }, []);

  // Define 2 octaves of piano keys (C4 to B5)
  const keys: PianoKey[] = [
    // Octave 4
    { note: 'C4', frequency: 261.63, isBlack: false },
    { note: 'C#4', frequency: 277.18, isBlack: true },
    { note: 'D4', frequency: 293.66, isBlack: false },
    { note: 'D#4', frequency: 311.13, isBlack: true },
    { note: 'E4', frequency: 329.63, isBlack: false },
    { note: 'F4', frequency: 349.23, isBlack: false },
    { note: 'F#4', frequency: 369.99, isBlack: true },
    { note: 'G4', frequency: 392.0, isBlack: false },
    { note: 'G#4', frequency: 415.3, isBlack: true },
    { note: 'A4', frequency: 440.0, isBlack: false },
    { note: 'A#4', frequency: 466.16, isBlack: true },
    { note: 'B4', frequency: 493.88, isBlack: false },
    // Octave 5
    { note: 'C5', frequency: 523.25, isBlack: false },
    { note: 'C#5', frequency: 554.37, isBlack: true },
    { note: 'D5', frequency: 587.33, isBlack: false },
    { note: 'D#5', frequency: 622.25, isBlack: true },
    { note: 'E5', frequency: 659.25, isBlack: false },
    { note: 'F5', frequency: 698.46, isBlack: false },
    { note: 'F#5', frequency: 739.99, isBlack: true },
    { note: 'G5', frequency: 783.99, isBlack: false },
    { note: 'G#5', frequency: 830.61, isBlack: true },
    { note: 'A5', frequency: 880.0, isBlack: false },
    { note: 'A#5', frequency: 932.33, isBlack: true },
    { note: 'B5', frequency: 987.77, isBlack: false },
  ];

  const whiteKeys = keys.filter((key) => !key.isBlack);
  const blackKeys = keys.filter((key) => key.isBlack);

  const playSound = (frequency: number) => {
    if (!audioContextRef.current) {
      // Initialize audio context if not already done
      audioContextRef.current = new (window.AudioContext || (window as any).webkitAudioContext)();
    }

    const audioContext = audioContextRef.current;

    // Create oscillator (sound generator)
    const oscillator = audioContext.createOscillator();
    const gainNode = audioContext.createGain();

    // Connect nodes: oscillator -> gain -> speakers
    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);

    // Configure the sound
    oscillator.type = 'sine'; // Smooth piano-like sound
    oscillator.frequency.value = frequency;

    // Envelope: fade in and fade out for natural sound
    const now = audioContext.currentTime;
    gainNode.gain.setValueAtTime(0, now);
    gainNode.gain.linearRampToValueAtTime(0.3, now + 0.01); // Quick attack
    gainNode.gain.exponentialRampToValueAtTime(0.01, now + 1); // Decay

    // Start and stop the sound
    oscillator.start(now);
    oscillator.stop(now + 1); // Play for 1 second
  };

  const handleKeyPress = (note: string) => {
    setActiveKey(note);

    // Find the frequency for this note and play it
    const key = keys.find((k) => k.note === note);
    if (key) {
      playSound(key.frequency);
      console.log('Playing note:', note, 'at', key.frequency, 'Hz');
    }

    // Reset active key after a short delay
    setTimeout(() => setActiveKey(null), 200);
  };

  // Define CopilotKit action for the agent to play notes
  useCopilotAction({
    name: 'playNote',
    description:
      'Play a note on the piano keyboard. Available notes are C4, C#4, D4, D#4, E4, F4, F#4, G4, G#4, A4, A#4, B4, C5, C#5, D5, D#5, E5, F5, F#5, G5, G#5, A5, A#5, B5',
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
      const validNote = keys.find((key) => key.note === note);
      if (!validNote) {
        console.error(`Invalid note: ${note}`);
        return `Invalid note: ${note}. Valid notes are C4 to B5.`;
      }

      handleKeyPress(note);
      return `Played note: ${note}`;
    },
  });

  const getBlackKeyPosition = (note: string): number => {
    // Calculate the position of black keys relative to white keys
    const positions: { [key: string]: number } = {
      'C#4': 0,
      'D#4': 1,
      'F#4': 3,
      'G#4': 4,
      'A#4': 5,
      'C#5': 7,
      'D#5': 8,
      'F#5': 10,
      'G#5': 11,
      'A#5': 12,
    };
    return positions[note] || 0;
  };

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
