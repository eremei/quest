// === ui.js ===
// Управляет анимациями и эффектами интерфейса

function animatedContinueStory() {
  choicesContainer.innerHTML = ""; // Очищаем кнопки выбора

  try {
    console.log("📌 story.canContinue:", story.canContinue);

    if (!story.canContinue) {
      console.warn("⚠️ История не может продолжиться! Запускаем заново.");
      restartStory();
      return;
    }

    let newText = [];
    let lastImage = null;

    while (story.canContinue) {
      const paragraphText = story.Continue();
      console.log("📝 Добавлен текст:", paragraphText);
      saveStory();

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

    // 🔥 Анимация исчезновения блока
    UIkit.util.addClass(storyContainer, "uk-animation-fade");
    UIkit.util.css(storyContainer, "opacity", 1);

    setTimeout(() => {
      storyContainer.innerHTML = ""; // Очищаем старый контент

      if (lastImage) {
        displayImage(lastImage);
      }

      newText.forEach(text => {
        const p = document.createElement("p");
        p.textContent = text;
        storyContainer.appendChild(p);
      });

      setTimeout(() => {
        UIkit.util.removeClass(storyContainer, "uk-animation-fade");
        UIkit.util.animate(storyContainer, { opacity: 1 }, { duration: 500 });
      }, 50);
    }, 500);

    addChoicesToUI();
    storyContainer.scrollIntoView({ behavior: "smooth", block: "start" });

  } catch (error) {
    console.error("❌ Ошибка в обработке истории:", error);
    alert("⚠️ Ошибка в истории. Перезапуск.");
    restartStory();
  }
}

function displayImage(imagePath) {
  console.log(`🖼 Вставляем изображение: ${imagePath}`);

  let existingImg = document.getElementById("questImage");

  if (!existingImg) {
    const img = document.createElement("img");
    img.src = imagePath;
    img.id = "questImage";
    img.className = "uk-margin uk-responsive-img";
    img.onload = () => console.log("✅ Изображение загружено:", imagePath);
    img.onerror = () => console.error("❌ Ошибка загрузки изображения:", imagePath);
    
    storyContainer.prepend(img);
  } else {
    existingImg.src = imagePath;
    console.log("♻️ Обновляем существующую картинку.");
  }
}
