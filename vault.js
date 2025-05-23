// Simulate Wallet Connection (replace with Web3 logic later)
function connectWallet() {
  const button = document.querySelector('.connect-wallet');
  button.innerText = "Wallet Connected";
  button.disabled = true;
  button.style.background = "#00aa88";
  console.log("Simulated wallet connection");
}

// On load, add event listener to Connect Wallet button
document.addEventListener("DOMContentLoaded", () => {
  const connectBtn = document.querySelector(".connect-wallet");
  if (connectBtn) {
    connectBtn.addEventListener("click", connectWallet);
  }
});
