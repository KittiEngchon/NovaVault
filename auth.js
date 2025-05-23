// // auth.js – ระบบล็อกอินด้วย Wallet (Sign Message + Session)

let currentSession = null;

export async function loginWithWallet() {
  if (!window.ethereum) {
    toast("❌ MetaMask not found", "error");
    return;
  }

  const provider = new ethers.providers.Web3Provider(window.ethereum);
  const signer = provider.getSigner();
  const address = await signer.getAddress();

  const nonce = generateNonce();
  const message = `Login to NovaVault\nNonce: ${nonce}`;

  try {
    const signature = await signer.signMessage(message);
    currentSession = { address, nonce, signature };
    localStorage.setItem("nv-session", JSON.stringify(currentSession));
    toast(`🔓 Logged in: ${shorten(address)}`, "success");
    updateLoginUI();
  } catch (e) {
    console.error("Sign failed", e);
    toast("❌ Login cancelled", "error");
  }
}

export function logoutWallet() {
  localStorage.removeItem("nv-session");
  currentSession = null;
  toast("🔒 Logged out", "info");
  updateLoginUI();
}

export function getCurrentSession() {
  if (!currentSession) {
    const sessionStr = localStorage.getItem("nv-session");
    if (sessionStr) {
      try {
        currentSession = JSON.parse(sessionStr);
      } catch (e) {}
    }
  }
  return currentSession;
}

function generateNonce() {
  return Math.random().toString(36).substring(2) + Date.now().toString(36);
}

function shorten(addr) {
  return addr.slice(0, 6) + "..." + addr.slice(-4);
}

function updateLoginUI() {
  const loginBtn = document.getElementById("loginWalletBtn");
  const logoutBtn = document.getElementById("logoutWalletBtn");
  const loginStatus = document.getElementById("loginStatus");

  const session = getCurrentSession();
  if (session) {
    loginBtn.style.display = "none";
    logoutBtn.style.display = "inline-block";
    loginStatus.innerText = `🔐 ${shorten(session.address)}`;
  } else {
    loginBtn.style.display = "inline-block";
    logoutBtn.style.display = "none";
    loginStatus.innerText = "";
  }
}

document.addEventListener("DOMContentLoaded", () => {
  const loginBtn = document.getElementById("loginWalletBtn");
  const logoutBtn = document.getElementById("logoutWalletBtn");

  if (loginBtn) loginBtn.addEventListener("click", loginWithWallet);
  if (logoutBtn) logoutBtn.addEventListener("click", logoutWallet);

  updateLoginUI();
});
 – ระบบล็อกอินด้วย Wallet (Sign Message + Session)

let currentSession = null;

export async function loginWithWallet() {
  if (!window.ethereum) {
    toast("❌ MetaMask not found", "error");
    return;
  }

  const provider = new ethers.providers.Web3Provider(window.ethereum);
  const signer = provider.getSigner();
  const address = await signer.getAddress();

  const nonce = generateNonce();
  const message = `Login to NovaVault\nNonce: ${nonce}`;

  try {
    const signature = await signer.signMessage(message);
    currentSession = { address, nonce, signature };
    localStorage.setItem("nv-session", JSON.stringify(currentSession));
    toast(`🔓 Logged in: ${shorten(address)}`, "success");
    updateLoginUI();
  } catch (e) {
    console.error("Sign failed", e);
    toast("❌ Login cancelled", "error");
  }
}

export function logoutWallet() {
  localStorage.removeItem("nv-session");
  currentSession = null;
  toast("🔒 Logged out", "info");
  updateLoginUI();
}

export function getCurrentSession() {
  if (!currentSession) {
    const sessionStr = localStorage.getItem("nv-session");
    if (sessionStr) {
      try {
        currentSession = JSON.parse(sessionStr);
      } catch (e) {}
    }
  }
  return currentSession;
}

function generateNonce() {
  return Math.random().toString(36).substring(2) + Date.now().toString(36);
}

function shorten(addr) {
  return addr.slice(0, 6) + "..." + addr.slice(-4);
}

function updateLoginUI() {
  const loginBtn = document.getElementById("loginWalletBtn");
  const logoutBtn = document.getElementById("logoutWalletBtn");
  const loginStatus = document.getElementById("loginStatus");

  const session = getCurrentSession();
  if (session) {
    loginBtn.style.display = "none";
    logoutBtn.style.display = "inline-block";
    loginStatus.innerText = `🔐 ${shorten(session.address)}`;
  } else {
    loginBtn.style.display = "inline-block";
    logoutBtn.style.display = "none";
    loginStatus.innerText = "";
  }
}

document.addEventListener("DOMContentLoaded", () => {
  const loginBtn = document.getElementById("loginWalletBtn");
  const logoutBtn = document.getElementById("logoutWalletBtn");

  if (loginBtn) loginBtn.addEventListener("click", loginWithWallet);
  if (logoutBtn) logoutBtn.addEventListener("click", logoutWallet);

  updateLoginUI();
});
