const express = require('express');
const axios = require('axios');
const https = require('https');
const app = express();
const PORT = process.env.PORT || 10000;

// Middleware
app.use(express.json());
app.use(express.static('public')); // Serve static files from 'public'

// Handle GET request at "/"
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/public/index.html');
});

// Handle POST request at "/get-person-details"
app.post('/get-person-details', async (req, res) => {
    const { uidNum } = req.body;
    if (!uidNum) {
        return res.status(400).json({ error: 'uidNum is required' });
    }

    const agent = new https.Agent({ rejectUnauthorized: false });

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
        console.error('API request failed:');
        console.error('Message:', error.message);
        if (error.response) {
            console.error('Status:', error.response.status);
            console.error('Data:', error.response.data);
        } else if (error.request) {
            console.error('No response received:', error.request);
        } else {
            console.error('Error setting up request:', error);
        }
        res.status(500).json({ error: 'Failed to fetch data', details: error.message });
    }
});

// Start server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

