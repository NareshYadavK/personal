const express = require("express");
const fetch = require("node-fetch");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

// ------------------- doctdetails API -------------------
app.get("/api/doctdetails", async (req, res) => {
  const { SRCODE, DOCNO, RYEAR, BOOKNO } = req.query;

  const url = `https://api.vswsonline.ap.gov.in/regns/pdeapi/v1/apiforother/doctdetails?SRCODE=${SRCODE}&DOCNO=${DOCNO}&RYEAR=${RYEAR}&BOOKNO=${BOOKNO}`;

  try {
    const response = await fetch(url, {
      headers: {
        "ocp-apim-subscription-key": "2402114c7f064b42aec9685dac6603f0"
      }
    });
    const data = await response.json();
    res.json(data);
  } catch (error) {
    console.error("Error in doctdetails:", error);
    res.status(500).json({ error: "Failed to fetch doctdetails" });
  }
});

// ------------------- personDetails API -------------------
app.post("/api/personDetails", async (req, res) => {
  const { uidNum } = req.body;

  try {
    const response = await fetch("https://gsws-nbm.ap.gov.in/JKCSpandana/api/Spandana/personDetails", {
      method: "POST",
      headers: {
        "Content-Type": "application/json;charset=UTF-8",
        "Cookie": "SERVER=AppSrv1-IP23"
      },
      body: JSON.stringify({ uidNum })
    });

    const data = await response.json();
    res.json(data);
  } catch (error) {
    console.error("Error in personDetails:", error);
    res.status(500).json({ error: "Failed to fetch personDetails" });
  }
});

// ------------------- Start Server -------------------
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`✅ Proxy running on port ${PORT}`));
