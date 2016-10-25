
var canvas = document.getElementById('canvas');
canvas.width = 300;
canvas.height = 400;
var context = canvas.getContext('2d');
var image = new Image();
//预设初始图片
image.src = '../Gallery/image/妖道.jpg';
context.drawImage(image, 0, 0);
var card = document.getElementById('card');
var radius = 50;
var circle = {x: 0, y: 0, r: 500};
// canvas图片载入完成后绘图到屏幕
image.onload = function (e) {
	draw(image, circle);
};

function randomCircle() {
	circle = {
		x: randomInt(radius + 10, canvas.width - radius - 10),
		y: randomInt(radius + 10, canvas.height - radius - 10),
		r: radius
	};
}

function draw(image, circle) {
	image.src = card.getAttribute('src');
	context.clearRect(0, 0, canvas.width, canvas.height);
	context.save();
	getClipArea(circle);
	context.drawImage(image, 0, 0);
	context.restore();
}

function getClipArea(circle) {
	context.beginPath();
	context.arc(circle.x, circle.y, circle.r, 0, Math.PI * 2, false);
	context.strokeStyle = "#fff";
	context.lineWidth = 10;
	context.stroke();
	context.clip();
	context.closePath();
}

function reset() {
	var randomCard = data[randomInt(0,data.length-1)];
	var templateCard = '../Gallery/image/妖道.jpg';
	var newCard = templateCard.replace('妖道', randomCard);
	card.setAttribute('src', newCard);
	randomCircle();
	draw(image, circle);
}

function show() {
	var t = setInterval(function () {
		circle.r += 10;
		draw(image, circle);
		if (circle.r >500) {
			clearInterval(t);
		}
	}, 20);
}

function randomInt(min, max) {
	var output = Math.floor(Math.random()*(max-min+1)+min);
	return output;
}

var data = [
'小青',
'贝雷杰',
'冰波利',
'狂暴小恶魔',
'米洛斯',
'南瓜魂',
'群叶猫',
'人鱼士兵',
'妖道',
'直升机哥布林',
'摇滚蝗虫',
'狐仙'
]