// walletconnect.js (MetaMask Only + Chain ID + Disconnect)

let connectedAddress = null;

function updateWalletUI(address, chainId) {
  const btn = document.getElementById("connectWalletBtn");
  const chain = document.getElementById("walletChainId");
  const disconnectBtn = document.getElementById("disconnectWalletBtn");

  if (btn) {
    btn.innerText = address ? shortenAddress(address) : "Connect Wallet";
    btn.style.background = address ? "#00ffcc" : "#00fff7";
  }
  if (chain) {
    chain.textContent = address && chainId ? `Chain ID: ${chainId}` : "";
  }
  if (disconnectBtn) {
    disconnectBtn.style.display = address ? "inline-block" : "none";
  }

  connectedAddress = address;
}

function shortenAddress(addr) {
  return addr.slice(0, 6) + '...' + addr.slice(-4);
}

async function connectWithMetaMask() {
  if (window.ethereum && window.ethereum.isMetaMask) {
    try {
      const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
      const chainId = await window.ethereum.request({ method: 'eth_chainId' });
      const address = accounts[0];
      localStorage.setItem('nv-wallet-type', 'metamask');
      updateWalletUI(address, parseInt(chainId, 16));
      console.log("🦊 Connected to MetaMask:", address);
    } catch (error) {
      console.error('MetaMask connection error:', error);
    }
  } else {
    alert('MetaMask is not installed. Please install it from https://metamask.io');
  }
}

function disconnectWallet() {
  localStorage.removeItem("nv-wallet-type");
  updateWalletUI(null, null);
  connectedAddress = null;
  console.log("🔌 Disconnected MetaMask");
}

document.addEventListener("DOMContentLoaded", () => {
  const connectBtn = document.getElementById("connectWalletBtn");
  const disconnectBtn = document.getElementById("disconnectWalletBtn");

  if (connectBtn) connectBtn.addEventListener("click", connectWithMetaMask);
  if (disconnectBtn) disconnectBtn.addEventListener("click", () => {
    if (confirm("Disconnect wallet?")) disconnectWallet();
  });

  const type = localStorage.getItem("nv-wallet-type");
  if (type === "metamask") connectWithMetaMask();
});
