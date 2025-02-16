// === story.js ===
// Управляет историей и загрузкой InkJS

let story;

function loadStory() {
  try {
    console.log("🔄 Загружаем историю...");
    story = new inkjs.Story(storyContent);
    console.log("✅ История загружена:", story);
    return true;
  } catch (error) {
    console.error("❌ Ошибка при загрузке истории:", error);
    alert("⚠️ Ошибка загрузки истории. Попробуйте обновить страницу.");
    return false;
  }
}

function continueStory() {
  try {
    if (!story || !story.canContinue) return;
    
    let newText = [];
    let lastImage = null;

    while (story.canContinue) {
      const paragraphText = story.Continue();
      console.log("📝 Добавлен текст:", paragraphText);
      newText.push(paragraphText);

      if (story.currentTags) {
        story.currentTags.forEach(tag => {
          if (tag.startsWith("IMAGE:")) {
            lastImage = tag.replace("IMAGE:", "").trim();
            console.log("🖼 Найдено изображение:", lastImage);
          }
        });
      }
    }

    if (lastImage) {
      displayImage(lastImage);
    }

    newText.forEach(text => {
      addParagraphToStory(text);
    });

    processChoices();
  } catch (error) {
    console.error("❌ Ошибка в обработке истории:", error);
    alert("⚠️ Ошибка в истории. Перезапуск.");
    restartStory();
  }
}

function restartStory() {
  console.warn("🔄 Перезапускаем историю...");
  localStorage.removeItem(STORAGE_KEY);
  loadStory();
  continueStory();
}
