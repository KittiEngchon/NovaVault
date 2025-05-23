// walletconnect.js
let walletConnector = null;

async function connectWithWalletConnect() {
  if (typeof WalletConnect === "undefined" || typeof QRCodeModal === "undefined") {
    alert("❌ WalletConnect library not loaded.");
    return;
  }

  // สร้างตัวเชื่อม
  walletConnector = new WalletConnect.default({
    bridge: "https://bridge.walletconnect.org",
    qrcodeModal: QRCodeModal.default
  });

  // ถ้ายังไม่ได้เชื่อม
  if (!walletConnector.connected) {
    await walletConnector.createSession();
  } else {
    const { accounts, chainId } = walletConnector;
    onWalletConnected(accounts, chainId);
  }

  // เมื่อเชื่อมต่อสำเร็จ
  walletConnector.on("connect", (error, payload) => {
    if (error) {
      console.error("WalletConnect Error:", error);
      return;
    }
    const { accounts, chainId } = payload.params[0];
    onWalletConnected(accounts, chainId);
  });

  // เมื่อผู้ใช้เปลี่ยนบัญชีหรือเครือข่าย
  walletConnector.on("session_update", (error, payload) => {
    if (error) return console.error("Session update error:", error);
    const { accounts, chainId } = payload.params[0];
    onWalletConnected(accounts, chainId);
  });

  // เมื่อยกเลิกการเชื่อมต่อ
  walletConnector.on("disconnect", (error) => {
    if (error) console.error("Disconnect error:", error);
    console.log("🔌 Disconnected from WalletConnect");
    disconnectWallet();
  });
}

function onWalletConnected(accounts, chainId) {
  const address = accounts[0];
  console.log("🔗 Connected:", address, "on Chain ID:", chainId);
  localStorage.setItem("walletconnect_address", address);
  localStorage.setItem("walletconnect_chain", chainId);
  updateWalletUI(address);
}

function disconnectWallet() {
  localStorage.removeItem("walletconnect_address");
  localStorage.removeItem("walletconnect_chain");
  updateWalletUI(null);
}

function updateWalletUI(address) {
  const button = document.querySelector(".connect-wallet");
  if (button) {
    button.innerText = address ? shortenAddress(address) : "Connect Wallet";
    button.style.background = address ? "#00ffcc" : "#00fff7";
  }
}

function shortenAddress(addr) {
  return addr.slice(0, 6) + "..." + addr.slice(-4);
}

// ติดตั้งเมื่อ DOM โหลดแล้ว
document.addEventListener("DOMContentLoaded", () => {
  let connectBtn = document.querySelector(".connect-wallet");
  if (!connectBtn) {
    connectBtn = document.createElement("button");
    connectBtn.className = "connect-wallet";
    connectBtn.innerText = "Connect Wallet";
    connectBtn.style.cssText = "position:fixed;bottom:1rem;right:1rem;padding:0.75rem 1rem;background:#00fff7;border:none;border-radius:8px;color:#000;z-index:9999;";
    document.body.appendChild(connectBtn);
  }

  connectBtn.addEventListener("click", () => {
    connectWithWalletConnect();
  });

  // โหลด address จาก localStorage ถ้ามี
  const saved = localStorage.getItem("walletconnect_address");
  if (saved) updateWalletUI(saved);
});
