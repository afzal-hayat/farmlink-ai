import {
  ArrowLeft,
  ArrowRight,
  CalendarDays,
  CheckCircle2,
  IndianRupee,
  MapPin,
  Package,
  Sprout,
} from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";

function AddProduce() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    crop: "Tomato",
    quantity: "",
    location: "Greater Noida",
    expectedPrice: "",
    harvestDate: "",
  });

  const [analyzing, setAnalyzing] = useState(false);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleAnalyze = (e) => {
    e.preventDefault();

    setAnalyzing(true);

    setTimeout(() => {
      navigate("/analysis", {
        state: form,
      });
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-[#f6f8f6]">

      {/* NAVBAR */}
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
                FarmLink <span className="text-green-600">AI</span>
              </h1>

              <p className="text-[9px] font-medium uppercase tracking-[2px] text-slate-400">
                Farmer Portal
              </p>
            </div>
          </Link>

          <Link
            to="/dashboard"
            className="flex items-center gap-2 text-sm font-semibold text-slate-500 transition hover:text-green-600"
          >
            <ArrowLeft size={17} />
            Back to Dashboard
          </Link>

        </div>
      </header>

      {/* PAGE */}
      <main className="mx-auto max-w-6xl px-5 py-10 sm:px-8">

        {/* HEADER */}
        <div className="max-w-2xl">

          <div className="inline-flex items-center gap-2 rounded-full border border-green-200 bg-green-50 px-4 py-2 text-sm font-semibold text-green-700">
            <Sprout size={16} />
            Market Analysis
          </div>

          <h1 className="mt-5 text-4xl font-black tracking-tight sm:text-5xl">
            Tell us about your produce.
          </h1>

          <p className="mt-4 text-lg leading-7 text-slate-500">
            Enter your crop details and FarmLink AI will analyze
            nearby markets to help you find a better selling opportunity.
          </p>

        </div>

        {/* PROGRESS */}
        <div className="mt-10 flex items-center gap-3">

          <div className="flex items-center gap-2">
            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-green-600 text-sm font-bold text-white">
              1
            </div>

            <span className="text-sm font-bold text-slate-900">
              Produce details
            </span>
          </div>

          <div className="h-px w-12 bg-slate-200 sm:w-24" />

          <div className="flex items-center gap-2 text-slate-400">
            <div className="flex h-9 w-9 items-center justify-center rounded-full border border-slate-200 bg-white text-sm font-bold">
              2
            </div>

            <span className="hidden text-sm font-semibold sm:block">
              Market analysis
            </span>
          </div>

          <div className="h-px w-12 bg-slate-200 sm:w-24" />

          <div className="flex items-center gap-2 text-slate-400">
            <div className="flex h-9 w-9 items-center justify-center rounded-full border border-slate-200 bg-white text-sm font-bold">
              3
            </div>

            <span className="hidden text-sm font-semibold sm:block">
              Recommendation
            </span>
          </div>

        </div>

        {/* FORM GRID */}
        <div className="mt-10 grid gap-6 lg:grid-cols-3">

          {/* FORM */}
          <form
            onSubmit={handleAnalyze}
            className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm lg:col-span-2 sm:p-8"
          >

            <div className="flex items-center gap-3 border-b border-slate-100 pb-6">

              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-green-50 text-green-600">
                <Package size={21} />
              </div>

              <div>
                <h2 className="font-bold">
                  Produce Information
                </h2>

                <p className="text-sm text-slate-400">
                  Tell us what you want to sell.
                </p>
              </div>

            </div>

            <div className="mt-7 grid gap-6 sm:grid-cols-2">

              {/* CROP */}
              <div>
                <label className="text-sm font-bold text-slate-700">
                  Crop
                </label>

                <div className="relative mt-2">

                  <Sprout
                    size={18}
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-green-600"
                  />

                  <select
                    name="crop"
                    value={form.crop}
                    onChange={handleChange}
                    className="w-full appearance-none rounded-xl border border-slate-200 bg-white py-3.5 pl-10 pr-4 text-sm outline-none transition focus:border-green-500 focus:ring-4 focus:ring-green-500/10"
                  >
                    <option>Tomato</option>
                    <option>Potato</option>
                    <option>Onion</option>
                    <option>Wheat</option>
                    <option>Rice</option>
                    <option>Maize</option>
                    <option>Carrot</option>
                    <option>Cauliflower</option>
                  </select>

                </div>
              </div>

              {/* QUANTITY */}
              <div>
                <label className="text-sm font-bold text-slate-700">
                  Quantity
                </label>

                <div className="relative mt-2">

                  <Package
                    size={18}
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                  />

                  <input
                    required
                    type="number"
                    min="1"
                    name="quantity"
                    value={form.quantity}
                    onChange={handleChange}
                    placeholder="e.g. 500"
                    className="w-full rounded-xl border border-slate-200 py-3.5 pl-10 pr-16 text-sm outline-none transition focus:border-green-500 focus:ring-4 focus:ring-green-500/10"
                  />

                  <span className="absolute right-4 top-1/2 -translate-y-1/2 text-sm text-slate-400">
                    kg
                  </span>

                </div>
              </div>

              {/* LOCATION */}
              <div>
                <label className="text-sm font-bold text-slate-700">
                  Your Location
                </label>

                <div className="relative mt-2">

                  <MapPin
                    size={18}
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-green-600"
                  />

                  <input
                    required
                    name="location"
                    value={form.location}
                    onChange={handleChange}
                    placeholder="City / District"
                    className="w-full rounded-xl border border-slate-200 py-3.5 pl-10 pr-4 text-sm outline-none transition focus:border-green-500 focus:ring-4 focus:ring-green-500/10"
                  />

                </div>

                <p className="mt-2 text-xs text-slate-400">
                  Used to calculate nearby market opportunities.
                </p>
              </div>

              {/* EXPECTED PRICE */}
              <div>
                <label className="text-sm font-bold text-slate-700">
                  Expected Price
                  <span className="ml-1 font-normal text-slate-400">
                    (optional)
                  </span>
                </label>

                <div className="relative mt-2">

                  <IndianRupee
                    size={18}
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                  />

                  <input
                    type="number"
                    min="0"
                    name="expectedPrice"
                    value={form.expectedPrice}
                    onChange={handleChange}
                    placeholder="Your expected price"
                    className="w-full rounded-xl border border-slate-200 py-3.5 pl-10 pr-16 text-sm outline-none transition focus:border-green-500 focus:ring-4 focus:ring-green-500/10"
                  />

                  <span className="absolute right-4 top-1/2 -translate-y-1/2 text-sm text-slate-400">
                    / kg
                  </span>

                </div>
              </div>

              {/* HARVEST DATE */}
              <div className="sm:col-span-2">

                <label className="text-sm font-bold text-slate-700">
                  Expected Harvest / Selling Date
                </label>

                <div className="relative mt-2">

                  <CalendarDays
                    size={18}
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                  />

                  <input
                    type="date"
                    name="harvestDate"
                    value={form.harvestDate}
                    onChange={handleChange}
                    className="w-full rounded-xl border border-slate-200 py-3.5 pl-10 pr-4 text-sm outline-none transition focus:border-green-500 focus:ring-4 focus:ring-green-500/10"
                  />

                </div>

              </div>

            </div>

            {/* SUBMIT */}
            <button
              type="submit"
              disabled={analyzing}
              className="mt-8 flex w-full items-center justify-center gap-2 rounded-xl bg-green-600 py-4 font-bold text-white shadow-lg shadow-green-600/20 transition hover:bg-green-700 disabled:cursor-not-allowed disabled:opacity-70"
            >
              {analyzing ? (
                <>
                  <div className="h-5 w-5 animate-spin rounded-full border-2 border-white/30 border-t-white" />
                  Analyzing Markets...
                </>
              ) : (
                <>
                  Analyze Market
                  <ArrowRight size={18} />
                </>
              )}
            </button>

          </form>

          {/* SIDE INFORMATION */}
          <div className="space-y-6">

            {/* AI CARD */}
            <div className="overflow-hidden rounded-2xl bg-slate-900 p-6 text-white">

              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-green-600">
                <Sprout size={21} />
              </div>

              <h3 className="mt-5 text-xl font-bold">
                What FarmLink AI analyzes
              </h3>

              <div className="mt-5 space-y-4">

                <InfoItem text="Current market prices" />
                <InfoItem text="Historical price trends" />
                <InfoItem text="Nearby market prices" />
                <InfoItem text="Market demand signals" />
                <InfoItem text="Estimated selling opportunity" />

              </div>

            </div>

            {/* PRIVACY */}
            <div className="rounded-2xl border border-slate-200 bg-white p-6">

              <div className="flex items-start gap-3">

                <CheckCircle2
                  size={20}
                  className="mt-0.5 shrink-0 text-green-600"
                />

                <div>
                  <p className="font-bold">
                    Your information is safe
                  </p>

                  <p className="mt-2 text-sm leading-6 text-slate-400">
                    Your produce details are used only to generate
                    market insights and recommendations.
                  </p>
                </div>

              </div>

            </div>

          </div>

        </div>

      </main>
    </div>
  );
}

function InfoItem({ text }) {
  return (
    <div className="flex items-center gap-3">

      <CheckCircle2
        size={17}
        className="shrink-0 text-green-400"
      />

      <span className="text-sm text-slate-300">
        {text}
      </span>

    </div>
  );
}

export default AddProduce;