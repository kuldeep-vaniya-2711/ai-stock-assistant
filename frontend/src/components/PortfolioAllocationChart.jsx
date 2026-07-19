import { useEffect, useState } from "react";
import api from "../services/api";
import { getCurrentUser } from "../utils/auth";

import {

    PieChart,
    Pie,
    Cell,
    Tooltip,
    ResponsiveContainer

} from "recharts";

const COLORS = [

    "#06b6d4",
    "#22c55e",
    "#f59e0b",
    "#ef4444",
    "#8b5cf6",
    "#3b82f6",
    "#14b8a6"

];

export default function PortfolioAllocationChart() {

    const [data, setData] = useState([]);

    useEffect(() => {

        load();

    }, []);

    async function load() {

        const email = getCurrentUser()?.email;

        if (!email) return;

        try {

            const res = await api.get(

                `/portfolio/allocation/${email}`

            );

            setData(res.data);

        }

        catch (err) {

            console.log(err);

        }

    }

    return (

        <div className="bg-slate-900 rounded-2xl border border-slate-800 p-6">

            <h2 className="text-2xl font-bold mb-5">

                🥧 Portfolio Allocation

            </h2>

            <div className="h-80">

                <ResponsiveContainer>

                    <PieChart>

                        <Pie

                            data={data}

                            dataKey="value"

                            nameKey="symbol"

                            outerRadius={110}

                            label

                        >

                            {

                                data.map((entry, index) => (

                                    <Cell

                                        key={index}

                                        fill={

                                            COLORS[index % COLORS.length]

                                        }

                                    />

                                ))

                            }

                        </Pie>

                        <Tooltip />

                    </PieChart>

                </ResponsiveContainer>

            </div>

        </div>

    );

}