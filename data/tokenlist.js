// tokenlist.js – เพิ่ม Token แบบ Dynamic โดย Address พร้อมอัปเดต Dashboard

import { updateDashboardSummary } from './dashboard.js';

const tokenList = []; // เก็บรายการ token ที่ import

export async function addTokenByAddress(address, provider) {
  if (!provider) {
    toast("❌ Wallet not connected.", "error");
    return;
  }

  const erc20Abi = [
    "function name() view returns (string)",
    "function symbol() view returns (string)",
    "function decimals() view returns (uint8)",
    "function balanceOf(address) view returns (uint256)"
  ];

  try {
    const signer = provider.getSigner();
    const userAddress = await signer.getAddress();
    const contract = new ethers.Contract(address, erc20Abi, provider);

    const [name, symbol, decimals, rawBalance] = await Promise.all([
      contract.name(),
      contract.symbol(),
      contract.decimals(),
      contract.balanceOf(userAddress)
    ]);

    const balance = Number(ethers.utils.formatUnits(rawBalance, decimals)).toFixed(4);

    const token = { address, name, symbol, decimals, balance };
    tokenList.push(token);
    renderImportedTokens();
    updateDashboardSummary(tokenList, []); // อัปเดต dashboard
    toast(`✅ Imported ${symbol}: ${balance}`, "success");
  } catch (err) {
    console.error("Failed to import token:", err);
    toast("❌ Invalid token address", "error");
  }
}

function renderImportedTokens() {
  const section = document.querySelector(".section#myTokens");
  if (!section) return;

  const old = section.querySelectorAll(".token.imported");
  old.forEach(el => el.remove());

  for (const token of tokenList) {
    const div = document.createElement("div");
    div.className = "token imported";
    div.innerText = `${token.symbol}: ${token.balance}`;
    section.appendChild(div);
  }
}

window.addTokenByAddress = async function () {
  const input = document.getElementById("tokenAddressInput");
  if (!input || !input.value) return;

  const provider = new ethers.providers.Web3Provider(window.ethereum);
  const address = input.value.trim();
  await addTokenByAddress(address, provider);
  input.value = "";
};
