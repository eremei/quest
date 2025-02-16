// === animations.js ===
// Управление анимацией элементов

export function fadeOutElement(element, callback) {
  if (!element) return;
  element.style.transition = "opacity 0.5s ease-out";
  element.style.opacity = "0";

  setTimeout(() => {
    if (callback) callback();
  }, 500);
}

export function fadeInElement(element) {
  if (!element) return;
  element.style.opacity = "0";
  element.style.transition = "opacity 0.5s ease-in";

  requestAnimationFrame(() => {
    element.style.opacity = "1";
  });
}

export function swapContentWithAnimation(container, newContent) {
  fadeOutElement(container, () => {
    container.innerHTML = "";
    container.appendChild(newContent);
    fadeInElement(container);
  });
}
