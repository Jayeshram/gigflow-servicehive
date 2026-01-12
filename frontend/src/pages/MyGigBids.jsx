import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../api/axios";
import PageWrapper from "../components/PageWrapper";
import Loading from "../components/Loading";
import toast from "react-hot-toast";

export default function MyGigBids() {
  const { gigId } = useParams();

  const [bids, setBids] = useState([]);
  const [loading, setLoading] = useState(true);
  const [hireLoading, setHireLoading] = useState(null);

  const fetchBids = async () => {
    try {
      setLoading(true);
      const res = await api.get(`/bids/${gigId}`);
      setBids(res.data);
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to fetch bids");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBids();
  }, [gigId]);

  const handleHire = async (bidId) => {
    try {
      setHireLoading(bidId);
      const res = await api.patch(`/bids/${bidId}/hire`);
      toast.success(res.data.message || "Freelancer hired ✅");
      fetchBids();
    } catch (err) {
      toast.error(err.response?.data?.message || "Hire failed");
    } finally {
      setHireLoading(null);
    }
  };

  return (
    <PageWrapper
      title="Bids"
      subtitle="Review bids and hire the best freelancer."
      icon="👨‍💻"
      accent="red"
    >
      {loading ? (
        <Loading text="Loading bids..." />
      ) : bids.length === 0 ? (
        <div className="bg-white border rounded-3xl p-10 text-center shadow-sm">
          <p className="text-gray-600 font-semibold">No bids found</p>
        </div>
      ) : (
        <div className="space-y-5">
          {bids.map((bid) => (
            <div
              key={bid._id}
              className="bg-white/80 backdrop-blur border border-white rounded-3xl shadow-sm hover:shadow-lg transition p-6"
            >
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                <div>
                  <p className="text-lg font-extrabold text-gray-900">
                    {bid.freelancerId?.name || "Freelancer"}
                  </p>
                  <p className="text-sm text-gray-500">{bid.freelancerId?.email}</p>

                  <p className="mt-3 text-gray-700 font-semibold">{bid.message}</p>
                </div>

                <div className="flex flex-col items-start md:items-end gap-3">
                  <p className="text-xl font-extrabold text-green-700">
                    ₹{bid.price}
                  </p>

                  {bid.status === "hired" ? (
                    <span className="px-4 py-2 rounded-full bg-green-100 text-green-800 font-extrabold text-sm">
                      ✅ Hired
                    </span>
                  ) : (
                    <button
                      disabled={hireLoading === bid._id}
                      onClick={() => handleHire(bid._id)}
                      className="px-5 py-3 rounded-2xl bg-red-600 text-white font-extrabold hover:bg-red-700 transition shadow"
                    >
                      {hireLoading === bid._id ? "Hiring..." : "Hire Freelancer"}
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </PageWrapper>
  );
}
