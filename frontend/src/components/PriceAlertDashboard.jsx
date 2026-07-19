import { useEffect, useState } from "react";
import api from "../services/api";
import { getCurrentUser } from "../utils/auth";

function PriceAlertDashboard() {

  const [alerts, setAlerts] = useState([]);

  const user = getCurrentUser();

  const email = user?.email;

  useEffect(() => {

    if(email){

      loadAlerts();

    }

  }, []);

  const loadAlerts = async () => {

    try{

      const res = await api.get(`/price-alert/${email}`);

      setAlerts(res.data);

    }

    catch(err){

      console.log(err);

    }

  }

  return (

    <div className="bg-slate-900 rounded-xl p-6">

      <div className="flex justify-between">

        <h2 className="text-2xl font-bold">

          🔔 Live Price Alerts

        </h2>

        <span className="text-cyan-400">

          {alerts.length} Alerts

        </span>

      </div>

      <div className="mt-6 space-y-4">

        {

          alerts.length===0 ?

          (

            <div className="text-slate-400">

              No Active Alerts

            </div>

          )

          :

          alerts.map((alert,index)=>(

            <div

              key={index}

              className="bg-slate-800 rounded-lg p-4 flex justify-between items-center"

            >

              <div>

                <h3 className="font-bold">

                  {alert.symbol}

                </h3>

                <p className="text-slate-400 text-sm">

                  Target ₹ {alert.target_price}

                </p>

              </div>

              <span className="bg-yellow-600 px-3 py-1 rounded-full">

                ACTIVE

              </span>

            </div>

          ))

        }

      </div>

    </div>

  );

}

export default PriceAlertDashboard;