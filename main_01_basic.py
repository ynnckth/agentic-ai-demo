from pydantic_ai import Agent


agent = Agent(
    "openai:gpt-4.1",
    system_prompt="You are a helpful assistant.",
)


def main() -> None:
    message_history = []
    while (user_msg := input("USER: ")) != "exit":
        result = agent.run_sync(user_msg, message_history=message_history)
        print(f"ASSISTANT: {result.output}")
        message_history.extend(result.new_messages())


if __name__ == "__main__":
    main()
