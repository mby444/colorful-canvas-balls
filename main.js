const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");
canvas.width = innerWidth;
canvas.height = innerHeight;

// Generate random RGB color
const randomRGB = () => {
  let red = Math.round(Math.random() * 255);
  let green = Math.round(Math.random() * 255);
  let blue = Math.round(Math.random() * 255);
  return `rgb(${red}, ${green}, ${blue})`;
}

class Ball {
  constructor(x, y, r, a1 = 0, a2 = 2 * Math.PI, color = "#fff"){
    this.x = x;
    this.y = y;
    this.r = r;
    this.startAngle = a1;
    this.endAngle = a2;
    this.color = color;
    this.dx = Math.round(Math.random() * 16 - 8);
    this.dy = Math.round(Math.random() * 16 - 8);
  }
  // Draw the ball
  draw(){
    ctx.beginPath();
    ctx.fillStyle = this.color;
    ctx.arc(this.x, this.y, this.r, this.startAngle, this.endAngle);
    ctx.fill();
    /* Make the ball bouncing */
    this.x <= this.r ? this.dx = Math.abs(this.dx) : 0;
    this.x >= canvas.width - this.r ? this.dx = Math.abs(this.dx) * -1 : 0;
    this.y <= this.r ? this.dy = Math.abs(this.dy) : 0;
    this.y >= canvas.height - this.r ? this.dy = Math.abs(this.dy) * -1 : 0;
    /* -------------------- */
    this.x += this.dx;
    this.y += this.dy;
  }
}

let balls = []; // Array for balls object
let isPlaying = false;

// Creating animation loop
const animate = () => {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  balls.forEach((ball, i) => {
    ball.draw();
  });
  window.requestAnimationFrame(animate);
}

window.addEventListener("load", () => {
  if(!sessionStorage.getItem("visited")){
    swal({
    title: "Hint:",
    text: "Click anywhere to generate balls",
    icon: "info"
  })
    .then((val) => {
      sessionStorage.setItem("visited", true);
    });
  }
});

window.addEventListener("click", (event) => {
  let ball = new Ball(event.clientX, event.clientY, 15);
  ball.color = randomRGB();
  balls.push(ball);
  !isPlaying ? window.requestAnimationFrame(animate) : 0;
  isPlaying = true;
});
