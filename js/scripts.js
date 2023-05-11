document.addEventListener('DOMContentLoaded', () => {
  // get all buttons
  var buttons = document.querySelectorAll('.button');

  // add mouseover event listener to each button
  buttons.forEach(function (button) {
    button.addEventListener('mouseover', function (e) {
      // get button position
      var pos = button.getBoundingClientRect();
      var elem_left = pos.left;
      var elem_top = pos.top;

      // get cursor position relative to the button
      var Xinner = e.clientX - elem_left;
      var Yinner = e.clientY - elem_top;

      // get the maximum distance to the corners
      var maxDist = Math.max(
        Math.sqrt(Math.pow(Xinner, 2) + Math.pow(Yinner, 2)),
        Math.sqrt(Math.pow(button.clientWidth - Xinner, 2) + Math.pow(Yinner, 2)),
        Math.sqrt(Math.pow(Xinner, 2) + Math.pow(button.clientHeight - Yinner, 2)),
        Math.sqrt(Math.pow(button.clientWidth - Xinner, 2) + Math.pow(button.clientHeight - Yinner, 2))
      );

      // set position of decoration element
      var decoration = button.querySelector('.decorate');
      decoration.style.left = Xinner + 'px';
      decoration.style.top = Yinner + 'px';
      decoration.style.width = maxDist * 2 + 'px';
      decoration.style.height = maxDist * 2 + 'px';
    });

    // Add mouseout event listener to each button
    button.addEventListener('mouseout', function (e) {
      console.log(this);
      // Reset decoration element size
      var decoration = button.querySelector('.decorate');
      decoration.style.width = '0';
      decoration.style.height = '0';
    });
  });

  // анимация наклона карточки 
  let cx, cy, mouseX, mouseY, posX, posY, clientX, clientY, dx, dy, tiltx, tilty, request, radius, degree;

  const firstScreen = document.querySelector('body');
  const text = document.querySelector('.first-screen');

  cx = firstScreen.offsetWidth / 2;
  cy = firstScreen.offsetHeight / 2;

  firstScreen.addEventListener('mousemove', e => {
    clientX = e.pageX - firstScreen.offsetLeft
    clientY = e.pageY - firstScreen.offsetTop

    request = requestAnimationFrame(updateMe)
  });

  function updateMe() {
    dx = clientX - cx
    dy = clientY - cy
    tiltx = dy / cy
    tilty = dx / cx
    radius = Math.sqrt(Math.pow(tiltx, 2) + Math.pow(tilty, 2))
    degree = radius * 12

    // Наклоняем карточку .first-screen__text
    gsap.to(text, 1, { transform: `rotate3d(${tiltx}, ${tilty}, 0, ${degree}deg)` })

    // Придаем плавность и позволяет анимации продолжаться после окончания движения мыши
    cancelAnimationFrame(request)
  };

  // Дополнительные настройки анимации
  gsap.set(text, { transformOrigin: 'center center' }); // Устанавливаем точку трансформации в центр элемента

  gsap.to('.card', { opacity: 1, zoom: 1, duration: .1, delay: .25 }); // Анимация уменьшения масштаба карточки

});

// техническая часть - УДАЛИТЬ НА ПРОДАКШЕНЕ!
// получить в консоли элемент, по которому кликнули
document.addEventListener('click', e => console.log(e.target));

