import {

  Line

} from "react-chartjs-2";

import {

  Chart as ChartJS,

  CategoryScale,

  LinearScale,

  PointElement,

  LineElement,

  Tooltip,

  Legend

} from "chart.js";

import { useDashboardContext } from "../context/DashboardContext";

ChartJS.register(

  CategoryScale,

  LinearScale,

  PointElement,

  LineElement,

  Tooltip,

  Legend

);

export default function PortfolioGrowthChart() {

  const { portfolio } = useDashboardContext();

  const labels = portfolio.map(

    (stock) => stock.symbol

  );

  const investment = portfolio.map(

    (stock) => stock.investment

  );

  const current = portfolio.map(

    (stock) => stock.current_value

  );

  const data = {

    labels,

    datasets: [

      {

        label: "Investment",

        data: investment,

        borderColor: "#3B82F6",

        backgroundColor: "#3B82F6",

        tension: 0.4,

      },

      {

        label: "Current Value",

        data: current,

        borderColor: "#22C55E",

        backgroundColor: "#22C55E",

        tension: 0.4,

      },

    ],

  };

  const options = {

    responsive: true,

    maintainAspectRatio: false,

    plugins: {

      legend: {

        labels: {

          color: "#ffffff",

        },

      },

    },

    scales: {

      x: {

        ticks: {

          color: "#CBD5E1",

        },

        grid: {

          color: "#334155",

        },

      },

      y: {

        ticks: {

          color: "#CBD5E1",

        },

        grid: {

          color: "#334155",

        },

      },

    },

  };

  return (

    <div className="bg-slate-900 rounded-2xl border border-slate-800 p-4 sm:p-6 shadow-lg">

      <h2 className="text-xl sm:text-2xl font-bold mb-6">

        📈 Portfolio Growth

      </h2>

      <div className="relative h-72 sm:h-96">

        <Line

          data={data}

          options={options}

        />

      </div>

    </div>

  );

}