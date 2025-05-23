// tokenlist.js – โหลด token list และ metadata แบบ dynamic

const fallbackTokenList = [
  { symbol: 'USDC', address: '0x...', decimals: 6 },
  { symbol: 'MATIC', address: '0x...', decimals: 18 },
  { symbol: 'ETH', address: '0x...', decimals: 18 }
];

export async function loadTokenList(url = '/token-list.json') {
  try {
    const response = await fetch(url);
    if (!response.ok) throw new Error('Failed to load token list');
    const data = await response.json();
    return data.tokens;
  } catch (err) {
    console.warn('Using fallback token list:', err);
    return fallbackTokenList;
  }
}
