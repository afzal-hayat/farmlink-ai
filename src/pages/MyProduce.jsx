import React from "react";
import {
  ArrowLeft,
  BarChart3,
  CalendarDays,
  IndianRupee,
  MapPin,
  Package,
  Pencil,
  Plus,
  Sprout,
  Trash2,
  TrendingUp,
  Users,
  Wheat,
} from "lucide-react";
import { Link, useNavigate } from "react-router-dom";

const produce = [
  {
    id: 1,
    crop: "Tomato",
    emoji: "🍅",
    quantity: 500,
    price: 3120,
    status: "Price Rising",
    statusColor: "green",
    location: "Greater Noida",
    date: "18 Sep 2026",
    demand: "High Demand",
  },
  {
    id: 2,
    crop: "Potato",
    emoji: "🥔",
    quantity: 800,
    price: 2180,
    status: "Stable",
    statusColor: "blue",
    location: "Greater Noida",
    date: "21 Sep 2026",
    demand: "Good Demand",
  },
  {
    id: 3,
    crop: "Onion",
    emoji: "🧅",
    quantity: 350,
    price: 2670,
    status: "High Demand",
    statusColor: "orange",
    location: "Greater Noida",
    date: "25 Sep 2026",
    demand: "Very High",
  },
];

function StatCard({ icon, title, value, subtitle }) {
  return (
    <div className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm">
      <div className="mb-4 flex items-center justify-between">
        <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-green-50 text-green-600">
          {icon}
        </div>
      </div>

      <p className="text-sm font-medium text-gray-500">{title}</p>
      <h3 className="mt-1 text-2xl font-black text-gray-900">{value}</h3>
      <p className="mt-1 text-xs text-gray-400">{subtitle}</p>
    </div>
  );
}

function statusStyle(color) {
  if (color === "green") {
    return "bg-green-50 text-green-700 border-green-100";
  }

  if (color === "blue") {
    return "bg-blue-50 text-blue-700 border-blue-100";
  }

  return "bg-orange-50 text-orange-700 border-orange-100";
}

