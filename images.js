// === images.js ===
// Управление загрузкой и отображением изображений в квесте

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

export function preloadAllImages() {
  console.log("🔄 Предзагрузка изображений...");
  ALL_IMAGES.forEach(imagePath => {
    if (!preloadedImages.has(imagePath)) {
      const img = new Image();
      img.src = imagePath;
      preloadedImages.add(imagePath);
      console.log("✅ Загружено:", imagePath);
    }
  });
}

export function displayImage(imagePath) {
  if (!imageCache.has(imagePath)) {
    console.log(`🖼 Добавляем изображение: ${imagePath}`);
    const img = document.createElement("img");
    img.src = imagePath;
    img.className = "uk-margin uk-responsive-img";
    document.getElementById("storyContainer").appendChild(img);
    imageCache.add(imagePath);
  }
}