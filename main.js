

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

let center = false;

cardList.addEventListener('scroll', function () {
	const cardListWidth = cardList.offsetWidth;
	const cardListScrollLeft = cardList.scrollLeft;
	const cardListCenter = cardListScrollLeft + cardListWidth / 2;

	cards.forEach(function (card) {
		const cardWidth = card.offsetWidth;
		const cardOffsetLeft = cardList.scrollLeft + card.getBoundingClientRect().left + cardWidth / 2;

		if (Math.abs(cardOffsetLeft - cardListCenter) < cardWidth / 2) {
			center = false;
			card.classList.add('center');
		} else {
			card.classList.remove('center');
		}

	});
});

var timer = null;
cardList.addEventListener('scroll', function () {
	if (timer !== null) {
		clearTimeout(timer);
	}
	timer = setTimeout(function () {
		let centerCard = document.querySelector('.center');
		const centerWidth = centerCard.offsetWidth;
		const cardListCenter = cardList.scrollLeft + cardList.offsetWidth / 2;
		const cardOffsetLeft = cardList.scrollLeft + centerCard.getBoundingClientRect().left + centerWidth / 2;

		if (!center) {
			center = true;
			cardList.scrollTo(cardList.scrollLeft + cardOffsetLeft - cardListCenter, 0);
		}	
	}, 150);
}, false);

// cardList.addEventListener("scrollend", (event) => {
// 	console.log('choLong');
// 	let centerCard = document.querySelector('.center');
// 	const centerWidth = centerCard.offsetWidth;
// 	const cardListCenter = cardList.scrollLeft + cardList.offsetWidth / 2;
// 	const cardOffsetLeft = cardList.scrollLeft + centerCard.getBoundingClientRect().left + centerWidth / 2;

// 	if (!center) {
// 		center = true;
// 		cardList.scrollTo(cardList.scrollLeft + cardOffsetLeft - cardListCenter, 0);
// 	}
// });


// function goLeft() {
//   const cardList = document.querySelector('.card-list');
//   const cardWidth = document.querySelector('.card').offsetWidth;
//   const scrollAmount = Math.floor(cardWidth / 2); // Scroll by half the card width

//   cardList.scrollLeft -= scrollAmount;
//   cardList.scrollLeft = Math.max(cardList.scrollLeft, 0); // Ensure the scroll position does not go below 0
// }

// function goRight() {
//   const cardList = document.querySelector('.card-list');
//   const cardWidth = document.querySelector('.card').offsetWidth;
//   const scrollAmount = Math.floor(cardWidth / 2); // Scroll by half the card width

//   cardList.scrollLeft += scrollAmount;
//   const maxScrollLeft = cardList.scrollWidth - cardList.clientWidth;
//   cardList.scrollLeft = Math.min(cardList.scrollLeft, maxScrollLeft); // Ensure the scroll position does not exceed the maximum
// }


function goToLeftEnd() {
	cardList.scrollTo(0, 0); // Scroll to the left end of the card list
}

function goToRightEnd() {
	cardList.scrollTo(cardList.scrollWidth, 0); // Scroll to the right end of the card list
}
// 
window.addEventListener('resize', function() {
	var width = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
	var height = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;
  
	console.log('Chiều rộng của điện thoại: ' + width + 'px');
	console.log('Chiều cao của điện thoại: ' + height + 'px');
  });
  
