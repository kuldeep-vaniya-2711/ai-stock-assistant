import { useEffect, useState } from "react";
import api from "../services/api";

import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend
} from "chart.js";

import { Pie } from "react-chartjs-2";
import { getCurrentUser } from "../utils/auth";

ChartJS.register(
  ArcElement,
  Tooltip,
  Legend
);

function SectorAllocationChart() {

  const [chartData, setChartData] = useState(null);

  const user = getCurrentUser();

  const email = user?.email;

  useEffect(() => {

    if(email){

      loadChart();

    }

  }, []);

  const loadChart = async () => {

    try{

      const res = await api.get(`/portfolio-chart/${email}`);

      setChartData({

        labels: res.data.labels,

        datasets: [

          {

            data: res.data.values,

            backgroundColor: [

              "#06b6d4",
              "#10b981",
              "#f59e0b",
              "#ef4444",
              "#8b5cf6",
              "#3b82f6"

            ],

            borderWidth:1

          }

        ]

      });

    }

    catch(err){

      console.log(err);

    }

  }

  if(!chartData){

    return(

      <div className="bg-slate-900 rounded-xl p-6">

        Loading Chart...

      </div>

    )

  }

  return(

    <div className="bg-slate-900 rounded-xl p-6">

      <h2 className="text-2xl font-bold mb-6">

        🥧 Sector Allocation

      </h2>

      <Pie data={chartData}/>

    </div>

  )

}

export default SectorAllocationChart;