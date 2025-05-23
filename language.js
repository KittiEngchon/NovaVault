// language.js – ระบบแปลข้อความด้วยไฟล์ JSON

let currentLang = "en";

async function loadLanguage(langCode) {
  try {
    const res = await fetch(`lang/${langCode}.json`);
    const dict = await res.json();

    document.querySelectorAll("[data-i18n]").forEach(el => {
      const key = el.getAttribute("data-i18n");
      if (dict[key]) el.innerText = dict[key];
    });

    currentLang = langCode;
    localStorage.setItem("nv-lang", langCode);
    toast(`🌐 Language: ${langCode.toUpperCase()}`, "info");
  } catch (e) {
    console.error("Failed to load language file:", e);
    toast("❌ Language file not found", "error");
  }
}

document.addEventListener("DOMContentLoaded", () => {
  const savedLang = localStorage.getItem("nv-lang") || "en";
  loadLanguage(savedLang);

  const langSwitch = document.getElementById("langSwitch");
  if (langSwitch) {
    langSwitch.addEventListener("change", (e) => {
      const lang = e.target.value;
      if (lang) loadLanguage(lang);
    });
  }
});
