import { useState } from 'react';

interface PianoKey {
  note: string;
  frequency: number;
  isBlack: boolean;
}

const PianoKeyboard = () => {
  const [activeKey, setActiveKey] = useState<string | null>(null);

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

  const handleKeyPress = (note: string) => {
    setActiveKey(note);
    // TODO: Play sound using Web Audio API
    console.log('Playing note:', note);

    // Reset active key after a short delay
    setTimeout(() => setActiveKey(null), 200);
  };

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
