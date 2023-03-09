
//-576
//Извлечение из вёрстки
let jumpBlock = window.document.querySelector('#jump-block');
let hitBlock = window.document.querySelector('#hit-block');
let heroImg = window.document.querySelector('#hero-img');
let imgBlock = window.document.querySelector('#img-block');
let canvas = window.document.querySelector('#canvas');
let fsBtn = window.document.querySelector('#fsBtn');


//Переменные
let rightPosition = 0;
let imgBlockPosition = 0;
let timer = null;
let halfWidht = window.screen.width / 2;
let direction = 'right';
let hit = false;
let jump = false;


hitBlock.style.top = `${window.screen.height / 2 - 144 / 2}px`
jumpBlock.style.top = `${window.screen.height / 2 - 144 / 2}px`




heroImg.onclick = (event) => {
	event.preventDefault();
}


fsBtn.onclick = () => {
	if (window.document.fullscreen) {
		window.document.exitFullscreen();
		fsBtn.src = 'fullscreen.png'
	} else {
		fsBtn.src = 'cancel.png'
		canvas.requestFullscreen();
	}

}

jumpBlock.onclick = () => { jump = true };

hitBlock.onclick = () => { hit = true; }


//функции




const rightHendler = () => {
	heroImg.style.transform = 'scale(-1,1)';
	rightPosition = rightPosition + 1;
	imgBlockPosition = imgBlockPosition + 1;
	if (rightPosition > 5) {
		rightPosition = 0;
	}
	heroImg.style.left = `-${rightPosition * 288}px`;
	heroImg.style.top = '-576px';
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
	heroImg.style.top = '-576px';
	imgBlock.style.left = `${imgBlockPosition * 20}px`
}


const standHendler = () => {
	switch (direction) {
		case 'right': {
			heroImg.style.transform = 'scale(-1,1)';
			if (rightPosition > 4) {
				rightPosition = 1;
			}
			break;
		}
		case 'left': {
			heroImg.style.transform = 'scale(1,1)';
			if (rightPosition > 3) {
				rightPosition = 0;
			}
			break;
		}
		default:
	}

	rightPosition = rightPosition + 1;
	heroImg.style.left = `-${rightPosition * 288}px`;
	heroImg.style.top = '0px';

}

const hitHendler = () => {
	switch (direction) {
		case 'right': {
			heroImg.style.transform = 'scale(-1,1)';
			if (rightPosition > 4) {
				rightPosition = 1;
				hit = false;
			}
			break;
		}
		case 'left': {
			heroImg.style.transform = 'scale(1,1)';
			if (rightPosition > 3) {
				rightPosition = 0;
				hit = false
			}
			break;
		}
		default:
	}

	rightPosition = rightPosition + 1;
	heroImg.style.left = `-${rightPosition * 288}px`;
	heroImg.style.top = '-864px';
}


const jumpHendler = () => {
	switch (direction) {
		case 'right': {
			heroImg.style.transform = 'scale(-1,1)';
			if (rightPosition > 4) {
				rightPosition = 1;
				jump = false;
			}
			break;
		}
		case 'left': {
			heroImg.style.transform = 'scale(1,1)';
			if (rightPosition > 3) {
				rightPosition = 0;
				jump = false
			}
			break;
		}
		default:
	}

	rightPosition = rightPosition + 1;
	heroImg.style.left = `-${rightPosition * 288}px`;
	heroImg.style.top = '-288px';
}



//обработчики событий

let onTouchstart = (event) => {
	clearInterval(timer);
	//считываем координаты с экрана
	x = (event.type === 'mousedown') ? event.screenX : event.touches[0].screenX;
	timer = setInterval(() => {
		if (x > halfWidht) {
			direction = 'right';
			rightHendler();

		} else {
			direction = 'left';
			leftHendler();
		}
	}, 130);
}

let onTouchEnd = (event) => {
	clearInterval(timer);
	lifeCycle();
}

window.onmousedown = onTouchstart;
window.ontouchstart = onTouchstart;
window.onmouseup = onTouchEnd;
window.ontouchend = onTouchEnd;




const lifeCycle = () => {
	timer = setInterval(() => {
		if (hit) {
			hitHendler();
		} else if (jump) {
			jumpHendler();
		} else {
			standHendler();
		}
	}, 150)
}






const start = () => {
	lifeCycle();
}

start();




