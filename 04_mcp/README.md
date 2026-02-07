# Demo 4: MCP Servers

Adding MCP (Model Context Protocol) servers. This demo shows how to integrate powerful MCP servers that provide advanced capabilities like browser automation.

## What This Demo Shows

This demo showcases:
- Integration with MCP servers
- Browser automation using Playwright
- Complex multi-step tool interactions
- Real-time web interaction capabilities

## Running the Demo

```shell
uv run 04_mcp/main.py
```

## Example Interaction

```
USER: Can you check today's weather in Singapore by searching in google?
  [TOOLS] browser_navigate({"url":"https://www.google.com/search?q=weather+in+Singapore"})
  [TOOLS] -> result: ### Ran Playwright code
    ... opens browser window and interacts with the page ...
    ...
    ...
ASSISTANT: Here is today's weather in Singapore, based on Google:

- Condition: Cloudy
- Temperature: 28°C
- Precipitation: 10%
- Humidity: 70%
- Wind: 10 km/h

This information is current as of Friday, 8:00 pm, and reflects generally cloudy conditions. If you need more detailed hourly or extended forecasts, let me know!
```

## Key Takeaway

MCP servers provide a standardized way to add sophisticated capabilities to your agent. You can find a collection of available MCP servers at [mcpservers.org](https://mcpservers.org/).

## Prerequisites

- Python with uv installed
- OpenAI API key configured (see main project README)
- MCP server dependencies (installed automatically)

