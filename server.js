const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');
const speakingRequestRoute = require('./api/speaking-request');
const prayerRequestRoute = require('./api/prayer-request');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Serve static files
app.use(express.static(path.join(__dirname, '/')));

// API Routes
app.use('/api/speaking-request', speakingRequestRoute);
app.use('/api/prayer-request', prayerRequestRoute);

// Catch-all route to serve index.html for SPA-like navigation (optional, but good for static sites)
app.get(/(.*)/, (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
