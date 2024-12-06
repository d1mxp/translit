const inputText = document.getElementById("inputText");
const translateButton = document.getElementById("translateButton");
const resetButton = document.getElementById("resetButton");
const cyrillicWords = document.getElementById("cyrillicWords");
const latinWords = document.getElementById("latinWords");

let wordsList = [{ original: "Привет", transliterated: "Privet" }];

const renderWords = () => {
  cyrillicWords.innerHTML = "";
  latinWords.innerHTML = "";

  wordsList.forEach((word, index) => {
    const cyrillicDiv = document.createElement("div");
    const latinDiv = document.createElement("div");

    cyrillicDiv.className = "word";
    latinDiv.className = "word";

    // Создаем элементы для отображения оригинального и транслитерированного слов
    const cyrillicSpan = document.createElement("span");
    const latinSpan = document.createElement("span");

    // Добавляем номер строки и оригинальное слово
    cyrillicSpan.textContent = `${index + 1} ${word.original}`;

    // Обработка оригинального слова с троеточием
    if (word.original.length > 7) {
      // Создаем span с троеточием
      const truncatedCyrillicSpan = document.createElement("span");
      truncatedCyrillicSpan.className = "truncated"; // Класс для стилизации
      truncatedCyrillicSpan.textContent = `${index + 1} ${word.original.slice(
        0,
        7
      )}...`;

      // Создаем span для полного текста
      const fullCyrillicSpan = document.createElement("span");
      fullCyrillicSpan.textContent = word.original;
      fullCyrillicSpan.className = "tooltip"; // Класс для стилизации всплывающей подсказки

      // Добавляем полный текст в truncatedCyrillicSpan
      truncatedCyrillicSpan.appendChild(fullCyrillicSpan); // Вставляем tooltip внутрь

      // Показываем полный текст при наведении на truncatedCyrillicSpan
      // truncatedCyrillicSpan.onmouseover = () => {
      //   fullCyrillicSpan.style.display = "inline"; // Показываем подсказку
      // };
      // truncatedCyrillicSpan.onmouseout = () => {
      //   fullCyrillicSpan.style.display = "none"; // Скрываем подсказку
      // };

      cyrillicDiv.appendChild(truncatedCyrillicSpan); // Добавляем элемент с троеточием
    } else {
      cyrillicDiv.appendChild(cyrillicSpan); // Если меньше или равно 7 символам, просто добавляем span
    }

    // Обработка транслитерированного слова с троеточием
    latinSpan.textContent = word.transliterated;
    if (word.transliterated.length > 7) {
      // Создаем span с троеточием
      const truncatedLatinSpan = document.createElement("span");
      truncatedLatinSpan.className = "truncated"; // Класс для стилизации
      truncatedLatinSpan.textContent = word.transliterated.slice(0, 7) + "...";

      // Создаем span для полного текста
      const fullLatinSpan = document.createElement("span");
      fullLatinSpan.textContent = word.transliterated;
      fullLatinSpan.className = "tooltip"; // Класс для стилизации всплывающей подсказки

      // Добавляем полный текст в truncatedLatinSpan
      truncatedLatinSpan.appendChild(fullLatinSpan); // Вставляем tooltip внутрь

      // Показываем полный текст при наведении на truncatedLatinSpan
      // truncatedLatinSpan.onmouseover = () => {
      //   fullLatinSpan.style.display = "inline"; // Показываем подсказку
      // };
      // truncatedLatinSpan.onmouseout = () => {
      //   fullLatinSpan.style.display = "none"; // Скрываем подсказку
      // };

      latinDiv.appendChild(truncatedLatinSpan); // Добавляем элемент с троеточием
    } else {
      latinDiv.appendChild(latinSpan); // Если меньше или равно 7 символам, просто добавляем span
    }

    // Создаем кнопку удаления
    // const deleteButton = document.createElement("span");
    // deleteButton.textContent = "X";
    // deleteButton.className = "delete-button";

    // const deleteButton = svgNamespace;

    const svgNamespace = "http://www.w3.org/2000/svg";

    // Создаем SVG элемент
    const deleteButton = document.createElementNS(svgNamespace, "svg");
    deleteButton.setAttribute("width", "18");
    deleteButton.setAttribute("height", "18");
    deleteButton.setAttribute("viewBox", "0 0 18 18");

    // Создаем круг
    const circle = document.createElementNS(svgNamespace, "circle");
    circle.setAttribute("cx", "9");
    circle.setAttribute("cy", "9");
    circle.setAttribute("r", "9");
    circle.setAttribute("fill", "#747474");

    // Создаем путь
    const path = document.createElementNS(svgNamespace, "path");
    path.setAttribute(
      "d",
      "M5.75829 13C5.9763 13 6.16588 12.9147 6.30806 12.763L8.99052 10.0616L11.6919 12.763C11.8341 12.9052 12.0142 13 12.2322 13C12.6493 13 12.9905 12.6493 12.9905 12.2322C12.9905 12.0142 12.9147 11.8341 12.763 11.6919L10.0711 9L12.7725 6.2891C12.9336 6.12796 13 5.96682 13 5.75829C13 5.33175 12.6588 5 12.2417 5C12.0427 5 11.8815 5.06635 11.7204 5.22749L8.99052 7.93839L6.2891 5.23697C6.14692 5.08531 5.9763 5.01896 5.75829 5.01896C5.34123 5.01896 5 5.34123 5 5.76777C5 5.9763 5.08531 6.1564 5.22749 6.29858L7.91943 9L5.22749 11.7014C5.08531 11.8341 5 12.0237 5 12.2322C5 12.6493 5.34123 13 5.75829 13Z"
    );
    path.setAttribute("fill", "white");

    // Добавляем элементы в SVG
    deleteButton.appendChild(circle);
    deleteButton.appendChild(path);

    // Удаляем слово по клику
    deleteButton.onclick = () => deleteWord(index);

    latinDiv.appendChild(deleteButton);
    cyrillicWords.appendChild(cyrillicDiv);
    latinWords.appendChild(latinDiv);
  });
};

