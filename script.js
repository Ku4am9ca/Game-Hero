
//-576
//Извлечение из вёрстки
let jumpBlock = window.document.querySelector('#jump-block');
let hitBlock = window.document.querySelector('#hit-block');
let heroImg = window.document.querySelector('#hero-img');
let imgBlock = window.document.querySelector('#img-block');
let canvas = window.document.querySelector('#canvas');
let fsBtn = window.document.querySelector('#fsBtn');

let info = window.document.querySelector('#info');

let backgroundCanvas = window.document.querySelector('#backgroundcanvas');

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
let objectsArray = [];
let enemisArray = [];
let maxLives = 6;
let lives = 6;
let heartsArray = [];

let isRightSideBlocked = false;//переменные отвечающие за блокировку героя
let isLefttSideBlocked = false;
let wasHeroHit = false;


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
// передвигаем платформы
const moveWorldLeft = () => {
	objectsArray.map((elem, index) => {
		elem.style.left = Number.parseInt(elem.style.left) - 32;
	});
	tileArray.map((elem) => {
		elem[0] = elem[0] - 1
	});
	enemisArray.map(elem => elem.moveLeft());
}

//передвигаем платформы
const moveWorldRight = () => {
	objectsArray.map((elem, index) => {
		elem.style.left = Number.parseInt(elem.style.left) + 32;
	});
	tileArray.map((elem) => {
		elem[0] = elem[0] + 1
	});
	enemisArray.map(elem => elem.moveRight());
}




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
	imgBlock.style.bottom = `${Number.parseInt(imgBlock.style.bottom) - 32}px`;
	checkFalling();
}


const rightHendler = () => {
	if (!isRightSideBlocked) {
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
		wasHeroHit = false;
		moveWorldLeft();
	}
}


