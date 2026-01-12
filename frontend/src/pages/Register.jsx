import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import api from "../api/axios";
import toast from "react-hot-toast";

export default function Register() {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(false);

  const handleRegister = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);
      const res = await api.post("/auth/register", { name, email, password });

      toast.success(res.data.message || "Registered ✅");
      navigate("/login");
    } catch (err) {
      toast.error(err.response?.data?.message || "Register failed");
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
            <div className="h-12 w-12 rounded-2xl bg-green-600 text-white grid place-items-center font-extrabold shadow">
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
          <h2 className="text-2xl font-extrabold text-gray-900">Create Account ✨</h2>
          <p className="text-gray-500 text-sm mt-1">
            Register to post gigs and start working with freelancers.
          </p>

          <form onSubmit={handleRegister} className="mt-6 space-y-4">
            <div>
              <label className="text-sm font-semibold text-gray-700">Name</label>
              <input
                className="mt-1 w-full rounded-xl border border-gray-200 px-4 py-3 outline-none focus:ring-2 focus:ring-green-500 bg-white"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Jayesh"
              />
            </div>

            <div>
              <label className="text-sm font-semibold text-gray-700">Email</label>
              <input
                className="mt-1 w-full rounded-xl border border-gray-200 px-4 py-3 outline-none focus:ring-2 focus:ring-green-500 bg-white"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="example@gmail.com"
              />
            </div>

            <div>
              <label className="text-sm font-semibold text-gray-700">Password</label>
              <input
                type="password"
                className="mt-1 w-full rounded-xl border border-gray-200 px-4 py-3 outline-none focus:ring-2 focus:ring-green-500 bg-white"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Minimum 6 characters"
              />
            </div>

            <button
              disabled={loading}
              className="w-full rounded-xl bg-green-600 text-white font-bold py-3 hover:bg-green-700 transition shadow"
            >
              {loading ? "Creating..." : "Register"}
            </button>
          </form>

          <p className="text-sm text-gray-600 mt-5 text-center">
            Already have an account?{" "}
            <Link to="/login" className="text-green-700 font-bold hover:underline">
              Login
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
