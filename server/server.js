import express from "express";
import fetch from "node-fetch";
import cors from "cors";

const app = express();

app.use(
  cors({
    origin: "https://your-netlify-site.netlify.app"
  })
);

const PORT = process.env.PORT || 5000;

const JAMENDO_CLIENT_ID = process.env.JAMENDO_CLIENT_ID || "73ad071e";

app.get("/api/tracks", async (req, res) => {
  try {
    const response = await fetch(
      `https://api.jamendo.com/v3.0/tracks/?client_id=${JAMENDO_CLIENT_ID}&format=json&limit=50&order=popularity_total`
    );
    const data = await response.json();

    console.log("Jamendo API response:", data);

    if (data.results && data.results.length > 0) {
      res.json(data.results);
    } else {
      res.json([
        {
          id: 1,
          name: "Sample Track 1",
          artist_name: "Sample Artist",
          image: "https://via.placeholder.com/300"
        },
        {
          id: 2,
          name: "Sample Track 2",
          artist_name: "Sample Artist",
          image: "https://via.placeholder.com/300"
        }
      ]);
    }
  } catch (err) {
    console.error("Server fetch error:", err);

    res.json([
      {
        id: 1,
        name: "Sample Track 1",
        artist_name: "Sample Artist",
        image: "https://via.placeholder.com/300"
      },
      {
        id: 2,
        name: "Sample Track 2",
        artist_name: "Sample Artist",
        image: "https://via.placeholder.com/300"
      }
    ]);
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
