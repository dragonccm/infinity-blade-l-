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
  // grabCursor: true,
  // mousewheel: true,
  draggable: true,
});

let isDragging = false;
let startPosition = 0;

swiper.on('touchStart', function(event) {
  console.log('start');
  isDragging = true;
  startPosition = event.clientX;
});

swiper.on('touchMove', function(event) {
  if (isDragging) {
    console.log('move');
    console.log(event)
    let distance = event.clientX - startPosition;
    console.log(distance)
    console.log(swiper.translate)
    swiper.setTranslate(swiper.translate + distance);
  }
});

swiper.on('touchEnd', function() {
  console.log('end');
  isDragging = false;
});

// swiper.on('mouseleave', function() {
//   isDragging = false;
// });


