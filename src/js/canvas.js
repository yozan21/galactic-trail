import utils from "./utils";

const canvas = document.querySelector("canvas");
const c = canvas.getContext("2d");

canvas.width = innerWidth;
canvas.height = innerHeight;

const mouse = {
  x: innerWidth / 2,
  y: innerHeight / 2,
};

const colors = ["#2185C5", "#7ECEFD", "#FFFf", "#FF7F66"];
let mouseDown = false;

// Event Listeners
addEventListener("resize", () => {
  canvas.width = innerWidth;
  canvas.height = innerHeight;

  init();
});
addEventListener("mousedown", () => {
  mouseDown = true;
});
addEventListener("mouseup", () => {
  mouseDown = false;
  mouseDown = false;
});
// Objects
class Particle {
  constructor(x, y, radius, color) {
    this.x = x;
    this.y = y;
    this.radius = radius;
    this.color = color;
  }

  draw() {
    c.beginPath();
    c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
    c.shadowColor = this.color;
    c.shadowBlur = 15;
    c.fillStyle = this.color;
    c.fill();
    c.closePath();
  }

  update() {
    this.draw();
  }
}

// Implementation
let particles;
function init() {
  particles = [];

  for (let i = 0; i < 400; i++) {
    const canvasWidth = canvas.width + 300;
    const canvasHeight = canvas.height + 300;
    const x = Math.random() * canvasWidth - canvasWidth / 2;
    const y = Math.random() * canvasWidth - canvasWidth / 2;
    const r = Math.random() * 2;
    const color = colors[Math.floor(Math.random() * colors.length)];
    particles.push(new Particle(x, y, r, color));
  }
}

// Animation Loop
let radians = 0;
let alpha = 1;
let increment = 0.0015;
function animate() {
  requestAnimationFrame(animate);
  c.fillStyle = `rgba(10,10,10,${alpha})`;
  c.fillRect(0, 0, canvas.width, canvas.height);

  c.save();
  c.translate(canvas.width / 2, canvas.height / 2);
  c.rotate(radians);
  particles.forEach((particle) => {
    particle.update();
  });
  c.restore();
  radians += increment;

  if (mouseDown && alpha >= 0.03) {
    alpha -= 0.01;
    if (increment <= 0.008) increment += 0.0001;
  } else if (!mouseDown && alpha < 1) {
    alpha += 0.01;
    if (increment > 0.002) increment -= 0.0001;
  }
}

init();
animate();
