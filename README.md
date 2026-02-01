# 📰 **News-Weather** 🌤️

A modern, real-time news and weather application built with React and Vite. Stay informed with breaking news from around the world and live weather updates, all in a beautifully designed interface with seamless dark mode support.

## ✨ Features

### 📰 **News Section**
- **Real-time News Updates** - Fetch breaking news from multiple categories
- **Category Filtering** - Browse news by General, Business, Technology, Sports, Entertainment, Health, and Science
- **Search Functionality** - Search for specific news articles and topics
- **Live Timestamps** - See when articles were published with relative time display
- **Responsive Cards** - Beautiful, interactive news cards with hover effects
- **Multiple Sources** - News from various trusted news outlets

### 🌤️ **Weather Section**
- **Live Weather Data** - Current weather conditions with real-time updates
- **7-Day Forecast** - Weekly weather outlook with temperature ranges
- **City Search** - Search weather for any city worldwide
- **Detailed Metrics** - Humidity, wind speed, pressure, and visibility
- **Dynamic Icons** - Weather condition icons with smooth animations
- **Temperature Display** - Current, feels-like, and min/max temperatures

### 🎨 **User Interface**
- **Dark/Light Mode** - Seamless theme switching with persistent settings
- **Glassmorphism Design** - Modern frosted glass effect with backdrop blur
- **Responsive Layout** - Perfectly optimized for desktop, tablet, and mobile
- **Smooth Animations** - Elegant transitions and micro-interactions
- **Real-time Clock** - Live date and time display on every page
- **Professional Styling** - Carefully crafted with Tailwind CSS

## 🛠️ Tech Stack

- **Frontend Framework** - React 18+ with Hooks
- **Build Tool** - Vite for fast development and optimized builds
- **Styling** - Tailwind CSS with custom animations
- **State Management** - React Context API for theme management
- **HTTP Client** - Axios for API requests
- **Icons** - Lucide React for beautiful SVG icons
- **Fonts** - Google Fonts (Poppins, Orbitron, Playfair Display)

## 📋 Prerequisites

- Node.js v16 or higher
- npm or yarn package manager
- Modern web browser with ES6 support

## 🚀 Getting Started

### Installation

```bash
# Clone the repository
git clone https://github.com/DUSHYANT2026/News-Weather.git

# Navigate to the project directory
cd newsweather

# Install dependencies
npm install

# or with yarn
yarn install
```

### Running the Development Server

```bash
# Start the development server
npm run dev

# or with yarn
yarn dev
```

The application will be available at `http://localhost:5173`

### Building for Production

```bash
# Build the project
npm run build

# or with yarn
yarn build

# Preview the production build
npm run preview
```

## 📁 Project Structure

```
newsweather/
├── src/
│   ├── components/
│   │   ├── About/
│   │   │   └── About.jsx
│   │   ├── Contact/
│   │   │   └── Contact.jsx
│   │   ├── Footer/
│   │   │   └── Footer.jsx
│   │   ├── Header/
│   │   │   └── Header.jsx
│   │   ├── Home/
│   │   │   └── Home.jsx (Weather Component)
│   │   ├── Login/
│   │   │   └── Login.jsx
│   │   ├── User/
│   │   │   └── User.jsx
│   │   ├── NewsApp.jsx (News Component)
│   │   └── Layouts.jsx
│   ├── App.jsx
│   ├── ThemeContext.jsx (Dark Mode Management)
│   ├── index.css
│   └── main.jsx
├── public/
├── package.json
├── tailwind.config.js
├── vite.config.js
└── README.md
```

## 🔌 API Integration

### News API
- **Provider** - NewsAPI.org
- **Endpoint** - Real-time news data with multiple categories
- **Features** - Search, filtering, and live news updates

### Weather API
- **Provider** - SheCodes Weather API
- **Endpoint** - Current weather and 7-day forecasts
- **Features** - Global city coverage with detailed metrics

## 🎯 Key Components

### Home.jsx (Weather)
- Real-time weather display with animated background
- City search functionality
- 7-day forecast grid
- Detailed weather metrics (humidity, wind, pressure, visibility)
- Smooth animations and transitions

### NewsApp.jsx (News)
- Category-based news browsing
- Search functionality for articles
- News card grid with hover effects
- Live timestamp display
- Source attribution for each article

### ThemeContext.jsx
- Global dark/light mode management
- Context API for state sharing
- Persistent theme preferences
- Used across all components

## 🎨 Theme Customization

The application supports both light and dark modes with carefully chosen color palettes:

- **Light Mode** - Vibrant gradients (Blue to Orange to Purple)
- **Dark Mode** - Deep purple and blue tones with subtle gradients

Switch between themes using the theme toggle in the navigation header.

## 📱 Responsive Breakpoints

- **Desktop** - Full featured experience (1024px+)
- **Tablet** - Optimized layout (768px - 1024px)
- **Mobile** - Touch-friendly interface (480px - 768px)
- **Small Mobile** - Compact display (<480px)

## 🔐 Security

- API keys stored in frontend (for demo purposes only)
- In production, move API keys to backend environment variables
- HTTPS recommended for deployment
- XSS protection through React's built-in sanitization

## 📝 Environment Variables

Create a `.env` file for production API keys:

```env
VITE_NEWS_API_KEY=your_news_api_key
VITE_WEATHER_API_KEY=your_weather_api_key
```

## 🚀 Deployment

### Recommended Platforms
- **Vercel** - Zero-config deployment with Vite support
- **Netlify** - Simple Git integration
- **GitHub Pages** - Free hosting for static sites
- **AWS S3 + CloudFront** - Scalable solution

### Deploy to Vercel
```bash
npm i -g vercel
vercel
```

## 📸 Screenshots

### News Section
- Real-time news feed with multiple categories
- Beautiful card-based layout with images
- Search and filtering capabilities

### Weather Section
- Live weather display with animated icons
- 7-day forecast view
- City search functionality

### Dark Mode
- Elegant dark theme with purple and blue tones
- Smooth transitions between themes
- Optimized for eye comfort

## 🤝 Contributing

Contributions are welcome! Here's how you can help:

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 👨‍💻 Author

**Dushyant Kumar**

- GitHub: [@DUSHYANT2026](https://github.com/DUSHYANT2026)
- LinkedIn: [Dushyant Kumar](https://www.linkedin.com/in/dushyant-kumar-b8594a251/)

## 🙏 Acknowledgments

- [NewsAPI.org](https://newsapi.org) - For providing reliable news data
- [SheCodes](https://www.shecodes.io) - For weather API services
- [React](https://react.dev) - Amazing JavaScript library
- [Vite](https://vitejs.dev) - Lightning-fast build tool
- [Tailwind CSS](https://tailwindcss.com) - Utility-first CSS framework

## 📞 Support

For support, email or create an issue on GitHub:
- GitHub Issues: [News-Weather Issues](https://github.com/DUSHYANT2026/News-Weather/issues)

## 🎉 Features Coming Soon

- [ ] User authentication and profiles
- [ ] Saved articles and favorites
- [ ] Email notifications for news alerts
- [ ] Weather alerts and warnings
- [ ] Multi-language support
- [ ] PWA (Progressive Web App) support
- [ ] Offline capability
- [ ] AI-powered news summarization

---

**Made with ❤️ by Dushyant Kumar**