const leftHendler = () => {
	if (!isLefttSideBlocked) {
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
		wasHeroHit = false;
		moveWorldRight();

	}
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
				wasHeoHit = true;
			}
			break;
		}
		case 'left': {
			heroImg.style.transform = 'scale(1,1)';
			if (rightPosition > 3) {
				rightPosition = 0;
				hit = false
				wasHeoHit = true;
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
	backgroundCanvas.appendChild(tile);
	objectsArray.push(tile);


	tileArray.push([x, y]);
}
//создаем платформы (уровни) на карте
const createTilesPlatform = (startX, andX, floor) => {
	for (let x_pos = startX - 1; x_pos < andX; x_pos++) {
		createTile(x_pos, floor);
	}
}

const createTilesBlackBlock = (startX, andX, floor) => {
	for (let y_pos = 0; y_pos < floor; y_pos++) {
		for (let x_pos = startX - 1; x_pos < andX; x_pos++) {
			createTileBlack(x_pos, y_pos);
		}
	}
}


const createTileBlack = (x, y = 0) => {
	let tileBlack = window.document.createElement('img');
	tileBlack.src = 'assets/1 Tiles/Tile_04.png';
	tileBlack.style.position = 'absolute';
	tileBlack.style.left = x * 32;
	tileBlack.style.bottom = y * 32;
	backgroundCanvas.appendChild(tileBlack);
	objectsArray.push(tileBlack);
}



const addTiles = (i) => {
	createTile(i);
	createTileBlack(i);
}



class Enemy {

	ATTACK = 'attak';
	DEATH = 'death';
	HURT = 'hurt';
	IDLE = 'idle';
	WALK = 'walk';

	state;
	animateWasChanged;
	lives;

	startX;//стартовая позиция интелекта противника
	posX;
	posY;
	img;
	block;
	blockSize;
	spritePos;
	spriteMaxPos;
	timer;
	dir;
	stop;//остановка при столкновении.

	constructor(x, y) {

		this.posX = x;
		this.startX = this.posX;
		this.posY = y;
		this.blockSize = 96;
		this.spritePos = 0;
		this.spriteMaxPos = 3;
		this.sourcePath = 'assets/Enemies/1/';
		this.state = this.IDLE;
		this.animateWasChanged = false;
		this.dir = 1;
		this.stop = false;
		this.lives = 30;



		this.createImg();
		this.changeAnimate(this.WALK);
		enemisArray.push(this);//передвигаем платформы
		this.lifeCycle();





	}
	createImg() {
		this.block = window.document.createElement('div');
		this.block.style.position = 'absolute';
		this.block.style.left = this.posX * 32;
		this.block.style.bottom = this.posY * 32;
		this.block.style.width = this.blockSize;
		this.block.style.height = this.blockSize;
		this.block.style.overflow = 'hidden';

		this.img = window.document.createElement('img');
		this.img.src = this.sourcePath + 'Idle.png';
		this.img.style.position = 'absolute';
		this.img.style.left = 0;
		this.img.style.bottom = 0;
		this.img.style.width = this.blockSize * 6;
		this.img.style.height = this.blockSize;


		this.block.appendChild(this.img);
		canvas.appendChild(this.block);
	}
	lifeCycle() {
		this.timer = setInterval(() => {


			if (this.animateWasChanged) {
				this.animateWasChanged = false;
				switch (this.state) {
					case this.ATTACK: {
						this.setAttack();
						break;
					}
					case this.DEATH: {
						this.setDeath();
						break;
					}
					case this.HURT: {
						this.setHurt();
						break;
					}
					case this.IDLE: {
						this.setIdle();
						break;
					}
					case this.WALK: {
						this.setWalk();
						break;
					}
					default: break;

				}
			}

			this.spritePos++;

			this.checkCollide();
			if (!this.stop) {
				this.move();
			} else {
				if (this.state != this.DEATH) {
					if (this.state != this.HURT) {
						this.changeAnimate(this.ATTACK);
					}
				}
			}
			this.animate();
		}, 150);
	}

	animate() {
		if (this.spritePos > this.spriteMaxPos) {
			this.spritePos = 0;
			if (this.state === this.ATTACK) {
				lives--;
				updateHearts();
			}
			if (this.state === this.HURT) {
				this.changeAnimate(this.ATTACK);
				if (this.dir > 0) {
					this.spritePos = 1;
				}
			}
			if (this.state === this.DEATH) {
				clearInterval(this.timer);
				isRightSideBlocked = false;
				isLefttSideBlocked = false;
				if (this.dir > 0) {
					this.spritePos = 5;
				}
			}
		}
		this.img.style.left = -(this.spritePos * this.blockSize);
	}
	setAttack() {
		this.img.src = this.sourcePath + 'Attack.png';
		this.spriteMaxPos = 5;
	}
	setDeath() {
		this.img.src = this.sourcePath + 'Death.png';
		this.spriteMaxPos = 5;
	}
	setHurt() {
		this.img.src = this.sourcePath + 'Hurt.png';
		this.spriteMaxPos = 1;
	}
	setIdle() {
		this.img.src = this.sourcePath + 'Idle.png';
		this.spriteMaxPos = 3;
	}

	setWalk() {
		this.img.src = this.sourcePath + 'Walk.png';
		this.spriteMaxPos = 5;
	}
	changeAnimate(stateStr) {
		this.state = stateStr;
		this.animateWasChanged = true;
	}
	//передвижение противника
	move() {
		if (this.posX > (this.startX + 10)) {
			this.dir = this.dir *= -1;
			this.img.style.transform = "scale(-1,1)";
		} else if (this.posX <= this.startX) {
			this.dir = Math.abs(this.dir);
			this.img.style.transform = "scale(1,1)";
		}
		this.posX += this.dir;
		this.block.style.left = this.posX * 32;
	}
	checkHurt() {
		if (wasHeroHit) {
			if (this.lives <= 10) {
				wasHeroHit = false;
				this.changeAnimate(this.DEATH);
			} else {
				wasHeroHit = false;//убираем зацикливание логики анимации.
				this.changeAnimate(this.HURT);
				this.showHurt();
				this.lives -= 10;
			}

		}
	}
	// Проверяем на столкновение
	checkCollide() {
		if (heroY == this.posY) {
			if (heroX == this.posX) {
				//attaks left side
				this.checkHurt();
				isRightSideBlocked = true;
				this.stop = true;
			} else if (heroX == (this.posX + 3)) {
				//	attak right side
				this.checkHurt();
				isLefttSideBlocked = true;
				this.stop = true;
			} else {
				isRightSideBlocked = false;
				isLefttSideBlocked = false;
				this.stop = false;
				this.changeAnimate(this.WALK);
			}
		} else {
			isRightSideBlocked = false;
			isLefttSideBlocked = false;
			this.stop = false;
			this.changeAnimate(this.WALK);
		}
	}

	//показываем урон
	showHurt() {
		let pos = 0;
		let text = window.document.createElement('p');
		text.innerText = '-10';
		text.style.position = 'absolute';
		text.style.left = (this.dir < 0) ? Number.parseInt(this.block.style.left) + 50 : Number.parseInt(this.block.style.left) + 10;
		text.style.bottom = Number.parseInt(this.block.style.left) + 32;
		text.style.fontFamily = "'Black Ops One', cursive";
		let hartTimer = setInterval(() => {
			text.style.bottom = Number.parseInt(text.style.bottom) + 16;
			if (pos > 2) {
				clearInterval(hartTimer);
				text.style.display = 'none';
			}
			pos++;
		}, 100);
		canvas.appendChild(text);

	}
	//передвигаем врага 
	moveRight() {
		this.startX += 1;
		this.posX += 1;
	}

	moveLeft() {
		this.startX -= 1;
		this.posX -= 1;
	}
}



class Heart {
	img;
	x;
	constructor(x, src) {
		this.x = x + 1;
		this.img = window.document.createElement('img');
		this.img.src = src;
		this.img.style.position = 'absolute';
		this.img.style.left = this.x * 32;
		this.img.style.bottom = ((window.screen.height / 32) - 2) * 32;
		this.img.style.width = 32;
		this.img.style.height = 32;

		canvas.appendChild(this.img);
	}
}

class HeartEmpty extends Heart {
	constructor(x) {
		super(x, 'assets/Hearts/heart_emty.png');
	}
}

class HeartRed extends Heart {
	constructor(x) {
		super(x, 'assets/Hearts/heart_red.png');
	}
}

const addHearts = () => {
	// let heartEmpty = new HeartEmpty(0);
	// let heartRed = new HeartRed(1);

	// maxLives = 6
	// lives = 3
	//lives = 6;

	for (let i = 0; i < maxLives; i++) {
		let heartEmpty = new HeartEmpty(i);
		let heartRed = new HeartRed(i);
		heartsArray.push(heartRed);
	}
}


const updateHearts = () => {
	if (lives < 1) {
		lives = 1;
	}
	if (lives < 1) {
		lives = 1;
	}
	for (let i = 0; i < lives; i++) {
		heartsArray[i].img.style.display = 'block';
	}
	for (let i = lives; i < maxLives; i++) {
		heartsArray[i].img.style.display = 'none';
	}
}

const createBackImg = (i) => {

	let img = window.document.createElement('img');
	img.src = 'assets/2 Background/Day/Background.png';
	img.style.position = 'absolute';
	img.style.left = i * window.screen.width;
	img.style.bottom = 32;
	img.style.width = window.screen.width;
	backgroundCanvas.appendChild(img);
	objectsArray.push(img);
}
const addbackgroundImages = () => {
	for (let i = 0; i < 5; i++) {
		createBackImg(i);
	}
}

const buildLevel = () => {
	let floor1 = 0;
	let floor2 = 4;
	let floor3 = 8;

	createTilesPlatform(0, 14, floor1);
	createTilesPlatform(33, 41, floor1);
	createTilesPlatform(76, 91, floor1);
	createTilesPlatform(106, 119, floor1);

	createTilesPlatform(15, 32, floor2);
	createTilesPlatform(42, 53, floor2);
	createTilesPlatform(64, 75, floor2);
	createTilesPlatform(92, 105, floor2);

	createTilesPlatform(8, 20, floor3);
	createTilesPlatform(54, 63, floor3);
	createTilesPlatform(75, 87, floor3);
	createTilesPlatform(99, 111, floor3);

	createTilesBlackBlock(15, 32, floor2)
	createTilesBlackBlock(42, 53, floor2)
	createTilesBlackBlock(63, 75, floor2)
	createTilesBlackBlock(92, 105, floor2)

	createTilesBlackBlock(54, 63, floor3)
}



const start = () => {
	addbackgroundImages();
	buildLevel();
	lifeCycle();
	addHearts();
	updateHearts();
}


start();








