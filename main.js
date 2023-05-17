// let dragElement = document.querySelector('.drag-card');

// // Add event listener for when the mouse button is pressed down on the element
// dragElement.addEventListener('mousedown', function (event) {
//   // Store the initial mouse position
//   let initialMouseX = event.clientX;
//   let initialMouseY = event.clientY;

//   // Store the initial element position
//   let initialElementX = dragElement.offsetLeft;
//   let initialElementY = dragElement.offsetTop;

//   // Calculate the offset between the initial mouse position and the initial element position
//   let offsetX = initialMouseX - initialElementX;
//   let offsetY = initialMouseY - initialElementY;

//   // Add event listener for when the mouse moves
//   document.addEventListener('mousemove', moveElement);

//   // Add event listener for when the mouse button is released
//   document.addEventListener('mouseup', function () {
//     document.removeEventListener('mousemove', moveElement);
//   });

//   // Function to move the element
//   function moveElement(event) {
//     // Calculate the new element position based on the current mouse position and the initial offset
//     let newElementX = event.clientX - offsetX;
//     let newElementY = event.clientY - offsetY;

//     // Set the new element position
//     dragElement.style.left = newElementX + 'px';
//     dragElement.style.top = newElementY + 'px';
//   }
// });

const swiper = new Swiper(".mySwiper", {
  effect: "cards",
  grabCursor: true,
  mousewheel: true,
  draggable: true,
});

// let isDragging = false;
// let startPosition = 0;

// swiper.on('touchStart', function(event) {
//   console.log('start');
//   isDragging = true;
//   startPosition = event.clientX;
// });

// swiper.on('touchMove', function(event) {
//   if (isDragging) {
//     console.log('move');
//     console.log(event)
//     let distance = event.clientX - startPosition;
//     console.log(distance)
//     console.log(swiper.translate)
//     swiper.setTranslate(swiper.translate + distance);
//   }
// });

// swiper.on('touchEnd', function() {
//   console.log('end');
//   isDragging = false;
// });

// swiper.on('mouseleave', function() {
//   isDragging = false;
// });


////////////////////// health-bar /////////////////////////
let hBar = $('.health-bar'), //big bar
  mBar = hBar.find('.mana-bar'),
  mana = hBar.find('.mana'), //bar
  health = hBar.find('.mana'),
  hit = hBar.find('.hit');

function applyDamage(damage, bigbar, bar) {
  let total = bigbar.data('total'),
    value = bigbar.data('value');

  if (value < 0) {
    console.log("You're dead, reset.");
    return;
  }

  let newValue = value - damage;
  let barWidth = (newValue / total) * 100;
  let hitWidth = (damage / value) * 100 + "%";

  hit.css('width', hitWidth);
  bigbar.data('value', newValue);

  setTimeout(function () {
    hit.css({ 'width': '0' });
    bar.css('width', barWidth + "%");
  }, 500);

  console.log(value, damage, hitWidth);

  if (value < 0) {
    console.log("DEAD");
  }
}

function applybuff(buff, bigbar, bar) {
  let total = bigbar.data('total'),
    value = bigbar.data('value');

  if (value >= 100) {
    console.log("Health full");
    return;
  }

  let newValue = Math.min(value + buff, 100);
  let barWidth = (newValue / total) * 100;
  let hitWidth = (buff / value) * 100 + "%";

  hit.css('width', hitWidth);
  bigbar.data('value', newValue);

  setTimeout(function () {
    hit.css({ 'width': '0' });
    bar.css('width', barWidth + "%");
  }, 500);

  console.log(value, buff, hitWidth);

  if (value >= 100) {
    console.log("Health full");
  }
}

function resetHealthBar(bar, bigbar) {
  bigbar.data('value', hBar.data('total'));
  hit.css({ 'width': '0' });
  bar.css('width', '100%');
}