let image = document.querySelector('.apple');
let canvas = document.querySelector('.game');
let context = canvas.getContext('2d');
let grid = 16;
let count = 0;
let snake = {  
//положение при старте
  x: 144,
  y: 352,
//направление движения при старте
  dx: 0,
  dy: -grid,
  cells: [],
//длина змейки при старте
  maxCells: 6,    
};
let apple = {  
//начальные координаты яблока
   x: 0,
   y: 0,  
};
//генерим яблоко
apple.x = getRandomInt(1, 18) * grid;
apple.y = getRandomInt(1, 27) * grid;
//генератор случайных чисел
function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}
//игровой цикл
function loop() {  
  requestAnimationFrame(loop);
//скорость обновления кадров
if (++count < 4) {
  return;
}
count = 0;
//очистка поля по координатам после столкновения с полем
context.clearRect(0, 0, canvas.width, canvas.height);
//двигаем змейку с нужной скоростью
snake.x += snake.dx;
snake.y += snake.dy;
//конец игры если змейка касается поля по горизонтали слева
if (snake.x < 0) {
  snake.x = 144;
  snake.y = 352;
  snake.cells = [];
  snake.maxCells = 6;
  snake.dx = 0;
  snake.dy = -grid;
//генерим яблоко
  apple.x = getRandomInt(1, 18) * grid;
  apple.y = getRandomInt(1, 27) * grid;
}
//конец игры если змейка касается поля по горизонтали справа
if (snake.x > 304) {
  snake.x = 144;
  snake.y = 352;
  snake.cells = [];
  snake.maxCells = 6;
  snake.dx = 0;
  snake.dy = -grid;
//генерим яблоко
  apple.x = getRandomInt(1, 18) * grid;
  apple.y = getRandomInt(1, 27) * grid;
}
//конец игры если змейка касается поля по вертикали сверху
if (snake.y < 0) {
  snake.x = 144;
  snake.y = 352;
  snake.cells = [];
  snake.maxCells = 6;
  snake.dx = 0;
  snake.dy = -grid;
//генерим яблоко
  apple.x = getRandomInt(1, 18) * grid;
  apple.y = getRandomInt(1, 27) * grid;
}
//конец игры если змейка касается поля по вертикали снизу
if (snake.y > 448) {
  snake.x = 144;
  snake.y = 352;
  snake.cells = [];
  snake.maxCells = 6;
  snake.dx = 0;
  snake.dy = -grid;
//генерим яблоко
  apple.x = getRandomInt(1, 18) * grid;
  apple.y = getRandomInt(1, 27) * grid;
}
//добавляем клетку перед змейкой по координатам (поменяв x и y можно инвертировать управление относительно осей x и y)
snake.cells.unshift({ x: snake.x, y: snake.y });
if (snake.cells.length > snake.maxCells) {
//удаляем последний элемент из массива змейки (лишнюю клетку хвоста)
  snake.cells.pop();
}
//рисуем яблоко (по коодинатам)
context.fillStyle = 'rgba(0, 0, 0, 0)';
context.drawImage(image, 0, 0, apple.x, apple.y, apple.x, apple.y, 16, 16);
context.fillRect(apple.x, apple.y, grid - 0, grid - 0);
//рисуем ВСЕ клетки змейки (по коодинатам)
context.fillStyle = 'yellow';
snake.cells.forEach(function (cell, index) {
  context.fillRect(cell.x, cell.y, grid - 0, grid - 0);
//если змейка добралась до яблока...
  if (cell.x == apple.x && cell.y == apple.y) {
//увеличиваем длину змейки
    snake.maxCells = snake.maxCells + 1;
//генерим яблоко
    apple.x = getRandomInt(1, 18) * grid; 
    apple.y = getRandomInt(1, 27) * grid;
  }
//проверяем, не столкнулась ли змейка сама с собой, сравнивая координаты всех её клеток
  for (let i = index + 1; i < snake.cells.length; i++) {
//если такие клетки есть — начинаем игру заново
    if (cell.x === snake.cells[i].x && cell.y === snake.cells[i].y) {
      snake.x = 144;
      snake.y = 352;
      snake.cells = [];
      snake.maxCells = 6;
      snake.dx = 0;
      snake.dy = -grid;
//генерим яблоко
      apple.x = getRandomInt(1, 18) * grid;
      apple.y = getRandomInt(1, 27) * grid;
    }
  }
});
}
//регистрируем нажатие на стрелки (вторая часть условия проверки мешает двигаться "в себя")
document.addEventListener('keydown', function (e) {
//стрелка влево
  if (e.keyCode == 37 & snake.dx == 0) {
    snake.dx = -grid;
    snake.dy = 0;
  }
//стрелка вверх
  else if (e.keyCode == 38 && snake.dy == 0) {
    snake.dy = -grid;
    snake.dx = 0;
  }
//стрелка вправо
  else if (e.keyCode == 39 && snake.dx == 0) {
    snake.dx = grid;
    snake.dy = 0;
  }
//стрелка вниз
  else if (e.keyCode == 40 && snake.dy == 0) {
    snake.dy = grid;
    snake.dx = 0;
  }
});
//всё время запускаем игру
requestAnimationFrame(loop);
