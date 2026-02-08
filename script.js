const ball = document.getElementById("ball");
const colorPicker = document.getElementById("ballColor");
const colorValue = document.getElementById("colorValue");
const shadow = document.querySelector(".shadow");

const state = {
  y: 0,
  velocity: 0,
  gravity: -1600,
  jumpImpulse: 700,
  maxHeight: 220,
  lastTime: null,
};

function updateBallColor(color) {
  document.documentElement.style.setProperty("--ball-color", color);
  colorValue.textContent = color.toLowerCase();
}

function jump() {
  state.velocity = Math.min(state.velocity + state.jumpImpulse, 900);
}

function animate(timestamp) {
  if (!state.lastTime) state.lastTime = timestamp;
  const delta = (timestamp - state.lastTime) / 1000;
  state.lastTime = timestamp;

  state.velocity += state.gravity * delta;
  state.y = Math.max(0, Math.min(state.y + state.velocity * delta, state.maxHeight));

  if (state.y === 0 && state.velocity < 0) {
    state.velocity = 0;
  }

  const translateY = -state.y;
  ball.style.transform = `translateY(${translateY}px)`;

  const squash = Math.max(0.5, 1 - state.y / state.maxHeight);
  shadow.style.transform = `scale(${0.6 + squash * 0.5})`;
  shadow.style.opacity = `${0.15 + squash * 0.25}`;

  requestAnimationFrame(animate);
}

colorPicker.addEventListener("input", (event) => {
  updateBallColor(event.target.value);
});

document.addEventListener("keydown", (event) => {
  if (event.code === "Space") {
    event.preventDefault();
    jump();
  }
});

updateBallColor(colorPicker.value);
requestAnimationFrame(animate);
