import {
  ArrowLeft,
  ArrowUpRight,
  CheckCircle2,
  Filter,
  IndianRupee,
  MapPin,
  Search,
  Send,
  ShieldCheck,
  Sprout,
  Users,
} from "lucide-react";
import { Link } from "react-router-dom";
import { useMemo, useState } from "react";

function Buyers() {
  const [search, setSearch] = useState("");
  const [crop, setCrop] = useState("All");

  const buyers = [
    {
      name: "FreshKart Foods",
      type: "Food Processing Company",
      location: "Delhi",
      crops: ["Tomato", "Onion"],
      requirement: "5,000 kg",
      offeredPrice: "₹3,050",
      status: "High Demand",
      verified: true,
    },
    {
      name: "GreenBasket Retail",
      type: "Retail Buyer",
      location: "Noida",
      crops: ["Tomato", "Potato"],
      requirement: "2,500 kg",
      offeredPrice: "₹2,980",
      status: "Buying Now",
      verified: true,
    },
    {
      name: "AgroFresh Exports",
      type: "Exporter",
      location: "Ghaziabad",
      crops: ["Tomato"],
      requirement: "10,000 kg",
      offeredPrice: "₹3,100",
      status: "High Demand",
      verified: true,
    },
    {
      name: "DailyHarvest Traders",
      type: "Wholesale Trader",
      location: "Greater Noida",
      crops: ["Onion", "Potato"],
      requirement: "3,000 kg",
      offeredPrice: "₹2,700",
      status: "Buying Now",
      verified: true,
    },
    {
      name: "NatureFresh Organics",
      type: "Organic Retailer",
      location: "Delhi",
      crops: ["Tomato", "Onion"],
      requirement: "1,500 kg",
      offeredPrice: "₹3,200",
      status: "Premium",
      verified: true,
    },
  ];

  const filteredBuyers = useMemo(() => {
    return buyers.filter((buyer) => {
      const matchesSearch =
        buyer.name.toLowerCase().includes(search.toLowerCase()) ||
        buyer.location.toLowerCase().includes(search.toLowerCase()) ||
        buyer.type.toLowerCase().includes(search.toLowerCase());

      const matchesCrop =
        crop === "All" || buyer.crops.includes(crop);

      return matchesSearch && matchesCrop;
    });
  }, [search, crop]);

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
                Buyer Network
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
              <Users size={16} />
              Verified Buyer Network
            </div>

            <h1 className="mt-5 text-4xl font-black tracking-tight sm:text-5xl">
              Find buyers for your produce.
            </h1>

            <p className="mt-3 max-w-2xl text-lg leading-7 text-slate-500">
              Connect directly with verified buyers looking for
              agricultural produce in your region.
            </p>
          </div>

          <Link
            to="/add-produce"
            className="flex w-fit items-center gap-2 rounded-xl bg-green-600 px-5 py-3 font-bold text-white shadow-lg shadow-green-600/20 transition hover:bg-green-700"
          >
            <Sprout size={18} />
            List Produce
          </Link>

        </div>

        {/* SUMMARY */}
        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">

          <Summary
            icon={<Users size={20} />}
            value="28"
            label="Verified Buyers"
            detail="+6 this week"
          />

          <Summary
            icon={<IndianRupee size={20} />}
            value="₹3,200"
            label="Highest Offer"
            detail="Tomato"
          />

          <Summary
            icon={<Sprout size={20} />}
            value="18,500 kg"
            label="Current Demand"
            detail="Across buyers"
          />

          <Summary
            icon={<ShieldCheck size={20} />}
            value="100%"
            label="Verified"
            detail="Buyer profiles"
          />

        </div>

        {/* SEARCH */}
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
                placeholder="Search buyer, location or business type..."
                className="w-full rounded-xl border border-slate-200 py-3.5 pl-11 pr-4 text-sm outline-none transition focus:border-green-500 focus:ring-4 focus:ring-green-500/10"
              />

            </div>

            <div className="flex items-center gap-2 rounded-xl border border-slate-200 px-3">

              <Filter size={17} className="text-slate-400" />

              <select
                value={crop}
                onChange={(e) => setCrop(e.target.value)}
                className="bg-transparent py-3 text-sm font-semibold outline-none"
              >
                <option>All</option>
                <option>Tomato</option>
                <option>Potato</option>
                <option>Onion</option>
              </select>

            </div>

          </div>

        </div>

        {/* AI MATCH */}
        <div className="relative mt-6 overflow-hidden rounded-2xl bg-slate-900 p-6 text-white">

          <div className="absolute -right-16 -top-16 h-48 w-48 rounded-full bg-green-500/20 blur-3xl" />

          <div className="relative flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">

            <div className="flex gap-4">

              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-green-600">
                <Sprout size={22} />
              </div>

              <div>
                <p className="text-xs font-bold uppercase tracking-[2px] text-green-400">
                  AI Buyer Match
                </p>

                <h2 className="mt-1 text-xl font-bold">
                  5 buyers may be a good match for your produce.
                </h2>

                <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-400">
                  FarmLink considers crop requirements, location,
                  offered price and demand when finding potential buyers.
                </p>
              </div>

            </div>

            <button className="flex shrink-0 items-center justify-center gap-2 rounded-xl bg-green-600 px-5 py-3 text-sm font-bold transition hover:bg-green-500">
              View Matches
              <ArrowUpRight size={17} />
            </button>

          </div>

        </div>

        {/* BUYERS */}
        <div className="mt-8">

          <div className="flex items-center justify-between">

            <div>
              <h2 className="text-2xl font-black">
                Available Buyers
              </h2>

              <p className="mt-1 text-sm text-slate-400">
                {filteredBuyers.length} matching buyers
              </p>
            </div>

          </div>

          <div className="mt-5 grid gap-5 md:grid-cols-2 xl:grid-cols-3">

            {filteredBuyers.map((buyer) => (
              <BuyerCard
                key={buyer.name}
                buyer={buyer}
              />
            ))}

          </div>

          {filteredBuyers.length === 0 && (
            <div className="mt-5 rounded-2xl border border-dashed border-slate-300 bg-white p-12 text-center">

              <Search
                size={30}
                className="mx-auto text-slate-300"
              />

              <h3 className="mt-4 font-bold">
                No buyers found
              </h3>

              <p className="mt-1 text-sm text-slate-400">
                Try another search or crop.
              </p>

            </div>
          )}

        </div>

      </main>
    </div>
  );
}

