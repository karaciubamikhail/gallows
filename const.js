let answer = '';
let answerState = [];
let mistakesCount = 0;
let lettersState;

startGame();

function startGame() {
  mistakesCount = 0;
  setDefaultKeyboard();
  drawPerson(mistakesCount);
  drawBoard(lettersState);
  generateWord();
  /* 
  1. сбросьте количество допущенных ошибок до нуля.
  2. сбросьте состояние клавиатуры в начальное состояние
  3. отрисуйте начальное состояние игрового персонажа
  4. отрисуйте состояние клавиатуры
  5. сгенерируйте новое слово
  */
}

function generateWord() {
  answer=dictionary[Math.floor(Math.random()*dictionary.length)];
  answerState=[];
  for (let i=0; i<answer.length; i++){
    answerState.push("_"); 
  };
  drawAnswerState(answerState)
  /*
  1. Сгенерируйте целое число от 0 до длины массива dictionary
  2. По сгенерированному числу получите элемент из массива dictionary. Этот элемент запишите в переменную answer
  3. Сгериуйте массив длины сгенерированного слова.
  4. Заполните массив символами "_". Полученный массив должен был записан в answerState
  5. Отрисовывайте начальное состояние состояние отгаданного слова
  */
}

function onKeyClick(letter) {
  console.log(letter);
  if(mistakesCount>=7){
    alert("Вы проиграли "+answer);
    startGame();
    return;
    let letterFromState;
  }
  for(let i=0;i<lettersState.length;i++){
    if (lettersState[i].char === letter){
      letterFromState = lettersState[i];
      break;
    }
  }
  if (!answer.includes(letter) && !letterFromState.error){
    letterFromState.error=true;
    mistakesCount++;
  }
   if (answer.includes(letter) && !letterFromState.success){
    letterFromState.success=true;
    for(let i=0;i<answerState.length;i++){
      if (answer[i]===letter){
        answerState[i]=answer[i];
      }
    }
  }
   drawPerson(mistakesCount);
   drawBoard(lettersState);
   drawAnswerState(answerState)
  if(answerState.join(" ")==answer){
    winGame();
  }
  /*
  1. Проверьте проигрыш игры.
  1.1. Если количество ошибок равно 7, то выводите конец игры. Дополнительно можно выводить неотгаданное слово.
  1.2. Начинайте новую игру.
  1.3. Остальные действия выполняйте, если игра не закончена

  2. В состоянии клавиатуры (lettersState) найдите кликнутый символ 
(letter). Найденый символ сохраняйте в отдельную переменную (например letterFromState)

  3. Проверьте: отсутсвует ли кликнутый символ в ответе игры И не отмечен ли символ уже отмеченным как ошибочный (error)
  3.1. Увеличьте количество ошибок на 1
  3.2. Отметьте символ свойством `error`

  4. Проверьте: присутсвует ли кликнутый символ в ответе игры И не отмечен ли символ уже отмеченным как успешный (success)
  4.1. Отметьте символ свойством success
  4.2. Измените необходимые символы "_" на кликнутый символ. Изменения необходимо выполнять только символов, у которых позиция в ответе совпадает с позицией состояния.
  Пример: 
  - Состояние игры: ['_', '_', '_', '_', '_', '_', '_', '_', '_', '_']
  - Загаданное слово: "фотография"
  - Пользователь кликает на "о"
  - Состояние должно измениться на: ['_', 'о', '_', 'о', '_', '_', '_', '_', '_', '_']
  - Пользователь кликает на "ф"
  - Состояние должно измениться на: ['ф', 'о', '_', 'о', '_', '_', '_', 'ф', '_', '_']
  - Пользователь кликает на "т"
  - Состояние должно измениться на: ['ф', 'о', 'т', 'о', '_', '_', '_', 'ф', '_', '_']

  5. Перерисовывайте состояние игрока с текущим количеством жизней

  6. Перерисовывайте состояние клавиатуры

  7. Перерисовывайте состояние отгаданного слова

  8. Проверьте, совпадает ли состояние отгаданного слова с ответом игры
  8.1. Отображайте победу игрока, если пользователь угадал слово
  */
}