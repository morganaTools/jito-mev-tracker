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

### 1. ⚠️ Chart appears squished or unreadable

**Symptoms:**
- Epoch labels are compressed and overlap.
- Happens when MEV rewards start only from a high epoch (e.g., 300+), with earlier epochs having no rewards.

**Explanation:**
- The chart currently includes all epochs, even those with zero rewards, which leads to long unreadable x-axis.

**Solution:**
- This is a known limitation. I plan to filter out epochs without rewards in a future update.
- For now, simply scroll horizontally or zoom out in the browser.


### 2. ❌ `500` Error or `Failed to fetch MEV rewards`

**Symptoms:**
- Error message appears after clicking **Load MEV**.
- No data is loaded into the chart.

**Possible reasons:**
- Invalid or inactive `votePubkey`.
- The Jito API endpoint is temporarily down or unreachable.

**Manual check:**
Visit this URL in your browser (replace `YOUR_VOTE_PUBKEY` with your actual key):
```
https://kobe.mainnet.jito.network/api/v1/validators/YOUR_VOTE_PUBKEY
```

---

## 🛡️ Compliance Notice

This tool:
- Uses only **public, unauthenticated** endpoints provided by the Jito Foundation
- Does **not** scan or compare other validators
- Displays data **only** for the `votePubkey` manually entered by the user

✅ This implementation is **SFDP-compliant** and designed with network fairness and transparency in mind.
