<!DOCTYPE html>
<html>

<head>
  <style>
    html, body {
      height: 100%;
      margin: 0;
    }
    body {
      display: flex;
      align-items: center;
      justify-content: center;
    }
    canvas {
      border: 1px solid black;
      background: aqua;
      width: 400px;
      height: 400px;
    }
  </style>
</head>

<body>
  <canvas width="400px" height="400px" class="game"></canvas>

  <script>
    let canvas = document.querySelector('.game');
    let context = canvas.getContext('2d');
    let grid = 16;
    let count = 0;
    let snake = {
      x: 200,  //положение при старте
      y: 350,
      dx: 0,  //направление при старте
      dy: -grid,
      cells: [],
      maxCells: 4 //длина змейки при старте
    };
    let apple = {
      x: 320, //начальные координаты яблока
      y: 320
    };
    function getRandomInt(min, max) {
      return Math.floor(Math.random() * (max - min)) + min;
    }  //генератор случайных чисел
    function loop() {  //игровой цикл
      requestAnimationFrame(loop);
      if (++count < 4) {  //скорость обновления кадров
        return;
      }
      count = 0;
      context.clearRect(0, 0, canvas.width, canvas.height); //очистка поля по координатам
      snake.x += snake.dx;  //двигаем змейку с нужной скоростью
      snake.y += snake.dy;
      if (snake.x < 0) {  //конец игры если змейка касается поля по горизонтали слева
        snake.x = 200;
        snake.y = 350;
        snake.cells = [];
        snake.maxCells = 4;
        snake.dx = 0;
        snake.dy = -grid;
        apple.x = getRandomInt(0, 25) * grid;  //Генерим яблоко
        apple.y = getRandomInt(0, 25) * grid;  
      }
      else if (snake.x >= canvas.width) {
        snake.x = 0;
      }
      if (snake.x > 390) {  //конец игры если змейка касается поля по горизонтали справа
        snake.x = 200;
        snake.y = 350;
        snake.cells = [];
        snake.maxCells = 4;
        snake.dx = 0;
        snake.dy = -grid;
        apple.x = getRandomInt(0, 25) * grid;  //Генерим яблоко
        apple.y = getRandomInt(0, 25) * grid;  
      }
      else if (snake.x >= canvas.width) {
        snake.x = 0;
      }
      if (snake.y < 0) {  //конец игры если змейка касается поля по вертикали сверху
        snake.x = 200;
        snake.y = 350;
        snake.cells = [];
        snake.maxCells = 4;
        snake.dx = 0;
        snake.dy = -grid;
        apple.x = getRandomInt(0, 25) * grid;  //Генерим яблоко
        apple.y = getRandomInt(0, 25) * grid;
      }
      else if (snake.y >= canvas.height) {
        snake.y = 0;
      }
      if (snake.y > 390) {  //конец игры если змейка касается поля по вертикали снизу
        snake.x = 200;
        snake.y = 350;
        snake.cells = [];
        snake.maxCells = 4;
        snake.dx = 0;
        snake.dy = -grid;
        apple.x = getRandomInt(0, 25) * grid;  //Генерим яблоко
        apple.y = getRandomInt(0, 25) * grid;
      }
      else if (snake.y >= canvas.height) {
        snake.y = 0;
      }
      // Продолжаем двигаться в выбранном направлении. Голова всегда впереди, поэтому добавляем её координаты в начало массива, который отвечает за всю змейку
      snake.cells.unshift({ x: snake.x, y: snake.y });
      // Сразу после этого удаляем последний элемент из массива змейки, потому что она движется и постоянно освобождает клетки после себя
      if (snake.cells.length > snake.maxCells) {
        snake.cells.pop();
      }
      // Рисуем еду — красное яблоко
      context.fillStyle = 'red';
      context.fillRect(apple.x, apple.y, grid - 1, grid - 1);
      // Одно движение змейки — один новый нарисованный квадратик 
      context.fillStyle = 'green';
      // Обрабатываем каждый элемент змейки
      snake.cells.forEach(function (cell, index) {
        // Чтобы создать эффект клеточек, делаем зелёные квадратики меньше на один пиксель, чтобы вокруг них образовалась чёрная граница
        context.fillRect(cell.x, cell.y, grid - 1, grid - 1);
        // Если змейка добралась до яблока...
        if (cell.x === apple.x && cell.y === apple.y) {
          // увеличиваем длину змейки
          snake.maxCells++;
          // Рисуем новое яблочко
          // Помним, что размер холста у нас 400x400, при этом он разбит на ячейки — 25 в каждую сторону
          apple.x = getRandomInt(0, 25) * grid;
          apple.y = getRandomInt(0, 25) * grid;
        }
        // Проверяем, не столкнулась ли змея сама с собой
        // Для этого перебираем весь массив и смотрим, есть ли у нас в массиве змейки две клетки с одинаковыми координатами 
        for (var i = index + 1; i < snake.cells.length; i++) {
          // Если такие клетки есть — начинаем игру заново
          if (cell.x === snake.cells[i].x && cell.y === snake.cells[i].y) {
            // Задаём стартовые параметры основным переменным
            snake.x = 160;
            snake.y = 160;
            snake.cells = [];
            snake.maxCells = 4;
            snake.dx = grid;
            snake.dy = 0;
            // Ставим яблочко в случайное место
            apple.x = getRandomInt(0, 25) * grid;
            apple.y = getRandomInt(0, 25) * grid;
          }
        }
      });
    }
    // Смотрим, какие нажимаются клавиши, и реагируем на них нужным образом
    document.addEventListener('keydown', function (e) {
      // Дополнительно проверяем такой момент: если змейка движется, например, влево, то ещё одно нажатие влево или вправо ничего не поменяет — змейка продолжит двигаться в ту же сторону, что и раньше. Это сделано для того, чтобы не разворачивать весь массив со змейкой на лету и не усложнять код игры.
      // Стрелка влево
      // Если нажата стрелка влево, и при этом змейка никуда не движется по горизонтали…
      if (e.which === 37 && snake.dx === 0) {
        // то даём ей движение по горизонтали, влево, а вертикальное — останавливаем
        // Та же самая логика будет и в остальных кнопках
        snake.dx = -grid;
        snake.dy = 0;
      }
      // Стрелка вверх
      else if (e.which === 38 && snake.dy === 0) {
        snake.dy = -grid;
        snake.dx = 0;
      }
      // Стрелка вправо
      else if (e.which === 39 && snake.dx === 0) {
        snake.dx = grid;
        snake.dy = 0;
      }
      // Стрелка вниз
      else if (e.which === 40 && snake.dy === 0) {
        snake.dy = grid;
        snake.dx = 0;
      }
    });
    // Запускаем игру
    requestAnimationFrame(loop);
  </script>
</body>

</html>
