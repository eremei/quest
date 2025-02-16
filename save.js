// === save.js ===
// Управляет сохранением и загрузкой состояния истории

const STORAGE_KEY = "tarolog_save"; // Ключ для хранения данных

function saveStory() {
  try {
    const savedState = story.state.toJson();
    localStorage.setItem(STORAGE_KEY, savedState);
    console.log("💾 История сохранена.");
  } catch (error) {
    console.warn("⚠️ Ошибка при сохранении:", error);
  }
}

function loadStory() {
  try {
    const savedState = localStorage.getItem(STORAGE_KEY);
    if (savedState && savedState.length > 10) {
      story.state.LoadJson(savedState);
      console.log("✅ История загружена.");
      return true;
    } else {
      console.warn("⚠️ Сохранение пустое или повреждено.");
      return false;
    }
  } catch (error) {
    console.warn("⚠️ Ошибка при загрузке сохранения:", error);
    return false;
  }
}

function restartStory() {
  console.warn("🔄 Перезапускаем историю...");
  localStorage.removeItem(STORAGE_KEY);
  story = new inkjs.Story(storyContent);
  continueStory();
}
