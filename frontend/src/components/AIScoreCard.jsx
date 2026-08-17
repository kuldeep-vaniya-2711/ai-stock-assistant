import { FaRobot } from "react-icons/fa";

function AIScoreCard({ data }) {

    if (!data) {

        return (

            <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 shadow-lg">

                <p className="text-slate-400">

                    AI Score unavailable.

                </p>

            </div>

        );

    }

    return (

        <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 shadow-lg">

            <h2 className="text-2xl font-bold flex items-center gap-2 mb-6">

                <FaRobot className="text-cyan-400" />

                AI Score Breakdown

            </h2>

            <div className="space-y-4">

                {data.score_breakdown?.map((item) => (

                    <div

                        key={item.title}

                        className="flex justify-between items-center bg-slate-800 rounded-lg p-4"

                    >

                        <span className="text-slate-300">

                            {item.title}

                        </span>

                        <span
                            className={`font-bold text-lg ${
                                item.score >= 0
                                    ? "text-green-400"
                                    : "text-red-400"
                            }`}
                        >

                            {item.score > 0 ? "+" : ""}

                            {item.score}

                        </span>

                    </div>

                ))}

            </div>

            <div className="border-t border-slate-700 mt-6 pt-5 flex justify-between items-center">

                <span className="text-lg font-bold">

                    Total AI Score

                </span>

                <span className="text-2xl font-bold text-cyan-400">

                    {data.score ?? 0}/100

                </span>

            </div>

        </div>

    );

}

export default AIScoreCard;