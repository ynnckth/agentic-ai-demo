from pydantic_ai import Agent
from pydantic_ai.common_tools.duckduckgo import duckduckgo_search_tool
from pydantic import BaseModel
import json


class WeatherData(BaseModel):
    """Structured weather data"""
    location: str
    temperature: str
    condition: str
    humidity: str
    wind: str
    feels_like: str


def create_agent() -> Agent:
    """Create and configure the agent with tools."""
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
        Display weather information in a weather card UI component.

        IMPORTANT: After searching for weather, you MUST call this tool with ALL extracted weather data.
        Extract values from search results and pass them to this function.

        Args:
            location: The city/location name (required)
            temperature: Current temperature with unit (e.g., "28°C", "82°F")
            condition: Weather condition description (e.g., "Sunny", "Partly Cloudy", "Rain")
            humidity: Humidity percentage (e.g., "65%", "80%")
            wind: Wind speed with unit (e.g., "10 kph", "6 mph")
            feels_like: Feels like temperature with unit (e.g., "30°C", "86°F")

        Returns:
            JSON string with weather data for UI rendering
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

    return agent

