from pydantic_ai import Agent
from pydantic_ai.common_tools.duckduckgo import duckduckgo_search_tool

from helpers import log_events


agent = Agent(
    "openai:gpt-4.1",
    tools=[duckduckgo_search_tool()],
    system_prompt="You are a helpful assistant.",
)


def main() -> None:
    message_history = []
    while (user_msg := input("USER: ")) != "exit":
        result = agent.run_sync(user_msg, message_history=message_history, event_stream_handler=log_events)
        print(f"ASSISTANT: {result.output}")
        message_history.extend(result.new_messages())


if __name__ == "__main__":
    main()
