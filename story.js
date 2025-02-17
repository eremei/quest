// story.js
// Импортируем класс Story через обёртку, чтобы не трогать исходный ink.js
import { Story } from './inkWrapper.js';

let inkStory = null;

/**
 * Загружает JSON-файл с историей и инициализирует объект InkStory.
 * Ожидается, что файл story.json лежит в корне проекта (путь можно изменить при необходимости).
 */
export async function loadStory() {
  const response = await fetch('./story.json');
  const storyData = await response.json();
  inkStory = new Story(storyData);
}

/**
 * Получает текущий текст истории и варианты выбора.
 * @returns {object} Объект с полями text (массив строк) и choices (массив объектов с индексом и текстом).
 */
export function getCurrentTextAndChoices() {
  if (!inkStory) return { text: [], choices: [] };

  const text = [];
  // Пока Ink может продолжать вывод, собираем строки
  while (inkStory.canContinue) {
    text.push(inkStory.Continue());
  }

  // Формируем массив вариантов выбора
  const choices = inkStory.currentChoices.map((choice, index) => ({
    index,
    text: choice.text,
  }));

  return { text, choices };
}

/**
 * Обрабатывает выбор пользователя, передавая индекс выбранного варианта в Ink.
 * @param {number} index - Индекс выбранного варианта.
 */
export function chooseChoice(index) {
  if (!inkStory) return;
  inkStory.ChooseChoiceIndex(index);
}
