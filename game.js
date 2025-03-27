// ✅ Debugging message to ensure script is loading
console.log("✅ game.js loaded successfully!");

// GAME VARIABLES v.8
let playerHealth = 5;
let corruption = 0;
let spectreAwareness = 0;
let puzzleStage = 0;
let moralScore = 0;
let inventory = { backupFile: 1, firewallShield: 1, purgeCommand: 1 };

// ✅ PRINT TO TERMINAL
function printToTerminal(text, isGlitch = false) {
  let terminal = document.getElementById("terminal");
  if (terminal) {
    terminal.value += (isGlitch ? "[ERROR] " : "") + text + "\n";
    terminal.scrollTop = terminal.scrollHeight;
  } else {
    console.error("❌ ERROR: 'terminal' element not found!");
  }
}

// 🚀 UPDATE PLAYER STATS
function updateStats() {
  document.getElementById("health").textContent = playerHealth;
  document.getElementById("corruption").textContent = corruption;

  if (playerHealth <= 0) loseGame("Spectre has consumed you.");
  else if (corruption >= 5) loseGame("Spectre has overwritten your consciousness.");
  else if (spectreAwareness >= 5 && puzzleStage >= 2 && moralScore >= 2) winGame("You have unlocked the clean escape route.");
}

// 🎭 PLAYER CHOICE
function playerChoice(option) {
  printToTerminal(`[You]: ${option.toUpperCase()}...`);
  document.getElementById("choices").style.display = "none";

  if (option === "trace") {
    corruption++;
    spectreAwareness++;
    printToTerminal("[0Sp3ctr3]: \"G00d luck tr4ck1ng m3...\"", true);
  } else if (option === "brute") {
    corruption++;
    playerHealth--;
    spectreAwareness += 2;
    moralScore--;
    printToTerminal("[ERROR]: Spectre is counter-attacking!");
  } else if (option === "ghost") {
    spectreAwareness--;
    moralScore++;
    printToTerminal("[SYSTEM]: Ghost mode engaged. You’re off the grid... for now.");
    showDedKodeImage("dedkode_nod.png");
  }

  updateStats();
  triggerSpectreGlitch();
}

// 👻 SPECTRE GLITCH EFFECTS
function triggerSpectreGlitch() {
  setTimeout(() => {
    if (Math.random() > 0.5) {
      printToTerminal("[0Sp3ctr3]: \"D3dK0d3, y0u c4n't h1d3 f0r3v3r...\"", true);
      document.body.style.backgroundColor = "red";
      document.body.classList.add("glitch");
      setTimeout(() => {
        document.body.style.backgroundColor = "black";
        document.body.classList.remove("glitch");
        triggerRandomEvent();
      }, 1500);
    } else {
      showDedKodeImage("dedkode_smirk.png");
      printToTerminal("[DedKode]: \"You’re getting better at this... but don't get cocky.\"");
      setTimeout(() => {
        printToTerminal("[SYSTEM]: Control Restored.");
        allowNextMove();
      }, 2000);
    }
  }, 2000);
}

// 🎲 RANDOM EVENT SYSTEM
function triggerRandomEvent() {
  let roll = Math.random();

  if (roll > 0.6) {
    triggerRandomJumpScare();
  } else if (roll > 0.3) {
    showDedKodeImage("dedkode_warning.png");
    printToTerminal("[DedKode]: \"Yo, be careful. You’re playing right into Spectre’s hands...\"");
    setTimeout(() => { printToTerminal("[SYSTEM]: Control Restored."); allowNextMove(); }, 2000);
  } else {
    showDedKodeImage("dedkode_glitch.png");
    printToTerminal("[ERROR]: DedKode.exe has encountered an anomaly...");
    setTimeout(() => { printToTerminal("[SYSTEM]: Control Restored."); allowNextMove(); }, 2000);
  }
}

// 🧠 PUZZLE EVENT (Called Manually or by Event)
function startPuzzle() {
  puzzleStage++;
  printToTerminal("[CHALLENGE]: Input the hidden Spectre code.");
  let input = prompt("Enter Code:");
  if (input?.toUpperCase() === "NEXUS") {
    printToTerminal("[SYSTEM]: Override accepted. Access granted.");
    moralScore++;
  } else {
    printToTerminal("[ERROR]: Code invalid.", true);
    corruption++;
  }
  updateStats();
  allowNextMove();
}

// 🖼 SHOW DEDKODE IMAGE
function showDedKodeImage(img) {
  let frame = document.getElementById("dedKodeImage");
  if (frame) {
    frame.src = img;
    frame.style.display = "block";
    setTimeout(() => {
      frame.style.display = "none";
    }, 4000);
  }
}

// 💀 JUMPSCARE
function triggerRandomJumpScare() {
  let id = Math.floor(Math.random() * 3) + 1;
  let scare = document.getElementById(`jumpscare${id}`);
  let sound = document.getElementById(`jumpscareSound${id}`);
  if (scare && sound) {
    scare.style.display = "block";
    sound.play();
    setTimeout(() => {
      scare.style.display = "none";
      playerHealth--;
      updateStats();
      allowNextMove();
    }, 1000);
  } else {
    allowNextMove();
  }
}

// 🏁 ENDGAME STATES
function winGame(msg) {
  printToTerminal("[SYSTEM]: " + msg);
  document.body.innerHTML = `<h1 class='glitch'>YOU ESCAPED</h1><p>${msg}</p><button onclick='restartGame()'>TRY AGAIN</button>`;
}
function loseGame(msg) {
  printToTerminal("[ERROR]: " + msg);
  document.body.innerHTML = `<h1 class='glitch'>GAME OVER</h1><p>${msg}</p><button onclick='restartGame()'>TRY AGAIN</button>`;
}
function restartGame() { location.reload(); }

// 🔁 RETURN CONTROL
function allowNextMove() {
  const choices = document.getElementById("choices");
  choices.style.display = "block";
  document.querySelectorAll("#choices button").forEach(btn => btn.disabled = false);
}

// 🚀 INIT GAME
function startGame() {
  playerHealth = 5;
  corruption = 0;
  spectreAwareness = 0;
  moralScore = 0;
  puzzleStage = 0;
  updateStats();
  printToTerminal("[DedKode]: \"Yo, you hearing this static? Some ass hat's listening...\"");
  document.getElementById("startButton").style.display = "none";
  document.getElementById("choices").style.display = "block";
}

// 🎮 HOOK BUTTONS
document.addEventListener("DOMContentLoaded", () => {
  document.getElementById("startButton")?.addEventListener("click", startGame);
  document.getElementById("traceBtn")?.addEventListener("click", () => playerChoice("trace"));
  document.getElementById("bruteBtn")?.addEventListener("click", () => playerChoice("brute"));
  document.getElementById("ghostBtn")?.addEventListener("click", () => playerChoice("ghost"));
});
