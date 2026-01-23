const intro = document.getElementById("intro");
const minigame = document.getElementById("minigame");

const startBtn = document.getElementById("startBtn");
const backBtn = document.getElementById("backBtn");
const rollBtn = document.getElementById("rollBtn");
const rollResult = document.getElementById("rollResult");

startBtn.addEventListener("click", () => {
  intro.classList.add("exit-left");
  intro.classList.remove("active");
  minigame.classList.add("active");
});

backBtn.addEventListener("click", () => {
  minigame.classList.remove("active");
  intro.classList.remove("exit-left");
  intro.classList.add("active");
});

rollBtn.addEventListener("click", () => {
  const roll = Math.floor(Math.random() * 20) + 1;
  rollResult.textContent = `You rolled: ${roll}`;
});
