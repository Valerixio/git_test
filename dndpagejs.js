const hScroll = document.getElementById("hScroll");


/*navigation buttons*/

const goIntro = document.getElementById("goIntro");
const goMinigame = document.getElementById("goMinigame");

/*vediamo*/

const toggleWheel = document.getElementById("toggleWheel");

let wheelToHorizontal = false;

toggleWheel.addEventListener("click", () => {
  wheelToHorizontal = !wheelToHorizontal;
  toggleWheel.textContent = `Wheel → Horizontal: ${wheelToHorizontal ? "ON" : "OFF"}`;
});

// Optional: convert mouse wheel vertical to horizontal inside the box
hScroll.addEventListener("wheel", (e) => {
  if(!wheelToHorizontal) return;
  e.preventDefault();
  hScroll.scrollLeft += e.deltaY;
}, { passive: false });
