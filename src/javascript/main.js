const canvas = document.getElementById("oh-no-not-a-canvas");
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

function chapeaux(length, depth) {
    if (depth > 1) {
        chapeaux(length / 3, depth - 1);
        rotate(-60);
        chapeaux(length / 3, depth - 1);
        rotate(120);
        chapeaux(length / 3, depth - 1);
        rotate(300);
        chapeaux(length / 3, depth - 1);
    }
    if (depth === 1) {
        drawLine(length / 3);
    }
}

(() => {
    context.lineWidth = 2;
    
    for (let i = 0; i < 3; i++) {
        chapeaux(canvas.width * 2, 5);
        rotate(120);
    }
})();
