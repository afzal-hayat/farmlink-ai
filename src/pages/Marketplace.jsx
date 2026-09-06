import {
  ArrowLeft,
  ArrowUpRight,
  CheckCircle2,
  Filter,
  IndianRupee,
  MapPin,
  Search,
  ShoppingCart,
  Sprout,
  TrendingUp,
  Users,
} from "lucide-react";
import { Link } from "react-router-dom";
import { useMemo, useState } from "react";

function Marketplace() {
  const [search, setSearch] = useState("");
  const [cropFilter, setCropFilter] = useState("All");
  const [sort, setSort] = useState("price");

  const markets = [
    {
      name: "Azadpur Mandi",
      city: "Delhi",
      crop: "Tomato",
      price: 3120,
      distance: 48,
      buyers: 18,
      demand: "High",
      change: "+12.4%",
    },
    {
      name: "Okhla Mandi",
      city: "Delhi",
      crop: "Tomato",
      price: 2940,
      distance: 42,
      buyers: 12,
      demand: "High",
      change: "+8.2%",
    },
    {
      name: "Ghazipur Mandi",
      city: "Uttar Pradesh",
      crop: "Tomato",
      price: 2850,
      distance: 31,
      buyers: 9,
      demand: "Medium",
      change: "+6.7%",
    },
    {
      name: "Bulandshahr Mandi",
      city: "Uttar Pradesh",
      crop: "Potato",
      price: 2180,
      distance: 54,
      buyers: 14,
      demand: "High",
      change: "+9.1%",
    },
    {
      name: "Sadar Bazar",
      city: "Delhi",
      crop: "Onion",
      price: 2670,
      distance: 46,
      buyers: 11,
      demand: "Medium",
      change: "+4.8%",
    },
    {
      name: "Dadri Mandi",
      city: "Uttar Pradesh",
      crop: "Onion",
      price: 2490,
      distance: 24,
      buyers: 7,
      demand: "High",
      change: "+7.3%",
    },
  ];

  const filteredMarkets = useMemo(() => {
    let result = markets.filter((market) => {
      const matchesSearch =
        market.name.toLowerCase().includes(search.toLowerCase()) ||
        market.city.toLowerCase().includes(search.toLowerCase()) ||
        market.crop.toLowerCase().includes(search.toLowerCase());

      const matchesCrop =
        cropFilter === "All" || market.crop === cropFilter;

      return matchesSearch && matchesCrop;
    });

    if (sort === "price") {
      result.sort((a, b) => b.price - a.price);
    }

    if (sort === "distance") {
      result.sort((a, b) => a.distance - b.distance);
    }

    if (sort === "buyers") {
      result.sort((a, b) => b.buyers - a.buyers);
    }

    return result;
  }, [search, cropFilter, sort]);

  return (
    <div className="min-h-screen bg-[#f6f8f6] text-slate-900">

      {/* NAVBAR */}
      <header className="sticky top-0 z-40 border-b border-slate-200 bg-white/95 backdrop-blur">
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
                Marketplace
              </p>
            </div>
          </Link>

          <Link
            to="/dashboard"
            className="flex items-center gap-2 text-sm font-semibold text-slate-500 transition hover:text-green-600"
          >
            <ArrowLeft size={17} />
            Dashboard
          </Link>

        </div>
      </header>

      <main className="mx-auto max-w-7xl px-5 py-10 sm:px-8">

        {/* HEADER */}
        <div className="flex flex-col justify-between gap-6 lg:flex-row lg:items-end">

          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-green-200 bg-green-50 px-4 py-2 text-sm font-semibold text-green-700">
              <ShoppingCart size={16} />
              Live Market Discovery
            </div>

            <h1 className="mt-5 text-4xl font-black tracking-tight sm:text-5xl">
              Find the right market.
            </h1>

            <p className="mt-3 max-w-2xl text-lg leading-7 text-slate-500">
              Compare market prices, distance, buyer demand and
              selling opportunities before deciding where to sell.
            </p>
          </div>

          <Link
            to="/add-produce"
            className="flex w-fit items-center gap-2 rounded-xl bg-green-600 px-5 py-3 font-bold text-white shadow-lg shadow-green-600/20 transition hover:bg-green-700"
          >
            <Sprout size={18} />
            Add Produce
          </Link>

        </div>

        {/* SUMMARY */}
        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">

          <SummaryCard
            icon={<IndianRupee size={20} />}
            value="₹3,120"
            label="Highest Price"
            detail="+12.4% today"
          />

          <SummaryCard
            icon={<MapPin size={20} />}
            value="24 km"
            label="Nearest Market"
            detail="Dadri Mandi"
          />

          <SummaryCard
            icon={<Users size={20} />}
            value="71"
            label="Active Buyers"
            detail="Across listed markets"
          />

          <SummaryCard
            icon={<TrendingUp size={20} />}
            value="High"
            label="Current Demand"
            detail="Tomato"
          />

        </div>

        {/* SEARCH + FILTER */}
        <div className="mt-8 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">

          <div className="flex flex-col gap-4 lg:flex-row">

            <div className="relative flex-1">

              <Search
                size={19}
                className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
              />

              <input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search market, city or crop..."
                className="w-full rounded-xl border border-slate-200 py-3.5 pl-11 pr-4 text-sm outline-none transition focus:border-green-500 focus:ring-4 focus:ring-green-500/10"
              />

            </div>

            <div className="flex flex-col gap-3 sm:flex-row">

              <div className="flex items-center gap-2 rounded-xl border border-slate-200 px-3">

                <Filter size={17} className="text-slate-400" />

                <select
                  value={cropFilter}
                  onChange={(e) => setCropFilter(e.target.value)}
                  className="bg-transparent py-3 text-sm font-semibold outline-none"
                >
                  <option>All</option>
                  <option>Tomato</option>
                  <option>Potato</option>
                  <option>Onion</option>
                </select>

              </div>

              <select
                value={sort}
                onChange={(e) => setSort(e.target.value)}
                className="rounded-xl border border-slate-200 px-4 py-3 text-sm font-semibold outline-none focus:border-green-500"
              >
                <option value="price">Highest Price</option>
                <option value="distance">Nearest</option>
                <option value="buyers">Most Buyers</option>
              </select>

            </div>

          </div>

        </div>

        {/* AI INSIGHT */}
        <div className="relative mt-6 overflow-hidden rounded-2xl bg-slate-900 p-6 text-white">

          <div className="absolute -right-20 -top-20 h-52 w-52 rounded-full bg-green-500/20 blur-3xl" />

          <div className="relative flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">

            <div className="flex gap-4">

              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-green-600">
                <TrendingUp size={22} />
              </div>

              <div>
                <p className="text-xs font-bold uppercase tracking-[2px] text-green-400">
                  FarmLink AI Insight
                </p>

                <h2 className="mt-1 text-xl font-bold">
                  Azadpur Mandi currently offers the strongest tomato price.
                </h2>

                <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-400">
                  Prices are trending upward and buyer demand is high.
                  Consider comparing transport cost before making your final
                  selling decision.
                </p>
              </div>

            </div>

            <Link
              to="/analysis"
              className="flex shrink-0 items-center justify-center gap-2 rounded-xl bg-green-600 px-5 py-3 text-sm font-bold transition hover:bg-green-500"
            >
              View AI Analysis
              <ArrowUpRight size={17} />
            </Link>

          </div>

        </div>

        {/* MARKET LIST */}
        <div className="mt-8">

          <div className="flex items-center justify-between">

            <div>
              <h2 className="text-2xl font-black">
                Available Markets
              </h2>

              <p className="mt-1 text-sm text-slate-400">
                {filteredMarkets.length} markets found
              </p>
            </div>

          </div>

          <div className="mt-5 grid gap-4">

            {filteredMarkets.map((market, index) => (
              <MarketCard
                key={`${market.name}-${index}`}
                market={market}
                recommended={index === 0 && sort === "price"}
              />
            ))}

          </div>

          {filteredMarkets.length === 0 && (
            <div className="mt-5 rounded-2xl border border-dashed border-slate-300 bg-white p-12 text-center">
              <Search
                size={30}
                className="mx-auto text-slate-300"
              />

              <h3 className="mt-4 font-bold">
                No markets found
              </h3>

              <p className="mt-1 text-sm text-slate-400">
                Try changing your search or crop filter.
              </p>
            </div>
          )}

        </div>

      </main>
    </div>
  );
}

