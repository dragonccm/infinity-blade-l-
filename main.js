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
let hBar = document.querySelector('.health-bar'), //big bar
  mBar = document.querySelector('.mana-bar'),
  mana = document.querySelector('.mana'), //bar
  health = document.querySelector('.health'),
  hit = document.querySelector('.hit');

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
// card list

const cardList = document.querySelector('.card-list');
const cards = document.querySelectorAll('.card');

cardList.addEventListener('scroll', function() {
  const cardListWidth = cardList.offsetWidth;
  const cardListScrollLeft = cardList.scrollLeft;
  const cardListCenter = cardListScrollLeft + cardListWidth / 2;

  cards.forEach(function(card) {
    const cardWidth = card.offsetWidth;
    const cardOffsetLeft = cardList.scrollLeft + card.getBoundingClientRect().left + cardWidth / 2;

    if (Math.abs(cardOffsetLeft - cardListCenter) < cardWidth / 2) {
      card.classList.add('center');
    } else {
      card.classList.remove('center');
    }
  });
});

function goLeft() {
  const cardList = document.querySelector('.card-list');
  const cardWidth = document.querySelector('.card').offsetWidth;
  const scrollAmount = Math.floor(cardWidth / 2); // Scroll by half the card width

  cardList.scrollLeft -= scrollAmount;
  cardList.scrollLeft = Math.max(cardList.scrollLeft, 0); // Ensure the scroll position does not go below 0
}

function goRight() {
  const cardList = document.querySelector('.card-list');
  const cardWidth = document.querySelector('.card').offsetWidth;
  const scrollAmount = Math.floor(cardWidth / 2); // Scroll by half the card width

  cardList.scrollLeft += scrollAmount;
  const maxScrollLeft = cardList.scrollWidth - cardList.clientWidth;
  cardList.scrollLeft = Math.min(cardList.scrollLeft, maxScrollLeft); // Ensure the scroll position does not exceed the maximum
}