export default function MyProduce() {
  const navigate = useNavigate();

  const totalQuantity = produce.reduce(
    (sum, item) => sum + item.quantity,
    0
  );

  const estimatedValue = produce.reduce(
    (sum, item) => sum + (item.quantity / 100) * item.price,
    0
  );

  return (
    <div className="min-h-screen bg-[#f7faf8] text-gray-900">
      {/* Top Navigation */}
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
              <h1 className="text-lg font-black">My Produce</h1>
              <p className="text-xs text-gray-500">
                Manage your crops and market listings
              </p>
            </div>
          </div>

          <Link
            to="/add-produce"
            className="flex items-center gap-2 rounded-xl bg-green-600 px-4 py-3 text-sm font-bold text-white shadow-lg shadow-green-600/20 transition hover:bg-green-700"
          >
            <Plus size={18} />
            Add Produce
          </Link>
        </div>
      </header>

      <main className="mx-auto max-w-7xl px-6 py-8 lg:px-8">
        {/* Hero */}
        <div className="mb-8 overflow-hidden rounded-3xl bg-gradient-to-br from-green-700 via-green-600 to-emerald-500 p-7 text-white shadow-xl shadow-green-900/10">
          <div className="flex flex-col justify-between gap-6 md:flex-row md:items-center">
            <div>
              <div className="mb-3 flex items-center gap-2 text-green-100">
                <Sprout size={18} />
                <span className="text-sm font-semibold">
                  FarmLink AI Inventory
                </span>
              </div>

              <h2 className="text-3xl font-black tracking-tight md:text-4xl">
                Your Produce
              </h2>

              <p className="mt-2 max-w-xl text-sm leading-6 text-green-50">
                Keep track of your crops, market prices and estimated earnings
                from one place.
              </p>
            </div>

            <div className="hidden rounded-2xl bg-white/10 p-5 backdrop-blur md:block">
              <Wheat size={52} strokeWidth={1.5} />
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="mb-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <StatCard
            icon={<Package size={21} />}
            title="Total Produce"
            value={`${totalQuantity.toLocaleString()} kg`}
            subtitle="Across all active listings"
          />

          <StatCard
            icon={<Sprout size={21} />}
            title="Active Listings"
            value={produce.length}
            subtitle="Currently available"
          />

          <StatCard
            icon={<IndianRupee size={21} />}
            title="Estimated Value"
            value={`₹${Math.round(
              estimatedValue
            ).toLocaleString("en-IN")}`}
            subtitle="Based on current prices"
          />

          <StatCard
            icon={<TrendingUp size={21} />}
            title="Market Trend"
            value="+8.7%"
            subtitle="Average price movement"
          />
        </div>

        {/* AI Insight */}
        <div className="mb-8 rounded-2xl border border-green-100 bg-green-50 p-5">
          <div className="flex gap-4">
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-green-600 text-white shadow-md shadow-green-600/20">
              <BarChart3 size={21} />
            </div>

            <div>
              <p className="text-sm font-black text-green-900">
                AI Market Insight
              </p>

              <p className="mt-1 text-sm leading-6 text-green-800">
                Tomato prices are trending upward. Your{" "}
                <span className="font-bold">500 kg</span> tomato listing could
                earn more if sold through{" "}
                <span className="font-bold">Azadpur Mandi</span> within the
                next few days.
              </p>
            </div>
          </div>
        </div>

        {/* Section Header */}
        <div className="mb-5 flex items-center justify-between">
          <div>
            <h2 className="text-xl font-black">Active Produce</h2>
            <p className="mt-1 text-sm text-gray-500">
              Your currently listed crops
            </p>
          </div>

          <span className="rounded-full bg-green-100 px-3 py-1 text-xs font-bold text-green-700">
            {produce.length} Listings
          </span>
        </div>

        {/* Produce Cards */}
        <div className="grid gap-5 lg:grid-cols-3">
          {produce.map((item) => (
            <div
              key={item.id}
              className="group overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-xl"
            >
              {/* Card Top */}
              <div className="flex items-start justify-between border-b border-gray-100 p-5">
                <div className="flex items-center gap-3">
                  <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-green-50 text-3xl">
                    {item.emoji}
                  </div>

                  <div>
                    <h3 className="text-lg font-black">{item.crop}</h3>

                    <div className="mt-1 flex items-center gap-1 text-xs text-gray-500">
                      <MapPin size={13} />
                      {item.location}
                    </div>
                  </div>
                </div>

                <span
                  className={`rounded-full border px-2.5 py-1 text-[11px] font-bold ${statusStyle(
                    item.statusColor
                  )}`}
                >
                  {item.status}
                </span>
              </div>

              {/* Price */}
              <div className="p-5">
                <div className="mb-5 flex items-end justify-between">
                  <div>
                    <p className="text-xs font-medium text-gray-400">
                      Current Market Price
                    </p>

                    <div className="mt-1 flex items-center">
                      <IndianRupee size={18} />
                      <span className="text-2xl font-black">
                        {item.price.toLocaleString("en-IN")}
                      </span>
                      <span className="ml-1 text-xs text-gray-400">
                        / quintal
                      </span>
                    </div>
                  </div>

                  <div className="rounded-xl bg-green-50 px-3 py-2 text-right">
                    <p className="text-[10px] font-semibold text-green-600">
                      DEMAND
                    </p>
                    <p className="text-xs font-black text-green-800">
                      {item.demand}
                    </p>
                  </div>
                </div>

                {/* Details */}
                <div className="grid grid-cols-2 gap-3">
                  <div className="rounded-xl bg-gray-50 p-3">
                    <div className="flex items-center gap-2 text-gray-400">
                      <Package size={14} />
                      <span className="text-[11px]">Quantity</span>
                    </div>

                    <p className="mt-1 text-sm font-black">
                      {item.quantity.toLocaleString()} kg
                    </p>
                  </div>

                  <div className="rounded-xl bg-gray-50 p-3">
                    <div className="flex items-center gap-2 text-gray-400">
                      <IndianRupee size={14} />
                      <span className="text-[11px]">Est. Value</span>
                    </div>

                    <p className="mt-1 text-sm font-black">
                      ₹
                      {Math.round(
                        (item.quantity / 100) * item.price
                      ).toLocaleString("en-IN")}
                    </p>
                  </div>

                  <div className="rounded-xl bg-gray-50 p-3">
                    <div className="flex items-center gap-2 text-gray-400">
                      <CalendarDays size={14} />
                      <span className="text-[11px]">Selling Date</span>
                    </div>

                    <p className="mt-1 text-sm font-black">{item.date}</p>
                  </div>

                  <div className="rounded-xl bg-gray-50 p-3">
                    <div className="flex items-center gap-2 text-gray-400">
                      <Users size={14} />
                      <span className="text-[11px]">Demand</span>
                    </div>

                    <p className="mt-1 text-sm font-black">{item.demand}</p>
                  </div>
                </div>

                {/* Actions */}
                <div className="mt-5 flex gap-2">
                  <Link
                    to="/analysis"
                    state={{
                      crop: item.crop,
                      quantity: item.quantity,
                      location: item.location,
                    }}
                    className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-green-600 py-3 text-sm font-bold text-white transition hover:bg-green-700"
                  >
                    <BarChart3 size={16} />
                    Analysis
                  </Link>

                  <button className="flex h-11 w-11 items-center justify-center rounded-xl border border-gray-200 text-gray-500 transition hover:bg-gray-50 hover:text-gray-900">
                    <Pencil size={17} />
                  </button>

                  <button className="flex h-11 w-11 items-center justify-center rounded-xl border border-red-100 text-red-500 transition hover:bg-red-50">
                    <Trash2 size={17} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="mt-8 flex flex-col items-center justify-between gap-4 rounded-2xl border border-dashed border-gray-200 bg-white p-6 sm:flex-row">
          <div>
            <h3 className="font-black">Have more crops to sell?</h3>
            <p className="mt-1 text-sm text-gray-500">
              Add another produce listing and let FarmLink AI analyze the best
              market for you.
            </p>
          </div>

          <Link
            to="/add-produce"
            className="flex shrink-0 items-center gap-2 rounded-xl bg-gray-900 px-5 py-3 text-sm font-bold text-white transition hover:bg-gray-800"
          >
            <Plus size={17} />
            Add Produce
          </Link>
        </div>
      </main>
    </div>
  );
}