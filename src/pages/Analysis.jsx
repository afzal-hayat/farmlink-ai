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

function Analysis() {
  const { state } = useLocation();

  const crop = state?.crop || "Tomato";
  const quantity = state?.quantity || "500";
  const location = state?.location || "Greater Noida";

  const currentPrice = 2850;
  const predictedPrice = 3150;
  const transportCost = 180;
  const quantityQuintal = Number(quantity) / 100;

  const grossRevenue = predictedPrice * quantityQuintal;
  const transportTotal = transportCost * quantityQuintal;
  const estimatedReturn = grossRevenue - transportTotal;

  return (
    <div className="min-h-screen bg-[#f6f8f6] text-slate-900">

      {/* NAVBAR */}
      <header className="border-b border-slate-200 bg-white">
        <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-5 sm:px-8">

          <Link to="/dashboard" className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-green-600 text-white">
              <Sprout size={21} />
            </div>

            <div>
              <h1 className="font-extrabold tracking-tight">
                FarmLink <span className="text-green-600">AI</span>
              </h1>

              <p className="text-[9px] font-medium uppercase tracking-[2px] text-slate-400">
                Market Intelligence
              </p>
            </div>
          </Link>

          <Link
            to="/add-produce"
            className="flex items-center gap-2 text-sm font-semibold text-slate-500 hover:text-green-600"
          >
            <ArrowLeft size={17} />
            Edit Produce
          </Link>

        </div>
      </header>

      <main className="mx-auto max-w-7xl px-5 py-10 sm:px-8">

        {/* HEADER */}
        <div>
          <div className="inline-flex items-center gap-2 rounded-full border border-green-200 bg-green-50 px-4 py-2 text-sm font-semibold text-green-700">
            <Brain size={16} />
            AI Market Analysis
          </div>

          <h1 className="mt-5 text-4xl font-black tracking-tight sm:text-5xl">
            Your selling opportunity
          </h1>

          <p className="mt-3 text-lg text-slate-500">
            Here's what FarmLink AI found for your {crop.toLowerCase()}.
          </p>
        </div>

        {/* CROP SUMMARY */}
        <div className="mt-8 flex flex-wrap items-center gap-4 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">

          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-green-50 text-2xl">
            🍅
          </div>

          <div>
            <p className="text-xs uppercase tracking-wider text-slate-400">
              Your produce
            </p>

            <p className="font-bold">
              {crop} · {quantity} kg
            </p>
          </div>

          <div className="hidden h-10 w-px bg-slate-200 sm:block" />

          <div>
            <p className="text-xs uppercase tracking-wider text-slate-400">
              Location
            </p>

            <div className="mt-1 flex items-center gap-1 text-sm font-semibold">
              <MapPin size={15} className="text-green-600" />
              {location}
            </div>
          </div>

        </div>

        {/* RECOMMENDATION */}
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
                    Based on current market signals
                  </p>
                </div>
              </div>

              <div className="mt-7 flex items-center gap-3">
                <span className="h-4 w-4 rounded-full bg-green-400 shadow-lg shadow-green-400/40" />

                <h2 className="text-3xl font-black sm:text-4xl">
                  Good time to sell
                </h2>
              </div>

              <p className="mt-4 max-w-xl leading-7 text-slate-400">
                Market prices are trending upward. FarmLink AI recommends
                selling within the next 3–5 days to take advantage of the
                expected price movement.
              </p>

              <div className="mt-6 inline-flex rounded-full bg-green-500/10 px-4 py-2 text-sm font-bold text-green-400">
                87% prediction confidence
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
                  3,150
                </span>

                <span className="text-sm text-slate-400">
                  / quintal
                </span>
              </div>

              <div className="mt-4 flex items-center gap-2 text-sm font-bold text-green-400">
                <TrendingUp size={17} />
                +10.5% expected growth
              </div>

            </div>

          </div>
        </div>

        {/* KEY METRICS */}
        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">

          <Metric
            icon={<IndianRupee size={20} />}
            label="Current Price"
            value="₹2,850"
            detail="/ quintal"
          />

          <Metric
            icon={<TrendingUp size={20} />}
            label="Predicted Price"
            value="₹3,150"
            detail="/ quintal"
            green
          />

          <Metric
            icon={<Truck size={20} />}
            label="Estimated Transport"
            value={`₹${transportCost}`}
            detail="/ quintal"
          />

          <Metric
            icon={<Package size={20} />}
            label="Expected Return"
            value={`₹${estimatedReturn.toLocaleString("en-IN")}`}
            detail="estimated"
            green
          />

        </div>

        {/* MARKETS + BREAKDOWN */}
        <div className="mt-6 grid gap-6 lg:grid-cols-5">

          {/* MARKETS */}
          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm lg:col-span-3">

            <div className="flex items-center justify-between">

              <div>
                <h2 className="text-xl font-bold">
                  Best nearby markets
                </h2>

                <p className="mt-1 text-sm text-slate-400">
                  Ranked by expected net return
                </p>
              </div>

              <Navigation size={21} className="text-green-600" />

            </div>

            <div className="mt-6 space-y-3">

              <Market
                rank="01"
                name="Azadpur Mandi"
                location="Delhi"
                price="₹3,120"
                distance="48 km"
                returnValue="₹15,570"
                best
              />

              <Market
                rank="02"
                name="Okhla Mandi"
                location="Delhi"
                price="₹2,940"
                distance="42 km"
                returnValue="₹14,700"
              />

              <Market
                rank="03"
                name="Ghazipur Mandi"
                location="Uttar Pradesh"
                price="₹2,850"
                distance="31 km"
                returnValue="₹13,350"
              />

            </div>

          </div>

          {/* CALCULATION */}
          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm lg:col-span-2">

            <h2 className="text-xl font-bold">
              Expected earnings
            </h2>

            <p className="mt-1 text-sm text-slate-400">
              Based on {quantity} kg of {crop.toLowerCase()}
            </p>

            <div className="mt-6 space-y-4">

              <Calculation
                label="Expected gross revenue"
                value={`₹${grossRevenue.toLocaleString("en-IN")}`}
              />

              <Calculation
                label="Estimated transport"
                value={`− ₹${transportTotal.toLocaleString("en-IN")}`}
                negative
              />

              <div className="border-t border-slate-100 pt-4">
                <Calculation
                  label="Estimated net return"
                  value={`₹${estimatedReturn.toLocaleString("en-IN")}`}
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
                    AI suggests Azadpur Mandi
                  </p>

                  <p className="mt-1 text-xs leading-5 text-green-800/70">
                    It currently offers the strongest combination of
                    price and expected return.
                  </p>
                </div>
              </div>

            </div>

          </div>

        </div>

        {/* FINAL CTA */}
        <div className="mt-6 flex flex-col gap-5 rounded-2xl border border-green-100 bg-green-50 p-6 sm:flex-row sm:items-center sm:justify-between">

          <div>
            <p className="font-bold text-green-900">
              Ready to make your move?
            </p>

            <p className="mt-1 text-sm text-green-800/70">
              Save this analysis and continue to the marketplace.
            </p>
          </div>

          <Link
            to="/dashboard"
            className="flex shrink-0 items-center justify-center gap-2 rounded-xl bg-green-600 px-6 py-3 text-sm font-bold text-white shadow-lg shadow-green-600/20 transition hover:bg-green-700"
          >
            Back to Dashboard
            <ArrowRight size={17} />
          </Link>

        </div>

      </main>
    </div>
  );
}

/* ================= COMPONENTS ================= */

function Metric({ icon, label, value, detail, green }) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">

      <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-green-50 text-green-600">
        {icon}
      </div>

      <p className="mt-4 text-sm text-slate-400">
        {label}
      </p>

      <div className="mt-1 flex items-baseline gap-1">
        <span className={`text-2xl font-black ${green ? "text-green-600" : ""}`}>
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

function Calculation({ label, value, negative, strong }) {
  return (
    <div className="flex items-center justify-between gap-4">

      <span className={`${strong ? "font-bold text-slate-900" : "text-sm text-slate-500"}`}>
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