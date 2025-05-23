// backup.js - สำรองข้อมูล Wallet และ Setting

export function backupSettings(settings) {
  const blob = new Blob([JSON.stringify(settings)], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = 'novavault-backup.json';
  a.click();
  URL.revokeObjectURL(url);
}

export function restoreSettingsFromFile(file, callback) {
  const reader = new FileReader();
  reader.onload = function (e) {
    try {
      const data = JSON.parse(e.target.result);
      callback(data);
    } catch (err) {
      console.error('Restore error:', err);
    }
  };
  reader.readAsText(file);
}

export function initBackupButtons(backupBtnId, restoreInputId, callback) {
  document.getElementById(backupBtnId)?.addEventListener('click', () => {
    const settings = JSON.parse(localStorage.getItem('novavault-settings') || '{}');
    backupSettings(settings);
  });

  document.getElementById(restoreInputId)?.addEventListener('change', (e) => {
    const file = e.target.files[0];
    if (file) restoreSettingsFromFile(file, callback);
  });
}
