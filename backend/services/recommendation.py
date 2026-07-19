from services.ai_engine import ai_score


def get_recommendation(indicators):

    ai = ai_score(indicators)

    return {

        "recommendation": ai["recommendation"],

        "confidence": ai["confidence"],

        "trend": ai["trend"],

        "reasons": ai["reasons"],

        "score_breakdown": ai["score_breakdown"]

    }