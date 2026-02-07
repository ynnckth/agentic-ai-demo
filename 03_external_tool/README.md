# Demo 3: External Tool

Adding out-of-the-box tools from existing libraries. This demo demonstrates how to leverage pre-built tools from the ecosystem without writing custom implementations.

## What This Demo Shows

This demo showcases:
- Integration of external tools from existing libraries
- Using DuckDuckGo search as an example
- How agents can access real-time information from the web
- Leveraging the ecosystem of available tools

## Running the Demo

```shell
uv run 03_external_tool/main.py
```

## Example Interaction

```
USER: What's today's weather in singapore?
  [TOOLS] duckduckgo_search({"query":"today's weather in Singapore"})
  [TOOLS] -> result: [{'title': 'Singapore , Central Singapore , Singapore Weather ... '}]
ASSISTANT: Today's weather in Singapore is mostly cloudy with a high of around 32°C. Scattered thundery showers are expected, especially in the afternoon. You can always check up-to-date details on sites like AccuWeather or the National Environment Agency Singapore Weather Portal.
```

## Key Takeaway

Using external tools allows you to quickly add powerful capabilities to your agent without implementing everything from scratch. You can find tools for common tasks in libraries like:
- [PydanticAI tools](https://ai.pydantic.dev/common-tools/)
- [LangChain tools](https://ai.pydantic.dev/third-party-tools/)

## Prerequisites

- Python with uv installed
- OpenAI API key configured (see main project README)
