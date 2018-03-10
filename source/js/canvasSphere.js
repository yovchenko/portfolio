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
	let c,
		ctx,
		points = [],
		flag = true,
		width = 108,
		numOfPoints = 1,
		testCases = 1,
		counter = 0,
		angle = new Vector3(0, 0, 0),
		requestID,
		angleSpeed = new Vector3(Math.random() * 0.009 - 0.012, Math.random() * 0.009 - 0.012, Math.random() * 0.009 - 0.012);
	c = document.getElementById("canvas");
	c.width = 295;
	c.height = 295;
	ctx = c.getContext('2d');
	render(ctx);

	function letsDance() {
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
			const x = p.x + c.width / 2;
			const y = p.y + c.height / 2;
			ctx.moveTo(x + 2, y);
			ctx.lineTo(x + 2, y);
			ctx.stroke();
			ctx.arc(x, y, 2, 0, 2 * Math.PI);
		}
		ctx.fill();
	}
	loop();
	letsDance();
	offsetMe();
	setTimeout(function () {
		$(document.getElementsByClassName('text-animation')[0]).addClass("text");
	}, 100);
	$(document.getElementsByClassName('menu__about')[0]).add(document.getElementsByClassName('menu__work'))
		.add(document.getElementsByClassName('menu__contact')).click(function (e) {
			e.preventDefault();
			$(document.getElementsByClassName('text-animation')[0]).removeClass("text");
			cancelAnimationFrame(requestID);
		});
}

let a,
	len,
	elem,
	part,
	partElem,
	charParts;
charParts = ["d-1", "d-2", "e-1", "e-2", "s-1", "i-1", "i-2", "g-1", "g-2", "n-1", "n-2"];
partElem = document.getElementsByClassName('motion')[0];
for (a = 0, len = charParts.length; a < len; a++) {
	part = charParts[a];
	elem = document.getElementsByClassName('text-animation')[0];
	$(elem.firstChild).append($(partElem).clone().attr("class", part));
}

a = elem = part = partElem = null;

let b,
requestAnimID,
offset = 0;
const offsetMe = function() {
for (b = 0; b < len; b++) {
	let el = document.getElementsByClassName(charParts[b])[0];
	switch(charParts[b]) {
		case 'd-1' :
		   if(offset >= -149) {
			el.style.strokeDashoffset = offset;
		   }
		   break;
		case 'd-2' : 
		   if(offset >= -201) {
		   el.style.strokeDashoffset = offset;
		   }
		   break;
		case 'e-1'	:
			if(offset >= -377) {
			el.style.strokeDashoffset = offset;
		   }
		   break;
		case 'e-2'	:
		   if(offset >= -431) {
			el.style.strokeDashoffset = offset;
		   }
		   break;
		case 's-1'	:
		   if(offset >= -526) {
		    el.style.strokeDashoffset = offset;
		   }
		   break;
		case 'i-1'	:
		   if(offset >= -631) {
		    el.style.strokeDashoffset = offset;
		   }
		   break;
		case 'i-2'	:
		   if(offset >= -637) {
		    el.style.strokeDashoffset = offset;
		   }
		   break;
	   case 'g-1'	:
		   if(offset >= -732.5) {
			el.style.strokeDashoffset = offset;
		   }
		   break;
	   case 'g-2'	:
		   if(offset >= -812) {
		    el.style.strokeDashoffset = offset;
		   }
		   break;
	   case 'n-1'	:
		   if(offset >= -941) {
			el.style.strokeDashoffset = offset;
		   }
		   break;
	   case 'n-2'	:
		   if(offset >= -1013) {
			el.style.strokeDashoffset = offset;
		   }
		   break;
	   	}
	  }
	  offset--;
	  requestAnimID = requestAnimationFrame(offsetMe);
	  if(offset < -1013) cancelAnimationFrame(requestAnimID);
}


$(document.getElementsByClassName('text-animation')[0]).click(function (e) {
	e.preventDefault();
	$(this).toggleClass("text");
});
