const express = require('express');
const axios = require('axios');
const https = require('https');
const bodyParser = require('body-parser'); // If needed

const app = express();
const PORT = process.env.PORT || 10000;

// Middleware
app.use(express.json()); // Parses incoming JSON requests
// or use body-parser: app.use(bodyParser.json());

// POST endpoint
app.post('/get-person-details', async (req, res) => {
    const { uidNum } = req.body;
    if (!uidNum) {
        return res.status(400).json({ error: 'uidNum is required' });
    }

    const agent = new https.Agent({  
        rejectUnauthorized: false  // Ignore invalid SSL certs (for testing)
    });

    try {
        const response = await axios.post('https://gsws-nbm.ap.gov.in/JKCSpandana/api/Spandana/personDetails', {
            uidNum: uidNum
        }, {
            headers: {
                'Content-Type': 'application/json;charset=UTF-8'
            },
            httpsAgent: agent
        });

        res.json(response.data);
    } catch (error) {
        console.error('API request failed:', error.message);
        res.status(500).json({ error: 'Failed to fetch data', details: error.message });
    }
});

// Start server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
