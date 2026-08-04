import dotenv from "dotenv";
import express from "express";
import fetch from "node-fetch";
dotenv.config();

const app = express();

app.use(express.static("."));
app.get("/movies", async (req, res) => {
    try {
        const term = req.query.s || "action";
        const apiKey = process.env.API_KEY;
        console.log("Using API Key:", apiKey);
        const api_url = `http://www.omdbapi.com/?apikey=${apiKey}&s=${term}`;
        const response = await fetch(api_url);
        const data = await response.json();
        res.json(data);
    } catch (error) {
        console.error("Error fetching movies:", error);
        res.json({Search: []});
    }
});
app.listen(3000, () => {
    console.log("Server running at http://localhost:3000");
})