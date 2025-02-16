// === main.js (Финальное исправление) ===

let story;
let storyContainer;
let choicesContainer;

const STORAGE_KEY = "tarolog_save";
const imageCache = new Set();
const preloadedImages = new Set();

const ALL_IMAGES = [
  "images/business_trip.png",
  "images/commute.png",
  "images/conversation_attempt.png",
  "images/divorce.png",
  "images/hanging_out.png",
  "images/home.png",
  "images/husband_reveals.png",
  "images/morning.png",
  "images/morning1.png",
  "images/take_break_from_work.png",
  "images/tarot_session.png",
  "images/tea_with_friends.png",
  "images/work_until_lunch.png"
];

document.addEventListener("DOMContentLoaded", () => {
  storyContainer = document.getElementById("storyContainer");
  choicesContainer = document.getElementById("choicesContainer");

  try {
    console.log("🔄 Загружаем историю...");
    story = new inkjs.Story(storyContent);
    console.log("✅ История загружена:", story);

    // 🛠 Попробуем загрузить сохранённое состояние
    if (!loadStory()) {
      console.warn("⚠️ Не удалось загрузить сохранение. Начинаем заново.");
      restartStory(); // Запускаем квест заново
    }

    animatedContinueStory();
    setTimeout(preloadAllImages, 2000);
  } catch (error) {
    console.error("❌ Ошибка при загрузке истории:", error);
    alert("⚠️ Ошибка загрузки истории. Попробуйте обновить страницу.");
  }
});

function animatedContinueStory() {
  choicesContainer.innerHTML = "";
  storyContainer.innerHTML = "";

  try {
    console.log("📌 story.canContinue:", story.canContinue);
    
    // 🔥 Если история почему-то не может продолжиться — запускаем заново!
    if (!story.canContinue) {
      console.warn("⚠️ История не может продолжиться! Запускаем заново.");
      restartStory();
      return;
    }

    while (story.canContinue) {
      const paragraphText = story.Continue();
      console.log("📝 Добавлен текст:", paragraphText);

      saveStory();

      const p = document.createElement("p");
      p.textContent = paragraphText;
      storyContainer.appendChild(p);

      if (story.currentTags) {
        story.currentTags.forEach(tag => {
          if (tag.startsWith("IMAGE:")) {
            const imagePath = tag.replace("IMAGE:", "").trim();
            displayImage(imagePath);
          }
        });
      }
    }

    console.log("📌 Текущий выбор:", story.currentChoices);

    if (story.currentChoices.length === 0 && story.canContinue) {
      console.log("⚠️ Авто-переход — продолжаем!");
      animatedContinueStory();
      return;
    }

    if (story.currentChoices.length > 0) {
      story.currentChoices.forEach((choice, idx) => {
        console.log(`🔘 Добавляем кнопку: ${choice.text}`);
        const btn = document.createElement("button");
        btn.className = "uk-button uk-button-primary uk-margin-small-right";
        btn.textContent = choice.text;
        btn.addEventListener("click", () => {
          story.ChooseChoiceIndex(idx);
          animatedContinueStory();
          saveStory();
        });

        choicesContainer.appendChild(btn);
      });
    } else if (!story.canContinue) {
      console.log("🔘 Добавляем кнопку «Продолжить»");
      const continueBtn = document.createElement("button");
      continueBtn.className = "uk-button uk-button-primary uk-margin-small-right";
      continueBtn.textContent = "Продолжить";
      continueBtn.addEventListener("click", () => {
        animatedContinueStory();
      });

      choicesContainer.appendChild(continueBtn);
    }

    storyContainer.scrollIntoView({ behavior: "smooth", block: "start" });

  } catch (error) {
    console.error("❌ Ошибка в обработке истории:", error);
    alert("⚠️ Ошибка в истории. Перезапуск.");
    localStorage.removeItem(STORAGE_KEY);
    location.reload();
  }
}

