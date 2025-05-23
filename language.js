// language.js – รองรับหลายภาษา

const translations = {
  en: {
    connectWallet: "Connect Wallet",
    myTokens: "My Tokens",
    myNFTs: "My NFTs",
    settings: "Settings"
  },
  th: {
    connectWallet: "เชื่อมต่อวอลเล็ต",
    myTokens: "โทเคนของฉัน",
    myNFTs: "ของสะสมของฉัน",
    settings: "การตั้งค่า"
  }
};

let currentLang = 'en';

export function setLanguage(lang) {
  currentLang = lang;
  localStorage.setItem('nv-language', lang);
  applyTranslations();
}

export function getLanguage() {
  return localStorage.getItem('nv-language') || 'en';
}

export function t(key) {
  return translations[currentLang][key] || key;
}

export function applyTranslations() {
  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.getAttribute('data-i18n');
    el.innerText = t(key);
  });
}

// โหลดภาษาเริ่มต้นเมื่อเริ่มใช้งาน
currentLang = getLanguage();
applyTranslations();
