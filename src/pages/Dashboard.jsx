import {
  ArrowUpRight,
  BarChart3,
  Bell,
  Brain,
  CalendarDays,
  ChevronRight,
  IndianRupee,
  Leaf,
  MapPin,
  Menu,
  Package,
  Search,
  Settings,
  Settings as SettingsIcon,
  Bot,
  ShoppingCart,
  Sprout,
  TrendingUp,
  Users,
  X,
} from "lucide-react";
import { useState } from "react";

import { Link } from "react-router-dom";

function Dashboard() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[#f6f8f6] text-slate-900">

      {/* MOBILE OVERLAY */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-40 bg-slate-900/40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* SIDEBAR */}
      <aside
        className={`fixed inset-y-0 left-0 z-50 w-64 transform border-r border-slate-200 bg-white transition-transform duration-300 lg:translate-x-0 ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex h-full flex-col">

          {/* Logo */}
          <div className="flex items-center justify-between border-b border-slate-100 px-6 py-5">

            <div className="flex items-center gap-2">
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
            </div>

            <button
              className="lg:hidden"
              onClick={() => setSidebarOpen(false)}
            >
              <X size={21} />
            </button>
          </div>

          {/* Navigation */}
          <div className="flex-1 px-4 py-6">

            <p className="px-3 text-[10px] font-bold uppercase tracking-[2px] text-slate-400">
              Main Menu
            </p>

            <nav className="mt-4 space-y-1">

              <NavItem
                icon={<BarChart3 size={19} />}
                label="Dashboard"
                active
              />

             <Link
  to="/produce"
  onClick={() => setSidebarOpen(false)}
  className="block"
>
  <NavItem
    icon={<Package size={19} />}
    label="My Produce"
  />
</Link>
              <Link
  to="/markets"
  onClick={() => setSidebarOpen(false)}
  className="block"
>
  <NavItem
    icon={<ShoppingCart size={19} />}
    label="Markets"
  />
</Link>

              <Link
  to="/buyers"
  onClick={() => setSidebarOpen(false)}
  className="block"
>
  <NavItem
    icon={<Users size={19} />}
    label="Buyers"
  />
</Link>

             <Link
  to="/advisor"
  onClick={() => setSidebarOpen(false)}
  className="block"
>
  <NavItem
    icon={<Bot size={19} />}
    label="AI Advisor"
  />
</Link>

              <Link
  to="/analytics"
  onClick={() => setSidebarOpen(false)}
  className="block"
>
  <NavItem
    icon={<BarChart3 size={19} />}
    label="Analytics"
  />
</Link>

            </nav>

            <p className="mt-10 px-3 text-[10px] font-bold uppercase tracking-[2px] text-slate-400">
              Account
            </p>

            <nav className="mt-4 space-y-1">

              <Link
  to="/settings"
  onClick={() => setSidebarOpen(false)}
  className="block"
>
  <NavItem
    icon={<SettingsIcon size={19} />}
    label="Settings"
  />
</Link>
            </nav>
          </div>

          {/* Profile */}
          <div className="border-t border-slate-100 p-4">

            <div className="flex items-center gap-3 rounded-xl bg-slate-50 p-3">

              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-green-100 font-bold text-green-700">
                RK
              </div>

              <div className="min-w-0">
                <p className="truncate text-sm font-bold">
                  Rajesh Kumar
                </p>

                <p className="truncate text-xs text-slate-400">
                  Farmer
                </p>
              </div>

            </div>
          </div>

        </div>
      </aside>

      {/* MAIN */}
      <div className="lg:pl-64">

        {/* TOPBAR */}
        <header className="sticky top-0 z-30 border-b border-slate-200 bg-white/90 backdrop-blur-xl">

          <div className="flex h-20 items-center justify-between px-5 sm:px-8">

            <div className="flex items-center gap-4">

              <button
                className="rounded-xl p-2 hover:bg-slate-100 lg:hidden"
                onClick={() => setSidebarOpen(true)}
              >
                <Menu size={23} />
              </button>

              <div>
                <p className="text-xs font-medium text-slate-400">
                  Farmer Dashboard
                </p>

                <h2 className="text-lg font-bold">
                  Good morning, Rajesh 👋
                </h2>
              </div>

            </div>

            <div className="flex items-center gap-3">

              <button className="relative flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200 bg-white hover:bg-slate-50">
                <Bell size={19} />

                <span className="absolute right-2 top-2 h-2 w-2 rounded-full bg-red-500" />
              </button>

              <div className="hidden h-10 w-px bg-slate-200 sm:block" />

              <div className="hidden items-center gap-3 sm:flex">

                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-green-100 font-bold text-green-700">
                  RK
                </div>

                <div>
                  <p className="text-sm font-bold">
                    Rajesh Kumar
                  </p>

                  <p className="text-xs text-slate-400">
                    Uttar Pradesh
                  </p>
                </div>

              </div>

            </div>
          </div>
        </header>

        {/* CONTENT */}
        <main className="mx-auto max-w-7xl px-5 py-8 sm:px-8">

          {/* HEADER */}
          <div className="flex flex-col justify-between gap-5 md:flex-row md:items-end">

            <div>
              <p className="text-sm font-medium text-slate-500">
                Thursday, September 4, 2026
              </p>

              <h1 className="mt-1 text-3xl font-black tracking-tight">
                Market Overview
              </h1>

              <p className="mt-2 text-sm text-slate-500">
                Here's what is happening with your markets today.
              </p>
            </div>
<Link 
to="/add-produce"
            className="flex w-fit items-center gap-2 rounded-xl bg-green-600 px-5 py-3 text-sm font-bold text-white shadow-lg shadow-green-600/20 transition hover:bg-green-700"
>
<Sprout size={18} />
  Add Produce
</Link>

          </div>

          {/* STATS */}
          <div className="mt-8 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">

            <StatCard
              icon={<IndianRupee size={20} />}
              label="Average Market Price"
              value="₹2,850"
              suffix="/ quintal"
              change="+8.4%"
              positive
            />

            <StatCard
              icon={<TrendingUp size={20} />}
              label="Expected Price"
              value="₹3,150"
              suffix="/ quintal"
              change="+10.5%"
              positive
            />

            <StatCard
              icon={<ShoppingCart size={20} />}
              label="Nearby Markets"
              value="12"
              suffix=" markets"
              change="3 nearby"
            />

            <StatCard
              icon={<Users size={20} />}
              label="Available Buyers"
              value="28"
              suffix=" verified"
              change="+6 this week"
              positive
            />

          </div>

          {/* MAIN GRID */}
          <div className="mt-6 grid gap-6 xl:grid-cols-3">

            {/* PRICE CHART */}
            <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm xl:col-span-2">

              <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">

                <div>
                  <h3 className="text-lg font-bold">
                    Tomato Price Trend
                  </h3>

                  <p className="mt-1 text-sm text-slate-400">
                    Average mandi price — last 12 days
                  </p>
                </div>

                <div className="flex items-center gap-2 rounded-lg border border-slate-200 px-3 py-2 text-sm">
                  <CalendarDays size={16} />
                  Last 12 days
                </div>

              </div>

              {/* Chart */}
              <div className="mt-8">

                <div className="flex h-64 items-end gap-2 border-b border-l border-slate-100 px-2 pb-2">

                  {[
                    42, 47, 44, 51, 49, 57,
                    54, 65, 61, 73, 69, 82,
                  ].map((height, index) => (

                    <div
                      key={index}
                      className="group relative flex h-full flex-1 items-end"
                    >

                      <div
                        className="w-full rounded-t-md bg-green-500/80 transition hover:bg-green-600"
                        style={{ height: `${height}%` }}
                      />

                      <div className="absolute bottom-full left-1/2 mb-2 hidden -translate-x-1/2 rounded-lg bg-slate-900 px-2 py-1 text-[10px] text-white group-hover:block">
                        ₹{2450 + index * 35}
                      </div>

                    </div>

                  ))}

                </div>

                <div className="mt-3 flex justify-between px-1 text-[10px] text-slate-400">
                  <span>Aug 24</span>
                  <span>Aug 27</span>
                  <span>Aug 30</span>
                  <span>Sep 02</span>
                  <span>Sep 04</span>
                </div>

              </div>

              {/* Chart summary */}
              <div className="mt-6 grid grid-cols-3 gap-3">

                <MiniMetric
                  label="Lowest"
                  value="₹2,450"
                />

                <MiniMetric
                  label="Average"
                  value="₹2,850"
                />

                <MiniMetric
                  label="Highest"
                  value="₹3,120"
                />

              </div>

            </div>

            {/* AI RECOMMENDATION */}
            <div className="relative overflow-hidden rounded-2xl bg-slate-900 p-6 text-white shadow-xl">

              <div className="absolute -right-12 -top-12 h-40 w-40 rounded-full bg-green-500/20 blur-2xl" />

              <div className="relative">

                <div className="flex items-center justify-between">

                  <div className="flex items-center gap-3">

                    <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-green-500 text-white">
                      <Brain size={21} />
                    </div>

                    <div>
                      <p className="text-[10px] font-bold uppercase tracking-[2px] text-green-400">
                        AI Advisor
                      </p>

                      <h3 className="font-bold">
                        Selling Recommendation
                      </h3>
                    </div>

                  </div>

                  <div className="rounded-full bg-green-500/15 px-3 py-1 text-xs font-bold text-green-400">
                    87% confidence
                  </div>

                </div>

                <div className="mt-8">

                  <div className="flex items-center gap-2">
                    <span className="h-3 w-3 rounded-full bg-green-400" />

                    <span className="text-2xl font-black">
                      Good time to sell
                    </span>
                  </div>

                  <p className="mt-3 text-sm leading-6 text-slate-400">
                    Current market conditions indicate favorable
                    selling opportunities for tomatoes.
                  </p>

                </div>

                <div className="mt-6 space-y-3">

                  <Recommendation
                    label="Best Market"
                    value="Azadpur Mandi"
                  />

                  <Recommendation
                    label="Expected Price"
                    value="₹3,150 / quintal"
                  />

                  <Recommendation
                    label="Suggested Window"
                    value="Next 3–5 days"
                  />

                </div>

                <button className="mt-7 flex w-full items-center justify-center gap-2 rounded-xl bg-green-600 py-3 font-bold transition hover:bg-green-500">
                  View Full Analysis
                  <ArrowUpRight size={17} />
                </button>

              </div>
            </div>

          </div>

          {/* LOWER GRID */}
          <div className="mt-6 grid gap-6 lg:grid-cols-2">

            {/* NEARBY MARKETS */}
            <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">

              <div className="flex items-center justify-between">

                <div>
                  <h3 className="text-lg font-bold">
                    Nearby Markets
                  </h3>

                  <p className="mt-1 text-sm text-slate-400">
                    Today's tomato prices
                  </p>
                </div>

                <button className="text-sm font-bold text-green-600">
                  View all
                </button>

              </div>

              <div className="mt-5 space-y-3">

                <Market
                  name="Azadpur Mandi"
                  location="Delhi"
                  price="₹3,120"
                  change="+12.4%"
                  best
                />

                <Market
                  name="Okhla Mandi"
                  location="Delhi"
                  price="₹2,940"
                  change="+8.2%"
                />

                <Market
                  name="Ghazipur Mandi"
                  location="Uttar Pradesh"
                  price="₹2,850"
                  change="+6.7%"
                />

                <Market
                  name="Bulandshahr Mandi"
                  location="Uttar Pradesh"
                  price="₹2,760"
                  change="+4.1%"
                />

              </div>
            </div>

            {/* MY PRODUCE */}
            <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">

              <div className="flex items-center justify-between">

                <div>
                  <h3 className="text-lg font-bold">
                    My Produce
                  </h3>

                  <p className="mt-1 text-sm text-slate-400">
                    Currently listed crops
                  </p>
                </div>

                <button className="flex items-center gap-1 text-sm font-bold text-green-600">
                  Manage
                  <ChevronRight size={16} />
                </button>

              </div>

              <div className="mt-5 space-y-3">

                <Produce
                  icon="🍅"
                  name="Tomato"
                  quantity="500 kg"
                  price="₹2,850 / quintal"
                  status="Price rising"
                />

                <Produce
                  icon="🥔"
                  name="Potato"
                  quantity="800 kg"
                  price="₹1,950 / quintal"
                  status="Stable"
                />

                <Produce
                  icon="🧅"
                  name="Onion"
                  quantity="350 kg"
                  price="₹2,400 / quintal"
                  status="High demand"
                />

              </div>

              <button className="mt-5 flex w-full items-center justify-center gap-2 rounded-xl border border-dashed border-green-300 py-3 text-sm font-bold text-green-600 transition hover:bg-green-50">
                <Sprout size={17} />
                Add another crop
              </button>

            </div>

          </div>

          {/* MARKET ALERT */}
          <div className="mt-6 flex flex-col gap-4 rounded-2xl border border-green-100 bg-green-50 p-5 sm:flex-row sm:items-center sm:justify-between">

            <div className="flex items-start gap-4">

              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-green-600 text-white">
                <Bell size={20} />
              </div>

              <div>
                <p className="font-bold text-green-900">
                  Market Alert
                </p>

                <p className="mt-1 text-sm leading-6 text-green-800/70">
                  Tomato prices in Azadpur Mandi increased by
                  12.4% today. Your current crop may have a better
                  selling opportunity.
                </p>
              </div>

            </div>

            <button className="flex shrink-0 items-center gap-2 text-sm font-bold text-green-700">
              Analyze now
              <ArrowUpRight size={16} />
            </button>

          </div>

        </main>
      </div>
    </div>
  );
}

/* ================= COMPONENTS ================= */

function NavItem({ icon, label, active }) {
  return (
    <button
      className={`flex w-full items-center gap-3 rounded-xl px-3 py-3 text-sm font-semibold transition ${
        active
          ? "bg-green-50 text-green-700"
          : "text-slate-500 hover:bg-slate-50 hover:text-slate-900"
      }`}
    >
      {icon}
      {label}
    </button>
  );
}

function StatCard({
  icon,
  label,
  value,
  suffix,
  change,
  positive,
}) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">

      <div className="flex items-start justify-between">

        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-green-50 text-green-600">
          {icon}
        </div>

        <span
          className={`rounded-lg px-2 py-1 text-[10px] font-bold ${
            positive
              ? "bg-green-50 text-green-700"
              : "bg-slate-50 text-slate-500"
          }`}
        >
          {change}
        </span>

      </div>

      <p className="mt-5 text-sm text-slate-400">
        {label}
      </p>

      <div className="mt-1 flex items-baseline gap-1">
        <span className="text-2xl font-black">
          {value}
        </span>

        <span className="text-xs text-slate-400">
          {suffix}
        </span>
      </div>

    </div>
  );
}

function MiniMetric({ label, value }) {
  return (
    <div className="rounded-xl bg-slate-50 p-3">
      <p className="text-xs text-slate-400">{label}</p>
      <p className="mt-1 font-bold">{value}</p>
    </div>
  );
}

function Recommendation({ label, value }) {
  return (
    <div className="flex items-center justify-between border-b border-slate-700 pb-3 last:border-0">

      <span className="text-sm text-slate-400">
        {label}
      </span>

      <span className="text-right text-sm font-bold">
        {value}
      </span>

    </div>
  );
}

function Market({
  name,
  location,
  price,
  change,
  best,
}) {
  return (
    <div className="flex items-center justify-between rounded-xl border border-slate-100 bg-slate-50 p-4">

      <div className="flex items-center gap-3">

        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white text-green-600 shadow-sm">
          <MapPin size={18} />
        </div>

        <div>
          <div className="flex items-center gap-2">
            <p className="text-sm font-bold">
              {name}
            </p>

            {best && (
              <span className="rounded-full bg-green-100 px-2 py-0.5 text-[9px] font-bold uppercase text-green-700">
                Best
              </span>
            )}
          </div>

          <p className="mt-1 text-xs text-slate-400">
            {location}
          </p>
        </div>

      </div>

      <div className="text-right">

        <p className="font-black">
          {price}
        </p>

        <p className="mt-1 text-xs font-bold text-green-600">
          {change}
        </p>

      </div>

    </div>
  );
}

function Produce({
  icon,
  name,
  quantity,
  price,
  status,
}) {
  return (
    <div className="flex items-center justify-between rounded-xl border border-slate-100 p-4">

      <div className="flex items-center gap-3">

        <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-green-50 text-2xl">
          {icon}
        </div>

        <div>
          <p className="text-sm font-bold">
            {name}
          </p>

          <p className="mt-1 text-xs text-slate-400">
            {quantity}
          </p>
        </div>

      </div>

      <div className="text-right">

        <p className="text-sm font-bold">
          {price}
        </p>

        <p className="mt-1 text-xs font-semibold text-green-600">
          {status}
        </p>

      </div>

    </div>
  );
}

export default Dashboard;