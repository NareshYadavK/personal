const axios = require('axios');
const https = require('https');

const agent = new https.Agent({  
  rejectUnauthorized: false  // Ignore invalid SSL certs
});

app.post('/get-person-details', async (req, res) => {
    const { uidNum } = req.body;
    if (!uidNum) {
        return res.status(400).json({ error: 'uidNum is required' });
    }
    try {
        const response = await axios.post('https://gsws-nbm.ap.gov.in/JKCSpandana/api/Spandana/personDetails', {
            uidNum: uidNum
        }, {
            headers: {
                'Content-Type': 'application/json;charset=UTF-8'
            },
            httpsAgent: agent  // Add this line
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
