import React, { useEffect, useState } from "react";
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

function statusStyle(status) {
  if (status === "Available") {
    return "bg-green-50 text-green-700 border-green-100";
  }

  if (status === "Pending") {
    return "bg-blue-50 text-blue-700 border-blue-100";
  }

  return "bg-gray-50 text-gray-700 border-gray-100";
}

function getCropEmoji(crop) {
  const emojis = {
    Tomato: "🍅",
    Potato: "🥔",
    Onion: "🧅",
    Wheat: "🌾",
    Rice: "🍚",
    Maize: "🌽",
    Carrot: "🥕",
    Cauliflower: "🥦",
  };

  return emojis[crop] || "🌱";
}

function getDemand(crop) {
  const highDemand = ["Tomato", "Onion", "Potato"];

  if (highDemand.includes(crop)) {
    return "High Demand";
  }

  return "Good Demand";
}

function formatDate(date) {
  if (!date) return "Not specified";

  return new Date(date).toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
}

export default function MyProduce() {
  const navigate = useNavigate();

  const [produce, setProduce] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // ==========================================
  // GET PRODUCE FROM BACKEND
  // ==========================================

  useEffect(() => {
    fetch("http://localhost:5000/api/produce")
      .then(async (response) => {
        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.message || "Failed to fetch produce");
        }

        return data;
      })
      .then((data) => {
        console.log("✅ Produce loaded:", data);
        setProduce(data.produce || []);
      })
      .catch((error) => {
        console.error("❌ Error loading produce:", error);
        setError("Unable to load your produce. Please try again.");
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  // ==========================================
  // DELETE PRODUCE
  // ==========================================

  const handleDelete = async (id) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this produce listing?"
    );

    if (!confirmed) return;

    try {
      const response = await fetch(
        `http://localhost:5000/api/produce/${id}`,
        {
          method: "DELETE",
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to delete produce");
      }

      // Remove deleted produce from screen
      setProduce((prev) =>
        prev.filter((item) => item._id !== id)
      );

      alert("Produce deleted successfully.");
    } catch (error) {
      console.error("❌ Delete error:", error);
      alert("Failed to delete produce. Please try again.");
    }
  };

  // ==========================================
  // EDIT PRODUCE
  // ==========================================

  const handleEdit = async (item) => {
    const newPrice = window.prompt(
      `Enter new expected price for ${item.crop}:`,
      item.expectedPrice
    );

    // User clicked Cancel
    if (newPrice === null) return;

    const price = Number(newPrice);

    // Validate price
    if (!price || price < 0) {
      alert("Please enter a valid price.");
      return;
    }

    try {
      const response = await fetch(
        `http://localhost:5000/api/produce/${item._id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            expectedPrice: price,
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to update produce");
      }

      // Update the produce on screen
      setProduce((prev) =>
        prev.map((produceItem) =>
          produceItem._id === item._id
            ? data.produce
            : produceItem
        )
      );

      alert("Produce updated successfully.");
    } catch (error) {
      console.error("❌ Edit error:", error);
      alert("Failed to update produce. Please try again.");
    }
  };

  // ==========================================
  // CALCULATIONS
  // ==========================================

  const totalQuantity = produce.reduce(
    (sum, item) => sum + Number(item.quantity || 0),
    0
  );

  const estimatedValue = produce.reduce(
    (sum, item) =>
      sum +
      (Number(item.quantity || 0) / 100) *
        Number(item.expectedPrice || 0),
    0
  );

  // ==========================================
  // UI
  // ==========================================

  return (
    <div className="min-h-screen bg-[#f7faf8] text-gray-900">

      {/* ==========================================
          TOP NAVIGATION
      ========================================== */}

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
              <h1 className="text-lg font-black">
                My Produce
              </h1>

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

        {/* ==========================================
            HERO
        ========================================== */}

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
                Keep track of your crops, market prices and estimated
                earnings from one place.
              </p>

            </div>

            <div className="hidden rounded-2xl bg-white/10 p-5 backdrop-blur md:block">
              <Wheat size={52} strokeWidth={1.5} />
            </div>

          </div>
        </div>

        {/* ==========================================
            STATS
        ========================================== */}

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
            subtitle="Based on listed prices"
          />

          <StatCard
            icon={<TrendingUp size={21} />}
            title="Market Trend"
            value="+8.7%"
            subtitle="Average price movement"
          />

        </div>

        {/* ==========================================
            AI INSIGHT
        ========================================== */}

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
                FarmLink AI is analyzing your produce listings and
                market conditions to identify better selling
                opportunities.
              </p>

            </div>

          </div>
        </div>

        {/* ==========================================
            SECTION HEADER
        ========================================== */}

        <div className="mb-5 flex items-center justify-between">

          <div>

            <h2 className="text-xl font-black">
              Active Produce
            </h2>

            <p className="mt-1 text-sm text-gray-500">
              Your currently listed crops
            </p>

          </div>

          <span className="rounded-full bg-green-100 px-3 py-1 text-xs font-bold text-green-700">
            {produce.length} Listings
          </span>

        </div>

        {/* ==========================================
            LOADING
        ========================================== */}

        {loading && (
          <div className="rounded-2xl border border-gray-100 bg-white p-12 text-center shadow-sm">

            <div className="mx-auto h-10 w-10 animate-spin rounded-full border-4 border-green-100 border-t-green-600" />

            <p className="mt-4 text-sm font-semibold text-gray-500">
              Loading your produce...
            </p>

          </div>
        )}

        {/* ==========================================
            ERROR
        ========================================== */}

        {!loading && error && (
          <div className="rounded-2xl border border-red-100 bg-red-50 p-6 text-center">

            <p className="font-bold text-red-700">
              {error}
            </p>

            <button
              onClick={() => window.location.reload()}
              className="mt-4 rounded-xl bg-red-600 px-5 py-2.5 text-sm font-bold text-white"
            >
              Try Again
            </button>

          </div>
        )}

        {/* ==========================================
            EMPTY STATE
        ========================================== */}

        {!loading && !error && produce.length === 0 && (
          <div className="rounded-2xl border border-dashed border-gray-200 bg-white p-12 text-center">

            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-green-50 text-green-600">
              <Sprout size={30} />
            </div>

            <h3 className="mt-5 text-xl font-black">
              No produce listed yet
            </h3>

            <p className="mx-auto mt-2 max-w-md text-sm text-gray-500">
              Add your first crop and let FarmLink AI analyze
              the best market opportunities.
            </p>

            <Link
              to="/add-produce"
              className="mt-6 inline-flex items-center gap-2 rounded-xl bg-green-600 px-5 py-3 text-sm font-bold text-white"
            >
              <Plus size={17} />
              Add Produce
            </Link>

          </div>
        )}

        {/* ==========================================
            PRODUCE CARDS
        ========================================== */}

        {!loading && !error && produce.length > 0 && (
          <div className="grid gap-5 lg:grid-cols-3">

            {produce.map((item) => {

              const cropEmoji = getCropEmoji(item.crop);
              const demand = getDemand(item.crop);

              return (
                <div
                  key={item._id}
                  className="group overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-xl"
                >

                  {/* CARD TOP */}

                  <div className="flex items-start justify-between border-b border-gray-100 p-5">

                    <div className="flex items-center gap-3">

                      <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-green-50 text-3xl">
                        {cropEmoji}
                      </div>

                      <div>

                        <h3 className="text-lg font-black">
                          {item.crop}
                        </h3>

                        <div className="mt-1 flex items-center gap-1 text-xs text-gray-500">
                          <MapPin size={13} />
                          {item.location}
                        </div>

                      </div>

                    </div>

                    <span
                      className={`rounded-full border px-2.5 py-1 text-[11px] font-bold ${statusStyle(
                        item.status
                      )}`}
                    >
                      {item.status}
                    </span>

                  </div>

                  {/* CARD CONTENT */}

                  <div className="p-5">

                    {/* PRICE */}

                    <div className="mb-5 flex items-end justify-between">

                      <div>

                        <p className="text-xs font-medium text-gray-400">
                          Listed Market Price
                        </p>

                        <div className="mt-1 flex items-center">

                          <IndianRupee size={18} />

                          <span className="text-2xl font-black">
                            {Number(
                              item.expectedPrice || 0
                            ).toLocaleString("en-IN")}
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
                          {demand}
                        </p>

                      </div>

                    </div>

                    {/* DETAILS */}

                    <div className="grid grid-cols-2 gap-3">

                      <div className="rounded-xl bg-gray-50 p-3">

                        <div className="flex items-center gap-2 text-gray-400">
                          <Package size={14} />

                          <span className="text-[11px]">
                            Quantity
                          </span>
                        </div>

                        <p className="mt-1 text-sm font-black">
                          {Number(
                            item.quantity || 0
                          ).toLocaleString()}{" "}
                          kg
                        </p>

                      </div>

                      <div className="rounded-xl bg-gray-50 p-3">

                        <div className="flex items-center gap-2 text-gray-400">
                          <IndianRupee size={14} />

                          <span className="text-[11px]">
                            Est. Value
                          </span>
                        </div>

                        <p className="mt-1 text-sm font-black">
                          ₹
                          {Math.round(
                            (Number(item.quantity || 0) / 100) *
                              Number(item.expectedPrice || 0)
                          ).toLocaleString("en-IN")}
                        </p>

                      </div>

                      <div className="rounded-xl bg-gray-50 p-3">

                        <div className="flex items-center gap-2 text-gray-400">
                          <CalendarDays size={14} />

                          <span className="text-[11px]">
                            Selling Date
                          </span>
                        </div>

                        <p className="mt-1 text-sm font-black">
                          {formatDate(item.sellingDate)}
                        </p>

                      </div>

                      <div className="rounded-xl bg-gray-50 p-3">

                        <div className="flex items-center gap-2 text-gray-400">
                          <Users size={14} />

                          <span className="text-[11px]">
                            Demand
                          </span>
                        </div>

                        <p className="mt-1 text-sm font-black">
                          {demand}
                        </p>

                      </div>

                    </div>

                    {/* ACTIONS */}

                    <div className="mt-5 flex gap-2">

                      {/* ANALYSIS */}

                      <Link
                        to="/analysis"
                        state={{
                          crop: item.crop,
                          quantity: item.quantity,
                          location: item.location,
                          expectedPrice: item.expectedPrice,
                          sellingDate: item.sellingDate,
                          produceId: item._id,
                        }}
                        className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-green-600 py-3 text-sm font-bold text-white transition hover:bg-green-700"
                      >
                        <BarChart3 size={16} />
                        Analysis
                      </Link>

                      {/* EDIT */}

                      <button
                        onClick={() => handleEdit(item)}
                        className="flex h-11 w-11 items-center justify-center rounded-xl border border-gray-200 text-gray-500 transition hover:bg-gray-50 hover:text-gray-900"
                        title="Edit produce"
                      >
                        <Pencil size={17} />
                      </button>

                      {/* DELETE */}

                      <button
                        onClick={() => handleDelete(item._id)}
                        className="flex h-11 w-11 items-center justify-center rounded-xl border border-red-100 text-red-500 transition hover:bg-red-50"
                        title="Delete produce"
                      >
                        <Trash2 size={17} />
                      </button>

                    </div>

                  </div>
                </div>
              );
            })}

          </div>
        )}

        {/* ==========================================
            BOTTOM CTA
        ========================================== */}

        <div className="mt-8 flex flex-col items-center justify-between gap-4 rounded-2xl border border-dashed border-gray-200 bg-white p-6 sm:flex-row">

          <div>

            <h3 className="font-black">
              Have more crops to sell?
            </h3>

            <p className="mt-1 text-sm text-gray-500">
              Add another produce listing and let FarmLink AI
              analyze the best market for you.
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