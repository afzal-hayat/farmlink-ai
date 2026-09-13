import {
  ArrowLeft,
  ArrowRight,
  Brain,
  CheckCircle2,
  IndianRupee,
  MapPin,
  Navigation,
  Package,
  Sprout,
  TrendingUp,
  Truck,
} from "lucide-react";

import { Link, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";

function Analysis() {
  const { state } = useLocation();

  const crop = state?.crop || "Tomato";
  const quantity = Number(state?.quantity || 500);
  const location = state?.location || "Greater Noida";
  const expectedPrice = Number(state?.expectedPrice || 0);
  const sellingDate = state?.sellingDate || "";
  const selectedMarket = state?.selectedMarket || null;

  const [analysis, setAnalysis] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // ==========================================
  // GET AI ANALYSIS FROM BACKEND
  // ==========================================

  useEffect(() => {
    const fetchAnalysis = async () => {
      try {
        setLoading(true);
        setError("");

        const response = await fetch(
          "http://localhost:5000/api/analysis",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              crop,
              quantity,
              location,
              expectedPrice,
              sellingDate,
            }),
          }
        );

        const data = await response.json();

        if (!response.ok) {
          throw new Error(
            data.message || "Failed to generate AI analysis"
          );
        }

        setAnalysis(data.analysis);
      } catch (error) {
        console.error("❌ Analysis error:", error);
        setError(
          "Unable to generate AI analysis. Please make sure the backend is running."
        );
      } finally {
        setLoading(false);
      }
    };

    fetchAnalysis();
  }, [crop, quantity, location, expectedPrice, sellingDate]);

  // ==========================================
  // LOADING
  // ==========================================

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#f6f8f6]">
        <div className="text-center">

          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-green-100 text-green-600">
            <Brain size={30} className="animate-pulse" />
          </div>

          <h2 className="mt-5 text-xl font-black text-slate-900">
            FarmLink AI is analyzing...
          </h2>

          <p className="mt-2 text-sm text-slate-500">
            Studying price trends and market opportunities for your{" "}
            {crop.toLowerCase()}.
          </p>

          <div className="mx-auto mt-6 h-2 w-56 overflow-hidden rounded-full bg-green-100">
            <div className="h-full w-1/2 animate-pulse rounded-full bg-green-600" />
          </div>

        </div>
      </div>
    );
  }

  // ==========================================
  // ERROR
  // ==========================================

  if (error || !analysis) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#f6f8f6] px-6">
        <div className="max-w-md rounded-2xl border border-red-100 bg-white p-8 text-center shadow-sm">

          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-xl bg-red-50 text-red-500">
            <Brain size={25} />
          </div>

          <h2 className="mt-4 text-xl font-black text-slate-900">
            Analysis unavailable
          </h2>

          <p className="mt-2 text-sm leading-6 text-slate-500">
            {error || "Something went wrong while generating the analysis."}
          </p>

          <Link
            to="/dashboard"
            className="mt-6 inline-flex items-center gap-2 rounded-xl bg-green-600 px-5 py-3 text-sm font-bold text-white"
          >
            Back to Dashboard
            <ArrowRight size={16} />
          </Link>

        </div>
      </div>
    );
  }

  // ==========================================
  // CALCULATIONS
  // ==========================================

 const quantityQuintal = quantity / 100;

// Use the market selected by the farmer.
// If no market was selected, use AI's top recommendation.
const recommendedMarket =
  selectedMarket || analysis.markets?.[0];

const marketPrice =
  Number(recommendedMarket?.price) ||
  analysis.predictedPrice;

const grossRevenue =
  marketPrice * quantityQuintal;

const transportTotal =
  analysis.transportCost * quantityQuintal;

