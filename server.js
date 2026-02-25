const express = require("express");
const fetch = require("node-fetch");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

// 🔑 USE ENV VARIABLES (IMPORTANT)
const USER_ID = process.env.USER_ID;
const API_KEY = process.env.API_KEY;

const auth = "Basic " + Buffer.from(USER_ID + ":" + API_KEY).toString("base64");

// Test route
app.get("/", (req, res) => {
  res.send("Backend running ✅");
});

// 🔮 Kundali API
app.post("/kundali", async (req, res) => {
  try {
    const response = await fetch("https://json.astrologyapi.com/v1/birth_details", {
      method: "POST",
      headers: {
        "Authorization": auth,
        "Content-Type": "application/json"
      },
      body: JSON.stringify(req.body)
    });

    const data = await response.json();
    res.json(data);

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.listen(3000, () => console.log("Server running"));
