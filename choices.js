// === choices.js ===
// Обработка выбора пользователя в квесте

import { continueStory } from "./story.js";
import { saveStory } from "./save.js";

export function handleChoiceSelection(choiceIndex) {
  try {
    if (!story) {
      console.error("❌ Ошибка: история не загружена!");
      return;
    }
    
    if (choiceIndex < 0 || choiceIndex >= story.currentChoices.length) {
      console.error("❌ Ошибка: неверный индекс выбора!", choiceIndex);
      return;
    }
    
    console.log(`🔘 Выбран вариант: ${story.currentChoices[choiceIndex].text}`);
    story.ChooseChoiceIndex(choiceIndex);
    saveStory();
    continueStory();
  } catch (error) {
    console.error("❌ Ошибка при обработке выбора:", error);
    alert("⚠️ Произошла ошибка при выборе. Попробуйте еще раз.");
  }
}
