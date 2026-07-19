import { useEffect, useState } from "react";

import api from "../services/api";

import { getCurrentUser } from "../utils/auth";

function AIAdvisor() {

  const [advice, setAdvice] = useState("");

  const user = getCurrentUser();

  useEffect(() => {

    loadAdvice();

  }, []);

  const loadAdvice = async () => {

    const res = await api.get(`/ai-advice/${user.email}`);

    setAdvice(res.data.advice);

  };

  return (

    <div className="bg-slate-900 rounded-xl p-6">

      <h2 className="text-2xl font-bold text-cyan-400 mb-4">

        🤖 AI Portfolio Advisor

      </h2>

      <div className="text-slate-300 whitespace-pre-wrap leading-8">

        {advice || "Loading..."}

      </div>

    </div>

  );

}

export default AIAdvisor;