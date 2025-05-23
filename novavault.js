// novavault.js

// Connect Wallet and fetch balances
let userAddress = "";

async function connectWallet() {
  if (window.ethereum) {
    try {
      const accounts = await ethereum.request({ method: 'eth_requestAccounts' });
      userAddress = accounts[0];
      document.getElementById("wallet-btn").innerText = shortenAddress(userAddress);
      loadTokens();
      loadNFTs();
    } catch (error) {
      console.error("User denied wallet connection", error);
    }
  } else {
    alert("MetaMask not found. Please install it to continue.");
  }
}

function shortenAddress(address) {
  return address.slice(0, 6) + '...' + address.slice(-4);
}

function copyAddress() {
  navigator.clipboard.writeText(userAddress);
  alert("Wallet address copied to clipboard");
}

async function loadTokens() {
  const tokenContainer = document.getElementById("token-list");
  tokenContainer.innerHTML = "Loading tokens...";
  
  // Placeholder for token values, normally fetched via Web3 or API
  const tokens = [
    { name: 'USDC', balance: '1,320.54' },
    { name: 'MATIC', balance: '528.10' },
    { name: 'ETH', balance: '2.35' }
  ];

  tokenContainer.innerHTML = tokens.map(token => 
    `<div class="token">${token.name}: ${token.balance}</div>`
  ).join('');
}

async function loadNFTs() {
  const nftContainer = document.getElementById("nft-list");
  nftContainer.innerHTML = "Loading NFTs...";

  // Placeholder for NFT metadata
  const nfts = [
    { name: 'Cyber Lion', image: 'https://i.seadn.io/gcs/files/cba00062c45545815a4f0bdcf4fef14b.png' },
    { name: 'Crypto Galaxy', image: 'https://i.seadn.io/gcs/files/71e317a58d4e1de7f2937558b17e038f.png' }
  ];

  nftContainer.innerHTML = nfts.map(nft => `
    <div class="nft">
      <strong>${nft.name}</strong><br/>
      <img src="${nft.image}" alt="${nft.name}" />
    </div>
  `).join('');
}

document.getElementById("wallet-btn").addEventListener("click", connectWallet);
