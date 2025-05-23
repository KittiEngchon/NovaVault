// nft.js – จัดการโหลด NFT โดยเฉพาะ

export async function fetchNFTs(walletAddress, chain = 'polygon') {
  try {
    const url = `https://api.opensea.io/api/v2/chain/${chain}/account/${walletAddress}/nfts`;
    const response = await fetch(url);
    const data = await response.json();
    return data.nfts || [];
  } catch (error) {
    console.error('Error fetching NFTs:', error);
    return [];
  }
}

export function renderNFT(nft, container) {
  const card = document.createElement('div');
  card.className = 'nft';

  const title = document.createElement('strong');
  title.innerText = nft.name || 'Unnamed NFT';

  const img = document.createElement('img');
  img.src = nft.image_url || '';
  img.alt = nft.name || 'NFT';

  card.appendChild(title);
  card.appendChild(document.createElement('br'));
  card.appendChild(img);
  container.appendChild(card);
} 

// ใช้งาน: import { fetchNFTs, renderNFT } จาก nft.js แล้วใช้ร่วมกับ novavault.js
