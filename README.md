# Agentic AI Demo

## Setup

Make sure you have the following things installed:

- [uv](https://docs.astral.sh/uv/)
- [node.js](https://nodejs.org/)

## Run Demo

### 1. Configure OpenAI key

On Linux/Mac:

```bash
export OPENAI_API_KEY="<your API key>"
```

On Windows (PowerShell):

```bash
$env:OPENAI_API_KEY="<your API key>"
```

### 2. Run Demo

```bash
uv run main_01_basic.py
```

## Demos

There are four demos:

1. A basic agent with which you can chat
2. Adding your own custom tools written in Python
3. Adding out of the box tools from existing libraries, see [pydantic ai tools](https://ai.pydantic.dev/common-tools/) and [langchain tools](https://ai.pydantic.dev/third-party-tools/) for examples
4. Adding MCP servers, see [mcp server collection](https://mcpservers.org/) for examples
