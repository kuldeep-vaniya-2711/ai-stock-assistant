# ==========================================
# AI Recommendation Engine
# ==========================================

def ai_score(indicators):

    score = 0

    reasons = []

    rsi_score = 0
    sma_score = 0
    ema_score = 0
    macd_score = 0
    bb_score = 0

    # -------------------------
    # RSI
    # -------------------------

    rsi = indicators["rsi"]

    if rsi < 30:

        rsi_score = 30
        score += rsi_score

        reasons.append(
            "RSI indicates Oversold condition."
        )

    elif rsi < 40:

        rsi_score = 15
        score += rsi_score

        reasons.append(
            "RSI is recovering from weakness."
        )

    elif rsi > 70:

        rsi_score = -30
        score += rsi_score

        reasons.append(
            "RSI indicates Overbought condition."
        )

    elif rsi > 60:

        rsi_score = -15
        score += rsi_score

        reasons.append(
            "RSI is entering overbought zone."
        )

    # -------------------------
    # SMA
    # -------------------------

    price = indicators["price"]
    sma20 = indicators["sma20"]
    sma50 = indicators["sma50"]

    if price > sma20:

        sma_score += 10
        score += 10

        reasons.append(
            "Price is above SMA20."
        )

    else:

        sma_score -= 10
        score -= 10

        reasons.append(
            "Price is below SMA20."
        )

    if sma20 > sma50:

        sma_score += 20
        score += 20

        reasons.append(
            "SMA20 is above SMA50 (Bullish Trend)."
        )

    else:

        sma_score -= 20
        score -= 20

        reasons.append(
            "SMA20 is below SMA50 (Bearish Trend)."
        )

    # -------------------------
    # EMA
    # -------------------------

    ema20 = indicators["ema20"]

    if price > ema20:

        ema_score = 20
        score += ema_score

        reasons.append(
            "Price is above EMA20."
        )

    else:

        ema_score = -20
        score += ema_score

        reasons.append(
            "Price is below EMA20."
        )

    # -------------------------
    # MACD
    # -------------------------

    macd = indicators["macd"]
    signal = indicators["macd_signal"]

    if macd > signal:

        macd_score = 20
        score += macd_score

        reasons.append(
            "MACD Bullish Crossover."
        )

    else:

        macd_score = -20
        score += macd_score

        reasons.append(
            "MACD Bearish Crossover."
        )

    # -------------------------
    # Bollinger Bands
    # -------------------------

    bb_upper = indicators["bb_upper"]
    bb_lower = indicators["bb_lower"]

    if price <= bb_lower:

        bb_score = 20
        score += bb_score

        reasons.append(
            "Price is near Lower Bollinger Band."
        )

    elif price >= bb_upper:

        bb_score = -20
        score += bb_score

        reasons.append(
            "Price is near Upper Bollinger Band."
        )

    # -------------------------
    # Recommendation
    # -------------------------

    if score >= 50:

        recommendation = "BUY"

    elif score >= 20:

        recommendation = "HOLD"

    else:

        recommendation = "SELL"

    confidence = min(abs(score), 100)

    if score >= 50:

        trend = "Strong Bullish"

    elif score >= 20:

        trend = "Bullish"

    elif score >= 0:

        trend = "Neutral"

    elif score >= -30:

        trend = "Bearish"

    else:

        trend = "Strong Bearish"

    # -------------------------
    # Score Breakdown
    # -------------------------

    score_breakdown = [

        {
            "title": "RSI",
            "score": rsi_score
        },

        {
            "title": "Moving Average",
            "score": sma_score
        },

        {
            "title": "EMA Trend",
            "score": ema_score
        },

        {
            "title": "MACD",
            "score": macd_score
        },

        {
            "title": "Bollinger Bands",
            "score": bb_score
        }

    ]

    return {

        "recommendation": recommendation,

        "confidence": confidence,

        "trend": trend,

        "reasons": reasons,

        "score_breakdown": score_breakdown

    }