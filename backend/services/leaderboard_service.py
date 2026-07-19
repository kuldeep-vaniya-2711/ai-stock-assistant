from database.mongodb import users


def get_leaderboard():

    data = list(

        users.find(

            {},

            {

                "_id": 0,

                "name": 1,

                "level": 1,

                "experience": 1,

                "wallet": 1

            }

        )

    )

    data.sort(

        key=lambda x: x.get("experience", 0),

        reverse=True

    )

    return data