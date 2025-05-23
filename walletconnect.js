// walletconnect.js – รวม MetaMask + WalletConnect แบบ Modal มืออาชีพ

let walletConnector = null;
let isWalletConnect = false;

function updateWalletUI(address) {
  const btn = document.getElementById("connectWalletBtn");
  if (btn) {
    btn.innerText = address ? shortenAddress(address) : "Connect Wallet";
    btn.style.background = address ? "#00ffcc" : "#00fff7";
  }
  closeWalletModal();
}

function shortenAddress(addr) {
  return addr.slice(0, 6) + '...' + addr.slice(-4);
}

function openWalletModal() {
  const modal = document.getElementById("walletModal");
  if (modal) modal.style.display = "flex";
}

function closeWalletModal() {
  const modal = document.getElementById("walletModal");
  if (modal) modal.style.display = "none";
}

async function connectWithMetaMask() {
  if (window.ethereum) {
    try {
      const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
      const address = accounts[0];
      isWalletConnect = false;
      localStorage.setItem('nv-wallet-type', 'metamask');
      updateWalletUI(address);
    } catch (error) {
      console.error('MetaMask connection error:', error);
    }
  } else {
    alert('MetaMask not found. Please install MetaMask extension.');
  }
}

async function connectWithWalletConnect() {
  if (typeof WalletConnect === "undefined" || typeof window.WalletConnectQRCodeModal === "undefined") {
    alert("❌ WalletConnect library not loaded.");
    return;
  }

  walletConnector = new WalletConnect.default({
    bridge: "https://bridge.walletconnect.org",
    qrcodeModal: window.WalletConnectQRCodeModal.default
  });

  if (!walletConnector.connected) {
    await walletConnector.createSession();
  }

  walletConnector.on("connect", (error, payload) => {
    if (error) throw error;
    const { accounts, chainId } = payload.params[0];
    onWalletConnected(accounts, chainId);
  });

  walletConnector.on("disconnect", () => {
    console.log("🔌 Disconnected WalletConnect");
    disconnectWallet();
  });
}

function onWalletConnected(accounts, chainId) {
  const address = accounts[0];
  isWalletConnect = true;
  localStorage.setItem("nv-wallet-type", "walletconnect");
  updateWalletUI(address);
  console.log("🔗 Connected:", address, "Chain:", chainId);
}

function disconnectWallet() {
  updateWalletUI(null);
  localStorage.removeItem("nv-wallet-type");
}

document.addEventListener("DOMContentLoaded", () => {
  const btn = document.getElementById("connectWalletBtn");
  if (!btn) return;

  btn.addEventListener("click", openWalletModal);

  const type = localStorage.getItem("nv-wallet-type");
  if (type === "walletconnect") connectWithWalletConnect();
});

