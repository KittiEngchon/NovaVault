// walletconnect.js – MetaMask + Chain ID + Balance + Toast Types + Network Name

let connectedAddress = null;

const NETWORKS = {
  1: 'Ethereum',
  137: 'Polygon',
  56: 'BSC',
  42161: 'Arbitrum'
};

function updateWalletUI(address, chainId) {
  const btn = document.getElementById("connectWalletBtn");
  const chain = document.getElementById("walletChainId");
  const disconnectBtn = document.getElementById("disconnectWalletBtn");

  if (btn) {
    btn.innerText = address ? shortenAddress(address) : "Connect Wallet";
    btn.style.background = address ? "#00ffcc" : "#00fff7";
  }

  if (chain) {
    const name = NETWORKS[chainId] || `Chain ID: ${chainId}`;
    chain.textContent = address && chainId ? `🛰 ${name}` : "";
  }

  if (disconnectBtn) {
    disconnectBtn.style.display = address ? "inline-block" : "none";
  }

  connectedAddress = address;
  if (address) fetchBalance(address);
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
      toast(`🦊 Connected: ${shortenAddress(address)}`, 'success');
    } catch (error) {
      console.error('MetaMask connection error:', error);
      toast('❌ Connection failed', 'error');
    }
  } else {
    alert('MetaMask is not installed. Please install it from https://metamask.io');
  }
}

function disconnectWallet() {
  localStorage.removeItem("nv-wallet-type");
  updateWalletUI(null, null);
  connectedAddress = null;
  toast("🔌 Disconnected", 'info');
}

async function fetchBalance(address) {
  if (!window.ethereum) return;
  const provider = new ethers.providers.Web3Provider(window.ethereum);
  const balance = await provider.getBalance(address);
  const eth = ethers.utils.formatEther(balance);
  toast(`💰 Balance: ${parseFloat(eth).toFixed(4)} ETH`, 'info');
}

function toast(msg, type = 'info') {
  let div = document.createElement("div");
  div.className = `toast ${type}`;
  div.innerText = msg;
  document.body.appendChild(div);
  setTimeout(() => div.remove(), 3500);
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


