

/*navigation buttons*/

const goIntro = document.getElementById("goIntro");
const goMinigame = document.getElementById("goMinigame");
const goOrsogatto = document.getElementById("goOrsogatto");
const goTerraNuova = document.getElementById("goTerraNuova");


goIntro.addEventListener("click", () => {
  document.getElementById("intro").scrollIntoView({ behavior: "smooth", inline: "start" });
});

goMinigame.addEventListener("click", () => {
  document.getElementById("minigame").scrollIntoView({ behavior: "smooth", inline: "start" });
});

goOrsogatto.addEventListener("click", () => {
  document.getElementById("Orsogatto").scrollIntoView({ behavior: "smooth", inline: "start" });
});



goTerraNuova.addEventListener("click", () => {
  document.getElementById("TerraNuova").scrollIntoView({ behavior: "smooth", inline: "start" });
});