// dashboard.js – คำนวณและแสดงสรุป Dashboard

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
}

// ตัวอย่างการเรียก (จะเรียกหลังจากโหลด token แล้ว)
// updateDashboardSummary(tokenList, nftList);
