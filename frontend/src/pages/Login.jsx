import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import api from "../api/axios";
import toast from "react-hot-toast";

export default function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);
      const res = await api.post("/auth/login", { email, password });

      localStorage.setItem("user", JSON.stringify(res.data.user));

      toast.success(res.data.message || "Login successful ✅");
      navigate("/gigs");
      window.location.reload();
    } catch (err) {
      toast.error(err.response?.data?.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="flex items-center justify-center mb-6">
          <div className="flex items-center gap-2">
            <div className="h-12 w-12 rounded-2xl bg-blue-600 text-white grid place-items-center font-extrabold shadow">
              G
            </div>
            <div>
              <h1 className="text-xl font-extrabold text-gray-900">GigFlow</h1>
              <p className="text-sm text-gray-500">Mini Freelance Marketplace</p>
            </div>
          </div>
        </div>

        {/* Card */}
        <div className="bg-white/90 backdrop-blur rounded-3xl shadow-xl border border-white p-7">
          <h2 className="text-2xl font-extrabold text-gray-900">Welcome Back 👋</h2>
          <p className="text-gray-500 text-sm mt-1">
            Login to create gigs, bid and hire freelancers.
          </p>

          <form onSubmit={handleLogin} className="mt-6 space-y-4">
            <div>
              <label className="text-sm font-semibold text-gray-700">Email</label>
              <input
                className="mt-1 w-full rounded-xl border border-gray-200 px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500 bg-white"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="example@gmail.com"
              />
            </div>

            <div>
              <label className="text-sm font-semibold text-gray-700">Password</label>
              <input
                type="password"
                className="mt-1 w-full rounded-xl border border-gray-200 px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500 bg-white"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="********"
              />
            </div>

            <button
              disabled={loading}
              className="w-full rounded-xl bg-blue-600 text-white font-bold py-3 hover:bg-blue-700 transition shadow"
            >
              {loading ? "Logging in..." : "Login"}
            </button>
          </form>

          <p className="text-sm text-gray-600 mt-5 text-center">
            Don’t have an account?{" "}
            <Link to="/register" className="text-blue-600 font-bold hover:underline">
              Register
            </Link>
          </p>
        </div>

        {/* Footer */}
        <p className="text-xs text-gray-500 text-center mt-6">
          © {new Date().getFullYear()} GigFlow — built for ServiceHive Assignment
        </p>
      </div>
    </div>
  );
}
