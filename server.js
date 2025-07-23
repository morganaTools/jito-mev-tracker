const express = require('express');
const fetch = require('node-fetch');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 8080;

app.use(express.static(__dirname)); // serve index.html and client.js

app.get('/api/payments/:votePubkey', async (req, res) => {
  const votePubkey = req.params.votePubkey;
  const jitoUrl = `https://kobe.mainnet.jito.network/api/v1/validators/${votePubkey}`;

  try {
    const response = await fetch(jitoUrl);
    if (!response.ok) throw new Error('Jito API error');
    const data = await response.json();
    res.json(data);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to fetch MEV rewards.' });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});


