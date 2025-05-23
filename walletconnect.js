// walletconnect.js – MetaMask + Switch Network + Chain ID + Balance + Toast

let connectedAddress = null;

const NETWORKS = {
  1: { name: 'Ethereum', chainId: '0x1' },
  137: { name: 'Polygon', chainId: '0x89' },
  56: { name: 'BSC', chainId: '0x38' },
  42161: { name: 'Arbitrum', chainId: '0xa4b1' }
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
    const name = NETWORKS[chainId]?.name || `Chain ID: ${chainId}`;
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

async function switchNetwork(targetChainIdHex) {
  if (!window.ethereum) return;
  try {
    await window.ethereum.request({
      method: 'wallet_switchEthereumChain',
      params: [{ chainId: targetChainIdHex }]
    });
    toast(`🔄 Switched to ${NETWORKS[parseInt(targetChainIdHex, 16)]?.name}`, 'success');
    connectWithMetaMask();
  } catch (error) {
    if (error.code === 4902) {
      toast('❌ Network not available in MetaMask', 'error');
    } else {
      console.error(error);
      toast('❌ Failed to switch network', 'error');
    }
  }
}

document.addEventListener("DOMContentLoaded", () => {
  const connectBtn = document.getElementById("connectWalletBtn");
  const disconnectBtn = document.getElementById("disconnectWalletBtn");
  const switchDropdown = document.getElementById("networkSwitch");

  if (connectBtn) connectBtn.addEventListener("click", connectWithMetaMask);
  if (disconnectBtn) disconnectBtn.addEventListener("click", () => {
    if (confirm("Disconnect wallet?")) disconnectWallet();
  });
  if (switchDropdown) {
    switchDropdown.addEventListener("change", (e) => {
      const chainHex = e.target.value;
      if (chainHex) switchNetwork(chainHex);
    });
  }

  const type = localStorage.getItem("nv-wallet-type");
  if (type === "metamask") connectWithMetaMask();
});


