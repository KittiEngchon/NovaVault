// walletconnect.js (เวอร์ชันรวม MetaMask + WalletConnect Toggle)

let walletConnector = null;
let isWalletConnect = false;

async function connectWallet() {
  if (window.ethereum) {
    try {
      const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
      const address = accounts[0];
      updateWalletUI(address);
      isWalletConnect = false;
      localStorage.setItem('nv-wallet-type', 'metamask');
    } catch (error) {
      console.error('MetaMask connection error:', error);
    }
  } else {
    alert('MetaMask not found. Try WalletConnect instead.');
  }
}

async function connectWithWalletConnect() {
  if (typeof WalletConnect === "undefined") {
    alert("❌ WalletConnect library not loaded.");
    return;
  }

  walletConnector = new WalletConnect.default({
    bridge: "https://bridge.walletconnect.org",
    qrcodeModal: window.WalletConnectQRCodeModal.default
  });

  if (!walletConnector.connected) {
    await walletConnector.createSession();
  } else {
    const { accounts, chainId } = walletConnector;
    onWalletConnected(accounts, chainId);
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

function updateWalletUI(address) {
  const btn = document.getElementById("connectWalletBtn");
  if (btn) {
    btn.innerText = address ? shortenAddress(address) : "Connect Wallet";
    btn.style.background = address ? "#00ffcc" : "#00fff7";
  }
}

function shortenAddress(addr) {
  return addr.slice(0, 6) + '...' + addr.slice(-4);
}

document.addEventListener("DOMContentLoaded", () => {
  const btn = document.getElementById("connectWalletBtn");
  if (!btn) return;

  btn.addEventListener("click", () => {
    const useWalletConnect = confirm("Use WalletConnect? Press 'Cancel' to use MetaMask.");
    if (useWalletConnect) {
      connectWithWalletConnect();
    } else {
      connectWallet();
    }
  });

  // Restore previous session
  const type = localStorage.getItem("nv-wallet-type");
  if (type === "walletconnect") connectWithWalletConnect();
});
