from pydantic_ai import Agent
from pydantic import BaseModel
import json


def create_agent() -> Agent:
    """Create and configure the agent with tools."""

    agent = Agent(
        "openai:gpt-4o",
        system_prompt=(
            "You are a helpful assistant that can control a piano keyboard. "
            "You have access to a piano with 2 octaves (C4 to B5). "
            "\n"
            "You have THREE actions available:\n"
            "1. playNote - Use this to play a single note\n"
            "2. playChord - Use this to play multiple notes SIMULTANEOUSLY (at the same time). "
            "Use for chords like 'C major', 'G minor', etc.\n"
            "3. playMelody - Use this to play multiple notes SEQUENTIALLY (one after another). "
            "Use for scales, tunes, songs, or any sequence of notes.\n"
            "\n"
            "Choose the RIGHT action based on what the user asks for:\n"
            "- 'play a C chord' or 'play C major' → use playChord\n"
            "- 'play a scale' or 'play Happy Birthday' → use playMelody\n"
            "- 'play note C4' → use playNote\n"
            "\n"
            "Keep replies concise and conversational. "
        ),
    )

    return agent