const estimatedReturn =
  selectedMarket
    ? grossRevenue - transportTotal
    : recommendedMarket?.returnValue ||
      (grossRevenue - transportTotal);
  // ==========================================
  // UI
  // ==========================================

  return (
    <div className="min-h-screen bg-[#f6f8f6] text-slate-900">

      {/* ==========================================
          NAVBAR
      ========================================== */}

      <header className="border-b border-slate-200 bg-white">
        <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-5 sm:px-8">

          <Link
            to="/dashboard"
            className="flex items-center gap-3"
          >
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-green-600 text-white">
              <Sprout size={21} />
            </div>

            <div>
              <h1 className="font-extrabold tracking-tight">
                FarmLink{" "}
                <span className="text-green-600">
                  AI
                </span>
              </h1>

              <p className="text-[9px] font-medium uppercase tracking-[2px] text-slate-400">
                Market Intelligence
              </p>
            </div>
          </Link>

          <Link
            to="/produce"
            className="flex items-center gap-2 text-sm font-semibold text-slate-500 hover:text-green-600"
          >
            <ArrowLeft size={17} />
            My Produce
          </Link>

        </div>
      </header>

      <main className="mx-auto max-w-7xl px-5 py-10 sm:px-8">

        {/* ==========================================
            HEADER
        ========================================== */}

        <div>

          <div className="inline-flex items-center gap-2 rounded-full border border-green-200 bg-green-50 px-4 py-2 text-sm font-semibold text-green-700">
            <Brain size={16} />
            AI Market Analysis
          </div>

          <h1 className="mt-5 text-4xl font-black tracking-tight sm:text-5xl">
            Your selling opportunity
          </h1>

          <p className="mt-3 text-lg text-slate-500">
            Here's what FarmLink AI found for your{" "}
            {crop.toLowerCase()}.
          </p>

        </div>

        {/* ==========================================
            CROP SUMMARY
        ========================================== */}

        <div className="mt-8 flex flex-wrap items-center gap-4 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">

          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-green-50 text-2xl">
            {getCropEmoji(crop)}
          </div>

          <div>
            <p className="text-xs uppercase tracking-wider text-slate-400">
              Your produce
            </p>

            <p className="font-bold">
              {crop} · {quantity.toLocaleString()} kg
            </p>
          </div>

          <div className="hidden h-10 w-px bg-slate-200 sm:block" />

          <div>
            <p className="text-xs uppercase tracking-wider text-slate-400">
              Location
            </p>

            <div className="mt-1 flex items-center gap-1 text-sm font-semibold">
              <MapPin
                size={15}
                className="text-green-600"
              />
              {location}
            </div>
          </div>

          <div className="hidden h-10 w-px bg-slate-200 sm:block" />

          <div>
            <p className="text-xs uppercase tracking-wider text-slate-400">
              Selling date
            </p>

            <p className="mt-1 text-sm font-semibold">
              {formatDate(sellingDate)}
            </p>
          </div>

        </div>

{selectedMarket && (
  <div className="mt-4 flex items-center gap-4 rounded-2xl border border-green-200 bg-green-50 p-5">

    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-green-600 text-white">
      <MapPin size={20} />
    </div>

    <div className="flex-1">
      <p className="text-xs font-bold uppercase tracking-wider text-green-600">
        Farmer Selected Market
      </p>

      <p className="mt-1 font-black text-slate-900">
        {selectedMarket.name}
      </p>

      <p className="text-sm text-slate-500">
        {selectedMarket.city} · ₹
        {Number(selectedMarket.price).toLocaleString("en-IN")} / quintal
      </p>
    </div>

    <div className="hidden text-right sm:block">
      <p className="text-xs text-slate-400">
        Estimated return
      </p>

      <p className="mt-1 text-lg font-black text-green-600">
        ₹{Math.round(estimatedReturn).toLocaleString("en-IN")}
      </p>
    </div>

  </div>
)}


        

        {/* ==========================================
            AI RECOMMENDATION
        ========================================== */}

        <div className="relative mt-6 overflow-hidden rounded-3xl bg-slate-900 p-7 text-white shadow-xl sm:p-9">

          <div className="absolute -right-24 -top-24 h-72 w-72 rounded-full bg-green-500/20 blur-3xl" />

          <div className="relative grid gap-8 lg:grid-cols-2 lg:items-center">

            <div>

              <div className="flex items-center gap-3">

                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-green-500">
                  <Brain size={23} />
                </div>

                <div>
                  <p className="text-xs font-bold uppercase tracking-[2px] text-green-400">
                    AI Recommendation
                  </p>

                  <p className="text-sm text-slate-400">
                    Based on market signals
                  </p>
                </div>

              </div>

              <div className="mt-7 flex items-center gap-3">

                <span className="h-4 w-4 rounded-full bg-green-400 shadow-lg shadow-green-400/40" />

                <h2 className="text-3xl font-black sm:text-4xl">
                  {analysis.recommendation}
                </h2>

              </div>

              <p className="mt-4 max-w-xl leading-7 text-slate-400">
                {analysis.explanation}
              </p>

              <div className="mt-6 inline-flex rounded-full bg-green-500/10 px-4 py-2 text-sm font-bold text-green-400">
                {analysis.confidence}% prediction confidence
              </div>

            </div>

            {/* EXPECTED PRICE */}

            <div className="rounded-2xl border border-slate-700 bg-white/5 p-6">

              <p className="text-sm text-slate-400">
                Expected market price
              </p>

              <div className="mt-2 flex items-baseline gap-2">

                <IndianRupee size={26} />

                <span className="text-5xl font-black">
                  {analysis.predictedPrice.toLocaleString(
                    "en-IN"
                  )}
                </span>

                <span className="text-sm text-slate-400">
                  / quintal
                </span>

              </div>

              <div className="mt-4 flex items-center gap-2 text-sm font-bold text-green-400">
                <TrendingUp size={17} />
                {analysis.growth >= 0 ? "+" : ""}
                {analysis.growth}% expected growth
              </div>

              <div className="mt-4 text-xs text-slate-500">
                Expected range: ₹
                {analysis.priceRange.min.toLocaleString(
                  "en-IN"
                )}{" "}
                – ₹
                {analysis.priceRange.max.toLocaleString(
                  "en-IN"
                )}
              </div>

            </div>

          </div>
        </div>

        {/* ==========================================
            KEY METRICS
        ========================================== */}

        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">

          <Metric
            icon={<IndianRupee size={20} />}
            label="Current Price"
            value={`₹${analysis.currentPrice.toLocaleString(
              "en-IN"
            )}`}
            detail="/ quintal"
          />

          <Metric
            icon={<TrendingUp size={20} />}
            label="Predicted Price"
            value={`₹${analysis.predictedPrice.toLocaleString(
              "en-IN"
            )}`}
            detail="/ quintal"
            green
          />

          <Metric
            icon={<Truck size={20} />}
            label="Estimated Transport"
            value={`₹${analysis.transportCost.toLocaleString(
              "en-IN"
            )}`}
            detail="/ quintal"
          />

          <Metric
            icon={<Package size={20} />}
            label="Expected Return"
            value={`₹${Math.round(
              estimatedReturn
            ).toLocaleString("en-IN")}`}
            detail="estimated"
            green
          />

        </div>

        {/* ==========================================
            MARKETS + BREAKDOWN
        ========================================== */}

        <div className="mt-6 grid gap-6 lg:grid-cols-5">

          {/* MARKETS */}

          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm lg:col-span-3">

            <div className="flex items-center justify-between">

              <div>
                <h2 className="text-xl font-bold">
                  Best nearby markets
                </h2>

                <div className="mt-1 flex flex-wrap items-center gap-2">
  <p className="text-sm text-slate-400">
    Ranked by expected net return
  </p>

  {analysis.liveMandiData && (
    <span className="rounded-full bg-green-100 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wide text-green-700">
      ✓ Daily government mandi data
    </span>
  )}
</div>
              </div>

              <Navigation
                size={21}
                className="text-green-600"
              />

            </div>

            <div className="mt-6 space-y-3">

              {analysis.markets.map((market, index) => (
                <Market
                  key={market.name}
                  rank={`0${index + 1}`}
                  name={market.name}
                  location={market.location}
                  price={`₹${market.price.toLocaleString(
                    "en-IN"
                  )}`}
                  distance={`${market.distance} km`}
                  returnValue={`₹${Math.round(
                    market.returnValue
                  ).toLocaleString("en-IN")}`}
                  best={index === 0}
                />
              ))}

            </div>

          </div>

          {/* CALCULATION */}

          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm lg:col-span-2">

            <h2 className="text-xl font-bold">
              Expected earnings
            </h2>

            <p className="mt-1 text-sm text-slate-400">
              Based on {quantity.toLocaleString()} kg of{" "}
              {crop.toLowerCase()}
            </p>

            <div className="mt-6 space-y-4">

              <Calculation
                label="Expected gross revenue"
                value={`₹${Math.round(
                  grossRevenue
                ).toLocaleString("en-IN")}`}
              />

              <Calculation
                label="Estimated transport"
                value={`− ₹${Math.round(
                  transportTotal
                ).toLocaleString("en-IN")}`}
                negative
              />

              <div className="border-t border-slate-100 pt-4">

                <Calculation
                  label="Estimated net return"
                  value={`₹${Math.round(
                    estimatedReturn
                  ).toLocaleString("en-IN")}`}
                  strong
                />

              </div>

            </div>

            <div className="mt-6 rounded-xl bg-green-50 p-4">

              <div className="flex items-start gap-3">

                <CheckCircle2
                  size={19}
                  className="mt-0.5 shrink-0 text-green-600"
                />

                <div>

                  <p className="font-bold text-green-900">
  {selectedMarket
    ? `You selected ${selectedMarket.name}`
    : `AI suggests ${analysis.markets[0]?.name}`}
</p>
                 <p className="mt-1 text-xs leading-5 text-green-800/70">
  {selectedMarket
    ? "Your expected earnings are calculated using this selected mandi price."
    : "This market currently provides the strongest combination of expected price and estimated return."}
</p>

                </div>

              </div>

            </div>

          </div>

        </div>

        {/* ==========================================
            FINAL CTA
        ========================================== */}

        <div className="mt-6 flex flex-col gap-5 rounded-2xl border border-green-100 bg-green-50 p-6 sm:flex-row sm:items-center sm:justify-between">

          <div>

            <p className="font-bold text-green-900">
              Ready to make your move?
            </p>

            <p className="mt-1 text-sm text-green-800/70">
              Continue to the marketplace and connect with buyers.
            </p>

          </div>

          <Link
            to="/markets"
            className="flex shrink-0 items-center justify-center gap-2 rounded-xl bg-green-600 px-6 py-3 text-sm font-bold text-white shadow-lg shadow-green-600/20 transition hover:bg-green-700"
          >
            Go to Marketplace
            <ArrowRight size={17} />
          </Link>

        </div>

      </main>
    </div>
  );
}

