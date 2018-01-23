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
export default function main() {
	const innerText = ["NodeJS", "Webpack", "jQuery", "HTML5", "SCSS", "VBS", "SQL"];
	const len = innerText.length;
	const displayFPS = document.getElementsByClassName('fps')[0];
	let c, 
	ctx,
	fpsSpeed,
	increment = 0.01,
	points = [],
	flag = true,
	opacity = 0.05,
	width = 110,
	numOfPoints = 1,
	testCases = 1,
	counter = 0,
	idxText = 0,
	angle = new Vector3(0, 0, 0),
	requestID,
	angleSpeed = new Vector3(Math.random() * 0.009 - 0.012, Math.random() * 0.009 - 0.012, Math.random() * 0.009 - 0.012);
	c = document.getElementById("canvas");
	c.width = 295;
	c.height = 295;
	ctx = c.getContext('2d');
	ctx.fillStyle = 'rgb(255,255,255)';
	render(ctx);

	function letsDance() {
		let loopDots = setTimeout(function () {
			if (flag == true) {
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

				var loopUp = setTimeout(function () {
					if (counter < 15) {
						counter++;
						letsDance();
					} else {
						flag = false;
						clearTimeout(loopUp);
						letsDance();
					}
				}, 1000);
			} else if (flag == false) {
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
				let loopDown = setTimeout(function () {
					if (counter > 0) {
						counter--;
						flag = false;
						letsDance();
					} else {
						flag = true;
						clearTimeout(loopDown);
						letsDance();
					}

				}, 1000);
			} else {
				clearTimeout(loopDots);
			}

		}, 1000);
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
		fpsSpeed = countFPS();
		displayFPS.innerHTML = fpsSpeed + ' fps';
		requestID = window.requestAnimationFrame(loop);
	}

	function update() {
		angle.add(angleSpeed);
	}

	function render() {
		let rotation1 = Matrix3.rotate(angle.x, 1, 0, 0),
		rotation2 = Matrix3.rotate(angle.y, 0, 1, 0),
		rotation3 = Matrix3.rotate(angle.z, 0, 0, 1),
		rotation = rotation1.multiplyMatrix(rotation2.multiplyMatrix(rotation3)),
		lengthArr = innerText.length;
		ctx.clearRect(35, 35, 225, 225);
		ctx.font = "52px sketch";
		ctx.textAlign = "center";
		ctx.strokeStyle = "rgba(" + 245 + "," + 245 + "," + 245 + "," + opacity + ")";
		ctx.textBaseline = "middle";
		ctx.strokeText(innerText[idxText], canvas.width / 2, canvas.height / 2);
		ctx.beginPath();
		for (var p of points) {
			p = rotation.multiplyVector(p);
			const x = p.x + c.width / 2;
			const y = p.y + c.height / 2;
			ctx.moveTo(x + 2, y)
			ctx.arc(x, y, 2, 0, 2 * Math.PI);
		}
		ctx.fill();
		
		opacity += increment;
		if (opacity.toFixed(1) === '1.0' || opacity.toFixed(1) === '0.0') {
			if (opacity.toFixed(1) === '0.0' && idxText !== len - 1) {
				idxText++;
			}
			else if (opacity.toFixed(1) === '0.0' && idxText === len - 1) {
				idxText = 0;
			}
		increment = -increment;
		}

	}
	loop();
	letsDance();
	$(document.getElementsByClassName('menu__about')[0]).add(document.getElementsByClassName('menu__work'))
	.add(document.getElementsByClassName('menu__contact')).click(function (e) {
		cancelAnimationFrame(requestID);
	});
	document.getElementsByClassName('menu__home')[0].onclick = function (e) {
		main();
	}
}
