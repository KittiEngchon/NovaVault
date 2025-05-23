// walletconnect.js

let walletConnector;

async function connectWithWalletConnect() {
  // สร้าง instance ใหม่
  walletConnector = new WalletConnect.default({
    bridge: "https://bridge.walletconnect.org", // bridge server
    qrcodeModal: window.QRCodeModal.default
  });

  // ถ้ายังไม่ได้เชื่อม
  if (!walletConnector.connected) {
    await walletConnector.createSession();
  }

  // เมื่อเชื่อมสำเร็จ
  walletConnector.on("connect", (error, payload) => {
    if (error) throw error;

    const { accounts, chainId } = payload.params[0];
    console.log("🔗 Connected:", accounts[0], "on chain", chainId);
    alert("Connected WalletConnect:\n" + accounts[0]);
  });

  // เมื่อถูกยกเลิก
  walletConnector.on("disconnect", (error, payload) => {
    if (error) throw error;
    console.log("❌ Disconnected");
  });
}

// เพิ่มปุ่มเชื่อมต่อ WalletConnect (ในภายหลังอาจผูกกับ UI)
document.addEventListener("DOMContentLoaded", () => {
  const btn = document.createElement("button");
  btn.innerText = "Connect WalletConnect";
  btn.style.cssText = "position:fixed; bottom:1rem; right:1rem; padding:1rem; background:#00fff7; border:none; border-radius:8px; color:#000;";
  btn.onclick = connectWithWalletConnect;
  document.body.appendChild(btn);
});
