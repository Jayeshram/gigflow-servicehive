import { Link, NavLink, useNavigate } from "react-router-dom";
import api from "../api/axios";
import toast from "react-hot-toast";

export default function Navbar() {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user") || "null");

  const handleLogout = async () => {
    try {
      await api.post("/auth/logout");
    } catch (err) {}

    localStorage.removeItem("user");
    toast.success("Logged out ✅");
    navigate("/login");
    window.location.reload();
  };

  const navClass = ({ isActive }) =>
    `px-3 py-2 rounded-xl text-sm font-semibold transition ${
      isActive ? "bg-blue-600 text-white shadow-sm" : "text-gray-700 hover:bg-white/70"
    }`;

  return (
    <header className="sticky top-0 z-50 bg-white/70 backdrop-blur border-b">
      <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
        <Link to="/gigs" className="flex items-center gap-2">
          <div className="h-10 w-10 rounded-2xl bg-blue-600 text-white grid place-items-center font-extrabold shadow-sm">
            G
          </div>
          <div className="leading-tight">
            <p className="font-extrabold text-gray-900">GigFlow</p>
            <p className="text-xs text-gray-500">Mini Freelance Marketplace</p>
          </div>
        </Link>

        <nav className="flex items-center gap-2">
          <NavLink to="/gigs" className={navClass}>
            🧠 Gigs
          </NavLink>

          <NavLink to="/create-gig" className={navClass}>
            ✍️ Create
          </NavLink>

          {/* ✅ User chip */}
          {user && (
            <div className="hidden md:flex items-center gap-2 px-3 py-2 rounded-xl bg-white border shadow-sm">
              <span className="h-8 w-8 rounded-full bg-gray-900 text-white grid place-items-center font-bold">
                {user.name?.[0]?.toUpperCase()}
              </span>
              <div className="leading-tight">
                <p className="text-sm font-bold text-gray-900">{user.name}</p>
                <p className="text-xs text-gray-500">{user.email}</p>
              </div>
            </div>
          )}

          <button
            onClick={handleLogout}
            className="ml-1 px-4 py-2 rounded-xl text-sm font-extrabold bg-red-600 text-white hover:bg-red-700 transition shadow-sm"
          >
            Logout
          </button>
        </nav>
      </div>
    </header>
  );
}
