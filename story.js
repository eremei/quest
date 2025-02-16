// === story.js ===
// Управление историей квеста

import { Story } from "./ink.js"; // ✅ Исправлен импорт ink.js
import storyContent from "./Таролог и развод Марии.js"; // ✅ Загружаем саму историю

import { saveStory, loadStory } from "./save.js";
import { preloadAllImages, displayImage } from "./images.js";
import { handleChoiceSelection } from "./choices.js";

export let story; // ✅ Экспортируем story

export function startStory() {
  try {
    console.log("📖 Инициализация истории...");
    story = new Story(storyContent); // ✅ Инициализируем историю здесь
    
    if (!loadStory()) {
      console.warn("⚠️ Нет сохранения, начинаем заново.");
    }
    
    continueStory();
    setTimeout(preloadAllImages, 2000);
  } catch (error) {
    console.error("❌ Ошибка загрузки истории:", error);
    alert("⚠️ Ошибка загрузки истории. Попробуйте обновить страницу.");
  }
}

export function continueStory() {
  const storyContainer = document.getElementById("storyContainer");
  const choicesContainer = document.getElementById("choicesContainer");
  choicesContainer.innerHTML = "";

  try {
    if (!story || !story.canContinue) {
      console.warn("⚠️ История завершена или не может продолжиться!");
      return;
    }

    let newText = [];
    let lastImage = null;

    while (story.canContinue) {
      const paragraphText = story.Continue();
      saveStory();
      newText.push(paragraphText);

      story.currentTags.forEach(tag => {
        if (tag.startsWith("IMAGE:")) {
          lastImage = tag.replace("IMAGE:", "").trim();
        }
      });
    }

    storyContainer.innerHTML = "";

    if (lastImage) {
      displayImage(lastImage);
    }

    newText.forEach(text => {
      const p = document.createElement("p");
      p.textContent = text;
      storyContainer.appendChild(p);
    });

    if (story.currentChoices.length > 0) {
      story.currentChoices.forEach((choice, idx) => {
        const btn = document.createElement("button");
        btn.className = "uk-button uk-button-primary uk-margin-small-right";
        btn.textContent = choice.text;
        btn.addEventListener("click", () => {
          handleChoiceSelection(idx);
          continueStory();
          saveStory();
        });
        choicesContainer.appendChild(btn);
      });
    }
  } catch (error) {
    console.error("❌ Ошибка в обработке истории:", error);
    alert("⚠️ Ошибка в истории. Перезапуск.");
    localStorage.removeItem("tarolog_save");
    location.reload();
  }
}