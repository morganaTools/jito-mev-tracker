document.getElementById('loadBtn').addEventListener('click', loadChart);

let chartInstance = null;

async function loadChart() {
  const votePubkey = document.getElementById('voteInput').value.trim();
  if (!votePubkey) return alert('Please enter a votePubkey');

  const errorBox = document.getElementById('errorBox');
  errorBox.textContent = '';

  try {
    const res = await fetch('/api/payments/' + votePubkey);
    if (!res.ok) throw new Error('API error');

    const data = await res.json();
    if (!Array.isArray(data)) throw new Error('Invalid data');

    const rewards = data.map(p => p.mev_rewards / 1e9).reverse();
    const labels = data.map(p => `Epoch ${p.epoch}`).reverse();

    const ctx = document.getElementById('mevChart').getContext('2d');

    if (chartInstance) {
      chartInstance.destroy();
    }

    chartInstance = new Chart(ctx, {
      type: 'line',
      data: {
        labels,
        datasets: [{
          label: 'MEV Rewards (SOL)',
          data: rewards,
          borderColor: 'blue',
          backgroundColor: 'rgba(0,0,255,0.1)',
          fill: true,
          pointRadius: 2,
          borderWidth: 2,
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          x: {
            ticks: {
              autoSkip: true,
              maxRotation: 60,
              minRotation: 60,
              maxTicksLimit: 30
            }
          },
          y: {
            beginAtZero: true
          }
        },
        plugins: {
          legend: {
            display: true
          },
          tooltip: {
            mode: 'index',
            intersect: false
          }
        }
      }
    });
  } catch (err) {
    console.error(err);
    errorBox.textContent = '⚠️ Failed to load data. Jito API might be unavailable or votePubkey is invalid.';
  }
}
