// notifications.js
export function showNotification(message, type = 'info', duration = 3000) {
  const notification = document.createElement('div');
  notification.className = `nv-toast nv-${type}`;
  notification.innerText = message;

  document.body.appendChild(notification);

  // Show animation
  setTimeout(() => {
    notification.classList.add('nv-show');
  }, 10);

  // Auto-hide
  setTimeout(() => {
    notification.classList.remove('nv-show');
    setTimeout(() => notification.remove(), 300);
  }, duration);
}