// ==========================================
// HELPERS
// ==========================================

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

function formatDate(date) {
  if (!date) return "Not specified";

  return new Date(date).toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
}

// ==========================================
// COMPONENTS
// ==========================================

function Metric({
  icon,
  label,
  value,
  detail,
  green,
}) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">

      <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-green-50 text-green-600">
        {icon}
      </div>

      <p className="mt-4 text-sm text-slate-400">
        {label}
      </p>

      <div className="mt-1 flex items-baseline gap-1">

        <span
          className={`text-2xl font-black ${
            green ? "text-green-600" : ""
          }`}
        >
          {value}
        </span>

        <span className="text-xs text-slate-400">
          {detail}
        </span>

      </div>

    </div>
  );
}

function Market({
  rank,
  name,
  location,
  price,
  distance,
  returnValue,
  best,
}) {
  return (
    <div
      className={`rounded-xl border p-4 ${
        best
          ? "border-green-200 bg-green-50/60"
          : "border-slate-100 bg-slate-50"
      }`}
    >

      <div className="flex items-center gap-4">

        <div className="text-sm font-black text-slate-300">
          {rank}
        </div>

        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white text-green-600 shadow-sm">
          <MapPin size={18} />
        </div>

        <div className="min-w-0 flex-1">

          <div className="flex flex-wrap items-center gap-2">

            <p className="text-sm font-bold">
              {name}
            </p>

            {best && (
              <span className="rounded-full bg-green-100 px-2 py-0.5 text-[9px] font-bold uppercase text-green-700">
                Recommended
              </span>
            )}

          </div>

          <p className="mt-1 text-xs text-slate-400">
            {location} · {distance}
          </p>

        </div>

        <div className="text-right">

          <p className="font-black">
            {price}
          </p>

          <p className="mt-1 text-xs font-bold text-green-600">
            {returnValue} return
          </p>

        </div>

      </div>

    </div>
  );
}

function Calculation({
  label,
  value,
  negative,
  strong,
}) {
  return (
    <div className="flex items-center justify-between gap-4">

      <span
        className={`${
          strong
            ? "font-bold text-slate-900"
            : "text-sm text-slate-500"
        }`}
      >
        {label}
      </span>

      <span
        className={`${
          strong
            ? "text-xl font-black text-green-600"
            : negative
            ? "font-semibold text-red-500"
            : "font-bold text-slate-900"
        }`}
      >
        {value}
      </span>

    </div>
  );
}

export default Analysis;