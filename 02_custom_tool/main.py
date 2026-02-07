from dotenv import load_dotenv
from pydantic_ai import Agent

from helpers.logging import log_events


load_dotenv()


agent = Agent(
    "openai:gpt-4.1",
    system_prompt="You are a helpful assistant.",
)


@agent.tool_plain  
def get_weather(location: str) -> str:
    """Get the current weather."""
    return f"It's sunny and 25 °C in {location}."


def main() -> None:
    message_history = []
    while (user_msg := input("USER: ")) != "exit":
        result = agent.run_sync(user_msg, message_history=message_history, event_stream_handler=log_events)
        print(f"ASSISTANT: {result.output}")
        message_history.extend(result.new_messages())


if __name__ == "__main__":
    main()
