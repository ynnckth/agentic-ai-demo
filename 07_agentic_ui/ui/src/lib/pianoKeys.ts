export interface PianoKey {
  note: string;
  frequency: number;
  isBlack: boolean;
}

// Define 2 octaves of piano keys (C4 to B5)
export const PIANO_KEYS: PianoKey[] = [
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

export const getBlackKeyPosition = (note: string): number => {
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
