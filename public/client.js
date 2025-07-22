async function loadChart() {
  const voteInput = document.getElementById('voteInput');
  const votePubkey = voteInput.value.trim();
  if (!votePubkey) return alert('Please enter a votePubkey');

  try {
    const res = await fetch('/api/payments/' + votePubkey);
    const data = await res.json();

    const rewards = data.map(p => p.amount / 1e9).reverse();
    const times = data.map(p => new Date(p.timestamp * 1000).toLocaleString()).reverse();

    const ctx = document.getElementById('mevChart').getContext('2d');
    new Chart(ctx, {
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
    alert('❌ Failed to load data. Check votePubkey or server status.');
    console.error(err);
  }
}
