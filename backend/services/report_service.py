from reportlab.platypus import SimpleDocTemplate
from reportlab.platypus import Table
from reportlab.platypus import TableStyle
from reportlab.lib import colors

from services.portfolio_service import get_portfolio

def generate_report(email):

    portfolio = get_portfolio(email)

    filename = "portfolio_report.pdf"

    pdf = SimpleDocTemplate(filename)

    data = [

        [

            "Stock",

            "Qty",

            "Buy",

            "Current",

            "Profit"

        ]

    ]

    for stock in portfolio:

        data.append([

            stock["symbol"],

            stock["quantity"],

            stock["buy_price"],

            stock["current_price"],

            stock["profit"]

        ])

    table = Table(data)

    table.setStyle(

        TableStyle([

            ("BACKGROUND",(0,0),(-1,0),colors.darkblue),

            ("TEXTCOLOR",(0,0),(-1,0),colors.white),

            ("GRID",(0,0),(-1,-1),1,colors.black),

            ("BACKGROUND",(0,1),(-1,-1),colors.beige)

        ])

    )

    pdf.build([table])

    return filename