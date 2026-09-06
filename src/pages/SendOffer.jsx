import {
  ArrowLeft,
  CheckCircle2,
  IndianRupee,
  MapPin,
  Package,
  Send,
  Sprout,
  Users,
} from "lucide-react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";

function SendOffer() {
  const location = useLocation();
  const navigate = useNavigate();

  const buyer = location.state?.buyer || {
    name: "FreshKart Foods",
    type: "Food Processing Company",
    location: "Delhi",
    offeredPrice: 3050,
  };

  const [form, setForm] = useState({
    crop: "Tomato",
    quantity: "",
    price: buyer.offeredPrice,
    message: "",
  });

  const [sent, setSent] = useState(false);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSent(true);
  };

  if (sent) {
    return (
      <div className="min-h-screen bg-[#f6f8f6]">
        <header className="border-b border-slate-200 bg-white">
          <div className="mx-auto flex h-20 max-w-5xl items-center px-5 sm:px-8">
            <Link to="/buyers" className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-green-600 text-white">
                <Sprout size={21} />
              </div>
              <h1 className="font-extrabold">
                FarmLink <span className="text-green-600">AI</span>
              </h1>
            </Link>
          </div>
        </header>

        <main className="flex min-h-[calc(100vh-80px)] items-center justify-center px-5 py-10">
          <div className="w-full max-w-xl rounded-3xl border border-slate-200 bg-white p-8 text-center shadow-xl sm:p-12">

            <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-green-100 text-green-600">
              <CheckCircle2 size={42} />
            </div>

            <p className="mt-7 text-sm font-bold uppercase tracking-[2px] text-green-600">
              Offer Sent
            </p>

            <h1 className="mt-3 text-3xl font-black">
              Your offer is on its way.
            </h1>

            <p className="mx-auto mt-4 max-w-md leading-7 text-slate-500">
              Your proposal has been prepared for{" "}
              <strong>{buyer.name}</strong>. The buyer can now review
              your quantity and offered price.
            </p>

            <div className="mt-7 rounded-2xl bg-green-50 p-5 text-left">

              <div className="flex justify-between">
                <span className="text-sm text-slate-500">
                  Produce
                </span>
                <span className="font-bold">
                  {form.crop}
                </span>
              </div>

              <div className="mt-3 flex justify-between">
                <span className="text-sm text-slate-500">
                  Quantity
                </span>
                <span className="font-bold">
                  {form.quantity} kg
                </span>
              </div>

              <div className="mt-3 flex justify-between">
                <span className="text-sm text-slate-500">
                  Offered price
                </span>
                <span className="font-bold text-green-700">
                  ₹{Number(form.price).toLocaleString("en-IN")} / quintal
                </span>
              </div>

            </div>

            <div className="mt-7 flex flex-col gap-3 sm:flex-row">
              <Link
                to="/buyers"
                className="flex flex-1 items-center justify-center rounded-xl border border-slate-200 px-5 py-3 font-bold text-slate-700 hover:bg-slate-50"
              >
                Find More Buyers
              </Link>

              <Link
                to="/dashboard"
                className="flex flex-1 items-center justify-center rounded-xl bg-green-600 px-5 py-3 font-bold text-white hover:bg-green-700"
              >
                Dashboard
              </Link>
            </div>

          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#f6f8f6] text-slate-900">

      <header className="border-b border-slate-200 bg-white">
        <div className="mx-auto flex h-20 max-w-5xl items-center justify-between px-5 sm:px-8">

          <Link to="/buyers" className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-green-600 text-white">
              <Sprout size={21} />
            </div>

            <div>
              <h1 className="font-extrabold">
                FarmLink <span className="text-green-600">AI</span>
              </h1>
              <p className="text-[9px] uppercase tracking-[2px] text-slate-400">
                Buyer Network
              </p>
            </div>
          </Link>

          <Link
            to="/buyers"
            className="flex items-center gap-2 text-sm font-semibold text-slate-500 hover:text-green-600"
          >
            <ArrowLeft size={17} />
            Back to Buyers
          </Link>

        </div>
      </header>

      <main className="mx-auto max-w-5xl px-5 py-10 sm:px-8">

        <div className="max-w-2xl">
          <div className="inline-flex items-center gap-2 rounded-full border border-green-200 bg-green-50 px-4 py-2 text-sm font-semibold text-green-700">
            <Send size={16} />
            Direct Market Link
          </div>

          <h1 className="mt-5 text-4xl font-black tracking-tight sm:text-5xl">
            Send a selling offer.
          </h1>

          <p className="mt-3 text-lg leading-7 text-slate-500">
            Create a proposal for your produce and send it directly
            to the buyer.
          </p>
        </div>

        <div className="mt-10 grid gap-6 lg:grid-cols-5">

          {/* FORM */}
          <form
            onSubmit={handleSubmit}
            className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8 lg:col-span-3"
          >

            <h2 className="text-xl font-bold">
              Your Offer
            </h2>

            <p className="mt-1 text-sm text-slate-400">
              Enter the details you want to propose.
            </p>

            <div className="mt-7 space-y-6">

              <div>
                <label className="text-sm font-bold">
                  Produce
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
                    className="w-full rounded-xl border border-slate-200 bg-white py-3.5 pl-10 pr-4 text-sm outline-none focus:border-green-500 focus:ring-4 focus:ring-green-500/10"
                  >
                    <option>Tomato</option>
                    <option>Potato</option>
                    <option>Onion</option>
                    <option>Wheat</option>
                    <option>Rice</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="text-sm font-bold">
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
                    className="w-full rounded-xl border border-slate-200 py-3.5 pl-10 pr-14 text-sm outline-none focus:border-green-500 focus:ring-4 focus:ring-green-500/10"
                  />

                  <span className="absolute right-4 top-1/2 -translate-y-1/2 text-sm text-slate-400">
                    kg
                  </span>
                </div>
              </div>

              <div>
                <label className="text-sm font-bold">
                  Your Offered Price
                </label>

                <div className="relative mt-2">
                  <IndianRupee
                    size={18}
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-green-600"
                  />

                  <input
                    required
                    type="number"
                    min="1"
                    name="price"
                    value={form.price}
                    onChange={handleChange}
                    className="w-full rounded-xl border border-slate-200 py-3.5 pl-10 pr-24 text-sm outline-none focus:border-green-500 focus:ring-4 focus:ring-green-500/10"
                  />

                  <span className="absolute right-4 top-1/2 -translate-y-1/2 text-sm text-slate-400">
                    / quintal
                  </span>
                </div>

                <p className="mt-2 text-xs text-slate-400">
                  Buyer's current indicative price is ₹
                  {buyer.offeredPrice.toLocaleString("en-IN")} / quintal.
                </p>
              </div>

              <div>
                <label className="text-sm font-bold">
                  Message
                  <span className="ml-1 font-normal text-slate-400">
                    (optional)
                  </span>
                </label>

                <textarea
                  name="message"
                  value={form.message}
                  onChange={handleChange}
                  rows="4"
                  placeholder="Add a note for the buyer..."
                  className="mt-2 w-full resize-none rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none focus:border-green-500 focus:ring-4 focus:ring-green-500/10"
                />
              </div>

            </div>

            <button
              type="submit"
              className="mt-8 flex w-full items-center justify-center gap-2 rounded-xl bg-green-600 py-4 font-bold text-white shadow-lg shadow-green-600/20 hover:bg-green-700"
            >
              <Send size={18} />
              Send Offer
            </button>

          </form>

          {/* BUYER */}
          <div className="space-y-6 lg:col-span-2">

            <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">

              <p className="text-xs font-bold uppercase tracking-[2px] text-green-600">
                Sending to
              </p>

              <div className="mt-5 flex items-center gap-4">

                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-green-100 text-xl font-black text-green-700">
                  {buyer.name.charAt(0)}
                </div>

                <div>
                  <h2 className="text-xl font-bold">
                    {buyer.name}
                  </h2>

                  <p className="text-sm text-slate-400">
                    {buyer.type}
                  </p>
                </div>

              </div>

              <div className="mt-5 flex items-center gap-2 text-sm text-slate-500">
                <MapPin size={16} className="text-green-600" />
                {buyer.location}
              </div>

              <div className="mt-5 flex items-center gap-2 rounded-xl bg-green-50 p-3 text-sm font-semibold text-green-700">
                <CheckCircle2 size={17} />
                Verified buyer
              </div>

            </div>

            <div className="rounded-2xl bg-slate-900 p-6 text-white">

              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-green-600">
                <Users size={20} />
              </div>

              <h3 className="mt-5 text-xl font-bold">
                Direct connection
              </h3>

              <p className="mt-3 text-sm leading-6 text-slate-400">
                FarmLink helps farmers communicate directly with
                buyers, reducing unnecessary intermediaries.
              </p>

              <div className="mt-5 space-y-3">

                <Info text="Verified buyer profiles" />
                <Info text="Transparent price offers" />
                <Info text="Direct farmer communication" />

              </div>

            </div>

          </div>

        </div>

      </main>
    </div>
  );
}

function Info({ text }) {
  return (
    <div className="flex items-center gap-2 text-sm text-slate-300">
      <CheckCircle2 size={16} className="text-green-400" />
      {text}
    </div>
  );
}

export default SendOffer;