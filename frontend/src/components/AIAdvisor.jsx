import { useEffect, useState } from "react";

import api from "../services/api";

import { getCurrentUser } from "../utils/auth";

function AIAdvisor() {

  const [advice, setAdvice] = useState("");

  const [loading, setLoading] = useState(true);

  const user = getCurrentUser();

  useEffect(() => {

    if (!user?.email) return;

    loadAdvice();

  }, []);

  async function loadAdvice() {

    try {

      const { data } = await api.get(

        `/ai/recommendation/${user.email}`

      );

      if (data.suggestions?.length > 0) {

        setAdvice(

          data.suggestions.join("\n\n")

        );

      } else {

        setAdvice(

          "No AI recommendation available."

        );

      }

    }

    catch (error) {

      console.error(error);

      setAdvice(

        "Unable to load AI recommendation."

      );

    }

    finally {

      setLoading(false);

    }

  }

  return (

    <div className="bg-slate-900 rounded-xl p-6">

      <h2 className="text-2xl font-bold text-cyan-400 mb-4">

        🤖 AI Portfolio Advisor

      </h2>

      <div className="text-slate-300 whitespace-pre-wrap leading-8">

        {

          loading

            ? "Loading..."

            : advice

        }

      </div>

    </div>

  );

}

export default AIAdvisor;