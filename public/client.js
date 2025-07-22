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

    const rewards = data.map(p => p.amount / 1e9).reverse();
    const times = data.map(p => new Date(p.timestamp * 1000).toLocaleString()).reverse();

    const canvas = document.createElement('canvas');
    chartBox.appendChild(canvas);

    new Chart(canvas.getContext('2d'), {
      type: 'line',
      data: {
        labels: times,
        datasets: [{
          label: 'MEV Reward (SOL)',
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
            text: 'Latest MEV Rewards from Jito'
          }
        }
      }
    });
  } catch (err) {
    console.error(err);
    errorBox.textContent = '⚠️ Failed to load data. Jito API might be temporarily unavailable.';
  }
}
