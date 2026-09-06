import React from "react";
import {
  ArrowDown,
  ArrowLeft,
  ArrowUp,
  BarChart3,
  CalendarDays,
  IndianRupee,
  MapPin,
  Package,
  Sprout,
  TrendingUp,
} from "lucide-react";
import { Link, useNavigate } from "react-router-dom";

const monthlyData = [
  { month: "Apr", value: 42 },
  { month: "May", value: 55 },
  { month: "Jun", value: 48 },
  { month: "Jul", value: 68 },
  { month: "Aug", value: 76 },
  { month: "Sep", value: 91 },
];

const crops = [
  {
    name: "Tomato",
    emoji: "🍅",
    quantity: "500 kg",
    revenue: "₹15,600",
    change: "+12.4%",
    positive: true,
  },
  {
    name: "Potato",
    emoji: "🥔",
    quantity: "800 kg",
    revenue: "₹17,440",
    change: "+8.1%",
    positive: true,
  },
  {
    name: "Onion",
    emoji: "🧅",
    quantity: "350 kg",
    revenue: "₹9,345",
    change: "-2.3%",
    positive: false,
  },
];

const markets = [
  {
    name: "Azadpur Mandi",
    location: "Delhi",
    price: "₹3,120",
    distance: "48 km",
    score: 94,
  },
  {
    name: "Okhla Mandi",
    location: "Delhi",
    price: "₹2,940",
    distance: "42 km",
    score: 88,
  },
  {
    name: "Ghazipur Mandi",
    location: "Uttar Pradesh",
    price: "₹2,850",
    distance: "36 km",
    score: 82,
  },
];

function StatCard({ icon, title, value, change, positive, subtitle }) {
  return (
    <div className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm">
      <div className="flex items-start justify-between">
        <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-green-50 text-green-600">
          {icon}
        </div>

        {change && (
          <span
            className={`flex items-center gap-1 rounded-full px-2.5 py-1 text-xs font-bold ${
              positive
                ? "bg-green-50 text-green-700"
                : "bg-red-50 text-red-600"
            }`}
          >
            {positive ? <ArrowUp size={13} /> : <ArrowDown size={13} />}
            {change}
          </span>
        )}
      </div>

      <p className="mt-4 text-sm font-medium text-gray-500">{title}</p>
      <h3 className="mt-1 text-2xl font-black text-gray-900">{value}</h3>

      {subtitle && (
        <p className="mt-1 text-xs text-gray-400">{subtitle}</p>
      )}
    </div>
  );
}

