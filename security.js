// security.js – จัดการ permission, session, และ warning

export function checkWalletConnected() {
  if (!window.ethereum || !window.ethereum.selectedAddress) {
    alert('Please connect your wallet to use NovaVault.');
    return false;
  }
  return true;
}

export function warnOnUnload() {
  window.addEventListener('beforeunload', (e) => {
    e.preventDefault();
    e.returnValue = 'Are you sure you want to leave? Unsaved changes may be lost.';
  });
}

export function verifySession(timeout = 30 * 60 * 1000) { // 30 mins
  const start = Date.now();
  setInterval(() => {
    if (Date.now() - start > timeout) {
      alert('Session expired. Please reconnect your wallet.');
      location.reload();
    }
  }, 10000);
}
