// main.js
import { loadStory, getCurrentTextAndChoices, chooseChoice } from './story.js';

document.addEventListener('DOMContentLoaded', async () => {
  // Загружаем историю из JSON и инициализируем Ink
  await loadStory();
  render();

  // Обработчик кликов по кнопкам выбора
  document.getElementById('choices').addEventListener('click', (event) => {
    const btn = event.target.closest('button[data-index]');
    if (btn) {
      const index = parseInt(btn.getAttribute('data-index'), 10);
      chooseChoice(index);
      render();
    }
  });
});

function render() {
  const storyContainer = document.getElementById('story-text');
  const choicesContainer = document.getElementById('choices');

  // Очищаем контейнеры
  storyContainer.innerHTML = '';
  choicesContainer.innerHTML = '';

  // Получаем текущий текст и варианты выбора из story.js
  const { text, choices } = getCurrentTextAndChoices();

  // Выводим текст истории. Используем UIkit для стилей.
  text.forEach((line) => {
    const p = document.createElement('p');
    p.className = 'uk-text-lead';
    p.textContent = line;
    storyContainer.appendChild(p);
  });

  // Выводим кнопки вариантов выбора.
  choices.forEach((choice) => {
    const btn = document.createElement('button');
    btn.className = 'uk-button uk-button-default uk-width-1-1 uk-margin-small-bottom';
    btn.setAttribute('data-index', choice.index);
    btn.textContent = choice.text;
    choicesContainer.appendChild(btn);
  });
}
