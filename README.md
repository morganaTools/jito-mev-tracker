# Jito MEV Tracker (Mini)

A simple dashboard that allows any Solana validator to visualize their latest MEV rewards using the [Jito API](https://stats.jito.wtf/).

---

## 🚀 How to Run Locally

1. **Clone the repo**:

```bash
git clone https://github.com/morganaTools/jito-mev-tracker.git
cd jito-mev-tracker
```

2. **Install dependencies**:

```bash
npm install
```

3. **Start the server**:

```bash
npm start
```

4. **Open your browser**:

```
http://localhost:8080
```

---

## 📊 Features

- Enter any `votePubkey` to fetch and visualize recent MEV rewards
- Interactive chart powered by Chart.js
- Safe to host publicly (no secrets or auth required)
- Powered by Node.js + Express

---

## ☁️ Hosting Options

You can deploy this easily on:
- [Railway](https://railway.app)
- Render
- Replit
- Vercel (requires serverless adaptation)

---

## 🛠 Troubleshooting

**Error: `500` or `Failed to fetch MEV rewards`**  
🔸 Reason: The Jito API might be temporarily down or unreachable.  
🔸 Check manually:

```
https://stats.jito.wtf/api/v1/validators/YOUR_VOTE_PUBKEY/payments
```

If this URL doesn't work in your browser, the API is likely down.

---

## 🛡️ Compliance Notice

This tool:
- Uses only **public, unauthenticated** endpoints provided by the Jito Foundation
- Does **not** scan or compare other validators
- Displays data **only** for the `votePubkey` manually entered by the user

✅ This implementation is **SFDP-compliant** and designed with network fairness and transparency in mind.
