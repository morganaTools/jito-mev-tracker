document.getElementById('loadBtn').addEventListener('click', loadChart);

async function loadChart() {
  const votePubkey = document.getElementById('voteInput').value.trim();
  if (!votePubkey) return alert('Please enter a votePubkey');

  const chartBox = document.getElementById('chartBox');
  const errorBox = document.getElementById('errorBox');
  chartBox.innerHTML = '';
  errorBox.textContent = '';

  try {
    const res = await fetch('/api/payments/' + votePubkey);
    if (!res.ok) throw new Error('API error');

    const data = await res.json();
    if (!Array.isArray(data)) throw new Error('Invalid data');

    const rewards = data.map(p => p.mev_rewards / 1e9).reverse();
    const labels = data.map(p => `Epoch ${p.epoch}`).reverse();

    const canvas = document.createElement('canvas');
    chartBox.appendChild(canvas);

    new Chart(canvas.getContext('2d'), {
      type: 'line',
      data: {
        labels,
        datasets: [{
          label: 'MEV Rewards (SOL)',
          data: rewards,
          borderColor: 'blue',
          backgroundColor: 'rgba(0,0,255,0.1)',
          fill: true
        }]
      },
      options: {
        responsive: true,
        plugins: {
          title: {
            display: true,
            text: 'MEV Rewards per Epoch (Jito)'
          }
        }
      }
    });
  } catch (err) {
    console.error(err);
    errorBox.textContent = '⚠️ Failed to load data. Jito API might be unavailable or votePubkey is invalid.';
  }
}
