from dotenv import load_dotenv
from starlette.middleware.cors import CORSMiddleware
import uvicorn
from agent import create_agent

load_dotenv()

agent = create_agent()
app = agent.to_ag_ui()
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:4000"], # CopilotKit Runtime
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


def main() -> None:
    uvicorn.run(app, host="0.0.0.0", port=8000)


if __name__ == "__main__":
    main()

