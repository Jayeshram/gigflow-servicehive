import { useEffect, useState } from "react";
import api from "../api/axios";
import PageWrapper from "../components/PageWrapper";
import Loading from "../components/Loading";
import GigCard from "../components/GigCard";
import toast from "react-hot-toast";

export default function Gigs() {
  const [gigs, setGigs] = useState([]);
  const [loading, setLoading] = useState(true);

  const [search, setSearch] = useState("");

  const user = JSON.parse(localStorage.getItem("user") || "null");

  const fetchGigs = async () => {
    try {
      setLoading(true);
      const res = await api.get("/gigs");
      setGigs(res.data);
    } catch (err) {
      toast.error("Failed to load gigs");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchGigs();
  }, []);

  const filtered = gigs.filter((g) =>
    g.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <PageWrapper
      title="Browse Gigs"
      subtitle="Find projects and place bids instantly."
      icon="🧠"
      accent="purple"
    >
      {/* Search */}
      <div className="bg-white/70 backdrop-blur border border-white rounded-3xl p-5 shadow-sm mb-6">
        <div className="flex flex-col md:flex-row gap-3 md:items-center md:justify-between">
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search gigs (ex: react, node...)"
            className="w-full md:max-w-xl rounded-2xl border border-gray-200 px-4 py-3 outline-none focus:ring-2 focus:ring-purple-500 bg-white"
          />

          <button
            onClick={fetchGigs}
            className="px-5 py-3 rounded-2xl font-extrabold bg-gray-900 text-white hover:bg-black transition"
          >
            Refresh
          </button>
        </div>
      </div>

      {/* List */}
      {loading ? (
        <Loading text="Fetching gigs..." />
      ) : filtered.length === 0 ? (
        <div className="bg-white rounded-3xl border p-10 text-center shadow-sm">
          <p className="text-gray-600 font-semibold">No gigs found 😢</p>
        </div>
      ) : (
        <div className="grid md:grid-cols-2 gap-6">
          {filtered.map((gig) => (
            <GigCard
              key={gig._id}
              gig={gig}
              showOwnerActions={user?.id === gig.ownerId}
            />
          ))}
        </div>
      )}
    </PageWrapper>
  );
}
