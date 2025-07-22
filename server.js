const express = require('express');
const fetch = require('node-fetch');
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.static('public'));

app.get('/api/payments/:votePubkey', async (req, res) => {
  const votePubkey = req.params.votePubkey;
  const jitoUrl = 'https://stats.jito.wtf/api/v1/validators/' + votePubkey + '/payments';

  try {
    const response = await fetch(jitoUrl);
    const data = await response.json();
    res.json(data);
  } catch (err) {
    console.error('Fetch failed:', err);
    res.status(500).json({ error: 'Failed to fetch MEV rewards.' });
  }
});

app.listen(PORT, () => {
  console.log('Server running on http://localhost:' + PORT);
});