/* ================= COMPONENTS ================= */

function SummaryCard({ icon, value, label, detail }) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">

      <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-green-50 text-green-600">
        {icon}
      </div>

      <p className="mt-4 text-sm text-slate-400">
        {label}
      </p>

      <p className="mt-1 text-2xl font-black">
        {value}
      </p>

      <p className="mt-1 text-xs font-semibold text-green-600">
        {detail}
      </p>

    </div>
  );
}

function MarketCard({ market, recommended }) {
  return (
    <div
      className={`rounded-2xl border bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:shadow-lg ${
        recommended
          ? "border-green-200 ring-1 ring-green-100"
          : "border-slate-200"
      }`}
    >

      <div className="flex flex-col gap-5 lg:flex-row lg:items-center">

        {/* MARKET */}
        <div className="flex flex-1 items-center gap-4">

          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-green-50 text-green-600">
            <MapPin size={21} />
          </div>

          <div>

            <div className="flex flex-wrap items-center gap-2">

              <h3 className="font-bold">
                {market.name}
              </h3>

              {recommended && (
                <span className="rounded-full bg-green-100 px-2.5 py-1 text-[9px] font-bold uppercase tracking-wide text-green-700">
                  Best Price
                </span>
              )}

            </div>

            <p className="mt-1 text-sm text-slate-400">
              {market.city} · {market.distance} km away
            </p>

          </div>

        </div>

        {/* CROP */}
        <div className="lg:w-28">
          <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
            Crop
          </p>

          <p className="mt-1 text-sm font-bold">
            {market.crop}
          </p>
        </div>

        {/* PRICE */}
        <div className="lg:w-36">

          <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
            Price
          </p>

          <p className="mt-1 text-xl font-black">
            ₹{market.price.toLocaleString("en-IN")}
          </p>

          <p className="text-xs font-bold text-green-600">
            {market.change}
          </p>

        </div>

        {/* DEMAND */}
        <div className="lg:w-32">

          <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
            Demand
          </p>

          <div className="mt-2 flex items-center gap-2">

            <span
              className={`h-2.5 w-2.5 rounded-full ${
                market.demand === "High"
                  ? "bg-green-500"
                  : "bg-yellow-400"
              }`}
            />

            <span className="text-sm font-bold">
              {market.demand}
            </span>

          </div>

          <p className="mt-1 text-xs text-slate-400">
            {market.buyers} buyers
          </p>

        </div>

        {/* ACTION */}
        <div>

          <button className="flex w-full items-center justify-center gap-2 rounded-xl border border-green-200 px-4 py-2.5 text-sm font-bold text-green-700 transition hover:bg-green-50 lg:w-auto">
            View Market
            <ArrowUpRight size={16} />
          </button>

        </div>

      </div>

    </div>
  );
}

export default Marketplace;