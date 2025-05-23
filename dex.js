// dex.js – เชื่อม API กับ DEX

const DEX_API_BASE = 'https://api.dex.example.com'; // เปลี่ยนเป็น URL จริง

export async function fetchSwapQuote(tokenIn, tokenOut, amountIn) {
  try {
    const response = await fetch(`${DEX_API_BASE}/quote?tokenIn=${tokenIn}&tokenOut=${tokenOut}&amountIn=${amountIn}`);
    if (!response.ok) throw new Error('Failed to fetch quote');
    const data = await response.json();
    return data;
  } catch (err) {
    console.error('DEX Quote Error:', err);
    return null;
  }
}

export async function executeSwap(walletAddress, tokenIn, tokenOut, amountIn, slippage) {
  try {
    const response = await fetch(`${DEX_API_BASE}/swap`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ walletAddress, tokenIn, tokenOut, amountIn, slippage })
    });
    const result = await response.json();
    return result;
  } catch (err) {
    console.error('DEX Swap Error:', err);
    return null;
  }
}
