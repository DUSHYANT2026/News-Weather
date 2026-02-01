import { NavLink } from "react-router-dom";
import { useCallback } from "react";
import { useTheme } from "../../ThemeContext";
import { Github, Linkedin, ArrowUpRight, Mail, Phone } from "lucide-react";

const NAVIGATION_LINKS = [
  { path: "/", label: "Home" },
  { path: "/about", label: "About" },
  { path: "/contact", label: "Contact" },
];

const SOCIAL_LINKS = [
  {
    name: "GitHub",
    url: "https://github.com/DUSHYANT2026",
    icon: Github,
  },
  {
    name: "LinkedIn",
    url: "https://www.linkedin.com/in/dushyant-kumar-b8594a251/",
    icon: Linkedin,
  },
];

const QUICK_LINKS = [
  { label: "Privacy Policy", url: "#" },
  { label: "Terms of Service", url: "#" },
  { label: "Contact Us", url: "#" },
];

export default function Footer() {
  const currentYear = new Date().getFullYear();
  const { darkMode } = useTheme();

  const scrollToTop = useCallback(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  return (
    <footer className={`relative mt-20 ${darkMode ? 'bg-slate-950' : 'bg-white'}`}>
      {/* Background gradient - adapts to theme */}
      <div 
        className={`absolute inset-0 rounded-t-3xl ${
          darkMode 
            ? 'bg-gradient-to-r from-purple-900 via-slate-900 to-purple-900 opacity-90' 
            : 'bg-gradient-to-r from-violet-600 via-purple-500 to-fuchsia-500 opacity-80'
        }`} 
      />

      {/* Glass container */}
      <div className={`relative backdrop-blur-xl rounded-t-3xl px-6 sm:px-8 py-12 sm:py-16 border ${
        darkMode
          ? 'bg-slate-900/40 border-purple-500/30 text-white'
          : 'bg-white/10 border-white/20 text-white'
      }`}>
        <div className="max-w-7xl mx-auto">
          {/* Main Grid */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">

            {/* Brand Section */}
            <div className="md:col-span-1">
              <h2 className={`text-3xl font-bold tracking-tight mb-3 ${
                darkMode
                  ? 'bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent'
                  : 'bg-gradient-to-r from-white to-white/80 bg-clip-text text-transparent'
              }`}>
                News-Weather
              </h2>
              <p className={`text-sm leading-relaxed max-w-xs ${
                darkMode ? 'text-gray-400' : 'text-white/70'
              }`}>
                Stay informed with real-time news and weather updates delivered instantly.
              </p>
            </div>

            {/* Navigation Links */}
            <div>
              <h3 className={`text-lg font-semibold mb-4 ${
                darkMode ? 'text-blue-300' : 'text-white'
              }`}>Quick Links</h3>
              <ul className="space-y-2.5">
                {NAVIGATION_LINKS.map((link) => (
                  <li key={link.path}>
                    <NavLink
                      to={link.path}
                      onClick={scrollToTop}
                      className={`text-sm font-medium transition-all duration-200 flex items-center group ${
                        darkMode
                          ? 'text-gray-400 hover:text-blue-300'
                          : 'text-white/70 hover:text-white'
                      } focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 rounded px-2 py-1`}
                      aria-label={`Navigate to ${link.label}`}
                    >
                      <span className="group-hover:translate-x-1 transition-transform">→</span>
                      <span className="ml-2">{link.label}</span>
                    </NavLink>
                  </li>
                ))}
              </ul>
            </div>

            {/* Additional Links */}
            <div>
              <h3 className={`text-lg font-semibold mb-4 ${
                darkMode ? 'text-blue-300' : 'text-white'
              }`}>Legal</h3>
              <ul className="space-y-2.5">
                {QUICK_LINKS.map((link, index) => (
                  <li key={index}>
                    <a
                      href={link.url}
                      className={`text-sm font-medium transition-all duration-200 flex items-center group ${
                        darkMode
                          ? 'text-gray-400 hover:text-blue-300'
                          : 'text-white/70 hover:text-white'
                      } focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 rounded px-2 py-1`}
                    >
                      <span className="group-hover:translate-x-1 transition-transform">→</span>
                      <span className="ml-2">{link.label}</span>
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Social & Contact */}
            <div>
              <h3 className={`text-lg font-semibold mb-4 ${
                darkMode ? 'text-blue-300' : 'text-white'
              }`}>Connect</h3>
              <div className="flex gap-3 mb-5">
                {SOCIAL_LINKS.map((social) => {
                  const IconComponent = social.icon;
                  return (
                    <a
                      key={social.name}
                      href={social.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`Visit our ${social.name} profile`}
                      className={`p-2.5 rounded-full transition-all duration-200 transform hover:scale-110 focus:outline-none focus:ring-2 focus:ring-offset-2 ${
                        darkMode
                          ? 'bg-purple-500/20 hover:bg-purple-500/40 focus:ring-purple-400'
                          : 'bg-white/10 hover:bg-white/20 focus:ring-white'
                      }`}
                    >
                      <IconComponent size={18} aria-hidden="true" />
                    </a>
                  );
                })}
              </div>
              <p className={`text-xs ${darkMode ? 'text-gray-500' : 'text-white/60'}`}>
                Follow us on social media
              </p>
            </div>
          </div>

          {/* Divider */}
          <div className={`my-8 border-t ${
            darkMode ? 'border-purple-500/20' : 'border-white/20'
          }`} />

          {/* Bottom Bar */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="text-center sm:text-left">
              <p className={`text-xs sm:text-sm font-medium ${
                darkMode ? 'text-gray-400' : 'text-white/70'
              }`}>
                © {currentYear} News-Weather. All rights reserved.
              </p>
              <p className={`text-xs mt-1 ${
                darkMode ? 'text-gray-500' : 'text-white/50'
              }`}>
                Built with ❤️ for news and weather enthusiasts
              </p>
            </div>

            <button
              onClick={scrollToTop}
              aria-label="Scroll to top of page"
              className={`flex items-center gap-2 text-sm font-medium rounded-full px-4 py-2 transition-all duration-200 transform hover:scale-105 active:scale-95 focus:outline-none focus:ring-2 focus:ring-offset-2 ${
                darkMode
                  ? 'bg-purple-500/30 text-blue-300 hover:bg-purple-500/50 focus:ring-purple-400'
                  : 'bg-white/20 text-white hover:bg-white/30 focus:ring-white'
              }`}
            >
              Back to top <ArrowUpRight size={16} aria-hidden="true" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
