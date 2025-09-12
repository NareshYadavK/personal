const express = require('express');
const axios = require('axios');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());

// API endpoint
app.post('/get-person-details', async (req, res) => {
    const { uidNum } = req.body;

    if (!uidNum) {
        return res.status(400).json({ error: "uidNum is required" });
    }

    const url = "https://gsws-nbm.ap.gov.in/JKCSpandana/api/Spandana/personDetails";
    const payload = {
        uidNum: uidNum
    };
    const headers = {
        'Content-Type': "application/json",
        'Cookie': "SERVER=AppSrv1-IP24"
    };

    try {
        const response = await axios.post(url, payload, { headers });
        res.json(response.data);
    } catch (error) {
        console.error('API error:', error.message);
        res.status(500).json({ error: "Failed to fetch data" });
    }
});

// Start server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
