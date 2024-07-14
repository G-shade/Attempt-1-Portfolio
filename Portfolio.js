document.addEventListener('DOMContentLoaded', () => {
    const navLinks = document.querySelectorAll('nav ul li a');
    
    navLinks.forEach(link => {
        link.addEventListener('click', smoothScroll);
    });
});

function smoothScroll(event) {
    event.preventDefault();
    const targetId = event.currentTarget.getAttribute('href').substring(1);
    const targetPosition = document.getElementById(targetId).offsetTop;
    window.scrollTo ( {
        top: targetPosition -50,behavior: 'smooth'
    } );
}

// Background Raindrop Effect
const canvas = document.getElementById('rainCanvas');
const ctx = canvas.getContext('2d');

let width, height;
let raindrops = [];

function resize() {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
}

const colors = [
    'rgba(0, 255, 0, 0.5)',     // Green
    'rgba(0, 0, 255, 0.5)',     // Blue
    'rgba(255, 255, 0, 1)',     //Yellow
    'rgba(173, 255, 47, 1)'     //Greenyellow     
];

class Raindrop {
    constructor() {
        this.x = Math.random() * width;
        this.y = Math.random() * height;
        this.length = Math.random() * 20 + 10;
        this.speed = Math.random() * 5 + 2;
        this.color = colors[Math.floor(Math.random() * colors.length)]; // Random color from the array
    }

    update() {
        this.y += this.speed;
        if (this.y > height) {
            this.y = -this.length;
            this.x = Math.random() * width;
        }
    }

    draw() {
        ctx.strokeStyle = this.color;
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(this.x, this.y);
        ctx.lineTo(this.x, this.y + this.length);
        ctx.stroke();
    }
}

function createRaindrops(num) {
    raindrops = []; // Reset the array
    for (let i = 0; i < num; i++) {
        raindrops.push(new Raindrop());
    }
}

function update() {
    raindrops.forEach(raindrop => raindrop.update());
}

function draw() {
    ctx.clearRect(0, 0, width, height);
    raindrops.forEach(raindrop => raindrop.draw());
}

function animate() {
    update();
    draw();
    requestAnimationFrame(animate);
}

window.addEventListener('resize', () => {
    resize();
    createRaindrops(100);
});

resize();
createRaindrops(100);
animate();