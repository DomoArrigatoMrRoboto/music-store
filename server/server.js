import express from "express";
import fetch from "node-fetch";
import cors from "cors";

const app = express();

const allowedOrigins = [
  "http://localhost:5173",
  "https://themusicstore.netlify.app"
];

app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin) return callback(null, true);
      if (allowedOrigins.includes(origin)) {
        return callback(null, true);
      } else {
        return callback(new Error("CORS not allowed for this origin"), false);
      }
    }
  })
);

const PORT = process.env.PORT || 5000;
const JAMENDO_CLIENT_ID = process.env.JAMENDO_CLIENT_ID || "73ad071e";

app.get("/api/tracks", async (req, res) => {
  try {
    const response = await fetch(
      `https://api.jamendo.com/v3.0/tracks/?client_id=${JAMENDO_CLIENT_ID}&format=json&limit=50&order=popularity_total`
    );

    if (!response.ok) {
      throw new Error(`Jamendo API error: ${response.status}`);
    }

    const data = await response.json();
    res.json(data.results || []);
  } catch (err) {
    console.error("Server fetch error:", err.message);
    res.status(500).json({ error: "Failed to fetch tracks" });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
