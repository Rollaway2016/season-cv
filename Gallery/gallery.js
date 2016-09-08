window.onload = function() {
	addPhotos();
};

// 输出图片模板
function addPhotos() {
	var wrap = document.getElementById('wrap');
	var template = wrap.innerHTML;
	var html = [];
	for ( var s in data){
		var _html = template.replace('{{index}}', s)
		.replace('{{img}}', 'image/' + data[s].img)
		.replace(/{{caption}}/g, data[s].caption)
		.replace('{{desc}}', data[s].desc);
		html.push(_html);
	}
	wrap.innerHTML = html.join('');
	rsort(randomInt(0,data.length-1));
}

// 排列图片
function rsort(n) {
	// 删除所有center,back,left,right,transform样式
	var photos = [];
	var _photo = document.getElementsByClassName('photo');
	for (var s = 0, l = _photo.length; s < l; s++) {
		_photo[s].className = _photo[s].className.replace(/\s?photo-center/, '');
		_photo[s].className = _photo[s].className.replace(/\s?photo-back/, '');
		_photo[s].style.left = '';
		_photo[s].style.top= '';
		_photo[s].style.webkitTransform = '';
		photos.push(_photo[s]);
	}
	// 当前选中添加center样式
	var photoCenter = document.getElementById('photo'+n);
	photoCenter.className += ' photo-center';
	// 数组中删除当前center图片
	photos.splice(n, 1);
	//左右分布排序
	var photosLeft = photos.splice(0, Math.floor(photos.length / 2));
	var photosRight = photos;
	for (var x in photosLeft) {
		var photoL = photosLeft[x];
		photoL.style.left = randomInt(getRange().left.xmin, getRange().left.xmax) + 'px';
		photoL.style.top = randomInt(getRange().left.ymin, getRange().left.ymax) + 'px';
		photoL.style['webkitTransform'] = 'rotate(' + randomInt(-60, 60) + 'deg)';
	}
	for (var y in photosRight) {
		var photoR = photosRight[y];
		photoR.style.left = randomInt(getRange().right.xmin, getRange().right.xmax) + 'px';
		photoR.style.top = randomInt(getRange().right.ymin, getRange().right.ymax) + 'px';
		photoR.style['webkitTransform'] = 'rotate(' + randomInt(-60, 60) + 'deg)';
	}
}

// 获得左右分区的范围
function getRange() {
	var wrap = document.getElementById('wrap');
	var photo = document.getElementsByClassName('photo')[0];
	var range = {
		left: {
			xmin: 0,
			xmax: wrap.clientWidth / 2 - 2 * photo.clientWidth,
			ymin: 0,
			ymax: wrap.clientHeight - photo.clientHeight
		},
		right: {
			xmin: wrap.clientWidth / 2 + photo.clientWidth,
			xmax: wrap.clientWidth - photo.clientWidth,
			ymin: 0,
			ymax: wrap.clientHeight - photo.clientHeight
		}
	};
	return range;
}

//3D翻转页面
function turn(ele) {
	var cls = ele.className;
	if (/photo-center/.test(cls)) {
		cls = (/photo-front/.test(cls)) ? cls.replace(/photo-front/, 'photo-back') : cls.replace(/photo-back/, 'photo-front');
		ele.className = cls;
	}
	else {
		var n = ele.id.split('oto')[1];
		rsort(n);
	}
}

// 生成随机整数
function randomInt(min, max) {
	var output = Math.floor(Math.random()*(max-min+1)+min);
	return output;
}

// 图片模板
var data = [
{
	img: '小青.jpg',
	caption: '小青卡片',
	desc: 'LUK-5。根据提炼度增加LUK和潜能发挥率。但致命一击概率的增加只到提炼度+10为止。'
},
{
	img: '贝雷杰.jpg',
	caption: '贝雷杰卡片',
	desc: '使用技能时，变动施展时间减少30%。'
},
{
	img: '冰波利.jpg',
	caption: '冰波利卡片',
	desc: '每当打死魔物时，有一定的机率会掉落杰勒比结晶或是巨大杰勒比结晶。'
},
{
	img: '狂暴小恶魔.jpg',
	caption: '狂暴小恶魔卡片',
	desc: '每当打死动物系魔物时，所得到的经验值增加10%，从动物系魔物受到的伤害力，增加20%。'
},
{
	img: '米洛斯.jpg',
	caption: '米洛斯卡片',
	desc: '对大型魔物增加15%的伤害度。ATK+5。'
},
{
	img: '南瓜魂.jpg',
	caption: '南瓜魂卡片',
	desc: '当初学者或是超级初学者装备时，受到物理伤害力时，有20%的机率施展自动念咒、霸体1技能。万圣魔卡片一起装备时，MAXHP+300。'
},
{
	img: '群叶猫.jpg',
	caption: '群叶猫卡片',
	desc: '每当打死鱼贝系魔物时，有一定的机率得到水灵矿石。对水属性攻击时，抵抗力减少10%。'
},
{
	img: '人鱼士兵.jpg',
	caption: '人鱼士兵卡片',
	desc: 'HP恢复力上升10%，SP恢复力上升10%。玩具士兵、虎蜥人、鳄鱼人、刺尾蜻蜓卡片一起装备时，远距离物理攻击时，伤害力增加20%。'
},
{
	img: '妖道.jpg',
	caption: '妖道卡片',
	desc: '物理攻击时，有一定的机率自动念咒、狂击1技能。当使用狂击技能时，让敌人退移5格。从僵尸受到的伤害力，增加100%。'
},
{
	img: '直升机哥布林.jpg',
	caption: '直升机哥布林卡片',
	desc: '用必杀攻击攻击时，伤害力增加10%。给予鱼贝系魔物，必杀攻击+7。'
},
{
	img: '摇滚蝗虫.jpg',
	caption: '摇滚蝗虫卡片',
	desc: 'DEX+1 ATK+5。'
},
{
	img: '狐仙.jpg',
	caption: '狐仙卡片',
	desc: '对念属性增加20%的伤害力。'
}
];