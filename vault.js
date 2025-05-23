// ฟังก์ชันย่อ address เช่น 0xAb...1234
function shortenAddress(address) {
  return address.slice(0, 6) + "..." + address.slice(-4);
}

// เชื่อมต่อ MetaMask wallet
async function connectWallet() {
  const button = document.querySelector('.connect-wallet');

  // ตรวจสอบว่า MetaMask มีอยู่หรือไม่
  if (typeof window.ethereum === 'undefined') {
    alert("MetaMask not found! Please install MetaMask extension.");
    return;
  }

  try {
    button.innerText = "Connecting...";
    button.disabled = true;

    // ขอสิทธิ์เข้าถึงบัญชีผู้ใช้
    const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });

    if (accounts.length > 0) {
      const address = accounts[0];
      button.innerText = shortenAddress(address);
      button.classList.add("connected");
      console.log("Wallet connected:", address);
    } else {
      button.innerText = "Connect Wallet";
      button.disabled = false;
      alert("No accounts found.");
    }

  } catch (error) {
    console.error("Wallet connection error:", error);
    button.innerText = "Connect Wallet";
    button.disabled = false;
    alert("Connection failed or denied.");
  }
}

// ตรวจจับเมื่อ MetaMask เปลี่ยนบัญชี
function watchAccountChanges() {
  if (window.ethereum) {
    window.ethereum.on("accountsChanged", (accounts) => {
      const button = document.querySelector('.connect-wallet');
      if (accounts.length > 0) {
        button.innerText = shortenAddress(accounts[0]);
        console.log("Switched account:", accounts[0]);
      } else {
        button.innerText = "Connect Wallet";
        button.disabled = false;
        console.log("Disconnected wallet");
      }
    });
  }
}

// เมื่อโหลดหน้าเว็บเสร็จ
document.addEventListener("DOMContentLoaded", () => {
  const connectBtn = document.querySelector(".connect-wallet");
  if (connectBtn) {
    connectBtn.addEventListener("click", connectWallet);
  }
  watchAccountChanges();
});

