import React, { useState } from "react";
import {
  ArrowLeft,
  Bell,
  Check,
  Globe,
  Lock,
  MapPin,
  Save,
  ShieldCheck,
  User,
  LogOut,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

function Toggle({ enabled, onChange }) {
  return (
    <button
      type="button"
      onClick={() => onChange(!enabled)}
      className={`relative h-6 w-11 rounded-full transition ${
        enabled ? "bg-green-600" : "bg-gray-300"
      }`}
    >
      <span
        className={`absolute top-1 h-4 w-4 rounded-full bg-white shadow transition ${
          enabled ? "left-6" : "left-1"
        }`}
      />
    </button>
  );
}

export default function Settings() {
  const navigate = useNavigate();

  const [saved, setSaved] = useState(false);

  const [settings, setSettings] = useState({
    priceAlerts: true,
    marketAlerts: true,
    buyerAlerts: true,
    aiRecommendations: true,
  });

  const [profile, setProfile] = useState({
    name: "Farmer",
    phone: "+91 98765 43210",
    location: "Greater Noida",
    language: "English",
  });

  const updateNotification = (key, value) => {
    setSettings((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const handleSave = () => {
    setSaved(true);

    setTimeout(() => {
      setSaved(false);
    }, 2500);
  };

  return (
    <div className="min-h-screen bg-[#f7faf8] text-gray-900">
      {/* Header */}
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
              <h1 className="text-lg font-black">Settings</h1>
              <p className="text-xs text-gray-500">
                Manage your FarmLink AI preferences
              </p>
            </div>
          </div>

          <button
            onClick={handleSave}
            className="flex items-center gap-2 rounded-xl bg-green-600 px-4 py-3 text-sm font-bold text-white shadow-lg shadow-green-600/20 transition hover:bg-green-700"
          >
            {saved ? <Check size={17} /> : <Save size={17} />}
            {saved ? "Saved" : "Save Changes"}
          </button>
        </div>
      </header>

      <main className="mx-auto max-w-5xl px-6 py-8 lg:px-8">
        {/* Hero */}
        <div className="mb-8 overflow-hidden rounded-3xl bg-gradient-to-br from-green-700 via-green-600 to-emerald-500 p-7 text-white shadow-xl shadow-green-900/10">
          <div className="flex items-center gap-5">
            <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-white/15 text-white backdrop-blur">
              <User size={32} />
            </div>

            <div>
              <p className="text-sm font-semibold text-green-100">
                Farmer Account
              </p>

              <h2 className="mt-1 text-3xl font-black">
                Welcome back, Farmer
              </h2>

              <p className="mt-1 text-sm text-green-50">
                Keep your FarmLink preferences up to date.
              </p>
            </div>
          </div>
        </div>

        <div className="space-y-6">
          {/* Profile */}
          <section className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
            <div className="mb-6 flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-green-50 text-green-600">
                <User size={19} />
              </div>

              <div>
                <h2 className="font-black">Profile Information</h2>
                <p className="text-xs text-gray-500">
                  Update your basic account details
                </p>
              </div>
            </div>

            <div className="grid gap-5 md:grid-cols-2">
              <div>
                <label className="mb-2 block text-xs font-bold text-gray-600">
                  Name
                </label>

                <input
                  value={profile.name}
                  onChange={(e) =>
                    setProfile({
                      ...profile,
                      name: e.target.value,
                    })
                  }
                  className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm font-medium outline-none transition focus:border-green-500 focus:bg-white"
                />
              </div>

              <div>
                <label className="mb-2 block text-xs font-bold text-gray-600">
                  Phone Number
                </label>

                <input
                  value={profile.phone}
                  onChange={(e) =>
                    setProfile({
                      ...profile,
                      phone: e.target.value,
                    })
                  }
                  className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm font-medium outline-none transition focus:border-green-500 focus:bg-white"
                />
              </div>

              <div>
                <label className="mb-2 flex items-center gap-1 text-xs font-bold text-gray-600">
                  <MapPin size={13} />
                  Farm Location
                </label>

                <input
                  value={profile.location}
                  onChange={(e) =>
                    setProfile({
                      ...profile,
                      location: e.target.value,
                    })
                  }
                  className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm font-medium outline-none transition focus:border-green-500 focus:bg-white"
                />
              </div>

              <div>
                <label className="mb-2 flex items-center gap-1 text-xs font-bold text-gray-600">
                  <Globe size={13} />
                  Language
                </label>

                <select
                  value={profile.language}
                  onChange={(e) =>
                    setProfile({
                      ...profile,
                      language: e.target.value,
                    })
                  }
                  className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm font-medium outline-none transition focus:border-green-500 focus:bg-white"
                >
                  <option>English</option>
                  <option>Hindi</option>
                  <option>Punjabi</option>
                  <option>Urdu</option>
                </select>
              </div>
            </div>
          </section>

          {/* Notifications */}
          <section className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
            <div className="mb-6 flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-green-50 text-green-600">
                <Bell size={19} />
              </div>

              <div>
                <h2 className="font-black">Notifications</h2>
                <p className="text-xs text-gray-500">
                  Choose which alerts you want to receive
                </p>
              </div>
            </div>

            <div className="divide-y divide-gray-100">
              <div className="flex items-center justify-between py-4">
                <div>
                  <p className="text-sm font-bold">Price Alerts</p>
                  <p className="mt-1 text-xs text-gray-500">
                    Get notified when crop prices change significantly.
                  </p>
                </div>

                <Toggle
                  enabled={settings.priceAlerts}
                  onChange={(value) =>
                    updateNotification("priceAlerts", value)
                  }
                />
              </div>

              <div className="flex items-center justify-between py-4">
                <div>
                  <p className="text-sm font-bold">Market Alerts</p>
                  <p className="mt-1 text-xs text-gray-500">
                    Receive important updates from nearby markets.
                  </p>
                </div>

                <Toggle
                  enabled={settings.marketAlerts}
                  onChange={(value) =>
                    updateNotification("marketAlerts", value)
                  }
                />
              </div>

              <div className="flex items-center justify-between py-4">
                <div>
                  <p className="text-sm font-bold">Buyer Alerts</p>
                  <p className="mt-1 text-xs text-gray-500">
                    Know when verified buyers are looking for your crops.
                  </p>
                </div>

                <Toggle
                  enabled={settings.buyerAlerts}
                  onChange={(value) =>
                    updateNotification("buyerAlerts", value)
                  }
                />
              </div>

              <div className="flex items-center justify-between py-4">
                <div>
                  <p className="text-sm font-bold">AI Recommendations</p>
                  <p className="mt-1 text-xs text-gray-500">
                    Receive personalized selling recommendations.
                  </p>
                </div>

                <Toggle
                  enabled={settings.aiRecommendations}
                  onChange={(value) =>
                    updateNotification("aiRecommendations", value)
                  }
                />
              </div>
            </div>
          </section>

          {/* Security */}
          <section className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
            <div className="mb-6 flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
                <ShieldCheck size={19} />
              </div>

              <div>
                <h2 className="font-black">Security & Privacy</h2>
                <p className="text-xs text-gray-500">
                  Manage your account security
                </p>
              </div>
            </div>

            <div className="space-y-3">
              <button className="flex w-full items-center justify-between rounded-xl border border-gray-100 p-4 text-left transition hover:bg-gray-50">
                <div className="flex items-center gap-3">
                  <Lock size={18} className="text-gray-500" />

                  <div>
                    <p className="text-sm font-bold">Change Password</p>
                    <p className="mt-1 text-xs text-gray-500">
                      Update your account password
                    </p>
                  </div>
                </div>

                <ArrowLeft
                  size={16}
                  className="rotate-180 text-gray-400"
                />
              </button>

              <button className="flex w-full items-center justify-between rounded-xl border border-gray-100 p-4 text-left transition hover:bg-gray-50">
                <div className="flex items-center gap-3">
                  <ShieldCheck size={18} className="text-gray-500" />

                  <div>
                    <p className="text-sm font-bold">
                      Data & Privacy
                    </p>
                    <p className="mt-1 text-xs text-gray-500">
                      Manage how your FarmLink data is used
                    </p>
                  </div>
                </div>

                <ArrowLeft
                  size={16}
                  className="rotate-180 text-gray-400"
                />
              </button>
            </div>
          </section>

          {/* Logout */}
          <section className="rounded-2xl border border-red-100 bg-red-50 p-6">
            <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
              <div>
                <h2 className="font-black text-red-900">
                  Sign out of FarmLink
                </h2>

                <p className="mt-1 text-sm text-red-700">
                  You can sign back in anytime to access your farm data.
                </p>
              </div>

              <button
                onClick={() => navigate("/")}
                className="flex items-center justify-center gap-2 rounded-xl border border-red-200 bg-white px-5 py-3 text-sm font-bold text-red-600 transition hover:bg-red-100"
              >
                <LogOut size={17} />
                Sign Out
              </button>
            </div>
          </section>
        </div>

        {/* Footer */}
        <div className="py-8 text-center text-xs text-gray-400">
          FarmLink AI · Smart Market Linkage for Farmers
        </div>
      </main>
    </div>
  );
}