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

  const bottomRef = useRef(null);

  const user = getCurrentUser();

  const email = user?.email;

  useEffect(() => {

    bottomRef.current?.scrollIntoView({

      behavior: "smooth"

    });

  }, [messages]);

  const sendMessage = async () => {

    if (!input.trim()) return;

    const userMessage = {

      sender: "user",

      text: input

    };

    setMessages(prev => [

      ...prev,

      userMessage

    ]);

    try {

      const res = await api.post("/ai/chat", {

        email,

        message: input

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

          text: "Unable to reply."

        }

      ]);

    }

    setInput("");

  };

  return (

    <div className="bg-slate-900 rounded-xl p-6 border border-slate-800">

      <h2 className="text-2xl font-bold text-cyan-400 mb-5">

        🤖 AI Stock Assistant

      </h2>

      <div className="h-96 overflow-y-auto space-y-4 mb-5">

        {

          messages.map((msg, index) => (

            <div

              key={index}

              className={`p-4 rounded-xl whitespace-pre-line max-w-[80%]

              ${

                msg.sender === "user"

                ? "bg-cyan-600 ml-auto"

                : "bg-slate-800"

              }`}

            >

              {msg.text}

            </div>

          ))

        }

        <div ref={bottomRef}></div>

      </div>

      <div className="flex gap-3">

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

          className="flex-1 bg-slate-800 rounded-lg px-4 py-3 outline-none"

        />

        <button

          onClick={sendMessage}

          className="bg-cyan-600 hover:bg-cyan-700 px-6 rounded-lg font-bold"

        >

          Send

        </button>

      </div>

    </div>

  );

}

export default AIChat;