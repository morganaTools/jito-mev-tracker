# Jito MEV Tracker (Mini)

This simple dashboard fetches and visualizes MEV rewards for any Solana validator using the Jito API.

## 🚀 How to Run

1. Clone the repo:
   ```bash
   git clone https://github.com/yourname/jito-mev-tracker.git
   cd jito-mev-tracker
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the server:
   ```bash
   npm start
   ```

4. Open your browser at:
   ```
   http://localhost:3000
   ```

## 🔍 Features

- Input any votePubkey and fetch latest MEV rewards
- Graph view using Chart.js
- Public-ready (no secrets)
- Hosted via Express + Node

## 🛠 Deployment

You can easily deploy this to:
- Render
- Vercel (convert to serverless function)
- Replit
- Railway

## 🛡️ Compliance Notice
This tool uses only public, unauthenticated endpoints provided by the Jito Foundation, specifically:

```bash
https://stats.jito.wtf/api/v1/validators/<votePubkey>/payments
```
No private API keys, scraping, or data aggregation is involved.

This tool does not scan or compare other validators — it only fetches data for the votePubkey manually entered by the user.

The intent is solely informational, to help validators track their own MEV rewards in a transparent and visual way.

✅ This implementation is SFDP-compliant and designed with network fairness and transparency in mind.
