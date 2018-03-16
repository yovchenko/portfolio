import _ from 'jquery';
//scroll down, until you reach the main() function
function Vector3(x, y, z) {
	this.x = x;
	this.y = y;
	this.z = z;
}

Vector3.prototype.mag = function () {
	return Math.sqrt(this.x * this.x + this.y * this.y + this.z * this.z);
}

Vector3.prototype.distance = function (vec) {
	if (vec instanceof Vector3)
		return Math.sqrt((this.x - vec.x) * (this.x - vec.x) + (this.y - vec.y) * (this.y - vec.y) + (this.z - vec.z) * (this.z - vec.z));
}

Vector3.prototype.add = function (vec) {
	if (vec instanceof Vector3) {
		this.x += vec.x;
		this.y += vec.y;
		this.z += vec.z;
	}
	return this;
}

Vector3.prototype.subtract = function (vec) {
	if (vec instanceof Vector3) {
		this.x -= vec.x;
		this.y -= vec.y;
		this.z -= vec.z;
	}
	return this;
}

Vector3.prototype.multiply = function (n) {
	this.x *= n;
	this.y *= n;
	this.z *= n;
	return this;
}

Vector3.prototype.divide = function (n) {
	if (n != 0) {
		this.multiply(1 / n);
	}
	return this;
}

Vector3.prototype.normalize = function () {
	this.divide(this.mag());
	return this;
}

function Matrix3() {
	this.data = [];
	for (let i = 0; i < 9; i++) {
		this.data[i] = 0;
	}
}

Matrix3.prototype.setIdentity = function () {
	this.data[0 + 0 * 3] = 1;
	this.data[1 + 1 * 3] = 1;
	this.data[2 + 2 * 3] = 1;
}

Matrix3.prototype.multiplyVector = function (vec) {
	if (vec instanceof Vector3) {
		let x = this.data[0 + 0 * 3] * vec.x + this.data[0 + 1 * 3] * vec.y + this.data[0 + 2 * 3] * vec.z;
		let y = this.data[1 + 0 * 3] * vec.x + this.data[1 + 1 * 3] * vec.y + this.data[1 + 2 * 3] * vec.z;
		let z = this.data[2 + 0 * 3] * vec.x + this.data[2 + 1 * 3] * vec.y + this.data[2 + 2 * 3] * vec.z;

		return new Vector3(x, y, z);
	}
}

Matrix3.prototype.multiplyMatrix = function (mat) {
	if (mat instanceof Matrix3) {
		let result = new Matrix3();
		for (let y = 0; y < 3; y++) {
			for (let x = 0; x < 3; x++) {
				let sum = 0;
				for (let e = 0; e < 3; e++) {
					sum += this.data[e + y * 3] * mat.data[x + e * 3];
				}
				result.data[x + y * 3] = sum;
			}
		}
		return result;
	}
}

Matrix3.rotate = function (angle, x, y, z) {
	let result = new Matrix3();
	result.setIdentity();

	let cos = Math.cos(angle);
	let sin = Math.sin(angle);
	let omc = 1 - cos;

	result.data[0 + 0 * 3] = x * omc + cos;
	result.data[1 + 0 * 3] = y * x * omc + z * sin;
	result.data[2 + 0 * 3] = x * z * omc - y * sin;

	result.data[0 + 1 * 3] = x * y * omc - z * sin;
	result.data[1 + 1 * 3] = y * omc + cos;
	result.data[2 + 1 * 3] = y * z * omc + x * sin;

	result.data[0 + 2 * 3] = x * z * omc + y * sin;
	result.data[1 + 2 * 3] = y * z * omc - x * sin;
	result.data[2 + 2 * 3] = z * omc + cos;

	return result;
}