function preloadAllImages() {
  console.log("🔄 Подгружаем изображения...");
  ALL_IMAGES.forEach(imagePath => {
    if (!preloadedImages.has(imagePath)) {
      const img = new Image();
      img.src = imagePath;
      preloadedImages.add(imagePath);
      console.log("✅ Загружено:", imagePath);
    }
  });
}

function displayImage(imagePath) {
  if (!imageCache.has(imagePath)) {
    console.log(`🖼 Добавляем картинку: ${imagePath}`);
    const img = document.createElement("img");
    img.src = imagePath;
    img.className = "uk-margin uk-responsive-img";
    storyContainer.appendChild(img);
    imageCache.add(imagePath);
  }
}

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

// 🔄 Перезапуск истории, если всё сломалось
function restartStory() {
  console.warn("🔄 Перезапускаем историю...");
  localStorage.removeItem(STORAGE_KEY);
  story = new inkjs.Story(storyContent);
  animatedContinueStory();
}

let lastImage = null; // 🔥 Запоминаем последнее изображение

function animatedContinueStory() {
  choicesContainer.innerHTML = "";
  storyContainer.innerHTML = "";

  try {
    console.log("📌 story.canContinue:", story.canContinue);
    
    if (!story.canContinue) {
      console.warn("⚠️ История не может продолжиться! Запускаем заново.");
      restartStory();
      return;
    }

    let newText = [];

    while (story.canContinue) {
      const paragraphText = story.Continue();
      console.log("📝 Добавлен текст:", paragraphText);
      saveStory();

      newText.push(paragraphText);

      // 🔥 Проверяем теги
      if (story.currentTags) {
        story.currentTags.forEach(tag => {
          if (tag.startsWith("IMAGE:")) {
            lastImage = tag.replace("IMAGE:", "").trim();
            console.log("🖼 Найдено изображение:", lastImage);
          }
        });
      }
    }

    // 🔥 Показываем последнее изображение перед текстом
    if (lastImage) {
      displayImage(lastImage);
    }

    // 🔥 Выводим весь текст ПОСЛЕ изображения
    newText.forEach(text => {
      const p = document.createElement("p");
      p.textContent = text;
      storyContainer.appendChild(p);
    });

    console.log("📌 Текущий выбор:", story.currentChoices);

    if (story.currentChoices.length === 0 && story.canContinue) {
      console.log("⚠️ Авто-переход — продолжаем!");
      animatedContinueStory();
      return;
    }

    if (story.currentChoices.length > 0) {
      story.currentChoices.forEach((choice, idx) => {
        console.log(`🔘 Добавляем кнопку: ${choice.text}`);
        const btn = document.createElement("button");
        btn.className = "uk-button uk-button-primary uk-margin-small-right";
        btn.textContent = choice.text;
        btn.addEventListener("click", () => {
          story.ChooseChoiceIndex(idx);
          animatedContinueStory();
          saveStory();
        });

        choicesContainer.appendChild(btn);
      });
    } else if (!story.canContinue) {
      console.log("🔘 Добавляем кнопку «Продолжить»");
      const continueBtn = document.createElement("button");
      continueBtn.className = "uk-button uk-button-primary uk-margin-small-right";
      continueBtn.textContent = "Продолжить";
      continueBtn.addEventListener("click", () => {
        animatedContinueStory();
      });

      choicesContainer.appendChild(continueBtn);
    }

    storyContainer.scrollIntoView({ behavior: "smooth", block: "start" });

  } catch (error) {
    console.error("❌ Ошибка в обработке истории:", error);
    alert("⚠️ Ошибка в истории. Перезапуск.");
    localStorage.removeItem(STORAGE_KEY);
    location.reload();
  }
}

// 🔥 Фикс: Гарантированная вставка картинки ПЕРЕД текстом
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
    
    // Вставляем картинку в начало storyContainer
    storyContainer.prepend(img);
  } else {
    existingImg.src = imagePath;
    console.log("♻️ Обновляем существующую картинку.");
  }
}
