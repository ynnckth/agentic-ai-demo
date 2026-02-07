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
            "When asked to play music, you can play individual notes or sequences. "
            "You can use the playNote action to play individual notes. "
            "When playing multiple notes (like a chord or melody), call playNote multiple times. "
            "Keep replies concise and conversational. "
        ),
    )

    return agent

