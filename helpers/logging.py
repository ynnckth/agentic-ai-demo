from collections.abc import AsyncIterable
from pydantic_ai import RunContext
from pydantic_ai.messages import AgentStreamEvent, FunctionToolCallEvent, FunctionToolResultEvent


async def log_events(ctx: RunContext, event_stream: AsyncIterable[AgentStreamEvent]) -> None:
    async for event in event_stream:
        if isinstance(event, FunctionToolCallEvent):
            print(f"  [TOOLS] {event.part.tool_name}({event.part.args})")
        elif isinstance(event, FunctionToolResultEvent):
            print(f"  [TOOLS] -> result: {event.result.content}")
