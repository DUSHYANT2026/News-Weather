import axios from "axios";

export default async function handler(req, res) {
  const { category = "general", q = "" } = req.query;

  try {
    const apiKey = process.env.NEWS_API_KEY;

    let url = "";

    if (q) {
      url = `https://newsapi.org/v2/everything?q=${encodeURIComponent(
        q
      )}&language=en&pageSize=20&apiKey=${apiKey}`;
    } else {
      url = `https://newsapi.org/v2/top-headlines?country=us&category=${category}&pageSize=20&apiKey=${apiKey}`;
    }

    const response = await axios.get(url);

    res.status(200).json(response.data);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({
      error: "Failed to fetch news from NewsAPI",
    });
  }
}
