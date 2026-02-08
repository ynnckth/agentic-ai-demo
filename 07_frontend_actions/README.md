# Demo 7: Agentic UI - Piano Keyboard Controller

This demo showcases an **agentic UI** where an AI agent can control a piano keyboard through natural language chat commands. The agent can play individual notes, chords, and melodies based on user requests.

## Features

- **2-Octave Piano Keyboard** (C4 to B5) with visual feedback
- **Web Audio API** integration for realistic piano sounds
- **Three CopilotKit Actions** for different playing styles:
  - `playNote` - Play individual notes
  - `playChord` - Play multiple notes simultaneously
  - `playMelody` - Play sequential notes with tempo control
- **Agent-Controlled Interface** - The AI agent can operate the piano keyboard through chat

## Architecture

### Frontend (`ui/`)
- **React + TypeScript** with Vite
- **CopilotKit** for agent integration
- **Piano Keyboard Component** with:
  - Visual keyboard with white and black keys
  - Web Audio API for sound generation
  - Multiple oscillators with harmonics for realistic piano tone
  - ADSR envelope for natural sound decay

### Backend (`agent.py` & `main.py`)
- **Pydantic AI Agent** powered by GPT-4o
- **AG UI Integration** for seamless CopilotKit communication
- **FastAPI** server with CORS middleware

### CopilotKit Runtime (`copilot-runtime/`)
- TypeScript server bridging frontend and backend

## Setup

### 1. Install Python Dependencies
```bash
uv sync
```

### 2. Install Frontend Dependencies
```bash
cd ui
npm install
```

### 3. Install CopilotKit Runtime Dependencies
```bash
cd copilot-runtime
npm install
```

### 4. Environment Variables
Create a `.env` file in the project root:
```bash
OPENAI_API_KEY=your_openai_api_key_here
```

## Running the Demo

You need to run three services simultaneously:

### Terminal 1 - Backend Agent (Port 8000)
```bash
python 07_frontend_actions/main.py
```

### Terminal 2 - CopilotKit Runtime (Port 4000)
```bash
cd 07_frontend_actions/copilot-runtime
npm run dev
```

### Terminal 3 - Frontend UI (Port 5173)
```bash
cd 07_frontend_actions/ui
npm run dev
```

Then open your browser to `http://localhost:5173`

## Usage Examples

### Play Individual Notes
```
User: "Play note C4"
Agent: *plays C4*
```

### Play Chords
```
User: "Play a C major chord"
Agent: *plays C4, E4, and G4 simultaneously*

User: "Play a G minor chord"
Agent: *plays G4, A#4, and D5 simultaneously*
```

### Play Melodies
```
User: "Play a C major scale"
Agent: *plays C4, D4, E4, F4, G4, A4, B4, C5 in sequence*

User: "Can you play the main melody of the song 'für elise'?"
Agent: *plays the famous Für Elise melody with appropriate notes and tempo*
```

### Advanced Requests
```
User: "Play a sad chord progression"
Agent: *plays a sequence of minor chords*

User: "Play 'Twinkle Twinkle Little Star'"
Agent: *plays the melody with appropriate timing*

User: "Play a fast ascending scale"
Agent: *plays a scale with faster tempo*
```

## How It Works

### Frontend Actions
The piano keyboard component defines three CopilotKit actions using `useCopilotAction`:

1. **playNote(note: string)** - Plays a single note
2. **playChord(notes: string[])** - Plays multiple notes at once
3. **playMelody(notes: string[], tempo?: number)** - Plays notes in sequence

These actions are marked as `available: "remote"`, making them accessible only to the agent.

### Agent Intelligence
The agent's system prompt explicitly teaches it:
- Which actions are available
- When to use each action (chords vs melodies)
- The available note range (C4 to B5)
- Examples of different musical requests

### Audio Engine
The sound synthesis uses:
- **Multiple oscillators** (fundamental + harmonics) for rich tone
- **Low-pass filter** for warmth
- **ADSR envelope** for realistic piano decay
- **Triangle waves** mixed with sine waves for piano-like timbre

## Project Structure

```
07_agentic_ui/
├── agent.py              # Pydantic AI agent configuration
├── main.py               # FastAPI server entry point
├── README.md             # This file
├── copilot-runtime/      # CopilotKit runtime server
│   ├── server.ts
│   └── package.json
└── ui/                   # React frontend
    ├── src/
    │   ├── components/
    │   │   └── PianoKeyboard.tsx    # Main piano component
    │   ├── lib/
    │   │   ├── pianoKeys.ts         # Note definitions
    │   │   └── audioEngine.ts       # Web Audio API logic
    │   ├── App.tsx
    │   └── main.tsx
    └── package.json
```

## Key Technologies

- **CopilotKit** - Agent-to-UI communication framework
- **Pydantic AI** - Type-safe AI agent framework
- **Web Audio API** - Browser-native audio synthesis
- **React** - UI framework
- **TypeScript** - Type-safe frontend code
- **FastAPI** - Python web framework
- **OpenAI GPT-4o** - Language model

## Notes

- The piano supports 2 octaves (24 keys total)
- All notes from C4 to B5 are available
- Sharp notes are denoted with '#' (e.g., C#4, F#5)
- The agent can understand musical concepts like scales, chords, and popular melodies
- Audio initialization requires a user click due to browser autoplay policies

## Troubleshooting

**No sound playing:**
- Ensure you've clicked on the page at least once (browser autoplay policy)
- Check browser console for errors
- Verify all three services are running

**Agent not responding:**
- Check that the OpenAI API key is set in `.env`
- Verify the backend is running on port 8000
- Check CopilotKit runtime is running on port 4000

**Connection errors:**
- Ensure CORS is properly configured in `main.py`
- Verify all ports are available (4000, 5173, 8000)

