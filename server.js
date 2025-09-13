const express = require('express');
const axios = require('axios');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static('public'));

// Endpoint to handle form submission
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
            }
        });

        res.json(response.data);
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ error: 'Failed to fetch data' });
    }
});

// Serve the homepage
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
