const express = require('express');
const cors = require('cors'); // Import the CORS middleware
const app = express();
const PORT = process.env.PORT || 3000;

// Enable CORS for all origins. This is what fixes your error.
// For a public-facing application, you would configure this to be more restrictive.
app.use(cors());

// Middleware to parse JSON bodies
app.use(express.json());

// Main route
app.get('/', (req, res) => {
    res.send('Your server is running! Send a POST request to /api/personDetails with a {"uidNum":"..."} body.');
});

// POST route to get person details
app.post('/api/personDetails', (req, res) => {
    const { uidNum } = req.body;
    // Log the received UID for debugging purposes
    console.log(`Received request with uidNum: ${uidNum}`);
    
    // Check if uidNum is present
    if (!uidNum) {
        return res.status(400).json({ error: 'uidNum is required in the request body.' });
    }

    // This is where you would connect to a database to fetch real data
    // For this example, we'll use dummy data.
    const personDetails = {
        name: 'Naresh Kumar',
        address: '123 Main Street',
        city: 'Hyderabad',
        state: 'Telangana',
        pincode: '500001'
    };

    res.json(personDetails);
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
