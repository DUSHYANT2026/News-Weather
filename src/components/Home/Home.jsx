import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useTheme } from '../../ThemeContext';
import { Cloud, Wind, Droplets, Eye, Gauge } from 'lucide-react';

function Home() {
  const [city, setCity] = useState('London');
  const [weatherData, setWeatherData] = useState(null);
  const [forecast, setForecast] = useState([]);
  const [currentTime, setCurrentTime] = useState('');
  const [currentDate, setCurrentDate] = useState('');
  const [currentDay, setCurrentDay] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const { darkMode } = useTheme();

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

  const formatDay = (timestamp) => {
    const date = new Date(timestamp * 1000);
    const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    return days[date.getDay()];
  };

  const formatDate = (timestamp) => {
    const date = new Date(timestamp * 1000);
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    return `${months[date.getMonth()]} ${date.getDate()}`;
  };

  const getForecast = async (coordinates) => {
    const apiKey = '20199a933076ca9b99t7obdbf4461c24';
    const apiUrl = `https://api.shecodes.io/weather/v1/forecast?lon=${coordinates.longitude}&lat=${coordinates.latitude}&key=${apiKey}`;
    
    try {
      const response = await axios.get(apiUrl);
      if (response.data && response.data.daily) {
        setForecast(response.data.daily.slice(0, 7));
      }
    } catch (err) {
      console.error('Error fetching forecast:', err);
    }
  };

  const search = async (cityName) => {
    if (!cityName) return;
    
    setLoading(true);
    setError(null);
    const apiKey = '4f6e636etc17733b801df4o7b14ba35b';
    const apiUrl = `https://api.shecodes.io/weather/v1/current?query=${cityName}&key=${apiKey}&units=metric`;
    
    try {
      const response = await axios.get(apiUrl);
      if (response.data && response.data.city) {
        setWeatherData(response.data);
        if (response.data.coordinates) {
          getForecast(response.data.coordinates);
        }
      } else {
        setError("City not found. Please try again.");
      }
    } catch (err) {
      setError("Unable to fetch weather data. Please try again.");
      console.error('Error fetching weather:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    search('London');
  }, []);

  const handleSubmit = (event) => {
    event.preventDefault();
    search(city);
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@200;300;400;500;600;700;800;900&family=Orbitron:wght@400;500;600;700;800;900&display=swap');

        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }

        body {
          font-family: 'Poppins', sans-serif;
          overflow-x: hidden;
        }

        .weather-container {
          min-height: 100vh;
          background: ${darkMode 
            ? 'linear-gradient(125deg, #0f172a 0%, #1a1f3a 25%, #2d1b4e 50%, #1a1f3a 75%, #0f172a 100%)'
            : 'linear-gradient(125deg, #1e3a8a 0%, #3b82f6 25%, #8b5cf6 50%, #ec4899 75%, #f59e0b 100%)'};
          background-size: 400% 400%;
          animation: megaGradient 20s ease infinite;
          padding: 2.5rem;
          position: relative;
          overflow: hidden;
        }

        .weather-container::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: 
            radial-gradient(circle at 10% 20%, rgba(255,255,255,0.15) 0%, transparent 40%),
            radial-gradient(circle at 90% 80%, rgba(255,255,255,0.1) 0%, transparent 40%),
            radial-gradient(circle at 50% 50%, rgba(255,255,255,0.05) 0%, transparent 60%);
          pointer-events: none;
        }

        .weather-container::after {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.03'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E");
          opacity: 0.4;
          animation: patternMove 30s linear infinite;
          pointer-events: none;
        }

        @keyframes patternMove {
          0% { transform: translate(0, 0); }
          100% { transform: translate(60px, 60px); }
        }

        @keyframes megaGradient {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }

        .weather-app {
          max-width: 1400px;
          margin: 0 auto;
          position: relative;
          z-index: 1;
        }

        .top-bar {
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
            : 'rgba(255,255,255,0.15)'};
          backdrop-filter: blur(25px);
          border-radius: 25px;
          padding: 1.2rem 2rem;
          border: 2px solid ${darkMode 
            ? 'rgba(59, 130, 246, 0.3)' 
            : 'rgba(255,255,255,0.25)'};
          box-shadow: 0 15px 40px rgba(0,0,0,0.2);
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
          text-shadow: 0 5px 20px rgba(0,0,0,0.3);
        }

        .date-info {
          font-size: 1.1rem;
          color: rgba(255,255,255,0.95);
          font-weight: 400;
          display: flex;
          gap: 0.8rem;
          align-items: center;
        }

        .day-name {
          font-weight: 600;
          color: white;
        }

        .search-form {
          flex: 1;
          max-width: 550px;
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

        .search-wrapper {
          position: relative;
          display: flex;
          gap: 1rem;
        }

        .search-input {
          flex: 1;
          padding: 1.3rem 2rem;
          font-size: 1.1rem;
          font-family: 'Poppins', sans-serif;
          font-weight: 400;
          border: none;
          border-radius: 60px;
          background: ${darkMode 
            ? 'rgba(51, 65, 153, 0.2)' 
            : 'rgba(255,255,255,0.2)'};
          backdrop-filter: blur(25px);
          color: white;
          border: 2px solid ${darkMode 
            ? 'rgba(59, 130, 246, 0.3)' 
            : 'rgba(255,255,255,0.3)'};
          transition: all 0.4s cubic-bezier(0.68, -0.55, 0.265, 1.55);
          outline: none;
          box-shadow: 0 10px 30px rgba(0,0,0,0.15);
        }

        .search-input::placeholder {
          color: rgba(255,255,255,0.7);
          font-weight: 300;
        }

        .search-input:focus {
          background: ${darkMode 
            ? 'rgba(59, 130, 246, 0.3)' 
            : 'rgba(255,255,255,0.3)'};
          border-color: ${darkMode 
            ? 'rgba(59, 130, 246, 0.6)' 
            : 'rgba(255,255,255,0.5)'};
          transform: translateY(-3px);
          box-shadow: 0 15px 40px rgba(0,0,0,0.25);
        }

        .search-button {
          padding: 1.3rem 2.5rem;
          font-size: 1.1rem;
          font-weight: 700;
          font-family: 'Poppins', sans-serif;
          border: none;
          border-radius: 60px;
          background: ${darkMode 
            ? 'linear-gradient(135deg, #3b82f6 0%, #8b5cf6 100%)' 
            : 'linear-gradient(135deg, #ffffff 0%, #f0f0f0 100%)'};
          color: ${darkMode ? '#ffffff' : '#1e3a8a'};
          cursor: pointer;
          transition: all 0.4s cubic-bezier(0.68, -0.55, 0.265, 1.55);
          border: 2px solid transparent;
          box-shadow: 0 10px 30px rgba(0,0,0,0.2);
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
          background: rgba(255,255,255,0.5);
          transform: translate(-50%, -50%);
          transition: width 0.6s, height 0.6s;
        }

        .search-button:hover::before {
          width: 300px;
          height: 300px;
        }

        .search-button:hover:not(:disabled) {
          transform: translateY(-3px) scale(1.05);
          box-shadow: 0 20px 50px rgba(0,0,0,0.3);
        }

        .search-button:active:not(:disabled) {
          transform: translateY(-1px) scale(1.02);
        }

        .search-button:disabled {
          opacity: 0.7;
          cursor: not-allowed;
        }

        .error-message {
          background: ${darkMode 
            ? 'rgba(239, 68, 68, 0.15)' 
            : 'rgba(239,68,68,0.25)'};
          backdrop-filter: blur(15px);
          color: ${darkMode ? '#fca5a5' : 'white'};
          padding: 1.2rem 2rem;
          border-radius: 25px;
          margin-bottom: 2rem;
          border: 2px solid ${darkMode 
            ? 'rgba(239, 68, 68, 0.3)' 
            : 'rgba(239,68,68,0.4)'};
          font-weight: 500;
          animation: shake 0.6s ease;
          box-shadow: 0 10px 30px ${darkMode 
            ? 'rgba(239, 68, 68, 0.15)' 
            : 'rgba(239,68,68,0.3)'};
        }

        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          10%, 30%, 50%, 70%, 90% { transform: translateX(-8px); }
          20%, 40%, 60%, 80% { transform: translateX(8px); }
        }

        .main-weather-card {
          background: ${darkMode 
            ? 'rgba(30, 58, 138, 0.15)' 
            : 'rgba(255,255,255,0.15)'};
          backdrop-filter: blur(35px);
          border-radius: 45px;
          padding: 3.5rem;
          margin-bottom: 2.5rem;
          border: 2px solid ${darkMode 
            ? 'rgba(59, 130, 246, 0.3)' 
            : 'rgba(255,255,255,0.25)'};
          box-shadow: 0 25px 70px rgba(0,0,0,0.2);
          animation: scaleIn 1s cubic-bezier(0.68, -0.55, 0.265, 1.55) 0.3s both;
          position: relative;
          overflow: hidden;
        }

        .main-weather-card::before {
          content: '';
          position: absolute;
          top: -100%;
          left: -100%;
          width: 300%;
          height: 300%;
          background: radial-gradient(circle, rgba(255,255,255,0.15) 0%, transparent 70%);
          animation: rotateGlow 25s linear infinite;
        }

        @keyframes rotateGlow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }

        @keyframes scaleIn {
          from {
            opacity: 0;
            transform: scale(0.9);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }

        .weather-content {
          position: relative;
          z-index: 1;
        }

        .city-name {
          font-size: 3.5rem;
          font-weight: 800;
          color: white;
          margin-bottom: 0.5rem;
          letter-spacing: -1px;
          text-shadow: 0 10px 30px rgba(0,0,0,0.3);
          animation: fadeInDown 0.8s ease;
        }

        @keyframes fadeInDown {
          from {
            opacity: 0;
            transform: translateY(-20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .location-info {
          font-size: 1.2rem;
          color: rgba(255,255,255,0.85);
          margin-bottom: 2.5rem;
          font-weight: 300;
        }

        .temp-display {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin: 2.5rem 0;
          gap: 3rem;
          flex-wrap: wrap;
        }

        .temp-main {
          display: flex;
          align-items: flex-start;
          gap: 2rem;
        }

        .temperature {
          font-size: 9rem;
          font-weight: 900;
          color: white;
          line-height: 0.9;
          font-family: 'Orbitron', sans-serif;
          text-shadow: 0 15px 40px rgba(0,0,0,0.3);
          animation: pulse 3s ease-in-out infinite;
        }

        @keyframes pulse {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.02); }
        }

        .weather-icon-main {
          width: 150px;
          height: 150px;
          filter: drop-shadow(0 15px 30px rgba(0,0,0,0.3));
          animation: floatRotate 6s ease-in-out infinite;
        }

        @keyframes floatRotate {
          0%, 100% { 
            transform: translateY(0px) rotate(0deg); 
          }
          25% {
            transform: translateY(-15px) rotate(5deg);
          }
          50% { 
            transform: translateY(-20px) rotate(0deg); 
          }
          75% {
            transform: translateY(-15px) rotate(-5deg);
          }
        }

        .condition-description {
          flex: 1;
          min-width: 250px;
        }

        .condition-text {
          font-size: 2rem;
          color: white;
          text-transform: capitalize;
          font-weight: 600;
          margin-bottom: 1rem;
          text-shadow: 0 5px 15px rgba(0,0,0,0.2);
        }

        .feels-like {
          font-size: 1.3rem;
          color: rgba(255,255,255,0.9);
          font-weight: 300;
        }

        .weather-details {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
          gap: 1.5rem;
          margin-top: 2.5rem;
        }

        .detail-item {
          background: ${darkMode 
            ? 'rgba(59, 130, 246, 0.15)' 
            : 'rgba(255,255,255,0.12)'};
          padding: 1.5rem;
          border-radius: 25px;
          backdrop-filter: blur(15px);
          border: 2px solid ${darkMode 
            ? 'rgba(59, 130, 246, 0.2)' 
            : 'rgba(255,255,255,0.2)'};
          transition: all 0.4s cubic-bezier(0.68, -0.55, 0.265, 1.55);
          cursor: pointer;
        }

        .detail-item:hover {
          background: ${darkMode 
            ? 'rgba(59, 130, 246, 0.25)' 
            : 'rgba(255,255,255,0.2)'};
          transform: translateY(-5px) scale(1.03);
          box-shadow: 0 15px 40px rgba(0,0,0,0.25);
        }

        .detail-label {
          font-size: 0.95rem;
          color: ${darkMode 
            ? 'rgba(186, 230, 253, 0.8)' 
            : 'rgba(255,255,255,0.8)'};
          margin-bottom: 0.7rem;
          font-weight: 400;
          text-transform: uppercase;
          letter-spacing: 1px;
        }

        .detail-value {
          font-size: 2rem;
          color: ${darkMode ? '#7dd3fc' : 'white'};
          font-weight: 700;
          font-family: 'Orbitron', sans-serif;
        }

        .forecast-section {
          animation: slideUp 1s cubic-bezier(0.68, -0.55, 0.265, 1.55) 0.5s both;
        }

        @keyframes slideUp {
          from {
            opacity: 0;
            transform: translateY(50px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .forecast-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 2rem;
        }

        .forecast-title {
          font-size: 2rem;
          color: white;
          font-weight: 700;
          letter-spacing: -0.5px;
          text-shadow: 0 5px 15px rgba(0,0,0,0.2);
        }

        .forecast-subtitle {
          font-size: 1rem;
          color: rgba(255,255,255,0.8);
          font-weight: 300;
        }

        .forecast-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(160px, 1fr));
          gap: 1.5rem;
        }

        .forecast-card {
          background: ${darkMode 
            ? 'rgba(30, 58, 138, 0.15)' 
            : 'rgba(255,255,255,0.15)'};
          backdrop-filter: blur(25px);
          border-radius: 30px;
          padding: 2rem 1.5rem;
          border: 2px solid ${darkMode 
            ? 'rgba(59, 130, 246, 0.2)' 
            : 'rgba(255,255,255,0.25)'};
          text-align: center;
          transition: all 0.5s cubic-bezier(0.68, -0.55, 0.265, 1.55);
          cursor: pointer;
          position: relative;
          overflow: hidden;
        }

        .forecast-card::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: ${darkMode 
            ? 'linear-gradient(135deg, rgba(59, 130, 246, 0.2) 0%, transparent 100%)' 
            : 'linear-gradient(135deg, rgba(255,255,255,0.1) 0%, transparent 100%)'};
          opacity: 0;
          transition: opacity 0.4s ease;
        }

        .forecast-card:hover::before {
          opacity: 1;
        }

        .forecast-card:hover {
          background: ${darkMode 
            ? 'rgba(59, 130, 246, 0.25)' 
            : 'rgba(255,255,255,0.25)'};
          transform: translateY(-12px) scale(1.05);
          box-shadow: 0 20px 50px rgba(0,0,0,0.3);
          border-color: ${darkMode 
            ? 'rgba(59, 130, 246, 0.4)' 
            : 'rgba(255,255,255,0.4)'};
        }

        .forecast-day {
          font-size: 1.2rem;
          color: white;
          font-weight: 700;
          margin-bottom: 0.5rem;
          font-family: 'Poppins', sans-serif;
        }

        .forecast-date {
          font-size: 0.9rem;
          color: ${darkMode 
            ? 'rgba(186, 230, 253, 0.8)' 
            : 'rgba(255,255,255,0.8)'};
          margin-bottom: 1.2rem;
          font-weight: 300;
        }

        .forecast-icon {
          width: 70px;
          height: 70px;
          margin: 0.8rem auto;
          filter: drop-shadow(0 8px 15px rgba(0,0,0,0.2));
          transition: transform 0.4s ease;
        }

        .forecast-card:hover .forecast-icon {
          transform: scale(1.2) rotate(5deg);
        }

        .forecast-condition {
          font-size: 0.85rem;
          color: ${darkMode 
            ? 'rgba(186, 230, 253, 0.85)' 
            : 'rgba(255,255,255,0.85)'};
          margin: 0.8rem 0;
          text-transform: capitalize;
          font-weight: 400;
          min-height: 2.5em;
        }

        .forecast-temps {
          margin-top: 1rem;
          display: flex;
          justify-content: center;
          align-items: center;
          gap: 0.8rem;
          font-size: 1.3rem;
        }

        .temp-max {
          color: white;
          font-weight: 800;
          font-family: 'Orbitron', sans-serif;
        }

        .temp-separator {
          color: rgba(255,255,255,0.5);
          font-weight: 300;
        }

        .temp-min {
          color: ${darkMode 
            ? 'rgba(186, 230, 253, 0.7)' 
            : 'rgba(255,255,255,0.7)'};
          font-weight: 500;
          font-family: 'Orbitron', sans-serif;
        }

        .loading-spinner {
          display: inline-block;
          width: 22px;
          height: 22px;
          border: 3px solid ${darkMode 
            ? 'rgba(59, 130, 246, 0.3)' 
            : 'rgba(255,255,255,0.3)'};
          border-radius: 50%;
          border-top-color: ${darkMode ? '#3b82f6' : '#1e3a8a'};
          animation: spin 0.8s linear infinite;
        }

        @keyframes spin {
          to { transform: rotate(360deg); }
        }

        @media (max-width: 1024px) {
          .forecast-grid {
            grid-template-columns: repeat(auto-fit, minmax(140px, 1fr));
          }
        }

        @media (max-width: 768px) {
          .weather-container {
            padding: 1.5rem;
          }

          .top-bar {
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

          .main-weather-card {
            padding: 2rem 1.5rem;
          }

          .city-name {
            font-size: 2.5rem;
          }

          .temperature {
            font-size: 6rem;
          }

          .weather-icon-main {
            width: 100px;
            height: 100px;
          }

          .temp-display {
            flex-direction: column;
            gap: 1.5rem;
          }

          .condition-text {
            font-size: 1.5rem;
          }

          .forecast-grid {
            grid-template-columns: repeat(auto-fit, minmax(120px, 1fr));
            gap: 1rem;
          }

          .forecast-card {
            padding: 1.5rem 1rem;
          }

          .forecast-icon {
            width: 50px;
            height: 50px;
          }
        }

        @media (max-width: 480px) {
          .temperature {
            font-size: 5rem;
          }

          .city-name {
            font-size: 2rem;
          }

          .forecast-grid {
            grid-template-columns: 1fr 1fr;
          }
        }
      `}</style>

      <div className="weather-container">
        <div className="weather-app">
          <div className="top-bar">
            <div className="datetime-display">
              <div className="time-large">{currentTime}</div>
              <div className="date-info">
                <span className="day-name">{currentDay}</span>
                <span>•</span>
                <span>{currentDate}</span>
              </div>
            </div>
            
            <form className="search-form" onSubmit={handleSubmit}>
              <div className="search-wrapper">
                <input
                  type="text"
                  className="search-input"
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  placeholder="Search any city in the world..."
                  autoFocus
                />
                <button type="submit" className="search-button" disabled={loading}>
                  {loading ? <span className="loading-spinner"></span> : 'Search'}
                </button>
              </div>
            </form>
          </div>

          {error && <div className="error-message">⚠️ {error}</div>}

          {weatherData && !loading && (
            <div className="main-weather-card">
              <div className="weather-content">
                <h1 className="city-name">{weatherData.city}</h1>
                <div className="location-info">
                  {weatherData.country || 'Current Location'}
                </div>
                
                <div className="temp-display">
                  <div className="temp-main">
                    <div className="temperature">
                      {Math.round(weatherData.temperature.current)}°
                    </div>
                    <img
                      className="weather-icon-main"
                      src={weatherData.condition.icon_url}
                      alt={weatherData.condition.description}
                    />
                  </div>

                  <div className="condition-description">
                    <div className="condition-text">
                      {weatherData.condition.description}
                    </div>
                    <div className="feels-like">
                      Feels like {Math.round(weatherData.temperature.feels_like || weatherData.temperature.current)}°C
                    </div>
                  </div>
                </div>

                <div className="weather-details">
                  <div className="detail-item">
                    <div className="detail-label">Humidity</div>
                    <div className="detail-value">{weatherData.temperature.humidity}%</div>
                  </div>
                  <div className="detail-item">
                    <div className="detail-label">Wind Speed</div>
                    <div className="detail-value">{Math.round(weatherData.wind.speed)}</div>
                  </div>
                  <div className="detail-item">
                    <div className="detail-label">Pressure</div>
                    <div className="detail-value">{weatherData.temperature.pressure || 1013}</div>
                  </div>
                  <div className="detail-item">
                    <div className="detail-label">Visibility</div>
                    <div className="detail-value">{Math.round((weatherData.visibility || 10000) / 1000)}km</div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {forecast.length > 0 && (
            <div className="forecast-section">
              <div className="forecast-header">
                <div>
                  <h2 className="forecast-title">7-Day Forecast</h2>
                  <p className="forecast-subtitle">Weekly weather outlook</p>
                </div>
              </div>
              <div className="forecast-grid">
                {forecast.map((forecastDay, index) => (
                  <div key={index} className="forecast-card">
                    <div className="forecast-day">
                      {index === 0 ? 'Today' : formatDay(forecastDay.time)}
                    </div>
                    <div className="forecast-date">
                      {formatDate(forecastDay.time)}
                    </div>
                    <img
                      className="forecast-icon"
                      src={forecastDay.condition.icon_url}
                      alt={forecastDay.condition.description}
                    />
                    <div className="forecast-condition">
                      {forecastDay.condition.description}
                    </div>
                    <div className="forecast-temps">
                      <span className="temp-max">
                        {Math.round(forecastDay.temperature.maximum)}°
                      </span>
                      <span className="temp-separator">/</span>
                      <span className="temp-min">
                        {Math.round(forecastDay.temperature.minimum)}°
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default Home;







// import React, { useState, useEffect } from 'react';
// import axios from 'axios';

// function Home() {
//   const [city, setCity] = useState('London');
//   const [weatherData, setWeatherData] = useState(null);
//   const [forecast, setForecast] = useState([]);
//   const [currentTime, setCurrentTime] = useState('');
//   const [currentDate, setCurrentDate] = useState('');
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     const updateDateTime = () => {
//       const now = new Date();
//       const options = { weekday: 'long', month: 'short', day: 'numeric' };
//       setCurrentDate(now.toLocaleDateString('en-US', options));
//       setCurrentTime(now.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false }));
//     };
//     updateDateTime();
//     const interval = setInterval(updateDateTime, 1000);
//     return () => clearInterval(interval);
//   }, []);

//   const search = async (cityName) => {
//     if (!cityName) return;
//     setLoading(true);
//     setError(null);
//     const apiKey = '4f6e636etc17733b801df4o7b14ba35b'; // Note: Ensure keys are valid
//     const apiUrl = `https://api.shecodes.io/weather/v1/current?query=${cityName}&key=${apiKey}&units=metric`;
    
//     try {
//       const response = await axios.get(apiUrl);
//       if (response.data && response.data.city) {
//         setWeatherData(response.data);
//         getForecast(response.data.coordinates);
//       } else {
//         setError("Location not found.");
//       }
//     } catch (err) {
//       setError("Network error. Try again.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   const getForecast = async (coords) => {
//     const apiKey = '20199a933076ca9b99t7obdbf4461c24';
//     const url = `https://api.shecodes.io/weather/v1/forecast?lon=${coords.longitude}&lat=${coords.latitude}&key=${apiKey}`;
//     try {
//       const res = await axios.get(url);
//       setForecast(res.data.daily.slice(0, 7));
//     } catch (err) { console.error(err); }
//   };

//   useEffect(() => { search('London'); }, []);

//   return (
//     <>
//       <style>{`
//         @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;600&family=Montserrat:wght@700;800&display=swap');

//         :root {
//           --glass: rgba(255, 255, 255, 0.12);
//           --glass-border: rgba(255, 255, 255, 0.22);
//           --text-main: #ffffff;
//         }

//         .app-viewport {
//           min-height: 100vh;
//           background: radial-gradient(circle at top left, #1e293b, #0f172a);
//           background-attachment: fixed;
//           color: var(--text-main);
//           font-family: 'Inter', sans-serif;
//           padding: 2rem;
//           display: flex;
//           justify-content: center;
//         }

//         /* Animated Background Blobs */
//         .blob {
//           position: absolute;
//           width: 500px;
//           height: 500px;
//           background: linear-gradient(135deg, #3b82f6 0%, #8b5cf6 100%);
//           filter: blur(80px);
//           border-radius: 50%;
//           z-index: 0;
//           opacity: 0.15;
//           animation: move 20s infinite alternate;
//         }

//         @keyframes move {
//           from { transform: translate(-10%, -10%); }
//           to { transform: translate(20%, 20%); }
//         }

//         .main-container {
//           width: 100%;
//           max-width: 1100px;
//           position: relative;
//           z-index: 1;
//         }

//         /* Search & Header */
//         .header {
//           display: flex;
//           justify-content: space-between;
//           align-items: center;
//           margin-bottom: 3rem;
//           flex-wrap: wrap;
//           gap: 1.5rem;
//         }

//         .glass-card {
//           background: var(--glass);
//           backdrop-filter: blur(20px);
//           -webkit-backdrop-filter: blur(20px);
//           border: 1px solid var(--glass-border);
//           border-radius: 24px;
//           box-shadow: 0 8px 32px 0 rgba(0, 0, 0, 0.3);
//         }

//         .search-box {
//           display: flex;
//           background: rgba(0, 0, 0, 0.2);
//           border-radius: 50px;
//           padding: 0.5rem;
//           border: 1px solid var(--glass-border);
//           width: 100%;
//           max-width: 400px;
//         }

//         .search-box input {
//           background: transparent;
//           border: none;
//           color: white;
//           padding: 0.8rem 1.5rem;
//           width: 100%;
//           outline: none;
//           font-size: 1rem;
//         }

//         .search-box button {
//           background: #3b82f6;
//           color: white;
//           border: none;
//           padding: 0.8rem 1.5rem;
//           border-radius: 50px;
//           cursor: pointer;
//           font-weight: 600;
//           transition: 0.3s;
//         }

//         .search-box button:hover { background: #2563eb; }

//         /* Current Weather Section */
//         .hero-section {
//           display: grid;
//           grid-template-columns: 1.5fr 1fr;
//           gap: 2rem;
//           margin-bottom: 3rem;
//         }

//         .main-weather {
//           padding: 3rem;
//           display: flex;
//           flex-direction: column;
//           justify-content: space-between;
//           min-height: 400px;
//         }

//         .temp-row {
//           display: flex;
//           align-items: center;
//           gap: 2rem;
//         }

//         .big-temp {
//           font-family: 'Montserrat', sans-serif;
//           font-size: 8rem;
//           font-weight: 800;
//           line-height: 1;
//         }

//         .weather-icon-large {
//           width: 120px;
//           height: 120px;
//           filter: drop-shadow(0 0 20px rgba(255,255,255,0.2));
//         }

//         .city-info h1 {
//           font-family: 'Montserrat', sans-serif;
//           font-size: 3rem;
//           margin-bottom: 0.5rem;
//         }

//         /* Bento Grid Details */
//         .stats-grid {
//           display: grid;
//           grid-template-columns: 1fr 1fr;
//           gap: 1rem;
//         }

//         .stat-item {
//           padding: 1.5rem;
//           text-align: center;
//         }

//         .stat-label {
//           color: #94a3b8;
//           font-size: 0.8rem;
//           text-transform: uppercase;
//           letter-spacing: 1px;
//           margin-bottom: 0.5rem;
//         }

//         .stat-value {
//           font-size: 1.5rem;
//           font-weight: 600;
//         }

//         /* Forecast Bar */
//         .forecast-row {
//           display: grid;
//           grid-template-columns: repeat(auto-fit, minmax(120px, 1fr));
//           gap: 1rem;
//         }

//         .forecast-card {
//           padding: 1.5rem;
//           text-align: center;
//           transition: 0.3s cubic-bezier(0.4, 0, 0.2, 1);
//         }

//         .forecast-card:hover {
//           transform: translateY(-10px);
//           background: rgba(255,255,255,0.2);
//         }

//         .forecast-day { font-weight: 600; margin-bottom: 0.5rem; }
//         .forecast-temp { font-weight: 700; font-size: 1.2rem; margin-top: 0.5rem; }

//         @media (max-width: 850px) {
//           .hero-section { grid-template-columns: 1fr; }
//           .big-temp { font-size: 6rem; }
//         }
//       `}</style>

//       <div className="app-viewport">
//         <div className="blob"></div>
//         <div className="main-container">
          
//           <header className="header">
//             <div>
//               <p style={{ color: '#3b82f6', fontWeight: '600' }}>{currentTime}</p>
//               <h2 style={{ fontSize: '1.1rem', opacity: 0.8 }}>{currentDate}</h2>
//             </div>
//             <form className="search-box" onSubmit={(e) => { e.preventDefault(); search(city); }}>
//               <input 
//                 type="text" 
//                 placeholder="Search city..." 
//                 value={city} 
//                 onChange={(e) => setCity(e.target.value)}
//               />
//               <button type="submit">{loading ? '...' : 'Search'}</button>
//             </form>
//           </header>

//           {weatherData && (
//             <>
//               <section className="hero-section">
//                 <div className="glass-card main-weather">
//                   <div className="city-info">
//                     <h1>{weatherData.city}</h1>
//                     <p style={{ fontSize: '1.2rem', opacity: 0.7 }}>{weatherData.condition.description}</p>
//                   </div>
//                   <div className="temp-row">
//                     <span className="big-temp">{Math.round(weatherData.temperature.current)}°</span>
//                     <img className="weather-icon-large" src={weatherData.condition.icon_url} alt="icon" />
//                   </div>
//                   <p>Feels like {Math.round(weatherData.temperature.feels_like)}°C</p>
//                 </div>

//                 <div className="stats-grid">
//                   <div className="glass-card stat-item">
//                     <p className="stat-label">Humidity</p>
//                     <p className="stat-value">{weatherData.temperature.humidity}%</p>
//                   </div>
//                   <div className="glass-card stat-item">
//                     <p className="stat-label">Wind</p>
//                     <p className="stat-value">{Math.round(weatherData.wind.speed)} km/h</p>
//                   </div>
//                   <div className="glass-card stat-item">
//                     <p className="stat-label">Pressure</p>
//                     <p className="stat-value">{weatherData.temperature.pressure} hPa</p>
//                   </div>
//                   <div className="glass-card stat-item">
//                     <p className="stat-label">Visibility</p>
//                     <p className="stat-value">10 km</p>
//                   </div>
//                 </div>
//               </section>

//               <h3 style={{ marginBottom: '1.5rem', fontWeight: '600' }}>7-Day Forecast</h3>
//               <div className="forecast-row">
//                 {forecast.map((day, i) => (
//                   <div key={i} className="glass-card forecast-card">
//                     <p className="forecast-day">
//                       {i === 0 ? 'Today' : new Date(day.time * 1000).toLocaleDateString('en', { weekday: 'short' })}
//                     </p>
//                     <img src={day.condition.icon_url} alt="icon" width="50" />
//                     <p className="forecast-temp">{Math.round(day.temperature.maximum)}°</p>
//                     <p style={{ fontSize: '0.8rem', opacity: 0.6 }}>{Math.round(day.temperature.minimum)}°</p>
//                   </div>
//                 ))}
//               </div>
//             </>
//           )}
//         </div>
//       </div>
//     </>
//   );
// }

// export default Home;