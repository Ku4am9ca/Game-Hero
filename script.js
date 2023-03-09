

//Переменные
let heroImg = window.document.querySelector('#hero-img');
let imgBlock = window.document.querySelector('#img-block');
let rightPosition = 0;
let imgBlockPosition = 0;
let timer = null;
let halfWidht = window.screen.width / 2;


//функции
const rightHendler = () => {
	heroImg.style.transform = 'scale(-1,1)';
	rightPosition = rightPosition + 1;
	imgBlockPosition = imgBlockPosition + 1;
	if (rightPosition > 5) {
		rightPosition = 0;
	}
	heroImg.style.left = `-${rightPosition * 288}px`;
	imgBlock.style.left = `${imgBlockPosition * 20}px`

}


const leftHendler = () => {
	heroImg.style.transform = 'scale(1,1)';
	rightPosition = rightPosition + 1;
	imgBlockPosition = imgBlockPosition - 1;
	if (rightPosition > 5) {
		rightPosition = 0;
	}
	heroImg.style.left = `-${rightPosition * 288}px`;
	imgBlock.style.left = `${imgBlockPosition * 20}px`

}


//обработчики событий

let onTouchstart = (event) => {
	event.preventDefault();
	//считываем координаты с экрана
	x = (event.type === 'mousedown') ? event.screenX : event.touches[0].screenX;

	timer = setInterval(() => {
		(x > halfWidht) ? rightHendler() : leftHendler();
	}, 130);
}

let onTouchEnd = (event) => {
	event.preventDefault();
	clearInterval(timer);
}

window.onmousedown = onTouchstart;
window.ontouchstart = onTouchstart;
window.onmouseup = onTouchEnd;
window.ontouchend = onTouchEnd;




