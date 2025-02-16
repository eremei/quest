// === ui.js ===
// Управление интерфейсом и обновлением UI

export function updateUI() {
  console.log("🔄 Обновление интерфейса...");
  const storyContainer = document.getElementById("storyContainer");
  const choicesContainer = document.getElementById("choicesContainer");

  if (!storyContainer || !choicesContainer) {
    console.error("❌ Ошибка: storyContainer или choicesContainer не найдены!");
    return;
  }

  storyContainer.scrollIntoView({ behavior: "smooth", block: "start" });
}