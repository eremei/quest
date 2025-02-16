// === save.js ===
// Управляет сохранением и загрузкой состояния игры

import { story } from './story.js';

const STORAGE_KEY = "tarolog_save";

export function saveStory() {
  try {
    if (!story) {
      console.error("❌ Ошибка: история не загружена!");
      return;
    }
    
    const savedState = story.state.toJson();
    localStorage.setItem(STORAGE_KEY, savedState);
    console.log("💾 История сохранена.");
  } catch (error) {
    console.warn("⚠️ Ошибка при сохранении истории:", error);
  }
}

export function loadStory() {
  try {
    const savedState = localStorage.getItem(STORAGE_KEY);
    if (savedState && savedState.length > 10) {
      story.state.LoadJson(savedState);
      console.log("✅ История загружена из сохранения.");
      return true;
    } else {
      console.warn("⚠️ Сохранение отсутствует или повреждено.");
      return false;
    }
  } catch (error) {
    console.warn("⚠️ Ошибка при загрузке сохранения:", error);
    return false;
  }
}
