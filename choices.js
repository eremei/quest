// === choices.js ===
// Управляет кнопками выбора в истории

function processChoices() {
  const choicesContainer = document.getElementById("choicesContainer");
  choicesContainer.innerHTML = ""; // Очищаем старые кнопки

  if (!story || story.currentChoices.length === 0) {
    console.log("🔚 Выборов нет, ждем продолжения...");
    return;
  }

  story.currentChoices.forEach((choice, idx) => {
    console.log(`🔘 Добавляем кнопку: ${choice.text}`);

    const btn = document.createElement("button");
    btn.className = "uk-button uk-button-primary uk-margin-small-right";
    btn.textContent = choice.text;
    btn.addEventListener("click", () => handleChoice(idx));

    choicesContainer.appendChild(btn);
  });
}

function handleChoice(choiceIndex) {
  try {
    story.ChooseChoiceIndex(choiceIndex);
    saveStory(); // Сохраняем состояние
    continueStory();
  } catch (error) {
    console.error("❌ Ошибка выбора:", error);
    alert("⚠️ Произошла ошибка, попробуйте еще раз.");
  }
}
