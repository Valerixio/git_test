const WORK = 25 * 60;
const SHORT_BREAK = 5 * 60;
const LONG_BREAK = 15 * 60;

let mode = "work";          // "work" | "break"
let secondsLeft = WORK;
let timerId = null;
let isRunning = false;
let pomosDone = 0;          // 0..4

const modeEl = document.getElementById("mode");
const timeEl = document.getElementById("time");
const startPauseBtn = document.getElementById("startPause");
const resetBtn = document.getElementById("reset");
const skipBtn = document.getElementById("skip");
const pomosEl = document.getElementById("pomos");

function formatTime(totalSeconds) {
  const m = Math.floor(totalSeconds / 60);
  const s = totalSeconds % 60;
  return `${String(m).padStart(2,"0")}:${String(s).padStart(2,"0")}`;
}

function render() {
  modeEl.textContent = mode === "work" ? "WORK" : "BREAK";
  timeEl.textContent = formatTime(secondsLeft);
  pomosEl.textContent = String(pomosDone);
  startPauseBtn.textContent = isRunning ? "Pausa" : "Start";

  // Titolo tab carino
  document.title = `${timeEl.textContent} • ${modeEl.textContent}`;
}

function beep() {
  // beep semplice via WebAudio (senza file esterni)
  const ctx = new (window.AudioContext || window.webkitAudioContext)();
  const o = ctx.createOscillator();
  const g = ctx.createGain();
  o.type = "sine";
  o.frequency.value = 880;
  g.gain.value = 0.06;
  o.connect(g);
  g.connect(ctx.destination);
  o.start();
  setTimeout(() => { o.stop(); ctx.close(); }, 180);
}

function stopTimer() {
  clearInterval(timerId);
  timerId = null;
  isRunning = false;
  render();
}

function startTimer() {
  if (isRunning) return;
  isRunning = true;
  render();

  timerId = setInterval(() => {
    secondsLeft--;

    if (secondsLeft <= 0) {
      beep();
      nextPhase();
    }
    render();
  }, 1000);
}

function nextPhase() {
  // Ferma e passa alla fase successiva
  clearInterval(timerId);
  timerId = null;

  if (mode === "work") {
    pomosDone = Math.min(4, pomosDone + 1);
    mode = "break";

    // 4° pomodoro -> pausa lunga
    const isLong = pomosDone % 4 === 0;
    secondsLeft = isLong ? LONG_BREAK : SHORT_BREAK;
  } else {
      beep(990); // 🔊 suono qui
    mode = "work";
    secondsLeft = WORK;
  }

  // Riparte automaticamente
  isRunning = true;
  timerId = setInterval(() => {
    secondsLeft--;

    if (secondsLeft <= 0) {
      beep();
      nextPhase();
    }
    render();
  }, 1000);
}

function resetAll() {
  stopTimer();
  mode = "work";
  secondsLeft = WORK;
  pomosDone = 0;
  render();
}

startPauseBtn.addEventListener("click", () => {
  if (isRunning) stopTimer();
  else startTimer();
});

resetBtn.addEventListener("click", resetAll);

skipBtn.addEventListener("click", () => {
  beep();
  nextPhase();
});




render();