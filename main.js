// === main.js ===
// Основной файл управления игрой

import { startStory, continueStory } from "./story.js";
import { handleChoiceSelection } from "./choices.js";
import { saveStory, loadStory } from "./save.js";
import { preloadAllImages, displayImage } from "./images.js";
import { fadeOutElement, fadeInElement } from "./animations.js";

document.addEventListener("DOMContentLoaded", () => {
  console.log("💡 Инициализация игры...");

  // Загружаем контейнеры
  const storyContainer = document.getElementById("storyContainer");
  const choicesContainer = document.getElementById("choicesContainer");

  if (!storyContainer || !choicesContainer) {
    console.error("❌ Ошибка: storyContainer или choicesContainer не найдены!");
    return;
  }

  try {
    // Запуск истории
    if (!loadStory()) {
      console.warn("⚠️ Сохранение не найдено, начинаем заново.");
      startStory();
    } else {
      continueStory();
    }

    // Предзагрузка изображений
    preloadAllImages();
  } catch (error) {
    console.error("❌ Ошибка при запуске:", error);
    alert("⚠️ Ошибка загрузки истории. Попробуйте обновить страницу.");
  }

  // Обработчик кликов по кнопкам выбора
  choicesContainer.addEventListener("click", (event) => {
    if (event.target.tagName === "BUTTON") {
      handleChoiceSelection(event.target.dataset.index);
    }
  });
});
