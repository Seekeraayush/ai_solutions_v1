import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { ROUTES } from "../constants/routes";
import { Lock, User, Loader2, Cpu, AlertCircle } from "lucide-react";
import { motion } from "framer-motion";

const AdminLogin = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const { login, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  // Redirect if already logged in
  useEffect(() => {
    if (isAuthenticated) {
      navigate(ROUTES.ADMIN_DASHBOARD);
    }
  }, [isAuthenticated, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    if (!username || !password) {
      setError("Please fill in all fields.");
      setLoading(false);
      return;
    }

    const result = await login(username, password);
    if (result.success) {
      navigate(ROUTES.ADMIN_DASHBOARD);
    } else {
      setError(result.error);
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-6 pt-24 pb-12 relative overflow-hidden bg-slate-50">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="max-w-md w-full glass-card p-8 md:p-10 rounded-3xl border border-navy-100 shadow-xl bg-white/80 z-10"
      >
        <div className="flex flex-col items-center mb-8">
          <div className="w-12 h-12 rounded-full bg-primary flex items-center justify-center text-white mb-3 shadow-lg shadow-blue-500/20">
            <Cpu size={24} />
          </div>
          <h1 className="font-outfit font-extrabold text-2xl text-navy-900 tracking-tight">
            Admin Access
          </h1>
          <p className="text-navy-500 text-xs mt-1">
            Sign in to manage inquiries and gallery items.
          </p>
        </div>

        {error && (
          <div className="mb-6 p-4 rounded-xl bg-red-500/10 border border-red-500/20 text-red-700 text-sm flex items-center gap-2 text-left">
            <AlertCircle size={16} className="shrink-0" />
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="flex flex-col gap-4 text-left">
          {/* Username */}
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-bold text-navy-800 uppercase tracking-wider">
              Username
            </label>
            <div className="flex items-center bg-white border border-navy-150 rounded-xl px-4 py-3 shadow-inner focus-within:border-primary transition-all">
              <User size={16} className="text-navy-400 mr-2 shrink-0" />
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="e.g. admin"
                className="w-full bg-transparent border-none text-navy-900 text-sm outline-none placeholder-navy-300"
                required
              />
            </div>
          </div>

          {/* Password */}
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-bold text-navy-800 uppercase tracking-wider">
              Password
            </label>
            <div className="flex items-center bg-white border border-navy-150 rounded-xl px-4 py-3 shadow-inner focus-within:border-primary transition-all">
              <Lock size={16} className="text-navy-400 mr-2 shrink-0" />
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full bg-transparent border-none text-navy-900 text-sm outline-none placeholder-navy-300"
                required
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="btn-primary py-3.5 mt-4 text-sm flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
          >
            {loading ? (
              <>
                <Loader2 className="animate-spin" size={16} />
                Authenticating...
              </>
            ) : (
              "Sign In to Dashboard"
            )}
          </button>
        </form>
      </motion.div>

      {/* Background decoration */}
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-primary/5 rounded-full filter blur-3xl -z-10 pointer-events-none" />
    </div>
  );
};

export default AdminLogin;
