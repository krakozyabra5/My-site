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
      context.clearRect(0, 0, canvas.width, canvas.height); //очистка поля по координатам после столкновения с полем
      snake.x += snake.dx;  //двигаем змейку с нужной скоростью
      snake.y += snake.dy;
      if (snake.x < 0) {  //конец игры если змейка касается поля по горизонтали слева
        snake.x = 200;
        snake.y = 350;
        snake.cells = [];
        snake.maxCells = 4;
        snake.dx = 0;
        snake.dy = -grid;
        apple.x = getRandomInt(0, 25) * grid;  //генерим яблоко
        apple.y = getRandomInt(0, 25) * grid;  
      }
      if (snake.x > 390) {  //конец игры если змейка касается поля по горизонтали справа
        snake.x = 200;
        snake.y = 350;
        snake.cells = [];
        snake.maxCells = 4;
        snake.dx = 0;
        snake.dy = -grid;
        apple.x = getRandomInt(0, 25) * grid;  //генерим яблоко
        apple.y = getRandomInt(0, 25) * grid;  
      }
      if (snake.y < 0) {  //конец игры если змейка касается поля по вертикали сверху
        snake.x = 200;
        snake.y = 350;
        snake.cells = [];
        snake.maxCells = 4;
        snake.dx = 0;
        snake.dy = -grid;
        apple.x = getRandomInt(0, 25) * grid;  //генерим яблоко
        apple.y = getRandomInt(0, 25) * grid;
      }
      if (snake.y > 390) {  //конец игры если змейка касается поля по вертикали снизу
        snake.x = 200;
        snake.y = 350;
        snake.cells = [];
        snake.maxCells = 4;
        snake.dx = 0;
        snake.dy = -grid;
        apple.x = getRandomInt(0, 25) * grid;  //генерим яблоко
        apple.y = getRandomInt(0, 25) * grid;
      }

      snake.cells.unshift({ x: snake.x, y: snake.y });  //добавляем клетку перед змейкой по координатам (поменяв x и y можно инвертировать управление относительно осей x и y)
      if (snake.cells.length > snake.maxCells) {
        snake.cells.pop();  //удаляем последний элемент из массива змейки (лишнюю клетку хвоста)
      }
      context.fillStyle = 'red';  //рисуем яблоко (по коодинатам)
      context.fillRect(apple.x, apple.y, grid - 2, grid - 2);
      context.fillStyle = 'green';  //рисуем ВСЕ клетки змейки (по коодинатам)
      snake.cells.forEach(function (cell, index) {
        context.fillRect(cell.x, cell.y, grid - 0, grid - 0);
        if (cell.x === apple.x && cell.y === apple.y) {  //если змейка добралась до яблока...
          snake.maxCells++;  //увеличиваем длину змейки
          apple.x = getRandomInt(0, 25) * grid;  //генерим яблоко
          apple.y = getRandomInt(0, 25) * grid;
        }
        for (var i = index + 1; i < snake.cells.length; i++) {  //проверяем, не столкнулась ли змея сама с собой, сравнивая координаты всех её клеток
          if (cell.x === snake.cells[i].x && cell.y === snake.cells[i].y) {  //если такие клетки есть — начинаем игру заново
            snake.x = 200;
            snake.y = 350;
            snake.cells = [];
            snake.maxCells = 4;
            snake.dx = 0;
            snake.dy = -grid;
            apple.x = getRandomInt(0, 25) * grid;  //генерим яблоко
            apple.y = getRandomInt(0, 25) * grid;
          }
        }
      });
    }
    document.addEventListener('keydown', function (e) {  //регистрируем нажатие на стрелки (вторая часть условия проверки мешает двигаться "в себя")
      if (e.which === 37 && snake.dx === 0) {  //стрелка влево
        snake.dx = -grid;
        snake.dy = 0;
      }
      else if (e.which === 38 && snake.dy === 0) {  //стрелка вверх
        snake.dy = -grid;
        snake.dx = 0;
      }
      else if (e.which === 39 && snake.dx === 0) {  //стрелка вправо
        snake.dx = grid;
        snake.dy = 0;
      }
      else if (e.which === 40 && snake.dy === 0) {  //стрелка вниз
        snake.dy = grid;
        snake.dx = 0;
      }
    });
    requestAnimationFrame(loop);  //всё-время запускаем игру
  </script>
</body>

</html>
