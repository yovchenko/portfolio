//I concatenated the Math classes with the original game file
//so the example can run, this part is irrelevant, please, 
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
		this.add(vec.negate);
	}
	return this;
}

Vector3.prototype.negate = function () {
	this.multiply(-1);
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

Vector3.cross = function (vec1, vec2) {
	if (vec1 instanceof Vector3 && vec2 instanceof Vector3) {
		var x = vec1.y * vec2.z - vec1.z * vec2.y;
		var y = vec1.z * vec2.x - vec1.x * vec2.z;
		var z = vec1.x * vec2.y - vec1.y * vec2.x;
		return new Vector3(x, y, z);
	}
}

Vector3.dot = function (vec1, vec2) {
	if (vec1 instanceof Vector3 && vec2 instanceof Vector3) {
		return vec1.x * vec2.x + vec1.y * vec2.y + vec1.z * vec2.z;
	}
}

function Matrix3() {
	this.data = [];
	for (var i = 0; i < 9; i++) {
		this.data[i] = 0;
	}
}

Matrix3.prototype.setIdentity = function () {
	this.data[0 + 0 * 3] = 1;
	this.data[1 + 1 * 3] = 1;
	this.data[2 + 2 * 3] = 1;
}

Matrix3.prototype.add = function (mat) {
	if (mat instanceof Matrix3) {
		for (var i = 0; i < 9; i++) {
			this.data[i] += mat.data[i];
		}
	}
}

Matrix3.prototype.subtract = function (mat) {
	if (mat instanceof Matrix3)
		this.add(mat.negate());
}

Matrix3.prototype.multiplyScalar = function (n) {
	for (var i = 0; i < 9; i++) {
		this.data[i] *= n;
	}
}

Matrix3.prototype.negate = function () {
	this.multiply(-1);
}

Matrix3.prototype.multiplyVector = function (vec) {
	if (vec instanceof Vector3) {
		var x = this.data[0 + 0 * 3] * vec.x + this.data[0 + 1 * 3] * vec.y + this.data[0 + 2 * 3] * vec.z;
		var y = this.data[1 + 0 * 3] * vec.x + this.data[1 + 1 * 3] * vec.y + this.data[1 + 2 * 3] * vec.z;
		var z = this.data[2 + 0 * 3] * vec.x + this.data[2 + 1 * 3] * vec.y + this.data[2 + 2 * 3] * vec.z;

		return new Vector3(x, y, z);
	}
}

Matrix3.prototype.multiplyMatrix = function (mat) {
	if (mat instanceof Matrix3) {
		var result = new Matrix3();
		for (var y = 0; y < 3; y++) {
			for (var x = 0; x < 3; x++) {
				var sum = 0;
				for (var e = 0; e < 3; e++) {
					sum += this.data[e + y * 3] * mat.data[x + e * 3];
				}
				result.data[x + y * 3] = sum;
			}
		}
		return result;
	}
}

Matrix3.prototype.transpose = function () {
	var result = new Matrix3();
	for (var x = 0; x < 3; x++) {
		for (var y = 0; y < 3; y++) {
			result.data[y + x * 3] = this.data[x + y * 3];
		}
	}
	return result;
}

Matrix3.translate = function (vec) {
	var result = new Matrix3();
	result.setIdentity();
	if (vec instanceof Vector2) {
		result.data[2 + 0 * 3] = vec.x;
		result.data[2 + 1 * 3] = vec.y;
	} else if (vec instanceof Vector3) {
		result.data[2 + 0 * 3] = vec.x;
		result.data[2 + 1 * 3] = vec.y;
		result.data[2 + 2 * 3] = vec.z;
	}
	return result;
}

Matrix3.rotate = function (angle, x, y, z) {
	var result = new Matrix3();
	result.setIdentity();

	var cos = Math.cos(angle);
	var sin = Math.sin(angle);
	var omc = 1 - cos;

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

Matrix3.scale = function (vec) {
	var result = new Matrix3();
	result.setIdentity();

	if (vec instanceof Vector3) {
		result.data[0 + 0 * 3] = vec.x;
		result.data[1 + 1 * 3] = vec.y;
		result.data[2 + 2 * 3] = vec.z;

		return result;
	} else if (vec instanceof Vector2) {
		result.data[0 + 0 * 3] = vec.x;
		result.data[1 + 1 * 3] = vec.y;

		return result;
	}
}

//This is what matters

function main() {
	var c, ctx;
	var opacity = 1.0;
	var points = [];
	var flagText = true;
	var flag = true;
	var width = 125;
	var innerText = ["Node.js", "jQuery", "HTML5", "CSS3", "VBS", "{ C }", "SQL"];
	var indexText = 0;
	var numOfPoints = 1;
	var testCases = 15;
	var counter = 0;
	var color = [255, 255, 255];
	var angle = new Vector3(0, 0, 0);
	var angleSpeed = new Vector3(Math.random() * 0.009 - 0.012, Math.random() * 0.009 - 0.012, Math.random() * 0.009 - 0.012);
	c = document.getElementById("canvas");
	c.width = 320;
	c.height = 320;
	ctx = document.getElementById('canvas');
	ctx = c.getContext('2d');
	ctx.fillStyle = 'rgb(255,255,255)';
	render(ctx);
	function letsDance() {
		var loopDots = setTimeout(function () {
			if (flag == true) {
				for (var i = 0; i < numOfPoints; i++) {
					var buf = [];
					for (var j = 0; j < testCases; j++) {
						var v = new Vector3(Math.random() * 4 - 2, Math.random() * 4 - 2, Math.random() * 4 - 2);
						v.normalize().multiply(width);
						buf.push(v);
					}
					var currentSum = 0;
					var currentHighest = 0;

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
					points.push(buf[currentHighest]);
				}

				var loopUp = setTimeout(function () {
					var randomColor;
					var colorNum = 0;
					if (counter < 15) {
						counter++;
						color[colorNum] -= randomColor;
						ctx.fillStyle = "rgb(" + 235 + "," + 235 + "," + 235 + ")";
						letsDance();
					}
					else {
						flag = false;
						clearTimeout(loopUp);
						letsDance();
					}
				}, 500);
			}

			else if (flag == false) {
				for (var i = 0; i < numOfPoints; i++) {
					var buf = [];
					for (var j = 0; j < testCases; j++) {
						var v = new Vector3(Math.random() * 4 - 2, Math.random() * 4 - 2, Math.random() * 4 - 2);
						v.normalize().multiply(width);
						buf.push(v);
					}
					var currentSum = 0;
					var currentHighest = 0;

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
					points.pop(buf[currentHighest]);
				}
				var loopDown = setTimeout(function () {
					var randomColor;
					var colorNum = 0;
					if (counter > 0) {
						counter--;
						flag = false;
						letsDance();
					}
					else {
						flag = true;
						clearTimeout(loopDown);
						letsDance();
					}

				}, 500);
			}
			else {

				clearTimeout(loopDots);
			}

		}, 1000);
	}

	function loop() {
		render();
		window.requestAnimationFrame(loop);
	}

	function update() {
		angle.add(angleSpeed);
	}

	function render() {
		update();
		var rotation1 = Matrix3.rotate(angle.x, 1, 0, 0);
		var rotation2 = Matrix3.rotate(angle.y, 0, 1, 0);
		var rotation3 = Matrix3.rotate(angle.z, 0, 0, 1);
		var rotation = rotation1.multiplyMatrix(rotation2.multiplyMatrix(rotation3));
		var lengthArr = innerText.length;
		ctx.clearRect(23, 23, 265, 265);
		ctx.font = "65px mainFont";
		ctx.textAlign = "center";
		ctx.strokeStyle = "rgba(" + 255 + "," + 255 + "," + 255 + "," + opacity + ")";
		ctx.textBaseline = "middle";
		ctx.strokeText(innerText[indexText], canvas.width / 2, canvas.height / 2);

		for (var p of points) {
			p = rotation.multiplyVector(p);
			ctx.beginPath();
			ctx.arc(p.x + c.width / 2, p.y + c.height / 2, 2, 0, 2 * Math.PI);
			ctx.closePath();
			ctx.fill();
		}


		if (opacity > 0.005 && flagText == true) {
			opacity -= 0.005;
			if (opacity < 0.005 && indexText < lengthArr - 1) {
				indexText++;
				flagText = false;
			}
			else if (opacity < 0.005 && indexText === lengthArr - 1) {
				indexText = 0;
			}

			else {
				flagText = true;
			}
		}
		else if (opacity < 0.95 || (opacity < 0.01 && flagText == false)) {
			opacity += 0.005;
			flagText = false;
		}
		else {
			flagText = true;
		}
	}
	loop();
	letsDance();
}

setTimeout(main, 2500)