const transliterate = (text) => {
  const translitMap = {
    А: "A",
    Б: "B",
    В: "V",
    Г: "G",
    Д: "D",
    Е: "E",
    Ё: "Yo",
    Ж: "Zh",
    З: "Z",
    И: "I",
    Й: "Y",
    К: "K",
    Л: "L",
    М: "M",
    Н: "N",
    О: "O",
    П: "P",
    Р: "R",
    С: "S",
    Т: "T",
    У: "U",
    Ф: "F",
    Х: "Kh",
    Ц: "Ts",
    Ч: "Ch",
    Ш: "Sh",
    Щ: "Shch",
    Ъ: "",
    Ы: "Y",
    Ь: "",
    Э: "E",
    Ю: "Yu",
    Я: "Ya",
    а: "a",
    б: "b",
    в: "v",
    г: "g",
    д: "d",
    е: "e",
    ё: "yo",
    ж: "zh",
    з: "z",
    и: "i",
    й: "y",
    к: "k",
    л: "l",
    м: "m",
    н: "n",
    о: "o",
    п: "p",
    р: "r",
    с: "s",
    т: "t",
    у: "u",
    ф: "f",
    х: "kh",
    ц: "ts",
    ч: "ch",
    ш: "sh",
    щ: "shch",
    ъ: "",
    ы: "y",
    ь: "",
    э: "e",
    ю: "yu",
    я: "ya",
  };

  return text
    .split("")
    .map((char) => translitMap[char] || "")
    .join("");
};

const addWordToDictionary = (original, transliterated) => {
  wordsList.push({ original, transliterated });
};

const deleteWord = (index) => {
  if (index !== 0) {
    // Запрещаем удаление первой строки
    wordsList.splice(index, 1);
    renderWords();
  }
};

translateButton.addEventListener("click", () => {
  const text = inputText.value.trim();

  if (text) {
    const transliteratedText = transliterate(text);
    addWordToDictionary(text, transliteratedText);
    inputText.value = ""; // Очистить поле ввода
    renderWords();
  }
});

inputText.addEventListener("keypress", (event) => {
  if (event.key === "Enter") {
    translateButton.click();
  }
});

resetButton.addEventListener("click", () => {
  wordsList = [{ original: "Привет", transliterated: "Privet" }];
  renderWords();
});

// Инициализация отображения слов
renderWords();
