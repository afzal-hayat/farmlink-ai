import React, { useState } from "react";
import {
  ArrowLeft,
  Bot,
  CheckCircle2,
  ChevronRight,
  Clock3,
  IndianRupee,
  MapPin,
  MessageCircle,
  Send,
  Sparkles,
  TrendingUp,
  Truck,
  Wheat,
} from "lucide-react";
import { Link, useNavigate } from "react-router-dom";

const recommendations = [
  {
    icon: <TrendingUp size={20} />,
    title: "Price is trending upward",
    text: "Tomato prices are expected to rise over the next 3–5 days.",
  },
  {
    icon: <MapPin size={20} />,
    title: "Azadpur Mandi looks best",
    text: "It currently offers the strongest combination of price and buyer demand.",
  },
  {
    icon: <Truck size={20} />,
    title: "Transport is manageable",
    text: "Estimated transport cost is ₹180 per quintal from your location.",
  },
];

const quickQuestions = [
  "When should I sell my tomatoes?",
  "Which mandi gives me the best price?",
  "Should I wait for a higher price?",
  "How can I maximize my profit?",
];

export default function AIAdvisor() {
  const navigate = useNavigate();

  const [crop, setCrop] = useState("Tomato");
  const [quantity, setQuantity] = useState("500");
  const [question, setQuestion] = useState("");
  const [messages, setMessages] = useState([
    {
      type: "ai",
      text: "Hello! 👋 I'm your FarmLink AI Advisor. I can help you decide when and where to sell your produce for the best possible return.",
    },
  ]);

  const askAI = (text = question) => {
    if (!text.trim()) return;

    setMessages((prev) => [
      ...prev,
      { type: "user", text },
      {
        type: "ai",
        text: `Based on current market conditions, ${crop} prices are showing a positive trend. For your ${quantity} kg of produce, I recommend checking Azadpur Mandi first and considering a sale within the next 3–5 days.`,
      },
    ]);

    setQuestion("");
  };

  const estimatedValue = Math.round((Number(quantity) / 100) * 3150);

  return (
    <div className="min-h-screen bg-[#f7faf8] text-gray-900">
      {/* Header */}
      <header className="sticky top-0 z-30 border-b border-gray-100 bg-white/90 backdrop-blur">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4 lg:px-8">
          <div className="flex items-center gap-3">
            <button
              onClick={() => navigate("/dashboard")}
              className="rounded-xl p-2 text-gray-500 transition hover:bg-gray-100 hover:text-gray-900"
            >
              <ArrowLeft size={20} />
            </button>

            <div>
              <h1 className="text-lg font-black">AI Advisor</h1>
              <p className="text-xs text-gray-500">
                Your intelligent farming assistant
              </p>
            </div>
          </div>

          <div className="hidden items-center gap-2 rounded-full bg-green-50 px-4 py-2 text-xs font-bold text-green-700 sm:flex">
            <span className="h-2 w-2 animate-pulse rounded-full bg-green-500" />
            AI Online
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-7xl px-6 py-8 lg:px-8">
        {/* Hero */}
        <div className="relative mb-8 overflow-hidden rounded-3xl bg-gradient-to-br from-gray-950 via-gray-900 to-green-950 p-7 text-white shadow-2xl">
          <div className="absolute -right-20 -top-20 h-64 w-64 rounded-full bg-green-500/10 blur-3xl" />

          <div className="relative flex flex-col gap-7 md:flex-row md:items-center md:justify-between">
            <div>
              <div className="mb-4 flex items-center gap-2 text-green-400">
                <Sparkles size={18} />
                <span className="text-xs font-black uppercase tracking-[3px]">
                  FarmLink Intelligence
                </span>
              </div>

              <h2 className="max-w-2xl text-3xl font-black tracking-tight md:text-5xl">
                Make smarter selling decisions with AI.
              </h2>

              <p className="mt-4 max-w-2xl text-sm leading-7 text-gray-300">
                Get personalized recommendations using crop prices, demand,
                market distance and estimated transport costs.
              </p>
            </div>

            <div className="flex h-24 w-24 shrink-0 items-center justify-center rounded-3xl border border-green-400/20 bg-green-400/10 text-green-400 shadow-2xl shadow-green-500/10">
              <Bot size={50} strokeWidth={1.5} />
            </div>
          </div>
        </div>

        <div className="grid gap-6 lg:grid-cols-[1.05fr_0.95fr]">
          {/* Left */}
          <div className="space-y-6">
            {/* Crop Analysis */}
            <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
              <div className="mb-5 flex items-center justify-between">
                <div>
                  <h2 className="text-lg font-black">
                    Analyze My Produce
                  </h2>
                  <p className="mt-1 text-sm text-gray-500">
                    Tell AI what you're planning to sell.
                  </p>
                </div>

                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-green-50 text-green-600">
                  <Wheat size={20} />
                </div>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label className="mb-2 block text-xs font-bold text-gray-600">
                    Crop
                  </label>

                  <select
                    value={crop}
                    onChange={(e) => setCrop(e.target.value)}
                    className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm font-semibold outline-none transition focus:border-green-500 focus:bg-white"
                  >
                    <option>Tomato</option>
                    <option>Potato</option>
                    <option>Onion</option>
                    <option>Wheat</option>
                    <option>Rice</option>
                    <option>Maize</option>
                  </select>
                </div>

                <div>
                  <label className="mb-2 block text-xs font-bold text-gray-600">
                    Quantity
                  </label>

                  <div className="relative">
                    <input
                      type="number"
                      value={quantity}
                      onChange={(e) => setQuantity(e.target.value)}
                      className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 pr-14 text-sm font-semibold outline-none transition focus:border-green-500 focus:bg-white"
                    />
                    <span className="absolute right-4 top-3 text-xs font-bold text-gray-400">
                      KG
                    </span>
                  </div>
                </div>
              </div>

              <div className="mt-5 rounded-2xl bg-green-50 p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xs font-semibold text-green-700">
                      Estimated current value
                    </p>

                    <p className="mt-1 flex items-center text-2xl font-black text-green-900">
                      <IndianRupee size={20} />
                      {estimatedValue.toLocaleString("en-IN")}
                    </p>
                  </div>

                  <TrendingUp className="text-green-600" size={28} />
                </div>
              </div>
            </div>

            {/* AI Recommendation */}
            <div className="rounded-2xl border border-green-100 bg-white p-6 shadow-sm">
              <div className="mb-6 flex items-center gap-3">
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-green-600 text-white shadow-lg shadow-green-600/20">
                  <Sparkles size={20} />
                </div>

                <div>
                  <h2 className="font-black">AI Recommendation</h2>
                  <p className="text-xs text-gray-500">
                    Based on current market signals
                  </p>
                </div>

                <div className="ml-auto rounded-full bg-green-100 px-3 py-1 text-xs font-black text-green-700">
                  87% Confidence
                </div>
              </div>

              <div className="rounded-2xl bg-gradient-to-r from-green-50 to-emerald-50 p-5">
                <div className="flex items-start gap-4">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-green-600 text-white">
                    <CheckCircle2 size={20} />
                  </div>

                  <div>
                    <h3 className="text-lg font-black text-green-900">
                      Good time to prepare for selling
                    </h3>

                    <p className="mt-2 text-sm leading-6 text-green-800">
                      Prices are moving upward. Hold your produce for a short
                      period and target a high-demand market rather than
                      selling immediately at the lowest available rate.
                    </p>
                  </div>
                </div>
              </div>

              <div className="mt-5 space-y-3">
                {recommendations.map((item, index) => (
                  <div
                    key={index}
                    className="flex items-center gap-4 rounded-xl border border-gray-100 p-4"
                  >
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gray-50 text-green-600">
                      {item.icon}
                    </div>

                    <div>
                      <p className="text-sm font-bold">{item.title}</p>
                      <p className="mt-1 text-xs leading-5 text-gray-500">
                        {item.text}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right - Chat */}
          <div className="flex min-h-[650px] flex-col overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm">
            {/* Chat Header */}
            <div className="flex items-center gap-3 border-b border-gray-100 p-5">
              <div className="relative flex h-11 w-11 items-center justify-center rounded-xl bg-gray-900 text-green-400">
                <Bot size={22} />

                <span className="absolute -right-1 -top-1 h-3 w-3 rounded-full border-2 border-white bg-green-500" />
              </div>

              <div>
                <h2 className="font-black">Ask FarmLink AI</h2>
                <p className="text-xs text-gray-500">
                  Ask anything about selling your crops
                </p>
              </div>
            </div>

            {/* Messages */}
            <div className="flex-1 space-y-4 overflow-y-auto bg-gray-50/70 p-5">
              {messages.map((message, index) => (
                <div
                  key={index}
                  className={`flex ${
                    message.type === "user"
                      ? "justify-end"
                      : "justify-start"
                  }`}
                >
                  <div
                    className={`max-w-[85%] rounded-2xl px-4 py-3 text-sm leading-6 ${
                      message.type === "user"
                        ? "rounded-br-md bg-green-600 text-white"
                        : "rounded-bl-md border border-gray-100 bg-white text-gray-700 shadow-sm"
                    }`}
                  >
                    {message.type === "ai" && (
                      <div className="mb-2 flex items-center gap-2 text-xs font-black text-green-600">
                        <Bot size={14} />
                        FarmLink AI
                      </div>
                    )}

                    {message.text}
                  </div>
                </div>
              ))}
            </div>

            {/* Quick Questions */}
            <div className="border-t border-gray-100 bg-white p-4">
              <p className="mb-3 text-[11px] font-black uppercase tracking-wider text-gray-400">
                Quick questions
              </p>

              <div className="grid gap-2 sm:grid-cols-2">
                {quickQuestions.map((item) => (
                  <button
                    key={item}
                    onClick={() => askAI(item)}
                    className="flex items-center justify-between rounded-xl border border-gray-100 bg-gray-50 px-3 py-2.5 text-left text-xs font-semibold text-gray-600 transition hover:border-green-200 hover:bg-green-50 hover:text-green-700"
                  >
                    <span>{item}</span>
                    <ChevronRight size={14} />
                  </button>
                ))}
              </div>

              {/* Input */}
              <div className="mt-4 flex items-center gap-2 rounded-xl border border-gray-200 bg-gray-50 p-2 focus-within:border-green-500 focus-within:bg-white">
                <MessageCircle
                  size={18}
                  className="ml-2 shrink-0 text-gray-400"
                />

                <input
                  value={question}
                  onChange={(e) => setQuestion(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") askAI();
                  }}
                  placeholder="Ask your farming question..."
                  className="min-w-0 flex-1 bg-transparent px-2 py-2 text-sm outline-none"
                />

                <button
                  onClick={() => askAI()}
                  className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-green-600 text-white transition hover:bg-green-700"
                >
                  <Send size={17} />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom info */}
        <div className="mt-6 grid gap-4 sm:grid-cols-3">
          <div className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm">
            <Clock3 className="mb-3 text-green-600" size={22} />
            <h3 className="font-black">Best Selling Window</h3>
            <p className="mt-1 text-sm text-gray-500">
              Next 3–5 days
            </p>
          </div>

          <div className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm">
            <MapPin className="mb-3 text-green-600" size={22} />
            <h3 className="font-black">Recommended Market</h3>
            <p className="mt-1 text-sm text-gray-500">
              Azadpur Mandi, Delhi
            </p>
          </div>

          <div className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm">
            <IndianRupee className="mb-3 text-green-600" size={22} />
            <h3 className="font-black">Expected Price</h3>
            <p className="mt-1 text-sm text-gray-500">
              ₹3,150 / quintal
            </p>
          </div>
        </div>

        {/* Back */}
        <div className="mt-8 text-center">
          <Link
            to="/dashboard"
            className="inline-flex items-center gap-2 text-sm font-bold text-gray-500 transition hover:text-green-600"
          >
            <ArrowLeft size={16} />
            Back to Dashboard
          </Link>
        </div>
      </main>
    </div>
  );
}