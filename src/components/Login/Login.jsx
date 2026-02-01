import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useTheme } from "../../ThemeContext";
import { Eye, EyeOff, Mail, Lock, User } from "lucide-react";

export default function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const navigate = useNavigate();
  const { darkMode } = useTheme();

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!name.trim()) {
      return setError("Please enter your full name");
    }
    
    if (password !== confirmPassword) {
      return setError("Passwords do not match");
    }

    if (password.length < 6) {
      return setError("Password must be at least 6 characters");
    }
    
    try {
      setError("");
      setLoading(true);
      // await register(name, email, password);
      navigate("/");
    } catch (err) {
      setError("Failed to create an account");
      console.error(err);
    }
    setLoading(false);
  };

  return (
    <div
      className={`min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 relative overflow-hidden ${
        darkMode 
          ? "bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900" 
          : "bg-gradient-to-br from-orange-50 via-purple-50 to-pink-50"
      }`}
    >
      {/* Animated background elements */}
      <div className="absolute top-0 left-0 w-96 h-96 rounded-full opacity-20 blur-3xl animate-pulse" 
        style={{background: darkMode ? 'rgba(168, 85, 247, 0.5)' : 'rgba(249, 115, 22, 0.3)'}}
      />
      <div className="absolute bottom-0 right-0 w-96 h-96 rounded-full opacity-20 blur-3xl animate-pulse" 
        style={{background: darkMode ? 'rgba(139, 92, 246, 0.5)' : 'rgba(236, 72, 153, 0.3)', animationDelay: '1s'}}
      />

      <div className="max-w-md w-full space-y-8 relative z-10">
        {/* Header */}
        <div className="text-center">
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-gradient-to-r from-orange-500 to-purple-600 mb-4 shadow-lg">
            <span className="text-2xl">📰</span>
          </div>
          <h2
            className={`text-4xl font-bold mb-2 bg-clip-text text-transparent ${
              darkMode 
                ? "bg-gradient-to-r from-purple-400 via-pink-400 to-purple-400" 
                : "bg-gradient-to-r from-orange-600 via-pink-600 to-purple-600"
            }`}
          >
            News-Weather
          </h2>
          <p
            className={`text-sm ${
              darkMode ? "text-gray-400" : "text-gray-600"
            }`}
          >
            Create your account to get started
          </p>
        </div>

        {/* Error Alert */}
        {error && (
          <div
            className={`p-4 rounded-lg backdrop-blur-sm border ${
              darkMode 
                ? "bg-red-900/20 border-red-700/50 text-red-300" 
                : "bg-red-100/50 border-red-200 text-red-700"
            } flex items-start gap-3 animate-shake`}
          >
            <span className="text-xl mt-0.5">⚠️</span>
            <p className="text-sm font-medium">{error}</p>
          </div>
        )}

        {/* Form Container */}
        <form
          className={`mt-8 space-y-5 p-8 rounded-2xl backdrop-blur-xl border ${
            darkMode 
              ? "bg-slate-800/40 border-purple-500/30 shadow-2xl" 
              : "bg-white/50 border-white/60 shadow-2xl"
          }`}
          onSubmit={handleSubmit}
        >
          {/* Full Name Input */}
          <div>
            <label
              htmlFor="name"
              className={`block text-sm font-semibold mb-2 ${
                darkMode ? "text-gray-300" : "text-gray-700"
              }`}
            >
              Full Name
            </label>
            <div className={`relative flex items-center border rounded-lg transition-all focus-within:ring-2 ${
              darkMode
                ? "border-gray-600 focus-within:ring-purple-500 focus-within:border-purple-500 bg-gray-700/30"
                : "border-gray-300 focus-within:ring-orange-400 focus-within:border-orange-400 bg-white/50"
            }`}>
              <User className={`absolute left-3 w-5 h-5 ${darkMode ? 'text-gray-500' : 'text-gray-400'}`} />
              <input
                id="name"
                name="name"
                type="text"
                autoComplete="name"
                required
                placeholder="John Doe"
                className={`appearance-none w-full pl-10 pr-3 py-2.5 rounded-lg focus:outline-none text-sm font-medium ${
                  darkMode
                    ? "bg-transparent text-white placeholder-gray-500"
                    : "bg-transparent text-gray-900 placeholder-gray-400"
                }`}
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
          </div>

          {/* Email Input */}
          <div>
            <label
              htmlFor="email"
              className={`block text-sm font-semibold mb-2 ${
                darkMode ? "text-gray-300" : "text-gray-700"
              }`}
            >
              Email Address
            </label>
            <div className={`relative flex items-center border rounded-lg transition-all focus-within:ring-2 ${
              darkMode
                ? "border-gray-600 focus-within:ring-purple-500 focus-within:border-purple-500 bg-gray-700/30"
                : "border-gray-300 focus-within:ring-orange-400 focus-within:border-orange-400 bg-white/50"
            }`}>
              <Mail className={`absolute left-3 w-5 h-5 ${darkMode ? 'text-gray-500' : 'text-gray-400'}`} />
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                placeholder="you@example.com"
                className={`appearance-none w-full pl-10 pr-3 py-2.5 rounded-lg focus:outline-none text-sm font-medium ${
                  darkMode
                    ? "bg-transparent text-white placeholder-gray-500"
                    : "bg-transparent text-gray-900 placeholder-gray-400"
                }`}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
          </div>

          {/* Password Input */}
          <div>
            <label
              htmlFor="password"
              className={`block text-sm font-semibold mb-2 ${
                darkMode ? "text-gray-300" : "text-gray-700"
              }`}
            >
              Password
            </label>
            <div className={`relative flex items-center border rounded-lg transition-all focus-within:ring-2 ${
              darkMode
                ? "border-gray-600 focus-within:ring-purple-500 focus-within:border-purple-500 bg-gray-700/30"
                : "border-gray-300 focus-within:ring-orange-400 focus-within:border-orange-400 bg-white/50"
            }`}>
              <Lock className={`absolute left-3 w-5 h-5 ${darkMode ? 'text-gray-500' : 'text-gray-400'}`} />
              <input
                id="password"
                name="password"
                type={showPassword ? "text" : "password"}
                autoComplete="new-password"
                required
                placeholder="••••••••"
                className={`appearance-none w-full pl-10 pr-10 py-2.5 rounded-lg focus:outline-none text-sm font-medium ${
                  darkMode
                    ? "bg-transparent text-white placeholder-gray-500"
                    : "bg-transparent text-gray-900 placeholder-gray-400"
                }`}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className={`absolute right-3 p-1 ${darkMode ? 'text-gray-500 hover:text-gray-400' : 'text-gray-400 hover:text-gray-500'}`}
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>

          {/* Confirm Password Input */}
          <div>
            <label
              htmlFor="confirm-password"
              className={`block text-sm font-semibold mb-2 ${
                darkMode ? "text-gray-300" : "text-gray-700"
              }`}
            >
              Confirm Password
            </label>
            <div className={`relative flex items-center border rounded-lg transition-all focus-within:ring-2 ${
              darkMode
                ? "border-gray-600 focus-within:ring-purple-500 focus-within:border-purple-500 bg-gray-700/30"
                : "border-gray-300 focus-within:ring-orange-400 focus-within:border-orange-400 bg-white/50"
            }`}>
              <Lock className={`absolute left-3 w-5 h-5 ${darkMode ? 'text-gray-500' : 'text-gray-400'}`} />
              <input
                id="confirm-password"
                name="confirm-password"
                type={showConfirmPassword ? "text" : "password"}
                autoComplete="new-password"
                required
                placeholder="••••••••"
                className={`appearance-none w-full pl-10 pr-10 py-2.5 rounded-lg focus:outline-none text-sm font-medium ${
                  darkMode
                    ? "bg-transparent text-white placeholder-gray-500"
                    : "bg-transparent text-gray-900 placeholder-gray-400"
                }`}
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className={`absolute right-3 p-1 ${darkMode ? 'text-gray-500 hover:text-gray-400' : 'text-gray-400 hover:text-gray-500'}`}
              >
                {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className={`w-full py-3 px-4 mt-6 text-sm font-semibold rounded-lg transition-all duration-200 transform ${
              loading
                ? "opacity-70 cursor-not-allowed"
                : "hover:scale-105 active:scale-95"
            } ${
              darkMode
                ? "bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white shadow-lg"
                : "bg-gradient-to-r from-orange-500 to-purple-600 hover:from-orange-600 hover:to-purple-700 text-white shadow-lg"
            }`}
          >
            {loading ? (
              <span className="flex items-center justify-center gap-2">
                <span className="animate-spin">⚡</span>
                Creating account...
              </span>
            ) : (
              "Create Account"
            )}
          </button>
        </form>

        {/* Login Link */}
        <p className={`text-center text-sm ${darkMode ? "text-gray-400" : "text-gray-600"}`}>
          Already have an account?{" "}
          <Link
            to="/login"
            className={`font-semibold transition-colors hover:underline ${
              darkMode
                ? "text-purple-400 hover:text-purple-300"
                : "text-orange-600 hover:text-orange-700"
            }`}
          >
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );
}