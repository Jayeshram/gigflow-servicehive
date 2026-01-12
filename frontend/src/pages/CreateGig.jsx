import { useState } from "react";
import api from "../api/axios";
import PageWrapper from "../components/PageWrapper";
import toast from "react-hot-toast";

export default function CreateGig() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [budget, setBudget] = useState("");

  const [loading, setLoading] = useState(false);

  const handleCreate = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);
      const res = await api.post("/gigs", { title, description, budget });

      toast.success(res.data.message || "Gig created ✅");

      setTitle("");
      setDescription("");
      setBudget("");
    } catch (err) {
      toast.error(err.response?.data?.message || "Create gig failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <PageWrapper
      title="Create a Gig"
      subtitle="Post gig and hire freelancers quickly."
      icon="📝"
      accent="orange"
    >
      <div className="grid place-items-center">
        <div className="w-full max-w-2xl bg-white/80 backdrop-blur border border-white rounded-3xl shadow-xl p-7">
          <form onSubmit={handleCreate} className="space-y-5">
            <div>
              <label className="text-sm font-bold text-gray-700">Title</label>
              <input
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="mt-1 w-full rounded-2xl border border-gray-200 px-4 py-3 outline-none focus:ring-2 focus:ring-orange-500 bg-white"
                placeholder="Ex: Build React website"
              />
            </div>

            <div>
              <label className="text-sm font-bold text-gray-700">
                Description
              </label>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                rows={5}
                className="mt-1 w-full rounded-2xl border border-gray-200 px-4 py-3 outline-none focus:ring-2 focus:ring-orange-500 bg-white"
                placeholder="Explain your project in detail..."
              />
            </div>

            <div>
              <label className="text-sm font-bold text-gray-700">
                Budget (INR)
              </label>
              <input
                value={budget}
                onChange={(e) => setBudget(e.target.value)}
                type="number"
                className="mt-1 w-full rounded-2xl border border-gray-200 px-4 py-3 outline-none focus:ring-2 focus:ring-orange-500 bg-white"
                placeholder="Ex: 5000"
              />
            </div>

            <button
              disabled={loading}
              className="w-full rounded-2xl bg-gradient-to-r from-orange-600 to-amber-600 text-white font-extrabold py-3 hover:opacity-95 transition shadow"
            >
              {loading ? "Creating..." : "Create Gig"}
            </button>
          </form>
        </div>
      </div>
    </PageWrapper>
  );
}
