import _ from 'jquery';
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
	for (var i = 0; i < 9; i++) {
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

//This is what matters

function main() {
	var c, ctx;
	var opacity = 1.0;
	var points = [];
	var flagText = true;
	var flag = true;
	var width = 110;
	var innerText = ["Node.js", "jQuery", "HTML5", "CSS3", "VBS", "{ C }", "SQL"];
	var indexText = 0;
	var numOfPoints = 1;
	var testCases = 1;
	var counter = 0;
	var color = [255, 255, 255];
	var angle = new Vector3(0, 0, 0);
	var requestID;
	var angleSpeed = new Vector3(Math.random() * 0.009 - 0.012, Math.random() * 0.009 - 0.012, Math.random() * 0.009 - 0.012);
	c = document.getElementById("canvas");
	c.width = 295;
	c.height = 295;
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
					testCases++;
					points.push(buf[currentHighest]);
				}

				var loopUp = setTimeout(function () {
					if (counter < 15) {
						counter++;
						/*ctx.fillStyle = "rgb(" + 235 + "," + 235 + "," + 235 + ")";*/
						letsDance();
					}
					else {
						flag = false;
						clearTimeout(loopUp);
						letsDance();
					}
				}, 1000);
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
					testCases--;
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

				}, 1000);
			}
			else {

				clearTimeout(loopDots);
			}

		}, 1000);
	}

	function loop() {
		render();
		update();
	    requestID = window.requestAnimationFrame(loop);
	}

	function update() {
		angle.add(angleSpeed);
	}

	function render() {
		var rotation1 = Matrix3.rotate(angle.x, 1, 0, 0);
		var rotation2 = Matrix3.rotate(angle.y, 0, 1, 0);
		var rotation3 = Matrix3.rotate(angle.z, 0, 0, 1);
		var rotation = rotation1.multiplyMatrix(rotation2.multiplyMatrix(rotation3));
		var lengthArr = innerText.length;
		ctx.clearRect(35, 35, 225, 225);
		ctx.font = "58px sketch";
		ctx.textAlign = "center";
		ctx.strokeStyle = "rgba(" + 245 + "," + 245 + "," + 245 + "," + opacity + ")";
		ctx.textBaseline = "middle";
		ctx.strokeText(innerText[indexText], canvas.width / 2, canvas.height / 2);
        ctx.beginPath();
         for (var p of points) {
         p = rotation.multiplyVector(p);
         const x = p.x + c.width / 2;
         const y = p.y + c.height / 2;
         ctx.moveTo(x + 2, y)
         ctx.arc(x, y, 2, 0, 2 * Math.PI);
         }
        ctx.fill();

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
	$('.menu__about,.menu__work,.menu__contact').click(function () {
	cancelAnimationFrame(requestID);
});
	$('.menu__home').click(function () {
    main();
	});
}

main();
	