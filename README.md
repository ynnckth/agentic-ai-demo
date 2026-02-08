# Agentic AI Demos & Experiments

A simple demo showcasing the building blocks of Agentic AI using Python and [PydanticAI](https://ai.pydantic.dev/).

## Setup

Make sure you have the following things installed:

- [uv](https://docs.astral.sh/uv/)
- [node.js](https://nodejs.org/)

### Configure OpenAI key

Create a `.env` file at the project's top level and add the following content:
```
OPENAI_API_KEY=<your API key>
```

Alternatively, on Linux/Mac:

```bash
export OPENAI_API_KEY="<your API key>"
```

On Windows (PowerShell):

```bash
$env:OPENAI_API_KEY="<your API key>"
```

## Available Demos

The following demos are available:

1. A basic agent with which you can chat
```shell
uv run 01_basic/main.py
```
```
USER: What's today's weather in singapore?
ASSISTANT: I don't have real-time data access, so I can't provide the current weather in Singapore. For the most accurate and up-to-date information, please check a trusted weather website or app like:

- Weather.com (The Weather Channel)
- BBC Weather
- AccuWeather
- Singapore's Meteorological Service ([MSS](https://www.weather.gov.sg/))

Would you like to know the general climate patterns in Singapore or tips on what to expect weather-wise this time of year?
```

2. Adding your own custom tools written in Python
```shell
uv run 02_custom_tool/main.py
```
```
USER: What's today's weather in singapore?
  [TOOLS] get_weather({"location":"singapore"})
  [TOOLS] -> result: It's sunny and 25 °C in singapore.
ASSISTANT: Today's weather in Singapore is sunny with a temperature of 25°C.
```

3. Adding out of the box tools from existing libraries, see [pydantic ai tools](https://ai.pydantic.dev/common-tools/) and [langchain tools](https://ai.pydantic.dev/third-party-tools/) for examples
```shell
uv run 03_external_tool/main.py
```
```
USER: What's today's weather in singapore?
  [TOOLS] duckduckgo_search({"query":"today's weather in Singapore"})
  [TOOLS] -> result: [{'title': 'Singapore , Central Singapore , Singapore Weather ... '}]
ASSISTANT: Today's weather in Singapore is mostly cloudy with a high of around 32°C. Scattered thundery showers are expected, especially in the afternoon. You can always check up-to-date details on sites like AccuWeather or the National Environment Agency Singapore Weather Portal.
```

4. Adding MCP servers, see [mcp server collection](https://mcpservers.org/) for examples
```shell
uv run 04_mcp/main.py
```
```
$ uv run main_04_mcp.py
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

5. User interface integration using AG-UI and CopilotKit for a simple chat application
```shell
# Run the server (agent)
uv run 05_ag_ui/main.py
```
```shell
# Run the CopilotKit runtime service
cd 05_ag_ui/copilotkit_runtime
npm run dev
```
```shell
# Run the UI
cd 05_ag_ui/ui
npm run dev
```
Open the webapp at:
> http://locahost:5173

6. Generative UI - Dynamic UI components rendered based on agent tool calls
```shell
# Run the server (agent)
uv run 06_ui_components/main.py
```
```shell
# Run the CopilotKit runtime service
cd 06_ui_components/copilotkit_runtime
npm run dev
```
```shell
# Run the UI
cd 06_ui_components/ui
npm run dev
```
Open the webapp at:
> http://localhost:5173

When you ask about the weather in a specific location, the agent will render a weather card component with the location information.
