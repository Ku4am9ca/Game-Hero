
//-576
//Извлечение из вёрстки
let jumpBlock = window.document.querySelector('#jump-block');
let hitBlock = window.document.querySelector('#hit-block');
let heroImg = window.document.querySelector('#hero-img');
let imgBlock = window.document.querySelector('#img-block');
let canvas = window.document.querySelector('#canvas');
let fsBtn = window.document.querySelector('#fsBtn');

let info = window.document.querySelector('#info');

let heroX = Math.floor((Number.parseInt(imgBlock.style.left) + 32) / 32);
let heroY = Math.floor((Number.parseInt(imgBlock.style.bottom)) / 32);

//Number.parseInt переводим в число





//Переменные
let rightPosition = 0;
let imgBlockPosition = 0;
let timer = null;
let halfWidht = window.screen.width / 2;
let direction = 'right';
let hit = false;
let jump = false;
let fall = false;
let tileArray = [];


hitBlock.style.top = `${window.screen.height / 2 - 144 / 2}px`
jumpBlock.style.top = `${window.screen.height / 2 - 144 / 2}px`


//обработчики событий

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

const updateHeroXY = () => {
	heroX = Math.ceil((Number.parseInt(imgBlock.style.left) + 32) / 32);
	heroY = Math.ceil((Number.parseInt(imgBlock.style.bottom)) / 32);

	info.innerText = `heroX=${heroX}, heroY=${heroY}`;
}


const checkFalling = () => {
	updateHeroXY();
	let isFalling = true;
	for (let i = 0; i < tileArray.length; i++) {
		if ((tileArray[i][0] === heroX) && ((tileArray[i][1] + 1) === heroY)) {
			isFalling = false;
		}
	}

	if (isFalling) {
		info.innerText = info.innerText + ', Falling';
		fall = true;
	} else {
		info.innerText = info.innerText + ',  Not falling';
		fall = false;
	}
	//tileArray.filter();
	//функция для работы с массивами
}


const fallHandler = () => {
	heroImg.style.top = '-96px'
	imgBlock.style.bottom = `${Number.parseInt(imgBlock.style.bottom) - 40}px`;
	checkFalling();
}


const rightHendler = () => {
	heroImg.style.transform = 'scale(-1,1)';
	rightPosition = rightPosition + 1;
	imgBlockPosition = imgBlockPosition + 1;
	if (rightPosition > 5) {
		rightPosition = 0;
	}
	heroImg.style.left = `-${rightPosition * 96}px`;
	heroImg.style.top = '-192px';
	imgBlock.style.left = `${imgBlockPosition * 20}px`;


	checkFalling();
}


const leftHendler = () => {
	heroImg.style.transform = 'scale(1,1)';
	rightPosition = rightPosition + 1;
	imgBlockPosition = imgBlockPosition - 1;
	if (rightPosition > 5) {
		rightPosition = 0;
	}
	heroImg.style.left = `-${rightPosition * 96}px`;
	heroImg.style.top = '-192px';
	imgBlock.style.left = `${imgBlockPosition * 20}px`;


	checkFalling();
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
	heroImg.style.left = `-${rightPosition * 96}px`;
	heroImg.style.top = '0px';

	checkFalling();

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
	heroImg.style.left = `-${rightPosition * 96}px`;
	heroImg.style.top = '-288px';
}


const jumpHendler = () => {
	switch (direction) {
		case 'right': {
			heroImg.style.transform = 'scale(-1,1)';
			if (rightPosition > 4) {
				rightPosition = 1;
				jump = false;
				imgBlock.style.bottom = `${Number.parseInt(imgBlock.style.bottom) + 160}px`;
				imgBlockPosition = imgBlockPosition + 10;
				imgBlock.style.left = `${imgBlockPosition * 20}px`;
			}
			break;
		}
		case 'left': {
			heroImg.style.transform = 'scale(1,1)';
			if (rightPosition > 3) {
				rightPosition = 0;
				jump = false;
				imgBlock.style.bottom = `${Number.parseInt(imgBlock.style.bottom) + 160}px`;
				imgBlockPosition = imgBlockPosition - 10;
				imgBlock.style.left = `${imgBlockPosition * 20}px`;
			}
			break;
		}
		default:
	}

	rightPosition = rightPosition + 1;
	heroImg.style.left = `-${rightPosition * 96}px`;
	heroImg.style.top = '-96px';
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
		} else if (fall) {
			fallHandler();
		} else {
			standHendler();
		}
	}, 150)
}

const createTile = (x, y = 1) => {
	let tile = window.document.createElement('img');
	tile.src = 'assets/1 Tiles/Tile_02.png';
	tile.style.position = 'absolute';
	tile.style.left = x * 32;
	tile.style.bottom = y * 32;
	canvas.appendChild(tile);


	tileArray.push([x, y]);
}

const createTilesPlatform = (startX, startY, length) => {
	for (let i = 0; i < length; i++) {
		createTile(startX + i, startY);
	}
}

const addTiles = (i) => {
	createTile(i);
	let tileBlack = window.document.createElement('img');
	tileBlack.src = 'assets/1 Tiles/Tile_04.png';
	tileBlack.style.position = 'absolute';
	tileBlack.style.left = i * 32;
	tileBlack.style.bottom = 0;
	canvas.appendChild(tileBlack);
}



class Enemy {
	posX;
	posY;
	img;
	block;
	blockSize;
	constructor(x, y) {
		this.posX = x;
		this.posY = y;
		this.blockSize = 96;
		this.img = window.document.createElement('img');
		this.img.src = 'assets/Enemies/1/Idle.png';
		this.img.style.position = 'absolute';
		this.img.style.left = this.posX * 32;
		this.img.style.bottom = this.posY * 32;
		this.img.style.width = this.blockSize * 4;
		this.img.style.height = this.blockSize;

		canvas.appendChild(this.img);
	}
}





const start = () => {
	lifeCycle();
	for (let i = 0; i < 58; i = i + 1) {
		//	if ((i > 10) && (i < 17)) {
		//		continue;

		addTiles(i);
	}
	createTilesPlatform(10, 10, 10);
	createTilesPlatform(15, 5, 10);

	let enemy = new Enemy(10, 2);
}

start();
//остановился на 10

//остановился на 11


//закончил 4ю38 13 урок