export default function Analytics() {
  const navigate = useNavigate();

  const maxValue = Math.max(...monthlyData.map((item) => item.value));

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
              <h1 className="text-lg font-black">Analytics</h1>
              <p className="text-xs text-gray-500">
                Understand your farm's performance
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 rounded-xl border border-gray-200 bg-white px-3 py-2 text-sm font-semibold text-gray-600">
            <CalendarDays size={16} />
            Last 6 Months
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-7xl px-6 py-8 lg:px-8">
        {/* Hero */}
        <div className="mb-8 overflow-hidden rounded-3xl bg-gradient-to-br from-green-700 via-green-600 to-emerald-500 p-7 text-white shadow-xl shadow-green-900/10">
          <div className="flex flex-col justify-between gap-6 md:flex-row md:items-center">
            <div>
              <div className="mb-3 flex items-center gap-2 text-green-100">
                <BarChart3 size={18} />
                <span className="text-sm font-semibold">
                  Farm Performance
                </span>
              </div>

              <h2 className="text-3xl font-black tracking-tight md:text-4xl">
                Your numbers tell the story.
              </h2>

              <p className="mt-2 max-w-2xl text-sm leading-6 text-green-50">
                Track your revenue, crop performance and market opportunities
                to make better selling decisions.
              </p>
            </div>

            <div className="hidden rounded-2xl bg-white/10 p-5 backdrop-blur md:block">
              <TrendingUp size={52} strokeWidth={1.5} />
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="mb-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <StatCard
            icon={<IndianRupee size={21} />}
            title="Total Revenue"
            value="₹42,385"
            change="+14.8%"
            positive
            subtitle="Compared with previous period"
          />

          <StatCard
            icon={<Package size={21} />}
            title="Produce Sold"
            value="1,650 kg"
            change="+9.2%"
            positive
            subtitle="Across 3 crops"
          />

          <StatCard
            icon={<TrendingUp size={21} />}
            title="Average Price"
            value="₹2,568"
            change="+7.6%"
            positive
            subtitle="Per quintal"
          />

          <StatCard
            icon={<Sprout size={21} />}
            title="Active Crops"
            value="3"
            subtitle="Currently listed"
          />
        </div>

        <div className="grid gap-6 lg:grid-cols-[1.4fr_0.6fr]">
          {/* Revenue Chart */}
          <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
            <div className="mb-8 flex items-start justify-between">
              <div>
                <h2 className="text-lg font-black">Revenue Overview</h2>
                <p className="mt-1 text-sm text-gray-500">
                  Monthly farm revenue trend
                </p>
              </div>

              <div className="rounded-xl bg-green-50 p-2.5 text-green-600">
                <BarChart3 size={20} />
              </div>
            </div>

            {/* Chart */}
            <div className="flex h-72 items-end gap-3 sm:gap-5">
              {monthlyData.map((item, index) => {
                const height = (item.value / maxValue) * 100;

                return (
                  <div
                    key={item.month}
                    className="group flex h-full flex-1 flex-col justify-end"
                  >
                    <div className="relative flex flex-1 items-end">
                      <div
                        className="w-full rounded-t-xl bg-green-500 transition-all duration-300 group-hover:bg-green-600"
                        style={{
                          height: `${height}%`,
                          minHeight: "25px",
                        }}
                      />

                      <div className="absolute bottom-full left-1/2 mb-2 hidden -translate-x-1/2 rounded-lg bg-gray-900 px-2 py-1 text-[10px] font-bold text-white group-hover:block">
                        ₹{item.value}k
                      </div>
                    </div>

                    <p className="mt-3 text-center text-xs font-semibold text-gray-400">
                      {item.month}
                    </p>
                  </div>
                );
              })}
            </div>

            <div className="mt-6 flex items-center justify-between border-t border-gray-100 pt-5">
              <div>
                <p className="text-xs text-gray-400">Best month</p>
                <p className="text-sm font-black">September</p>
              </div>

              <div className="text-right">
                <p className="text-xs text-gray-400">Peak revenue</p>
                <p className="text-sm font-black text-green-600">
                  ₹91,000
                </p>
              </div>
            </div>
          </div>

          {/* AI Insight */}
          <div className="rounded-2xl bg-gray-950 p-6 text-white shadow-xl">
            <div className="mb-5 flex items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-green-500/15 text-green-400">
                <SparklesIcon />
              </div>

              <div>
                <p className="font-black">AI Insight</p>
                <p className="text-xs text-gray-400">
                  Performance analysis
                </p>
              </div>
            </div>

            <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
              <p className="text-sm leading-7 text-gray-300">
                Your farm revenue has increased steadily over the last
                six months.{" "}
                <span className="font-bold text-white">
                  Tomato is currently your strongest opportunity.
                </span>
              </p>
            </div>

            <div className="mt-5 space-y-4">
              <div>
                <div className="mb-2 flex justify-between text-xs">
                  <span className="text-gray-400">Revenue growth</span>
                  <span className="font-bold text-green-400">+14.8%</span>
                </div>

                <div className="h-2 overflow-hidden rounded-full bg-white/10">
                  <div
                    className="h-full rounded-full bg-green-500"
                    style={{ width: "74%" }}
                  />
                </div>
              </div>

              <div>
                <div className="mb-2 flex justify-between text-xs">
                  <span className="text-gray-400">Market efficiency</span>
                  <span className="font-bold text-green-400">82%</span>
                </div>

                <div className="h-2 overflow-hidden rounded-full bg-white/10">
                  <div
                    className="h-full rounded-full bg-green-500"
                    style={{ width: "82%" }}
                  />
                </div>
              </div>
            </div>

            <Link
              to="/advisor"
              className="mt-6 flex items-center justify-center gap-2 rounded-xl bg-green-600 py-3 text-sm font-bold transition hover:bg-green-500"
            >
              Ask AI Advisor
              <TrendingUp size={16} />
            </Link>
          </div>
        </div>

        {/* Crop Performance */}
        <div className="mt-6 rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
          <div className="mb-6">
            <h2 className="text-lg font-black">Crop Performance</h2>
            <p className="mt-1 text-sm text-gray-500">
              Compare your crops by revenue and market movement
            </p>
          </div>

          <div className="space-y-4">
            {crops.map((crop) => (
              <div
                key={crop.name}
                className="flex flex-col gap-4 rounded-2xl border border-gray-100 p-4 transition hover:border-green-100 hover:bg-green-50/30 sm:flex-row sm:items-center"
              >
                <div className="flex flex-1 items-center gap-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-green-50 text-2xl">
                    {crop.emoji}
                  </div>

                  <div>
                    <h3 className="font-black">{crop.name}</h3>
                    <p className="mt-1 text-xs text-gray-500">
                      {crop.quantity}
                    </p>
                  </div>
                </div>

                <div className="sm:w-40">
                  <p className="text-xs text-gray-400">Revenue</p>
                  <p className="mt-1 font-black">{crop.revenue}</p>
                </div>

                <div className="sm:w-28">
                  <span
                    className={`flex w-fit items-center gap-1 rounded-full px-2.5 py-1 text-xs font-bold ${
                      crop.positive
                        ? "bg-green-50 text-green-700"
                        : "bg-red-50 text-red-600"
                    }`}
                  >
                    {crop.positive ? (
                      <ArrowUp size={13} />
                    ) : (
                      <ArrowDown size={13} />
                    )}
                    {crop.change}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Market Comparison */}
        <div className="mt-6 rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
          <div className="mb-6">
            <h2 className="text-lg font-black">Market Opportunities</h2>
            <p className="mt-1 text-sm text-gray-500">
              Current tomato prices across nearby markets
            </p>
          </div>

          <div className="grid gap-4 md:grid-cols-3">
            {markets.map((market, index) => (
              <div
                key={market.name}
                className="rounded-2xl border border-gray-100 p-5 transition hover:-translate-y-1 hover:shadow-lg"
              >
                <div className="mb-4 flex items-start justify-between">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-green-50 text-green-600">
                    <MapPin size={19} />
                  </div>

                  <span className="rounded-full bg-green-50 px-2.5 py-1 text-[10px] font-black text-green-700">
                    #{index + 1}
                  </span>
                </div>

                <h3 className="font-black">{market.name}</h3>

                <p className="mt-1 text-xs text-gray-500">
                  {market.location} · {market.distance}
                </p>

                <div className="mt-5 flex items-end justify-between">
                  <div>
                    <p className="text-xs text-gray-400">Price</p>
                    <p className="mt-1 text-xl font-black">
                      {market.price}
                    </p>
                  </div>

                  <div className="text-right">
                    <p className="text-xs text-gray-400">AI Score</p>
                    <p className="mt-1 text-lg font-black text-green-600">
                      {market.score}%
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom CTA */}
        <div className="mt-6 flex flex-col items-center justify-between gap-4 rounded-2xl border border-green-100 bg-green-50 p-6 sm:flex-row">
          <div>
            <h3 className="font-black text-green-900">
              Want better recommendations?
            </h3>
            <p className="mt-1 text-sm text-green-700">
              Ask FarmLink AI about your crops and selling strategy.
            </p>
          </div>

          <Link
            to="/advisor"
            className="rounded-xl bg-green-600 px-5 py-3 text-sm font-bold text-white transition hover:bg-green-700"
          >
            Open AI Advisor
          </Link>
        </div>
      </main>
    </div>
  );
}

function SparklesIcon() {
  return (
    <span className="text-xl">
      ✨
    </span>
  );
}