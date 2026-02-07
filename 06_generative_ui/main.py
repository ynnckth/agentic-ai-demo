from dotenv import load_dotenv
from pydantic_ai import Agent, RunContext
from pydantic_ai.common_tools.duckduckgo import duckduckgo_search_tool
from starlette.middleware.cors import CORSMiddleware
import uvicorn
from pydantic import BaseModel
import json


load_dotenv()


class WeatherData(BaseModel):
    """Structured weather data for UI rendering"""
    location: str
    temperature: str
    condition: str
    humidity: str
    wind: str
    feels_like: str


agent = Agent(
    "openai:gpt-4o",
    tools=[duckduckgo_search_tool()],
    system_prompt=(
        "You are a helpful assistant for a web chat demo. "
        "Keep replies concise and conversational. "
        "When asked about weather in a specific location, first use duckduckgo_search_tool to search for the weather, "
        "then use get_weather tool with the extracted weather information."
    ),
)


@agent.tool_plain
def get_weather(
    location: str,
    temperature: str = "N/A",
    condition: str = "N/A",
    humidity: str = "N/A",
    wind: str = "N/A",
    feels_like: str = "N/A"
) -> str:
    """
    Display weather information for a location.
    Call this tool after searching for weather data to render the weather card UI.

    Args:
        location: The location name
        temperature: Current temperature (e.g., "28°C" or "82°F")
        condition: Weather condition (e.g., "Sunny", "Cloudy", "Rainy")
        humidity: Humidity percentage (e.g., "65%")
        wind: Wind speed (e.g., "10 kph" or "6 mph")
        feels_like: Feels like temperature (e.g., "30°C" or "86°F")
    """
    weather_data = WeatherData(
        location=location,
        temperature=temperature,
        condition=condition,
        humidity=humidity,
        wind=wind,
        feels_like=feels_like
    )
    return json.dumps(weather_data.model_dump())

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

