const canvas = document.getElementById("mandelbrotCanvas");
const context = canvas.getContext("2d");
const fixedBox = document.getElementById("parameter-wrapper");
const container = document.querySelector("body");
const zoom_inp = document.getElementById("zoom_inp");
const iterations_inp = document.getElementById("iterations_inp");
const centerx_inp = document.getElementById("centerx_inp");
const centery_inp = document.getElementById("centery_inp");
const apply = document.getElementById("apply_settings");

centerx_inp.addEventListener("input", () => {
	centerx_inp.parentElement.children[1].textContent = centerx_inp.value;
});
centery_inp.addEventListener("input", () => {
	centery_inp.parentElement.children[1].textContent = centery_inp.value;
});
zoom_inp.addEventListener("input", () => {
	zoom_inp.parentElement.children[1].textContent = zoom_inp.value;
});
iterations_inp.addEventListener("input", () => {
	iterations_inp.parentElement.children[1].textContent = iterations_inp.value;
});
apply.addEventListener("click", () => {
	zoom = parseInt(zoom_inp.value);
	maxIterations = parseInt(iterations_inp.value, 10);
	centerX = parseInt(centerx_inp.value);
	centerY = parseInt(centery_inp.value);

	console.log(zoom, maxIterations, centerX, centerY);

	drawMandelbrot();
});

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
let width = canvas.width;
let height = canvas.height;

let maxIterations = 1000;
const threshold = 100;

let centerX = -0.5;
let centerY = 0;
let zoom = 500;

// Mandelbrot calculation

function mandelbrot(cReal, cImaginary) {
	let real = 0;
	let imaginary = 0;

	for (let i = 0; i < maxIterations; i++) {
		const nextReal = real * real - imaginary * imaginary + cReal;
		const nextImaginary = 2 * real * imaginary + cImaginary;

		real = nextReal;
		imaginary = nextImaginary;

		if (real * real + imaginary * imaginary > threshold) {
			return i;
		}
	}

	return maxIterations;
}

function getColor(iterations) {
	if (iterations === maxIterations) {
		return "black";
	} else {
		const gradientValue = iterations / maxIterations;
		const hue = 240 * gradientValue;
		return `hsl(${hue}, 100%, 50%)`;
	}
}

function drawMandelbrot() {
	for (let x = 0; x < width; x++) {
		for (let y = 0; y < height; y++) {
			const cReal = (x - width / 2) / zoom + centerX;
			const cImaginary = (y - height / 2) / zoom + centerY;

			const iterations = mandelbrot(cReal, cImaginary, maxIterations);

			// for colored canvas
			const color = getColor(iterations);

			// For only black and white
			//const colorValue = Math.floor(iterations * 255);
			//const color = `rgb(${colorValue}, ${colorValue}, ${colorValue})`;

			context.fillStyle = color;
			context.fillRect(x, y, 1, 1);
		}
	}
}

drawMandelbrot();
