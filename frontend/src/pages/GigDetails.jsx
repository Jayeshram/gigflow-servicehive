import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../api/axios";
import PageWrapper from "../components/PageWrapper";
import Loading from "../components/Loading";
import toast from "react-hot-toast";

export default function GigDetails() {
  const { id } = useParams();

  const [gig, setGig] = useState(null);
  const [loading, setLoading] = useState(true);

  const [message, setMessage] = useState("");
  const [price, setPrice] = useState("");
  const [bidLoading, setBidLoading] = useState(false);

  const fetchGig = async () => {
    try {
      setLoading(true);
      const res = await api.get(`/gigs/${id}`);
      setGig(res.data);
    } catch (err) {
      toast.error("Failed to load gig");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchGig();
  }, [id]);

  const handleBid = async (e) => {
    e.preventDefault();

    try {
      setBidLoading(true);
      const res = await api.post("/bids", { gigId: id, message, price });

      toast.success(res.data.message || "Bid submitted ✅");
      setMessage("");
      setPrice("");
      fetchGig();
    } catch (err) {
      toast.error(err.response?.data?.message || "Bid failed");
    } finally {
      setBidLoading(false);
    }
  };

  return (
    <PageWrapper
      title="Gig Details"
      subtitle="Read details and place your bid."
      icon="📌"
      accent="slate"
    >
      {loading ? (
        <Loading text="Loading gig..." />
      ) : !gig ? (
        <div className="bg-white border rounded-3xl p-10 text-center shadow-sm">
          <p className="text-gray-600 font-semibold">Gig not found 😢</p>
        </div>
      ) : (
        <div className="grid lg:grid-cols-3 gap-6">
          {/* Gig Card */}
          <div className="lg:col-span-2 bg-white/80 backdrop-blur border border-white rounded-3xl shadow p-7">
            <h2 className="text-2xl font-extrabold text-gray-900">{gig.title}</h2>
            <p className="text-gray-600 mt-3 leading-relaxed">{gig.description}</p>

            <div className="mt-6 flex flex-wrap gap-3">
              <span className="px-4 py-2 rounded-full bg-gray-100 text-gray-700 font-bold text-sm">
                Status: {gig.status}
              </span>

              <span className="px-4 py-2 rounded-full bg-green-100 text-green-800 font-extrabold text-sm">
                Budget: ₹{gig.budget}
              </span>
            </div>
          </div>

          {/* Bid Form */}
          <div className="bg-white/80 backdrop-blur border border-white rounded-3xl shadow p-7">
            <h3 className="text-lg font-extrabold text-gray-900">Place a Bid</h3>
            <p className="text-sm text-gray-500 mt-1">
              Propose your timeline and expected cost.
            </p>

            <form onSubmit={handleBid} className="mt-5 space-y-4">
              <textarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                rows={4}
                className="w-full rounded-2xl border border-gray-200 px-4 py-3 outline-none focus:ring-2 focus:ring-slate-500 bg-white"
                placeholder="Ex: I can complete this in 2 days..."
              />

              <input
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                type="number"
                className="w-full rounded-2xl border border-gray-200 px-4 py-3 outline-none focus:ring-2 focus:ring-slate-500 bg-white"
                placeholder="Bid amount (INR)"
              />

              <button
                disabled={bidLoading}
                className="w-full rounded-2xl bg-gray-900 text-white font-extrabold py-3 hover:bg-black transition shadow"
              >
                {bidLoading ? "Submitting..." : "Submit Bid"}
              </button>
            </form>
          </div>
        </div>
      )}
    </PageWrapper>
  );
}
