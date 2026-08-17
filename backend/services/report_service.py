from reportlab.platypus import (
    SimpleDocTemplate,
    Table,
    TableStyle,
)

from reportlab.lib import colors
from reportlab.lib.units import inch

from services.portfolio_service import get_portfolio


def generate_report(email):

    portfolio = get_portfolio(email)

    filename = "portfolio_report.pdf"

    pdf = SimpleDocTemplate(filename)

    data = [[
        "Stock",
        "Qty",
        "Buy Price",
        "Current Price",
        "Profit"
    ]]

    for stock in portfolio:

        data.append([

            stock["symbol"],

            stock["quantity"],

            f"₹{stock['buy_price']:.2f}",

            f"₹{stock['current_price']:.2f}",

            f"₹{stock['profit']:.2f}"

        ])

    table = Table(
        data,
        colWidths=[
            1.6 * inch,
            0.8 * inch,
            1.2 * inch,
            1.3 * inch,
            1.2 * inch,
        ]
    )

    table.setStyle(

        TableStyle([

            ("BACKGROUND", (0, 0), (-1, 0), colors.darkblue),

            ("TEXTCOLOR", (0, 0), (-1, 0), colors.white),

            ("GRID", (0, 0), (-1, -1), 1, colors.black),

            ("BACKGROUND", (0, 1), (-1, -1), colors.beige),

            ("ALIGN", (0, 0), (-1, -1), "CENTER"),

            ("FONTNAME", (0, 0), (-1, 0), "Helvetica-Bold"),

            ("BOTTOMPADDING", (0, 0), (-1, 0), 10),

        ])

    )

    pdf.build([table])

    return filename