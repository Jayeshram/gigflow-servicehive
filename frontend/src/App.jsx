import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import Navbar from "./components/Navbar";
import ProtectedRoute from "./components/ProtectedRoute";

import Login from "./pages/Login";
import Register from "./pages/Register";
import Gigs from "./pages/Gigs";
import CreateGig from "./pages/CreateGig";
import GigDetails from "./pages/GigDetails";
import MyGigBids from "./pages/MyGigBids";

export default function App() {
  const user = localStorage.getItem("user");

  return (
    <BrowserRouter>
      {user && <Navbar />}

      <div className="max-w-6xl mx-auto px-4 py-6">
        <Routes>
          {/* ✅ Default */}
          <Route
            path="/"
            element={user ? <Navigate to="/gigs" replace /> : <Navigate to="/login" replace />}
          />

          {/* ✅ Auth */}
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          {/* ✅ Protected */}
          <Route
            path="/gigs"
            element={
              <ProtectedRoute>
                <Gigs />
              </ProtectedRoute>
            }
          />

          <Route
            path="/create-gig"
            element={
              <ProtectedRoute>
                <CreateGig />
              </ProtectedRoute>
            }
          />

          <Route
            path="/gigs/:id"
            element={
              <ProtectedRoute>
                <GigDetails />
              </ProtectedRoute>
            }
          />

          <Route
            path="/my-gigs/:gigId/bids"
            element={
              <ProtectedRoute>
                <MyGigBids />
              </ProtectedRoute>
            }
          />

          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}
