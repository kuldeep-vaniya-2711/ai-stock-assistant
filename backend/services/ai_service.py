import os

from dotenv import load_dotenv
from google import genai

from services.portfolio_service import get_portfolio

load_dotenv()

client = genai.Client(
    api_key=os.getenv("GEMINI_API_KEY")
)


def get_ai_portfolio_advice(email):

    portfolio = get_portfolio(email)

    if len(portfolio) == 0:
        return {
            "advice": "Your portfolio is empty. Add stocks first."
        }

    prompt = f"""
You are an expert Indian Stock Market Advisor.

Analyze this portfolio:

{portfolio}

Give response in this format:

📈 Overall Portfolio

⚠ Risk Analysis

✅ Strong Stocks

❌ Weak Stocks

💡 Suggestions

Keep response under 200 words.
"""

    try:

        response = client.models.generate_content(
            model="gemini-3.5-flash",
            contents=prompt
        )

        return {
            "advice": response.text
        }

    except Exception as e:

        return {
            "advice": f"AI Error: {str(e)}"
        }