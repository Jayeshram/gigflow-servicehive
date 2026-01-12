import { Link } from "react-router-dom";

export default function GigCard({ gig, showOwnerActions = false }) {
  return (
    <div className="bg-white/80 backdrop-blur border border-white rounded-3xl shadow-sm hover:shadow-lg transition overflow-hidden">
      {/* Top stripe */}
      <div className="h-2 bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600" />

      <div className="p-6">
        <div className="flex items-start justify-between gap-4">
          <div>
            <h3 className="text-lg font-extrabold text-gray-900">{gig.title}</h3>
            <p className="text-gray-600 text-sm mt-2 line-clamp-2">
              {gig.description}
            </p>
          </div>

          <div className="px-3 py-1 rounded-full text-xs font-bold bg-gray-100 text-gray-700">
            {gig.status}
          </div>
        </div>

        <div className="mt-5 flex items-center justify-between">
          <p className="font-extrabold text-green-700 text-lg">
            ₹{gig.budget}
          </p>

          <div className="flex gap-2">
            <Link
              to={`/gigs/${gig._id}`}
              className="px-4 py-2 rounded-xl text-sm font-bold bg-blue-600 text-white hover:bg-blue-700 transition"
            >
              View
            </Link>

            {showOwnerActions && (
              <Link
                to={`/my-gigs/${gig._id}/bids`}
                className="px-4 py-2 rounded-xl text-sm font-bold bg-gray-900 text-white hover:bg-black transition"
              >
                Bids
              </Link>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}