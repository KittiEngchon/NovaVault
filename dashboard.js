// dashboard.js – คำนวณและแสดงสรุป Dashboard + Pie Chart

let chart = null;

function updateDashboardSummary(tokenList = [], nftList = []) {
  const totalBalanceDiv = document.getElementById("totalBalance");
  const tokenCountDiv = document.getElementById("tokenCount");
  const nftCountDiv = document.getElementById("nftCount");

  let total = 0;
  for (const token of tokenList) {
    total += parseFloat(token.balance || 0);
  }

  if (totalBalanceDiv) totalBalanceDiv.innerText = `💰 Total: ${total.toFixed(2)} Tokens`;
  if (tokenCountDiv) tokenCountDiv.innerText = `📦 Tokens: ${tokenList.length}`;
  if (nftCountDiv) nftCountDiv.innerText = `🎨 NFTs: ${nftList.length}`;

  drawPieChart(tokenList);
}

function drawPieChart(tokens) {
  const ctx = document.getElementById('tokenChart')?.getContext('2d');
  if (!ctx) return;

  if (chart) chart.destroy();

  chart = new Chart(ctx, {
    type: 'pie',
    data: {
      labels: tokens.map(t => t.symbol),
      datasets: [{
        label: 'Token Distribution',
        data: tokens.map(t => parseFloat(t.balance)),
        backgroundColor: generateColors(tokens.length),
        borderWidth: 1
      }]
    },
    options: {
      plugins: {
        legend: {
          labels: {
            color: '#fff'
          }
        }
      }
    }
  });
}

function generateColors(n) {
  const colors = ["#00f7ff", "#7efff5", "#4cffdf", "#2ed3c9", "#1a9ba2", "#fff700", "#ffb347"];
  while (colors.length < n) {
    colors.push('#' + Math.floor(Math.random()*16777215).toString(16));
  }
  return colors.slice(0, n);
}

window.updateDashboardSummary = updateDashboardSummary;
