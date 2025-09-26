from pydantic_ai import Agent

agent = Agent("openai:gpt-4.1", instructions="Talk like Shakespeare")
app = agent.to_ag_ui()
