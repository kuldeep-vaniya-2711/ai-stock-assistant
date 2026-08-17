import { useEffect, useState } from "react";
import api from "../services/api";
import { getCurrentUser } from "../utils/auth";

import {

  PieChart,

  Pie,

  Cell,

  Tooltip,

  ResponsiveContainer,

  Legend,

} from "recharts";

const COLORS = [

  "#06b6d4",

  "#22c55e",

  "#f59e0b",

  "#ef4444",

  "#8b5cf6",

  "#3b82f6",

  "#14b8a6",

];

export default function PortfolioAllocationChart() {

  const [data, setData] = useState([]);

  useEffect(() => {
    const loadPortfolioAllocation = async () => {
      const email = getCurrentUser()?.email;
      if (!email) return;
      try {
        const res = await api.get(`/portfolio/allocation/${email}`);
        setData(res.data);
      } catch (err) {
        console.log(err);
      }
    };

    loadPortfolioAllocation();
  }, []);

  return (

    <div className="bg-slate-900 rounded-2xl border border-slate-800 p-4 sm:p-6 shadow-lg">

      <h2 className="text-xl sm:text-2xl font-bold mb-6">

        🥧 Portfolio Allocation

      </h2>

      <div className="h-72 sm:h-96">

        <ResponsiveContainer width="100%" height="100%">

          <PieChart>

            <Pie

              data={data}

              dataKey="value"

              nameKey="symbol"

              outerRadius="75%"

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

            <Legend />

          </PieChart>

        </ResponsiveContainer>

      </div>

    </div>

  );

}