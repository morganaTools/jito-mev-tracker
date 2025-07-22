import Chart from 'chart.js/auto';

document.getElementById('loadBtn').addEventListener('click', async () => {
  const votePubkey = document.getElementById('voteInput').value.trim();
  if (!votePubkey) return alert('Please enter a votePubkey');

  const res = await fetch('/api/payments/' + votePubkey);
  if (!res.ok) return alert('Failed to fetch MEV data');
  const data = await res.json();

  const rewards = data.map(p => p.amount / 1e9);
  const times = data.map(p => new Date(p.timestamp * 1000).toLocaleString());

  const ctx = document.getElementById('mevChart').getContext('2d');
  new Chart(ctx, {
    type: 'line',
    data: {
      labels: times.reverse(),
      datasets: [{
        label: 'MEV Reward (SOL)',
        data: rewards.reverse(),
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
});
