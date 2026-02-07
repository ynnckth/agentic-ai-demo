# Demo 1: Basic Agent

A basic agent with which you can chat. This demo demonstrates the fundamental setup of an AI agent without any additional tools or capabilities.

## What This Demo Shows

This demo showcases:
- Basic agent setup using PydanticAI
- Simple conversational interface
- The agent's default capabilities without custom tools

## Running the Demo

```shell
uv run 01_basic/main.py
```

## Example Interaction

```
USER: What's today's weather in singapore?
ASSISTANT: I don't have real-time data access, so I can't provide the current weather in Singapore. For the most accurate and up-to-date information, please check a trusted weather website or app like:

- Weather.com (The Weather Channel)
- BBC Weather
- AccuWeather
- Singapore's Meteorological Service (MSS)

Would you like to know the general climate patterns in Singapore or tips on what to expect weather-wise this time of year?
```

## Key Takeaway

Without custom tools, the agent can only provide information based on its training data and cannot access real-time information or perform specific actions.

## Prerequisites

- Python with uv installed
- OpenAI API key configured (see main project README)

