from dotenv import load_dotenv
from pydantic_ai import Agent
from starlette.middleware.cors import CORSMiddleware
import uvicorn


load_dotenv()


agent = Agent(
    "openai:gpt-4.1",
    system_prompt=(
        "You are a helpful assistant for a web chat demo. "
        "Keep replies concise and conversational."
    ),
)


app = agent.to_ag_ui()
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


def main() -> None:
    uvicorn.run("main_05_ui:app", host="0.0.0.0", port=8000, reload=True)


if __name__ == "__main__":
    main()

