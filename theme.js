// theme.js

const ThemeManager = (() => {
  const themes = {
    dark: {
      '--bg-color': '#0f2027',
      '--text-color': '#ffffff',
      '--accent-color': '#00fff7',
      '--section-bg': 'rgba(255, 255, 255, 0.05)',
    },
    light: {
      '--bg-color': '#ffffff',
      '--text-color': '#000000',
      '--accent-color': '#0077ff',
      '--section-bg': '#f2f2f2',
    }
  };

  function applyTheme(theme) {
    const root = document.documentElement;
    const selectedTheme = themes[theme];
    if (!selectedTheme) return;

    Object.entries(selectedTheme).forEach(([varName, value]) => {
      root.style.setProperty(varName, value);
    });

    localStorage.setItem('novavault-theme', theme);
  }

  function initTheme() {
    const savedTheme = localStorage.getItem('novavault-theme') || 'dark';
    applyTheme(savedTheme);
  }

  function toggleTheme() {
    const current = localStorage.getItem('novavault-theme') || 'dark';
    const next = current === 'dark' ? 'light' : 'dark';
    applyTheme(next);
  }

  return {
    init: initTheme,
    toggle: toggleTheme,
    set: applyTheme
  };
})();

document.addEventListener('DOMContentLoaded', () => {
  ThemeManager.init();

  const themeToggleBtn = document.getElementById('toggle-theme');
  if (themeToggleBtn) {
    themeToggleBtn.addEventListener('click', () => ThemeManager.toggle());
  }
});
