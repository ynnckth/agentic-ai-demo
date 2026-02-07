# Demo 2: Custom Tool

Adding your own custom tools written in Python. This demo shows how to extend the agent's capabilities by implementing custom functions that the agent can call.

## What This Demo Shows

This demo showcases:
- How to create custom tools in Python
- Tool registration with the agent
- The agent's ability to decide when to use tools
- Function calling and result integration

## Running the Demo

```shell
uv run 02_custom_tool/main.py
```

## Example Interaction

```
USER: What's today's weather in singapore?
  [TOOLS] get_weather({"location":"singapore"})
  [TOOLS] -> result: It's sunny and 25 °C in singapore.
ASSISTANT: Today's weather in Singapore is sunny with a temperature of 25°C.
```

## Key Takeaway

By adding custom tools, you can extend the agent's capabilities to perform specific tasks like fetching weather data, querying databases, or any other custom functionality you implement.

## Prerequisites

- Python with uv installed
- OpenAI API key configured (see main project README)

