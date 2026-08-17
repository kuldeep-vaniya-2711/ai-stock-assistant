import { useState, useRef, useEffect } from "react";
import api from "../services/api";
import { getCurrentUser } from "../utils/auth";

function AIChat() {

  const [messages, setMessages] = useState([
    {
      sender: "ai",
      text: "👋 Hello! I'm your AI Stock Assistant.\nAsk me about Portfolio, Risk, Best Stock, Buy or Sell."
    }
  ]);

  const [input, setInput] = useState("");

  const [loading, setLoading] = useState(false);

  const bottomRef = useRef(null);

  const user = getCurrentUser();

  const email = user?.email;

  useEffect(() => {

    bottomRef.current?.scrollIntoView({

      behavior: "smooth"

    });

  }, [messages]);

  const sendMessage = async () => {

    if (!input.trim() || loading) return;

    const userMessage = {

      sender: "user",

      text: input

    };

    setMessages(prev => [

      ...prev,

      userMessage

    ]);

    const question = input;

    setInput("");

    setLoading(true);

    try {

      const res = await api.post("/ai/chat", {

        email,

        message: question

      });

      setMessages(prev => [

        ...prev,

        {

          sender: "ai",

          text: res.data.reply

        }

      ]);

    }

    catch {

      setMessages(prev => [

        ...prev,

        {

          sender: "ai",

          text: "❌ Unable to reply."

        }

      ]);

    }

    setLoading(false);

  };

  return (

    <div className="bg-slate-900 rounded-2xl border border-slate-800 p-4 sm:p-6 shadow-lg">

      <h2 className="text-xl sm:text-2xl font-bold text-cyan-400 mb-5">

        🤖 AI Stock Assistant

      </h2>

      <div className="h-[420px] overflow-y-auto space-y-4 mb-5 pr-2">

        {

          messages.map((msg, index) => (

            <div

              key={index}

              className={`flex ${

                msg.sender === "user"

                  ? "justify-end"

                  : "justify-start"

              }`}

            >

              <div

                className={`rounded-2xl px-4 py-3 whitespace-pre-line max-w-[90%] sm:max-w-[75%]

                ${

                  msg.sender === "user"

                    ? "bg-cyan-600 text-white"

                    : "bg-slate-800 text-slate-100"

                }`}

              >

                {msg.text}

              </div>

            </div>

          ))

        }

        {

          loading && (

            <div className="flex justify-start">

              <div className="bg-slate-800 rounded-2xl px-4 py-3">

                ⏳ AI is typing...

              </div>

            </div>

          )

        }

        <div ref={bottomRef}></div>

      </div>

      <div className="flex flex-col sm:flex-row gap-3">

        <input

          value={input}

          onChange={(e) =>

            setInput(e.target.value)

          }

          onKeyDown={(e) => {

            if (e.key === "Enter") {

              sendMessage();

            }

          }}

          placeholder="Ask AI anything..."

          className="flex-1 bg-slate-800 rounded-xl px-4 py-3 outline-none border border-slate-700 focus:border-cyan-500"

        />

        <button

          onClick={sendMessage}

          disabled={loading}

          className="w-full sm:w-auto bg-cyan-600 hover:bg-cyan-700 disabled:opacity-50 px-6 py-3 rounded-xl font-bold transition"

        >

          {loading ? "Sending..." : "Send"}

        </button>

      </div>

    </div>

  );

}

export default AIChat;