/* ================= COMPONENTS ================= */

function Summary({ icon, value, label, detail }) {
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

function BuyerCard({ buyer }) {
  return (
    <div className="group rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:border-green-200 hover:shadow-xl hover:shadow-green-900/5">

      {/* TOP */}
      <div className="flex items-start justify-between">

        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-green-50 text-lg font-black text-green-700">
          {buyer.name.charAt(0)}
        </div>

        {buyer.verified && (
          <div className="flex items-center gap-1 rounded-full bg-green-50 px-2.5 py-1 text-[10px] font-bold text-green-700">
            <CheckCircle2 size={13} />
            VERIFIED
          </div>
        )}

      </div>

      {/* NAME */}
      <h3 className="mt-5 text-xl font-bold">
        {buyer.name}
      </h3>

      <p className="mt-1 text-sm text-slate-400">
        {buyer.type}
      </p>

      <div className="mt-4 flex items-center gap-1 text-sm text-slate-500">
        <MapPin size={15} className="text-green-600" />
        {buyer.location}
      </div>

      {/* CROPS */}
      <div className="mt-5 flex flex-wrap gap-2">

        {buyer.crops.map((item) => (
          <span
            key={item}
            className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-600"
          >
            {item}
          </span>
        ))}

      </div>

      {/* DETAILS */}
      <div className="mt-5 rounded-xl bg-slate-50 p-4">

        <div className="flex items-center justify-between">

          <span className="text-xs text-slate-400">
            Current requirement
          </span>

          <span className="text-sm font-bold">
            {buyer.requirement}
          </span>

        </div>

        <div className="mt-3 flex items-center justify-between">

          <span className="text-xs text-slate-400">
            Offered price
          </span>

          <span className="text-lg font-black text-green-600">
            {buyer.offeredPrice}
            <span className="ml-1 text-xs font-normal text-slate-400">
              / quintal
            </span>
          </span>

        </div>

      </div>

      {/* STATUS */}
      <div className="mt-4 flex items-center gap-2">

        <span className="h-2.5 w-2.5 rounded-full bg-green-500" />

        <span className="text-xs font-bold text-green-700">
          {buyer.status}
        </span>

      </div>
<Link
  to="/send-offer"
  state={{ buyer }}
  className="mt-5 flex w-full items-center justify-center gap-2 rounded-xl bg-green-600 py-3 text-sm font-bold text-white transition hover:bg-green-700"
>
  <Send size={16} />
  Send Offer
</Link>

    </div>
  );
}

export default Buyers;