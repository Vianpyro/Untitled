const canvas = document.getElementById("oh-no-not-a-canvas");
const iterations = document.getElementById("iterations-slider");
const context = canvas.getContext('2d');

let pointX = canvas.width / 6;
let pointY = canvas.height / 3.5;
let currentRotation = 0;

function getRandomColor() {
    return `hsl(${Math.floor(Math.random() * 360)}, 100%, 50%)`;
}

function rotate(degrees) {
    currentRotation += degrees;
}

function drawLine(length) {
    const rotation = currentRotation * (Math.PI / 180);
    const newX = pointX + length * Math.cos(rotation);
    const newY = pointY + length * Math.sin(rotation);

    context.strokeStyle = getRandomColor();
    context.beginPath();
    context.moveTo(pointX, pointY);
    context.lineTo(newX, newY);
    context.stroke();

    pointX = newX;
    pointY = newY;
}

function drawKochSnowflake(length, depth) {
    if (depth > 1) {
        drawKochSnowflake(length / 3, depth - 1);
        rotate(-60);
        drawKochSnowflake(length / 3, depth - 1);
        rotate(120);
        drawKochSnowflake(length / 3, depth - 1);
        rotate(-60);
        drawKochSnowflake(length / 3, depth - 1);
    }
    if (depth === 1) {
        drawLine(length / 3);
    }
}

function updateCanvas(canvas, context, iterations) {
    context.lineWidth = canvas.width / (25 * iterations + 50);

    for (let i = 0; i < 3; i++) {
        drawKochSnowflake(canvas.width * 2, iterations);
        rotate(120);
    }
}

iterations.addEventListener("input", () => {
    context.clearRect(0, 0, canvas.width, canvas.height);
    updateCanvas(canvas, context, iterations.value);
});

updateCanvas(canvas, context, iterations.value);