//This is what matters
export default function mainCanvas() {
	const displayFPS = document.getElementsByClassName('fps')[0];
	let ctx,
		canvas,
		table,
		phone,
		points = [],
		flag = true,
		width = 108,
		numOfPoints = 1,
		testCases = 1,
		counter = 0,
		pointsSize = 2,
		angle = new Vector3(0, 0, 0),
		requestID,
		showSvgText,
		requestTextAnimID,
		angleSpeed = new Vector3(Math.random() * 0.009 - 0.012, Math.random() * 0.009 - 0.012, Math.random() * 0.009 - 0.012);
	canvas = document.getElementById("canvas");
	canvas.width = 295;
	canvas.height = 295;
	ctx = canvas.getContext('2d');
	render(ctx);

	function letsDance() {
		let media = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
		if(media < 767 && media > 577) pointsSize = 3;
		else if (media < 576) pointsSize = 4;
		else pointsSize = 2;
		let loopDots = setTimeout(function () {
			if (flag === true) {
				for (let i = 0; i < numOfPoints; i++) {
					let buf = [];
					for (let j = 0; j < testCases; j++) {
						let v = new Vector3(Math.random() * 4 - 2, Math.random() * 4 - 2, Math.random() * 4 - 2);
						v.normalize().multiply(width);
						buf.push(v);
					}
					let currentSum = 0;
					let currentHighest = 0;

					for (var k = 0; k < testCases; k++) {
						var sum = 0;
						var p = buf[k];
						for (var l of points) {
							sum += p.distance(l);
						}
						if (sum > currentSum) {
							currentSum = sum;
							currentHighest = k;
						}
					}
					testCases++;
					points.push(buf[currentHighest]);
				}
				if (counter < 15) {
					counter++;
				} else flag = false;
				letsDance();
			} else if (flag === false) {
				for (let i = 0; i < numOfPoints; i++) {
					let buf = [];
					for (let j = 0; j < testCases; j++) {
						let v = new Vector3(Math.random() * 4 - 2, Math.random() * 4 - 2, Math.random() * 4 - 2);
						v.normalize().multiply(width);
						buf.push(v);
					}
					let currentSum = 0;
					let currentHighest = 0;

					for (let k = 0; k < testCases; k++) {
						let sum = 0;
						let p = buf[k];
						for (var l of points) {
							sum += p.distance(l);
						}
						if (sum > currentSum) {
							currentSum = sum;
							currentHighest = k;
						}
					}
					testCases--;
					points.pop(buf[currentHighest]);
				}
				if (counter > 0) {
					counter--;
					flag = false;
				} else flag = true;
				letsDance();
			} else {
				clearTimeout(loopDots);
			}

		}, 1000);
		loopDots = null;
	}

	let countFPS = (function () {
		let lastLoop = (new Date()).getMilliseconds();
		let count = 1;
		let fps = 0;
		return function () {
			let currentLoop = (new Date()).getMilliseconds();
			if (lastLoop > currentLoop) {
				fps = count;
				count = 1;
			} else {
				count += 1;
			}
			lastLoop = currentLoop;
			return fps;
		};
	}());

	function loop() {
		render();
		update();
		displayFPS.innerHTML = countFPS() + ' fps';
		requestID = window.requestAnimationFrame(loop);
	}

	function update() {
		angle.add(angleSpeed);
	}

	function render() {
		let rotation1 = Matrix3.rotate(angle.x, 1, 0, 0),
			rotation2 = Matrix3.rotate(angle.y, 0, 1, 0),
			rotation3 = Matrix3.rotate(angle.z, 0, 0, 1),
			rotation = rotation1.multiplyMatrix(rotation2.multiplyMatrix(rotation3));
		ctx.clearRect(35, 35, 225, 225);
		ctx.fillStyle = "#333";
		ctx.beginPath();
		for (var p of points) {
			p = rotation.multiplyVector(p);
			const x = p.x + canvas.width / 2;
			const y = p.y + canvas.height / 2;
			ctx.moveTo(x + 2, y);
			ctx.lineTo(x + 2, y);
			ctx.stroke();
			ctx.arc(x, y, pointsSize, 0, pointsSize * Math.PI);
		}
		ctx.fill();
	}
	loop();
	letsDance();
	setTimeout(function () {
		let b,
			offset = 0;
		showSvgText = function () {
			for (b = 0; b < len; b++) {
				let el = document.getElementsByClassName(charParts[b])[0];
				switch (charParts[b]) {
					case 'd-1':
						if (offset >= -151) {
							el.style.strokeDashoffset = offset - 1.5;
						}
						break;
					case 'd-2':
						if (offset >= -203) {
							el.style.strokeDashoffset = offset - 1.5;
							if(offset === -200) document.getElementsByClassName('text-'+letters[0])[0].className += ' is-visible';
						}
						break;
					case 'e-1':
						if (offset >= -355) {
							el.style.strokeDashoffset = offset - 1;
						}
						break;
					case 'e-2':
						if (offset >= -367) {
							el.style.strokeDashoffset = offset;
							if(offset === -364) document.getElementsByClassName('text-'+letters[1])[0].className += ' is-visible';
						}
						break;
					case 's-1':
						if (offset >= -471) {
							el.style.strokeDashoffset = offset - 0.5;
							if(offset === -468) document.getElementsByClassName('text-'+letters[2])[0].className += ' is-visible';
						}
						break;
					case 'i-1':
						if (offset >= -548) {
							el.style.strokeDashoffset = offset;
						}
						break;
					case 'i-2':
						if (offset >= -552) {
							el.style.strokeDashoffset = offset - 1;
							if(offset === -552) document.getElementsByClassName('text-'+letters[3])[0].className += ' is-visible';
						}
						break;
					case 'g-1':
						if (offset >= -613) {
							el.style.strokeDashoffset = offset;
						}
						break;
					case 'g-2':
						if (offset >= -704) {
							el.style.strokeDashoffset = offset - 0.5;
							if(offset === -704) document.getElementsByClassName('text-'+letters[4])[0].className += ' is-visible';
						}
						break;
					case 'n-1':
						if (offset >= -792) {
							el.style.strokeDashoffset = offset;
						}
						break;
					case 'n-2':
						if (offset >= -868) {
							el.style.strokeDashoffset = offset + 1.5;
							if(offset === -868) document.getElementsByClassName('text-'+letters[5])[0].className += ' is-visible';
						}
						break;
					default: 
							cancelAnimationFrame(requestTextAnimID);
						break;
				}
			
			}
			offset -= 4;
			requestTextAnimID = requestAnimationFrame(showSvgText);
			if (offset < -870) {
				cancelAnimationFrame(requestTextAnimID);
			}
		}
		showSvgText();
	}, 100);
	$(document.getElementsByClassName('menu__about')[0]).add(document.getElementsByClassName('menu__work'))
		.add(document.getElementsByClassName('menu__contact')).click(function (e) {
			e.preventDefault();
			cancelAnimationFrame(requestID);
			cancelAnimationFrame(requestTextAnimID);
			setTimeout(function(){
				let c,
				len = letters.length;
				for(c = 0; c < len; c++) {
					document.getElementsByClassName('text-'+letters[c])[0].className = 'text-'+letters[c];
				}
			},1000);
		});
}

let a,
	len,
	elem,
	part,
	partElem,
	letters,
	charParts;
charParts = ["d-1", "d-2", "e-1", "e-2", "s-1", "i-1", "i-2", "g-1", "g-2", "n-1", "n-2"];
letters = ["d","e","s","i","g","n"];
partElem = document.getElementsByClassName('motion')[0];
for (a = 0, len = charParts.length; a < len; a++) {
	part = charParts[a];
	elem = document.getElementsByClassName('text-animation')[0];
	$(elem.firstChild).append($(partElem).clone().attr("class", part));
}

a = elem = part = partElem = null; //gifts for Garbage collectors

