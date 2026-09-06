import {
  ArrowRight,
  BarChart3,
  Brain,
  CheckCircle2,
  ChevronRight,
  IndianRupee,
  MapPin,
  Menu,
  ShieldCheck,
  Sprout,
  TrendingUp,
  Users,
  X,
} from "lucide-react";
import { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard";

import { Link } from "react-router-dom";

import AddProduce from "./pages/AddProduce";

import Analysis from "./pages/Analysis";

import Marketplace from "./pages/Marketplace";

import Buyers from "./pages/Buyers";

import SendOffer from "./pages/SendOffer";

import MyProduce from "./pages/MyProduce";


import AIAdvisor from "./pages/AIAdvisor";

import Analytics from "./pages/Analytics";

import Settings from "./pages/Settings";

function LandingPage() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div className="min-h-screen overflow-x-hidden bg-[#f7faf7] text-slate-900">

      {/* ================= NAVBAR ================= */}
      <nav className="sticky top-0 z-50 border-b border-slate-200/70 bg-white/90 backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4 lg:px-8">

          {/* Logo */}
          <div className="flex items-center gap-2">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-green-600 text-white shadow-lg shadow-green-600/20">
              <Sprout size={22} />
            </div>

            <div>
              <h1 className="text-xl font-extrabold tracking-tight">
                FarmLink <span className="text-green-600">AI</span>
              </h1>
              <p className="hidden text-[9px] font-medium uppercase tracking-[2px] text-slate-400 sm:block">
                Market Intelligence
              </p>
            </div>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden items-center gap-8 md:flex">
            <a
              href="#home"
              className="text-sm font-medium text-slate-700 transition hover:text-green-600"
            >
              Home
            </a>

            <a
              href="#features"
              className="text-sm font-medium text-slate-700 transition hover:text-green-600"
            >
              Features
            </a>

            <a
              href="#how"
              className="text-sm font-medium text-slate-700 transition hover:text-green-600"
            >
              How It Works
            </a>

            <a
              href="#impact"
              className="text-sm font-medium text-slate-700 transition hover:text-green-600"
            >
              Impact
            </a>

            <Link
  to="/dashboard"
  className="rounded-xl bg-green-600 px-5 py-2.5 text-sm font-semibold text-white shadow-lg shadow-green-600/20 transition hover:bg-green-700"
>
  Get Started
</Link>
          </div>

          {/* Mobile Menu */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="rounded-lg p-2 md:hidden"
          >
            {menuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {menuOpen && (
          <div className="border-t border-slate-100 bg-white px-6 py-5 md:hidden">
            <div className="flex flex-col gap-5">
              <a href="#home">Home</a>
              <a href="#features">Features</a>
              <a href="#how">How It Works</a>
              <a href="#impact">Impact</a>

              <button className="rounded-xl bg-green-600 py-3 font-semibold text-white">
                Get Started
              </button>
            </div>
          </div>
        )}
      </nav>

      {/* ================= HERO ================= */}
      <section id="home" className="relative overflow-hidden">

        {/* Background decoration */}
        <div className="absolute -right-40 -top-40 h-96 w-96 rounded-full bg-green-200/40 blur-3xl" />
        <div className="absolute -left-40 top-72 h-96 w-96 rounded-full bg-emerald-100/50 blur-3xl" />

        <div className="relative mx-auto grid max-w-7xl items-center gap-16 px-6 pb-24 pt-20 lg:grid-cols-2 lg:px-8 lg:pb-32 lg:pt-28">

          {/* Left */}
          <div>

            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-green-200 bg-green-50 px-4 py-2 text-sm font-semibold text-green-700">
              <span className="h-2 w-2 animate-pulse rounded-full bg-green-500" />
              AI-Powered Agricultural Intelligence
            </div>

            <h2 className="max-w-3xl text-5xl font-black leading-[1.05] tracking-tight sm:text-6xl lg:text-7xl">
              Sell Smarter.
              <br />
              <span className="text-green-600">Earn Better.</span>
            </h2>

            <p className="mt-7 max-w-xl text-lg leading-8 text-slate-600">
              FarmLink AI helps farmers discover better markets, understand
              price trends, and make smarter selling decisions using
              artificial intelligence.
            </p>

            <div className="mt-9 flex flex-col gap-3 sm:flex-row">

              <button className="group flex items-center justify-center gap-2 rounded-xl bg-green-600 px-7 py-4 font-bold text-white shadow-xl shadow-green-600/20 transition hover:-translate-y-0.5 hover:bg-green-700">
                Explore Markets
                <ArrowRight
                  size={18}
                  className="transition group-hover:translate-x-1"
                />
              </button>

              <button className="flex items-center justify-center gap-2 rounded-xl border border-green-600 bg-white px-7 py-4 font-bold text-green-700 transition hover:bg-green-50">
                Add Your Produce
              </button>

            </div>

            {/* Trust points */}
            <div className="mt-10 flex flex-wrap gap-x-6 gap-y-3 text-sm text-slate-500">
              <div className="flex items-center gap-2">
                <CheckCircle2 size={17} className="text-green-600" />
                Data-driven insights
              </div>

              <div className="flex items-center gap-2">
                <CheckCircle2 size={17} className="text-green-600" />
                Market comparison
              </div>

              <div className="flex items-center gap-2">
                <CheckCircle2 size={17} className="text-green-600" />
                Smart recommendations
              </div>
            </div>
          </div>

          {/* Right - Dashboard Preview */}
          <div className="relative">

            {/* Main card */}
            <div className="relative rounded-3xl border border-slate-200 bg-white p-5 shadow-2xl shadow-slate-900/10">

              {/* Header */}
              <div className="flex items-center justify-between border-b border-slate-100 pb-5">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                    Market Intelligence
                  </p>

                  <h3 className="mt-1 text-xl font-bold">
                    Tomato — Today
                  </h3>
                </div>

                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-green-50 text-green-600">
                  <BarChart3 size={20} />
                </div>
              </div>

              {/* Price */}
              <div className="mt-6 flex items-end justify-between">

                <div>
                  <p className="text-sm text-slate-500">
                    Current average
                  </p>

                  <div className="mt-1 flex items-center">
                    <IndianRupee size={25} />
                    <span className="text-4xl font-black">
                      2,850
                    </span>
                    <span className="ml-1 text-sm text-slate-500">
                      / quintal
                    </span>
                  </div>
                </div>

                <div className="rounded-lg bg-green-50 px-3 py-2 text-sm font-bold text-green-700">
                  +8.4%
                </div>

              </div>

              {/* Fake chart */}
              <div className="mt-7 h-40 rounded-2xl bg-slate-50 p-4">

                <div className="flex h-full items-end gap-2">

                  {[35, 43, 40, 54, 48, 65, 61, 76, 71, 88, 82, 96].map(
                    (height, index) => (
                      <div
                        key={index}
                        className="flex-1 rounded-t-md bg-green-500/80 transition hover:bg-green-600"
                        style={{ height: `${height}%` }}
                      />
                    )
                  )}

                </div>

              </div>

              {/* Markets */}
              <div className="mt-6">
                <div className="mb-3 flex items-center justify-between">
                  <h4 className="font-bold">Nearby Markets</h4>

                  <button className="text-sm font-semibold text-green-600">
                    View all
                  </button>
                </div>

                <div className="space-y-3">

                  <MarketRow
                    name="Azadpur Mandi"
                    location="Delhi"
                    price="₹3,120"
                    best
                  />

                  <MarketRow
                    name="Okhla Mandi"
                    location="Delhi"
                    price="₹2,940"
                  />

                  <MarketRow
                    name="Ghazipur Mandi"
                    location="Uttar Pradesh"
                    price="₹2,850"
                  />

                </div>
              </div>
            </div>

            {/* AI Recommendation */}
            <div className="absolute -bottom-8 -left-6 hidden w-72 rounded-2xl border border-green-100 bg-white p-5 shadow-2xl shadow-green-900/10 sm:block">

              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-green-600 text-white">
                  <Brain size={20} />
                </div>

                <div>
                  <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">
                    AI Recommendation
                  </p>

                  <p className="font-bold text-green-700">
                    Good time to sell
                  </p>
                </div>
              </div>

              <div className="mt-4 rounded-xl bg-green-50 p-3">
                <p className="text-xs text-slate-500">
                  Expected price
                </p>

                <p className="mt-1 text-lg font-black">
                  ₹3,150 / quintal
                </p>
              </div>

            </div>
          </div>
        </div>
      </section>

      {/* ================= STATS ================= */}
      <section id="impact" className="border-y border-slate-200 bg-white">
        <div className="mx-auto grid max-w-7xl grid-cols-2 divide-x divide-slate-200 lg:grid-cols-4">

          <Stat
            icon={<TrendingUp size={22} />}
            number="Real-Time"
            label="Market Insights"
          />

          <Stat
            icon={<BarChart3 size={22} />}
            number="AI Powered"
            label="Price Intelligence"
          />

          <Stat
            icon={<Users size={22} />}
            number="Direct"
            label="Farmer–Buyer Link"
          />

          <Stat
            icon={<ShieldCheck size={22} />}
            number="Data Driven"
            label="Decision Support"
          />

        </div>
      </section>

      {/* ================= FEATURES ================= */}
      <section id="features" className="mx-auto max-w-7xl px-6 py-24 lg:px-8">

        <div className="mx-auto max-w-2xl text-center">

          <p className="text-sm font-bold uppercase tracking-[3px] text-green-600">
            Everything in one place
          </p>

          <h2 className="mt-4 text-4xl font-black tracking-tight sm:text-5xl">
            From farm to better market
          </h2>

          <p className="mt-5 leading-7 text-slate-600">
            Make informed selling decisions with market intelligence,
            predictive analytics and direct market connections.
          </p>

        </div>

        <div className="mt-14 grid gap-6 md:grid-cols-3">

          <FeatureCard
            icon={<BarChart3 />}
            title="Price Intelligence"
            text="Track current market prices, compare nearby markets and understand historical price movements."
          />

          <FeatureCard
            icon={<Brain />}
            title="AI Price Prediction"
            text="Use intelligent forecasting to understand potential future prices and identify better selling opportunities."
          />

          <FeatureCard
            icon={<Users />}
            title="Direct Market Link"
            text="Connect farmers with buyers and discover better market opportunities while reducing unnecessary intermediaries."
          />

        </div>
      </section>

      {/* ================= HOW IT WORKS ================= */}
      <section id="how" className="bg-slate-900 py-24 text-white">

        <div className="mx-auto max-w-7xl px-6 lg:px-8">

          <div className="max-w-2xl">
            <p className="text-sm font-bold uppercase tracking-[3px] text-green-400">
              Simple process
            </p>

            <h2 className="mt-4 text-4xl font-black sm:text-5xl">
              One decision.
              <br />
              Better returns.
            </h2>

            <p className="mt-5 leading-7 text-slate-400">
              FarmLink AI turns market data into a simple recommendation
              that farmers can actually use.
            </p>
          </div>

          <div className="mt-14 grid gap-6 md:grid-cols-3">

            <Step
              number="01"
              title="Add Your Produce"
              text="Tell us what you're growing, how much you have and where you're located."
            />

            <Step
              number="02"
              title="Analyze Markets"
              text="FarmLink compares prices, trends, demand and nearby market opportunities."
            />

            <Step
              number="03"
              title="Sell Smarter"
              text="Get a clear recommendation on where and when you can potentially earn more."
            />

          </div>

        </div>
      </section>

      {/* ================= CTA ================= */}
      <section className="px-6 py-24">

        <div className="mx-auto max-w-5xl overflow-hidden rounded-3xl bg-green-600 px-8 py-14 text-center text-white shadow-2xl shadow-green-600/20 sm:px-14">

          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-white/15">
            <Sprout size={28} />
          </div>

          <h2 className="mt-6 text-4xl font-black sm:text-5xl">
            Your produce deserves
            <br />
            the right market.
          </h2>

          <p className="mx-auto mt-5 max-w-xl text-green-50">
            Use data and AI to make smarter market decisions and discover
            better opportunities for your harvest.
          </p>

          <button className="mt-8 inline-flex items-center gap-2 rounded-xl bg-white px-7 py-4 font-bold text-green-700 transition hover:bg-green-50">
            Get Started
            <ArrowRight size={18} />
          </button>

        </div>
      </section>

      {/* ================= FOOTER ================= */}
      <footer className="border-t border-slate-200 bg-white">

        <div className="mx-auto flex max-w-7xl flex-col justify-between gap-5 px-6 py-8 sm:flex-row lg:px-8">

          <div className="flex items-center gap-2">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-green-600 text-white">
              <Sprout size={19} />
            </div>

            <span className="font-bold">
              FarmLink <span className="text-green-600">AI</span>
            </span>
          </div>

          <p className="text-sm text-slate-500">
            AI-powered market intelligence for Indian farmers.
          </p>

        </div>
      </footer>
    </div>
  );
}

/* ================= COMPONENTS ================= */

function MarketRow({ name, location, price, best }) {
  return (
    <div className="flex items-center justify-between rounded-xl border border-slate-100 bg-slate-50 px-4 py-3">

      <div className="flex items-center gap-3">

        <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-white text-green-600">
          <MapPin size={17} />
        </div>

        <div>
          <p className="text-sm font-bold">{name}</p>
          <p className="text-xs text-slate-400">{location}</p>
        </div>

      </div>

      <div className="text-right">
        <p className="text-sm font-black">{price}</p>

        {best && (
          <p className="text-[10px] font-bold uppercase tracking-wide text-green-600">
            Best price
          </p>
        )}
      </div>

    </div>
  );
}

function Stat({ icon, number, label }) {
  return (
    <div className="flex flex-col items-center justify-center px-4 py-10 text-center">

      <div className="mb-3 flex h-11 w-11 items-center justify-center rounded-xl bg-green-50 text-green-600">
        {icon}
      </div>

      <p className="text-xl font-black">{number}</p>

      <p className="mt-1 text-sm text-slate-500">{label}</p>

    </div>
  );
}

function FeatureCard({ icon, title, text }) {
  return (
    <div className="group rounded-2xl border border-slate-200 bg-white p-7 transition duration-300 hover:-translate-y-1 hover:border-green-200 hover:shadow-xl hover:shadow-green-900/5">

      <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-green-50 text-green-600 transition group-hover:bg-green-600 group-hover:text-white">
        {icon}
      </div>

      <h3 className="mt-6 text-xl font-bold">{title}</h3>

      <p className="mt-3 leading-7 text-slate-500">
        {text}
      </p>

      <div className="mt-6 flex items-center gap-1 text-sm font-bold text-green-600">
        Learn more
        <ChevronRight size={16} />
      </div>

    </div>
  );
}

function Step({ number, title, text }) {
  return (
    <div className="rounded-2xl border border-slate-700 bg-slate-800/50 p-7">

      <p className="text-sm font-black tracking-widest text-green-400">
        {number}
      </p>

      <h3 className="mt-8 text-2xl font-bold">
        {title}
      </h3>

      <p className="mt-4 leading-7 text-slate-400">
        {text}
      </p>

    </div>
  );
}
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/add-produce" element={<AddProduce />} />
        <Route path="/analysis" element={<Analysis />} />
        <Route path="/markets" element={<Marketplace />} />
        <Route path="/buyers" element={<Buyers />} />
        <Route path="/send-offer" element={<SendOffer />} />
        <Route path="/produce" element={<MyProduce />} />
        <Route path="/advisor" element={<AIAdvisor />} />
        <Route path="/analytics" element={<Analytics />} />
        <Route path="/settings" element={<Settings />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;