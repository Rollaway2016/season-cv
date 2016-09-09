
var canvas = document.getElementById('canvas');
canvas.width = 300;
canvas.height = 400;
var context = canvas.getContext('2d');
var image = new Image();
image.src = '../Gallery/image/妖道.jpg';
var radius = 50;
var circle = {x: 0, y: 0, r: radius};
// canvas图片载入完成后绘图到屏幕
image.onload = function (e) {
	randomCircle();
	draw(image, circle);
};
function randomCircle() {
	circle = {
		x: randomInt(radius / 2, canvas.width - radius / 2),
		y: randomInt(radius / 2, canvas.height - radius / 2),
		r: radius
	};
}

function draw(image, circle) {
	context.clearRect(0, 0, canvas.width, canvas.height);
	context.save();
	getClipArea(circle);
	context.drawImage(image, 0, 0);
	context.restore();
}

function getClipArea(circle) {
	context.beginPath();
	context.arc(circle.x, circle.y, circle.r, 0, Math.PI * 2, false);
	context.clip();
}

function reset() {
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
	}, 20)
}

function randomInt(min, max) {
	var output = Math.floor(Math.random()*(max-min+1)+min);
	return output;
}