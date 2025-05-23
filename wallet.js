// wallet.js

export async function getWalletAddress() {
  if (window.ethereum) {
    const accounts = await ethereum.request({ method: 'eth_accounts' });
    return accounts[0] || null;
  }
  return null;
}

export async function requestWalletAccess() {
  if (window.ethereum) {
    const accounts = await ethereum.request({ method: 'eth_requestAccounts' });
    return accounts[0];
  }
  throw new Error("MetaMask not available");
}

export function shortenAddress(address) {
  if (!address) return '';
  return address.slice(0, 6) + '...' + address.slice(-4);
}

export function copyToClipboard(text) {
  navigator.clipboard.writeText(text);
  alert("Copied to clipboard");
}
