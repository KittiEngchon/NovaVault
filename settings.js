// settings.js – ตั้งค่า Slippage, Theme

const defaultSettings = {
  slippage: 0.5,
  theme: 'dark'
};

export function getSettings() {
  const settings = JSON.parse(localStorage.getItem('nv-settings'));
  return settings || defaultSettings;
}

export function saveSettings(settings) {
  localStorage.setItem('nv-settings', JSON.stringify(settings));
}

export function setTheme(theme) {
  document.documentElement.setAttribute('data-theme', theme);
  saveSettings({ ...getSettings(), theme });
}

export function setSlippage(slippage) {
  saveSettings({ ...getSettings(), slippage });
}
