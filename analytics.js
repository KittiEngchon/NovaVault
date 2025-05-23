// analytics.js

// ส่ง event log เข้า console หรือระบบติดตามจริง เช่น Google Analytics หรือ custom API
function logEvent(eventName, data = {}) {
  console.log(`[Analytics] ${eventName}`, data);
  // ตัวอย่างสำหรับส่งไปยัง API:
  // fetch('/api/log', { method: 'POST', body: JSON.stringify({ eventName, ...data }) });
}

// ตัวอย่างการเก็บการคลิกปุ่ม Connect Wallet
document.addEventListener("DOMContentLoaded", () => {
  const connectBtn = document.querySelector("button");
  if (connectBtn) {
    connectBtn.addEventListener("click", () => {
      logEvent("connect_wallet_click");
    });
  }

  // Track token section visibility
  const tokenSection = document.querySelector(".section:nth-child(1)");
  if (tokenSection) {
    logEvent("view_token_section");
  }

  // Track NFT section visibility
  const nftSection = document.querySelector(".section:nth-child(2)");
  if (nftSection) {
    logEvent("view_nft_section");
  }
});

// Example hook: Track if user stays on site >30s
setTimeout(() => {
  logEvent("user_stayed_30s");
}, 30000);
