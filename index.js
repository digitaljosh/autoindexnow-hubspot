const express = require('express');
const axios = require('axios');
require('dotenv').config();

const app = express();
const PORT = 3000;

app.get('/', (req, res) => {
  res.send('AutoIndexNow app is running');
});

app.get('/oauth/callback', async (req, res) => {
  const code = req.query.code;

  try {
    const tokenRes = await axios.post('https://api.hubapi.com/oauth/v1/token', null, {
      params: {
        grant_type: 'authorization_code',
        client_id: process.env.HUBSPOT_CLIENT_ID,
        client_secret: process.env.HUBSPOT_CLIENT_SECRET,
        redirect_uri: process.env.REDIRECT_URI,
        code
      },
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
    });

    const tokenData = tokenRes.data;
    console.log('Access Token:', tokenData.access_token);
    res.send('✅ OAuth Success! Token received and logged in terminal.');
  } catch (err) {
    console.error(err.response?.data || err.message);
    res.status(500).send('OAuth failed');
  }
});

app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});
