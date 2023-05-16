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

});

// техническая часть - УДАЛИТЬ НА ПРОДАКШЕНЕ!
// получить в консоли элемент, по которому кликнули
document.addEventListener('click', e => console.log(e.target));

