// walletconnect.js (เฉพาะ MetaMask เท่านั้น - ไม่มี WalletConnect)

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

async function connectWithMetaMask() {
  if (window.ethereum && window.ethereum.isMetaMask) {
    try {
      const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
      const address = accounts[0];
      localStorage.setItem('nv-wallet-type', 'metamask');
      updateWalletUI(address);
      console.log("🦊 Connected to MetaMask:", address);
    } catch (error) {
      console.error('MetaMask connection error:', error);
    }
  } else {
    alert('MetaMask is not installed. Please install it from https://metamask.io');
  }
}

document.addEventListener("DOMContentLoaded", () => {
  const btn = document.getElementById("connectWalletBtn");
  if (!btn) return;

  btn.addEventListener("click", connectWithMetaMask);

  const type = localStorage.getItem("nv-wallet-type");
  if (type === "metamask") connectWithMetaMask();
});


