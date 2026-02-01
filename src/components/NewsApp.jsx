import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useTheme } from '../ThemeContext';
import { Search, Zap } from 'lucide-react';

function NewsApp() {
  const [articles, setArticles] = useState([]);
  const [category, setCategory] = useState('general');
  const [searchQuery, setSearchQuery] = useState('');
  const [currentTime, setCurrentTime] = useState('');
  const [currentDate, setCurrentDate] = useState('');
  const [currentDay, setCurrentDay] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [country, setCountry] = useState('us');
  const { darkMode } = useTheme();

  const categories = [
    { id: 'general', name: 'General', icon: '🌐' },
    { id: 'business', name: 'Business', icon: '💼' },
    { id: 'technology', name: 'Technology', icon: '💻' },
    { id: 'sports', name: 'Sports', icon: '⚽' },
    { id: 'entertainment', name: 'Entertainment', icon: '🎬' },
    { id: 'health', name: 'Health', icon: '🏥' },
    { id: 'science', name: 'Science', icon: '🔬' },
  ];

  useEffect(() => {
    const updateDateTime = () => {
      const now = new Date();
      const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
      const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
      
      const day = days[now.getDay()];
      const month = months[now.getMonth()];
      const date = now.getDate();
      const year = now.getFullYear();
      const hours = String(now.getHours()).padStart(2, '0');
      const minutes = String(now.getMinutes()).padStart(2, '0');
      const seconds = String(now.getSeconds()).padStart(2, '0');
      
      setCurrentDay(day);
      setCurrentDate(`${month} ${date}, ${year}`);
      setCurrentTime(`${hours}:${minutes}:${seconds}`);
    };

    updateDateTime();
    const interval = setInterval(updateDateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  const getDemoArticles = (cat) => {
    const demoData = {
      general: [
        {
          title: "Breaking: Global Summit Addresses Climate and Economic Challenges",
          description: "World leaders convene for historic discussions on sustainable development, climate action, and international cooperation in the face of global challenges.",
          url: "#",
          urlToImage: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=800&h=600&fit=crop",
          publishedAt: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
          source: { name: "Global News Network" }
        },
        {
          title: "Major Infrastructure Project Announced to Connect Cities",
          description: "Government unveils ambitious plan for high-speed transportation network that will revolutionize travel and boost economic development across regions.",
          url: "#",
          urlToImage: "https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=800&h=600&fit=crop",
          publishedAt: new Date(Date.now() - 5 * 60 * 60 * 1000).toISOString(),
          source: { name: "National Post" }
        },
        {
          title: "Cultural Festival Celebrates Diversity and Innovation",
          description: "Annual international festival showcases art, music, and technology from around the world, attracting millions of visitors and participants.",
          url: "#",
          urlToImage: "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=800&h=600&fit=crop",
          publishedAt: new Date(Date.now() - 8 * 60 * 60 * 1000).toISOString(),
          source: { name: "Culture Today" }
        }
      ],
      business: [
        {
          title: "Tech Giants Announce Record-Breaking Quarterly Earnings",
          description: "Major technology companies report exceptional performance driven by AI innovation and cloud services, exceeding analyst expectations significantly.",
          url: "#",
          urlToImage: "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=800&h=600&fit=crop",
          publishedAt: new Date(Date.now() - 1 * 60 * 60 * 1000).toISOString(),
          source: { name: "Financial Times" }
        },
        {
          title: "Startup Unicorns: New Wave of Billion-Dollar Companies Emerge",
          description: "Latest funding rounds create several new unicorn startups in fintech, healthcare, and sustainable energy sectors, marking robust investor confidence.",
          url: "#",
          urlToImage: "https://images.unsplash.com/photo-1559526324-4b87b5e36e44?w=800&h=600&fit=crop",
          publishedAt: new Date(Date.now() - 3 * 60 * 60 * 1000).toISOString(),
          source: { name: "Business Insider" }
        },
        {
          title: "Global Markets Rally on Positive Economic Indicators",
          description: "Stock markets worldwide surge as new economic data reveals strong growth, low unemployment, and controlled inflation across major economies.",
          url: "#",
          urlToImage: "https://images.unsplash.com/photo-1590283603385-17ffb3a7f29f?w=800&h=600&fit=crop",
          publishedAt: new Date(Date.now() - 6 * 60 * 60 * 1000).toISOString(),
          source: { name: "Bloomberg" }
        }
      ],
      technology: [
        {
          title: "Revolutionary AI System Achieves Breakthrough in Scientific Research",
          description: "New artificial intelligence platform demonstrates unprecedented capabilities in analyzing complex data, potentially accelerating discoveries across multiple scientific fields.",
          url: "#",
          urlToImage: "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800&h=600&fit=crop",
          publishedAt: new Date(Date.now() - 1.5 * 60 * 60 * 1000).toISOString(),
          source: { name: "TechCrunch" }
        },
        {
          title: "Next-Generation Quantum Computers Show Commercial Promise",
          description: "Major tech firms unveil quantum computing advances that bring practical applications closer to reality, with potential to transform industries.",
          url: "#",
          urlToImage: "https://images.unsplash.com/photo-1635070041078-e363dbe005cb?w=800&h=600&fit=crop",
          publishedAt: new Date(Date.now() - 4 * 60 * 60 * 1000).toISOString(),
          source: { name: "Wired" }
        },
        {
          title: "Space Technology: Private Companies Launch New Satellites",
          description: "Commercial space ventures successfully deploy advanced satellite networks for global internet coverage and Earth observation capabilities.",
          url: "#",
          urlToImage: "https://images.unsplash.com/photo-1446776653964-20c1d3a81b06?w=800&h=600&fit=crop",
          publishedAt: new Date(Date.now() - 7 * 60 * 60 * 1000).toISOString(),
          source: { name: "Space News" }
        }
      ],
      sports: [
        {
          title: "Championship Finals Deliver Thrilling Overtime Victory",
          description: "Historic sporting event concludes with dramatic finish as underdogs claim championship title in stunning upset, breaking multiple records.",
          url: "#",
          urlToImage: "https://images.unsplash.com/photo-1461896836934-ffe607ba8211?w=800&h=600&fit=crop",
          publishedAt: new Date(Date.now() - 2.5 * 60 * 60 * 1000).toISOString(),
          source: { name: "ESPN" }
        },
        {
          title: "Olympic Athlete Breaks World Record in Spectacular Fashion",
          description: "Rising star shatters long-standing world record with incredible performance, marking new era in competitive athletics.",
          url: "#",
          urlToImage: "https://images.unsplash.com/photo-1552674605-db6ffd4facb5?w=800&h=600&fit=crop",
          publishedAt: new Date(Date.now() - 5.5 * 60 * 60 * 1000).toISOString(),
          source: { name: "Sports Illustrated" }
        },
        {
          title: "Major League Announces Expansion and Schedule Changes",
          description: "Professional sports league reveals plans for international expansion and innovative season format to increase fan engagement globally.",
          url: "#",
          urlToImage: "https://images.unsplash.com/photo-1579952363873-27f3bade9f55?w=800&h=600&fit=crop",
          publishedAt: new Date(Date.now() - 9 * 60 * 60 * 1000).toISOString(),
          source: { name: "The Athletic" }
        }
      ],
      entertainment: [
        {
          title: "Blockbuster Film Breaks Box Office Records Worldwide",
          description: "Latest cinematic release shatters opening weekend records, earning critical acclaim and massive audience support across international markets.",
          url: "#",
          urlToImage: "https://images.unsplash.com/photo-1478720568477-152d9b164e26?w=800&h=600&fit=crop",
          publishedAt: new Date(Date.now() - 3 * 60 * 60 * 1000).toISOString(),
          source: { name: "Variety" }
        },
        {
          title: "Music Festival Lineup Announced with Legendary Headliners",
          description: "Highly anticipated summer festival reveals star-studded roster featuring iconic artists and exciting newcomers for multi-day celebration.",
          url: "#",
          urlToImage: "https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?w=800&h=600&fit=crop",
          publishedAt: new Date(Date.now() - 6.5 * 60 * 60 * 1000).toISOString(),
          source: { name: "Rolling Stone" }
        },
        {
          title: "Streaming Platform Premieres Award-Winning Original Series",
          description: "New critically acclaimed drama series debuts to massive viewership, featuring ensemble cast and groundbreaking storytelling approach.",
          url: "#",
          urlToImage: "https://images.unsplash.com/photo-1522869635100-9f4c5e86aa37?w=800&h=600&fit=crop",
          publishedAt: new Date(Date.now() - 10 * 60 * 60 * 1000).toISOString(),
          source: { name: "Hollywood Reporter" }
        }
      ],
      health: [
        {
          title: "Medical Breakthrough: New Treatment Shows Promise for Chronic Disease",
          description: "Researchers unveil innovative therapy demonstrating remarkable results in clinical trials, offering hope for millions of patients worldwide.",
          url: "#",
          urlToImage: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=800&h=600&fit=crop",
          publishedAt: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
          source: { name: "Medical Journal" }
        },
        {
          title: "Wellness Study Reveals Impact of Lifestyle on Longevity",
          description: "Comprehensive research identifies key factors in healthy aging, providing evidence-based recommendations for improved quality of life.",
          url: "#",
          urlToImage: "https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?w=800&h=600&fit=crop",
          publishedAt: new Date(Date.now() - 5 * 60 * 60 * 1000).toISOString(),
          source: { name: "Health Today" }
        },
        {
          title: "Public Health Campaign Launches to Promote Mental Wellness",
          description: "Major initiative addresses mental health awareness with free resources, support services, and community programs nationwide.",
          url: "#",
          urlToImage: "https://images.unsplash.com/photo-1505751172876-fa1923c5c528?w=800&h=600&fit=crop",
          publishedAt: new Date(Date.now() - 8 * 60 * 60 * 1000).toISOString(),
          source: { name: "Wellness Weekly" }
        }
      ],
      science: [
        {
          title: "Space Exploration: New Planet Discovered in Habitable Zone",
          description: "Astronomers identify potentially Earth-like exoplanet using advanced telescopes, sparking excitement about possibilities for extraterrestrial life.",
          url: "#",
          urlToImage: "https://images.unsplash.com/photo-1614730321146-b6fa6a46bcb4?w=800&h=600&fit=crop",
          publishedAt: new Date(Date.now() - 1 * 60 * 60 * 1000).toISOString(),
          source: { name: "Science Magazine" }
        },
        {
          title: "Climate Research Reveals Innovative Carbon Capture Method",
          description: "Scientists develop breakthrough technology for removing atmospheric carbon dioxide at unprecedented scale and efficiency.",
          url: "#",
          urlToImage: "https://images.unsplash.com/photo-1611273426858-450d8e3c9fce?w=800&h=600&fit=crop",
          publishedAt: new Date(Date.now() - 4 * 60 * 60 * 1000).toISOString(),
          source: { name: "Nature" }
        },
        {
          title: "Neuroscience Discovery: Brain Mapping Reaches New Milestone",
          description: "Researchers achieve unprecedented detail in mapping neural connections, advancing understanding of brain function and consciousness.",
          url: "#",
          urlToImage: "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=800&h=600&fit=crop",
          publishedAt: new Date(Date.now() - 7 * 60 * 60 * 1000).toISOString(),
          source: { name: "Scientific American" }
        }
      ]
    };

    return demoData[cat] || demoData.general;
  };

  const fetchNews = async (cat = category, query = '') => {
    setLoading(true);
    setError(null);

    try {
      const response = await axios.get(
        `/api/news?category=${cat}&q=${query}`
      );

      if (response.data && response.data.articles) {
        const validArticles = response.data.articles.filter(
          article =>
            article.urlToImage &&
            article.title &&
            article.description
        );
        setArticles(validArticles);
      } else {
        setError("No news articles found.");
      }
    } catch (err) {
      console.error("Error fetching news:", err);
      setError("Unable to fetch live news. Showing demo articles.");
      setArticles(getDemoArticles(cat));
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNews();
  }, []);

  const handleCategoryChange = (cat) => {
    setCategory(cat);
    setSearchQuery('');
    fetchNews(cat, '');
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      fetchNews(category, searchQuery);
    }
  };

  const formatTime = (dateString) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffMs = now - date;
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMs / 3600000);
    const diffDays = Math.floor(diffMs / 86400000);

    if (diffMins < 60) return `${diffMins} minutes ago`;
    if (diffHours < 24) return `${diffHours} hours ago`;
    if (diffDays < 7) return `${diffDays} days ago`;
    return date.toLocaleDateString();
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;500;600;700;800;900&family=Inter:wght@200;300;400;500;600;700;800;900&family=Orbitron:wght@400;500;600;700;800;900&display=swap');

        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }

        body {
          font-family: 'Inter', sans-serif;
          overflow-x: hidden;
        }

        .news-container {
          min-height: 100vh;
          background: ${darkMode
            ? 'linear-gradient(135deg, #0f172a 0%, #1a1f3a 25%, #2d1b4e 50%, #1a1f3a 75%, #0f172a 100%)'
            : 'linear-gradient(135deg, #0f172a 0%, #1e293b 25%, #334155 50%, #475569 75%, #64748b 100%)'};
          background-size: 400% 400%;
          animation: megaGradient 20s ease infinite;
          padding: 2rem;
          position: relative;
          overflow: hidden;
        }

        .news-container::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: 
            radial-gradient(circle at 15% 25%, rgba(99,102,241,0.15) 0%, transparent 40%),
            radial-gradient(circle at 85% 75%, rgba(236,72,153,0.12) 0%, transparent 40%),
            radial-gradient(circle at 50% 50%, rgba(59,130,246,0.08) 0%, transparent 60%);
          pointer-events: none;
        }

        .news-container::after {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: url("data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M11 18c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm48 25c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm-43-7c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm63 31c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM34 90c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm56-76c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM12 86c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm28-65c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm23-11c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-6 60c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm29 22c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zM32 63c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm57-13c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-9-21c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM60 91c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM35 41c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2z' fill='%23ffffff' fill-opacity='0.02' fill-rule='evenodd'/%3E%3C/svg%3E");
          opacity: 0.5;
          animation: patternMove 40s linear infinite;
          pointer-events: none;
        }

        @keyframes patternMove {
          0% { transform: translate(0, 0); }
          100% { transform: translate(100px, 100px); }
        }

        @keyframes megaGradient {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }

        .news-app {
          max-width: 1400px;
          margin: 0 auto;
          position: relative;
          z-index: 1;
        }

        .top-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 2.5rem;
          flex-wrap: wrap;
          gap: 1.5rem;
        }

        .datetime-display {
          background: ${darkMode 
            ? 'rgba(30, 58, 138, 0.2)' 
            : 'rgba(255,255,255,0.08)'};
          backdrop-filter: blur(25px);
          border-radius: 25px;
          padding: 1.2rem 2rem;
          border: 2px solid ${darkMode 
            ? 'rgba(59, 130, 246, 0.3)' 
            : 'rgba(255,255,255,0.15)'};
          box-shadow: 0 15px 40px rgba(0,0,0,0.3);
          animation: slideInLeft 1s cubic-bezier(0.68, -0.55, 0.265, 1.55);
        }

        @keyframes slideInLeft {
          from {
            opacity: 0;
            transform: translateX(-50px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        .time-large {
          font-size: 2.8rem;
          font-weight: 800;
          color: white;
          font-family: 'Orbitron', sans-serif;
          letter-spacing: 2px;
          line-height: 1;
          margin-bottom: 0.3rem;
          text-shadow: 0 5px 20px rgba(0,0,0,0.4);
        }

        .date-info {
          font-size: 1.1rem;
          color: rgba(255,255,255,0.9);
          font-weight: 400;
          display: flex;
          gap: 0.8rem;
          align-items: center;
        }

        .day-name {
          font-weight: 600;
          color: white;
        }

        .brand-section {
          flex: 1;
          max-width: 600px;
          animation: slideInRight 1s cubic-bezier(0.68, -0.55, 0.265, 1.55);
        }

        @keyframes slideInRight {
          from {
            opacity: 0;
            transform: translateX(50px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        .news-logo {
          font-size: 3rem;
          font-weight: 900;
          font-family: 'Playfair Display', serif;
          background: ${darkMode
            ? 'linear-gradient(135deg, #7dd3fc 0%, #a78bfa 100%)'
            : 'linear-gradient(135deg, #fff 0%, #e0e7ff 100%)'};
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          text-shadow: 0 10px 30px rgba(255,255,255,0.2);
          margin-bottom: 0.5rem;
        }

        .news-tagline {
          font-size: 1rem;
          color: ${darkMode 
            ? 'rgba(186, 230, 253, 0.7)' 
            : 'rgba(255,255,255,0.7)'};
          font-weight: 300;
          font-style: italic;
        }

        .search-section {
          width: 100%;
          margin-bottom: 2rem;
          animation: fadeIn 1s ease 0.3s both;
        }

        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }

        .search-form {
          display: flex;
          gap: 1rem;
          max-width: 700px;
          margin: 0 auto;
        }

        .search-input {
          flex: 1;
          padding: 1.3rem 2rem;
          font-size: 1.1rem;
          font-family: 'Inter', sans-serif;
          font-weight: 400;
          border: none;
          border-radius: 60px;
          background: ${darkMode 
            ? 'rgba(51, 65, 153, 0.15)' 
            : 'rgba(255,255,255,0.12)'};
          backdrop-filter: blur(25px);
          color: white;
          border: 2px solid ${darkMode 
            ? 'rgba(59, 130, 246, 0.3)' 
            : 'rgba(255,255,255,0.2)'};
          transition: all 0.4s cubic-bezier(0.68, -0.55, 0.265, 1.55);
          outline: none;
          box-shadow: 0 10px 30px rgba(0,0,0,0.2);
        }

        .search-input::placeholder {
          color: ${darkMode 
            ? 'rgba(186, 230, 253, 0.6)' 
            : 'rgba(255,255,255,0.6)'};
          font-weight: 300;
        }

        .search-input:focus {
          background: ${darkMode 
            ? 'rgba(59, 130, 246, 0.2)' 
            : 'rgba(255,255,255,0.18)'};
          border-color: ${darkMode 
            ? 'rgba(59, 130, 246, 0.5)' 
            : 'rgba(255,255,255,0.4)'};
          transform: translateY(-3px);
          box-shadow: 0 15px 40px rgba(0,0,0,0.3);
        }

        .search-button {
          padding: 1.3rem 2.5rem;
          font-size: 1.1rem;
          font-weight: 700;
          font-family: 'Inter', sans-serif;
          border: none;
          border-radius: 60px;
          background: ${darkMode
            ? 'linear-gradient(135deg, #3b82f6 0%, #8b5cf6 100%)'
            : 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)'};
          color: white;
          cursor: pointer;
          transition: all 0.4s cubic-bezier(0.68, -0.55, 0.265, 1.55);
          box-shadow: 0 10px 30px ${darkMode
            ? 'rgba(59, 130, 246, 0.4)'
            : 'rgba(99,102,241,0.4)'};
          position: relative;
          overflow: hidden;
        }

        .search-button::before {
          content: '';
          position: absolute;
          top: 50%;
          left: 50%;
          width: 0;
          height: 0;
          border-radius: 50%;
          background: rgba(255,255,255,0.3);
          transform: translate(-50%, -50%);
          transition: width 0.6s, height 0.6s;
        }

        .search-button:hover::before {
          width: 300px;
          height: 300px;
        }

        .search-button:hover:not(:disabled) {
          transform: translateY(-3px) scale(1.05);
          box-shadow: 0 20px 50px ${darkMode
            ? 'rgba(59, 130, 246, 0.5)'
            : 'rgba(99,102,241,0.5)'};
        }

        .search-button:disabled {
          opacity: 0.6;
          cursor: not-allowed;
        }

        .categories-section {
          margin-bottom: 2.5rem;
          animation: slideUp 1s cubic-bezier(0.68, -0.55, 0.265, 1.55) 0.4s both;
        }

        @keyframes slideUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .categories-scroll {
          display: flex;
          gap: 1rem;
          overflow-x: auto;
          padding: 1rem 0;
          scrollbar-width: thin;
          scrollbar-color: rgba(255,255,255,0.3) transparent;
        }

        .categories-scroll::-webkit-scrollbar {
          height: 6px;
        }

        .categories-scroll::-webkit-scrollbar-track {
          background: rgba(255,255,255,0.1);
          border-radius: 10px;
        }

        .categories-scroll::-webkit-scrollbar-thumb {
          background: rgba(255,255,255,0.3);
          border-radius: 10px;
        }

        .category-btn {
          padding: 1rem 2rem;
          font-size: 1rem;
          font-weight: 600;
          font-family: 'Inter', sans-serif;
          border: none;
          border-radius: 50px;
          background: ${darkMode 
            ? 'rgba(59, 130, 246, 0.1)' 
            : 'rgba(255,255,255,0.08)'};
          backdrop-filter: blur(15px);
          color: ${darkMode 
            ? 'rgba(186, 230, 253, 0.8)' 
            : 'rgba(255,255,255,0.8)'};
          border: 2px solid ${darkMode 
            ? 'rgba(59, 130, 246, 0.2)' 
            : 'rgba(255,255,255,0.15)'};
          cursor: pointer;
          transition: all 0.4s cubic-bezier(0.68, -0.55, 0.265, 1.55);
          white-space: nowrap;
          display: flex;
          align-items: center;
          gap: 0.5rem;
        }

        .category-btn:hover {
          background: ${darkMode 
            ? 'rgba(59, 130, 246, 0.2)' 
            : 'rgba(255,255,255,0.15)'};
          border-color: ${darkMode 
            ? 'rgba(59, 130, 246, 0.4)' 
            : 'rgba(255,255,255,0.3)'};
          transform: translateY(-3px);
          box-shadow: 0 10px 25px rgba(0,0,0,0.2);
        }

        .category-btn.active {
          background: ${darkMode
            ? 'linear-gradient(135deg, #3b82f6 0%, #8b5cf6 100%)'
            : 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)'};
          color: white;
          border-color: transparent;
          box-shadow: 0 10px 30px ${darkMode
            ? 'rgba(59, 130, 246, 0.4)'
            : 'rgba(99,102,241,0.4)'};
        }

        .error-message {
          background: ${darkMode 
            ? 'rgba(239, 68, 68, 0.15)' 
            : 'rgba(239,68,68,0.15)'};
          backdrop-filter: blur(15px);
          color: ${darkMode ? '#fca5a5' : 'white'};
          padding: 1.2rem 2rem;
          border-radius: 25px;
          margin-bottom: 2rem;
          border: 2px solid ${darkMode 
            ? 'rgba(239, 68, 68, 0.3)' 
            : 'rgba(239,68,68,0.3)'};
          font-weight: 500;
          animation: shake 0.6s ease;
          box-shadow: 0 10px 30px ${darkMode 
            ? 'rgba(239, 68, 68, 0.15)' 
            : 'rgba(239,68,68,0.3)'};
          text-align: center;
        }

        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          10%, 30%, 50%, 70%, 90% { transform: translateX(-8px); }
          20%, 40%, 60%, 80% { transform: translateX(8px); }
        }

        .news-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
          gap: 2rem;
          animation: fadeInUp 1s ease 0.5s both;
        }

        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(40px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .news-card {
          background: ${darkMode 
            ? 'rgba(30, 58, 138, 0.1)' 
            : 'rgba(255,255,255,0.08)'};
          backdrop-filter: blur(25px);
          border-radius: 30px;
          overflow: hidden;
          border: 2px solid ${darkMode 
            ? 'rgba(59, 130, 246, 0.2)' 
            : 'rgba(255,255,255,0.15)'};
          transition: all 0.5s cubic-bezier(0.68, -0.55, 0.265, 1.55);
          cursor: pointer;
          position: relative;
        }

        .news-card::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: ${darkMode
            ? 'linear-gradient(135deg, rgba(59, 130, 246, 0.1) 0%, transparent 100%)'
            : 'linear-gradient(135deg, rgba(255,255,255,0.1) 0%, transparent 100%)'};
          opacity: 0;
          transition: opacity 0.4s ease;
          pointer-events: none;
        }

        .news-card:hover::before {
          opacity: 1;
        }

        .news-card:hover {
          background: ${darkMode 
            ? 'rgba(59, 130, 246, 0.15)' 
            : 'rgba(255,255,255,0.12)'};
          transform: translateY(-12px) scale(1.02);
          box-shadow: 0 25px 60px rgba(0,0,0,0.4);
          border-color: ${darkMode 
            ? 'rgba(59, 130, 246, 0.4)' 
            : 'rgba(255,255,255,0.3)'};
        }

        .news-image-wrapper {
          width: 100%;
          height: 220px;
          overflow: hidden;
          position: relative;
        }

        .news-image {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 0.6s ease;
        }

        .news-card:hover .news-image {
          transform: scale(1.1);
        }

        .news-source {
          position: absolute;
          top: 1rem;
          left: 1rem;
          background: rgba(0,0,0,0.7);
          backdrop-filter: blur(10px);
          color: white;
          padding: 0.5rem 1rem;
          border-radius: 20px;
          font-size: 0.85rem;
          font-weight: 600;
          border: 1px solid rgba(255,255,255,0.2);
        }

        .news-content {
          padding: 1.5rem;
        }

        .news-time {
          font-size: 0.85rem;
          color: ${darkMode 
            ? 'rgba(186, 230, 253, 0.6)' 
            : 'rgba(255,255,255,0.6)'};
          margin-bottom: 0.8rem;
          font-weight: 400;
        }

        .news-title {
          font-size: 1.4rem;
          font-weight: 700;
          color: white;
          margin-bottom: 1rem;
          line-height: 1.4;
          font-family: 'Playfair Display', serif;
          display: -webkit-box;
          -webkit-line-clamp: 3;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }

        .news-description {
          font-size: 1rem;
          color: ${darkMode 
            ? 'rgba(186, 230, 253, 0.8)' 
            : 'rgba(255,255,255,0.8)'};
          line-height: 1.6;
          margin-bottom: 1.5rem;
          display: -webkit-box;
          -webkit-line-clamp: 3;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }

        .read-more {
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          font-weight: 600;
          color: ${darkMode 
            ? '#7dd3fc' 
            : '#6366f1'};
          text-decoration: none;
          transition: all 0.3s ease;
        }

        .read-more:hover {
          gap: 1rem;
          color: ${darkMode 
            ? '#bfdbfe' 
            : '#8b5cf6'};
        }

        .loading-container {
          text-align: center;
          padding: 4rem 2rem;
        }

        .loading-spinner {
          display: inline-block;
          width: 60px;
          height: 60px;
          border: 6px solid ${darkMode 
            ? 'rgba(59, 130, 246, 0.2)' 
            : 'rgba(255,255,255,0.2)'};
          border-radius: 50%;
          border-top-color: ${darkMode ? '#3b82f6' : '#6366f1'};
          animation: spin 1s linear infinite;
        }

        @keyframes spin {
          to { transform: rotate(360deg); }
        }

        .loading-text {
          margin-top: 1.5rem;
          font-size: 1.2rem;
          color: ${darkMode 
            ? 'rgba(186, 230, 253, 0.8)' 
            : 'rgba(255,255,255,0.8)'};
          font-weight: 500;
        }

        @media (max-width: 1024px) {
          .news-grid {
            grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
          }
        }

        @media (max-width: 768px) {
          .news-container {
            padding: 1.5rem;
          }

          .top-header {
            flex-direction: column;
            align-items: stretch;
          }

          .datetime-display {
            text-align: center;
          }

          .time-large {
            font-size: 2.2rem;
          }

          .date-info {
            justify-content: center;
            font-size: 1rem;
          }

          .brand-section {
            text-align: center;
          }

          .news-logo {
            font-size: 2.5rem;
          }

          .search-form {
            flex-direction: column;
          }

          .news-grid {
            grid-template-columns: 1fr;
            gap: 1.5rem;
          }

          .categories-scroll {
            justify-content: flex-start;
          }
        }

        @media (max-width: 480px) {
          .news-logo {
            font-size: 2rem;
          }

          .time-large {
            font-size: 1.8rem;
          }

          .news-title {
            font-size: 1.2rem;
          }
        }
      `}</style>

      <div className="news-container">
        <div className="news-app">
          <div className="top-header">
            <div className="datetime-display">
              <div className="time-large">{currentTime}</div>
              <div className="date-info">
                <span className="day-name">{currentDay}</span>
                <span>•</span>
                <span>{currentDate}</span>
              </div>
            </div>
            
            <div className="brand-section">
              <div className="news-logo">The Daily Chronicle</div>
              <div className="news-tagline">Breaking News from Around the World</div>
            </div>
          </div>

          <div className="search-section">
            <form className="search-form" onSubmit={handleSearch}>
              <input
                type="text"
                className="search-input"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search for news articles..."
              />
              <button type="submit" className="search-button" disabled={loading}>
                {loading ? <span className="loading-spinner"></span> : '🔍 Search'}
              </button>
            </form>
          </div>

          <div className="categories-section">
            <div className="categories-scroll">
              {categories.map((cat) => (
                <button
                  key={cat.id}
                  className={`category-btn ${category === cat.id ? 'active' : ''}`}
                  onClick={() => handleCategoryChange(cat.id)}
                >
                  <span>{cat.icon}</span>
                  <span>{cat.name}</span>
                </button>
              ))}
            </div>
          </div>

          {error && <div className="error-message">⚠️ {error}</div>}

          {loading && (
            <div className="loading-container">
              <div className="loading-spinner"></div>
              <div className="loading-text">Loading latest news...</div>
            </div>
          )}

          {!loading && articles.length > 0 && (
            <div className="news-grid">
              {articles.map((article, index) => (
                <a
                  key={index}
                  href={article.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="news-card"
                  style={{ textDecoration: 'none' }}
                >
                  <div className="news-image-wrapper">
                    <img
                      className="news-image"
                      src={article.urlToImage || 'https://images.unsplash.com/photo-1504711434969-e33886168f5c?w=800&h=600&fit=crop'}
                      alt={article.title}
                      onError={(e) => {
                        e.target.src = 'https://images.unsplash.com/photo-1504711434969-e33886168f5c?w=800&h=600&fit=crop';
                      }}
                    />
                    <div className="news-source">{article.source.name}</div>
                  </div>
                  <div className="news-content">
                    <div className="news-time">{formatTime(article.publishedAt)}</div>
                    <h3 className="news-title">{article.title}</h3>
                    <p className="news-description">{article.description}</p>
                    <span className="read-more">
                      Read Full Article →
                    </span>
                  </div>
                </a>
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default NewsApp;
