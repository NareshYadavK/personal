import express from "express";
import fetch from "node-fetch";
import cors from "cors";

const app = express();
app.use(cors());
app.use(express.json());

// doctdetails endpoint
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
  } catch (err) {
    console.error("doctdetails error:", err);
    res.status(500).json({ error: "Failed to fetch doctdetails" });
  }
});

// personDetails endpoint
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
  } catch (err) {
    console.error("personDetails error:", err);
    res.status(500).json({ error: "Failed to fetch personDetails" });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`✅ Proxy running on port ${PORT}`));
