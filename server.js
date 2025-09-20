// server.js

const express = require('express');
const axios = require('axios');
const app = express();
const port = process.env.PORT || 3000;

// Middleware to parse JSON bodies from incoming requests
app.use(express.json());

// Main function to make the API call
async function getPersonDetails(uidNum) {
  const url = 'https://gsws-nbm.ap.gov.in/JKCSpandana/api/Spandana/personDetails';
  const headers = {
    'Content-Type': 'application/json;charset=UTF-8'
  };
  const data = {
    "uidNum": uidNum
  };

  try {
    const response = await axios.post(url, data, { headers });
    return response.data;
  } catch (error) {
    if (error.response) {
      console.error('API Error Response:', error.response.data);
      throw new Error('API returned an error.');
    } else if (error.request) {
      console.error('No response received from API.');
      throw new Error('No response from API.');
    } else {
      console.error('Error during API request setup:', error.message);
      throw new Error('Request setup failed.');
    }
  }
}

// Define a POST endpoint for your website's front end to use
// For example, from your website's form, you can send a POST request to this endpoint
app.post('/api/personDetails', async (req, res) => {
  const { uidNum } = req.body;

  if (!uidNum) {
    return res.status(400).json({ error: 'UID number is required in the request body.' });
  }

  try {
    const details = await getPersonDetails(uidNum);
    res.status(200).json(details);
  } catch (err) {
    console.error(`Error in /api/personDetails: ${err.message}`);
    res.status(500).json({ error: 'Failed to retrieve person details.' });
  }
});

// A simple route to confirm the server is running
app.get('/', (req, res) => {
  res.send('Your server is running! Send a POST request to /api/personDetails with a {"uidNum":"..."} body.');
});

// Start the server
app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
