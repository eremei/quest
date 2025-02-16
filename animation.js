// animation.js — отвечает за анимацию смены всего блока (текст + картинка) с UIkit

document.addEventListener("DOMContentLoaded", function () {
    let checkInterval = setInterval(() => {
        if (typeof continueStory === "function") {
            clearInterval(checkInterval); // Останавливаем проверку

            console.log("✅ continueStory найден, создаём animatedContinueStory().");

            // Создаём анимационную версию continueStory()
            window.animatedContinueStory = function () {
                if (!storyContainer) {
                    console.error("❌ Ошибка: storyContainer не найден!");
                    return;
                }

                // Добавляем эффект исчезновения к storyContainer
                UIkit.util.addClass(storyContainer, "uk-animation-fade");
                UIkit.util.css(storyContainer, "opacity", 1);

                // Ждём 500 мс перед удалением старого контента
                setTimeout(() => {
                    storyContainer.innerHTML = ""; // Очищаем контейнер

                    // Вызываем continueStory(), который добавит новый контент
                    continueStory();

                    // Ждём 50 мс, чтобы контент обновился, затем показываем его
                    setTimeout(() => {
                        UIkit.util.removeClass(storyContainer, "uk-animation-fade");
                        UIkit.util.css(storyContainer, "opacity", 0);
                        UIkit.util.animate(storyContainer, { opacity: 1 }, { duration: 500 });
                    }, 50);
                }, 500); // Ждём исчезновения старого контента
            };
        }
    }, 100); // Проверяем каждые 100 мс, пока `continueStory` не появится
});
