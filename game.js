// ✅ Debugging message to ensure script is loading
console.log("✅ game.js loaded successfully!");

let playerHealth = 5;
let corruption = 0;
let spectreAwareness = 0;
let puzzleStage = 0;
moralScore = 0;
let inventory = { backupFile: 1, firewallShield: 1, purgeCommand: 1 };
let unlockedOblivion = false;

const dedKodeLines = {
  praise: [
    "Well f█ck me with a floppy—you actually scared him.",
    "Spectre’s glitchin' like a b█tch. Keep pushin'...",
    "Whatever the hell you just did? Do that *again*.",
    "Damn. Didn’t think you had that in you.",
  ],
  roast: [
    "What the f█ck was that? That ain’t even legal in BASIC.",
    "You just brute forced your way into the void, genius.",
    "Spectre didn’t even try. You *fell* into that trap.",
    "That health bar’s gaslighting you."
  ],
  eerie: [
    "You feel that? That’s not lag—it’s breathing.",
    "Spectre’s watching... and it’s smiling.",
    "Keep clicking. He loves that desperation.",
    "This ain’t a game anymore. It’s a f█cking séance."
  ]
};

function randomLine(type) {
  const lines = dedKodeLines[type];
  return lines[Math.floor(Math.random() * lines.length)];
}

function printToTerminal(text, isGlitch = false) {
  const terminal = document.getElementById("terminal");
  if (terminal) {
    terminal.value += (isGlitch ? "[ERROR] " : "") + text + "\n";
    terminal.scrollTop = terminal.scrollHeight;
  }
}

function updateStats() {
  document.getElementById("health").textContent = playerHealth;
  document.getElementById("corruption").textContent = corruption;
  updateInventoryDisplay();
  maybeGlitchScreen();

  if (playerHealth <= 0) loseGame("Spectre has consumed you.");
  else if (corruption >= 5) fakeCrashScreen();
  else if (spectreAwareness >= 5 && puzzleStage >= 2 && moralScore >= 2 && unlockedOblivion) {
    winGame("You unlocked the OBLIVION PATH. You don’t escape. You become.");
  }
}

function playerChoice(option) {
  printToTerminal(`[You]: ${option.toUpperCase()}...`);
  document.getElementById("choices").style.display = "none";

  if (option.toUpperCase() === "OBLIVION") {
    unlockedOblivion = true;
    printToTerminal("[DedKode]: \"Well well. Someone read the f█ckin' fine print.\"");
    moralScore++;
    updateStats();
    allowNextMove();
    return;
  }

  if (option === "trace") {
    corruption++;
    spectreAwareness++;
    printToTerminal("[0Sp3ctr3]: \"Tr4c3 m3? Try it.\"", true);
  } else if (option === "brute") {
    corruption++;
    playerHealth--;
    spectreAwareness += 2;
    moralScore--;
    printToTerminal("[ERROR]: Spectre retaliates!");
  } else if (option === "ghost") {
    spectreAwareness--;
    moralScore++;
    printToTerminal("[SYSTEM]: Ghost mode engaged.");
    showDedKodeImage("dedkode_nod.png", false);
  }

  updateStats();
  triggerSpectreGlitch();
}

function triggerSpectreGlitch() {
  setTimeout(() => {
    if (Math.random() > 0.5) {
      printToTerminal("[0Sp3ctr3]: \"D3dK0d3, y0u c4n't h1d3...\"", true);
      document.body.style.backgroundColor = "red";
      document.body.classList.add("glitch");
      setTimeout(() => {
        document.body.style.backgroundColor = "black";
        document.body.classList.remove("glitch");
        triggerRandomEvent();
      }, 1500);
    } else {
      showDedKodeImage("dedkode_smirk.png", true);
      printToTerminal(`[DedKode]: \"${randomLine("praise")}\"`);
      setTimeout(() => {
        printToTerminal("[SYSTEM]: Control Restored.");
        allowNextMove();
      }, 2000);
    }
  }, 2000);
}

function showDedKodeImage(img, center = false) {
  let frame = document.getElementById("dedKodeImage");
  if (frame) {
    frame.src = img;
    frame.style.display = "block";
    frame.style.width = center ? "40vw" : "20vw";
    frame.style.top = center ? "50%" : "10%";
    frame.style.left = center ? "50%" : "80%";
    frame.style.transform = center ? "translate(-50%, -50%)" : "none";
    setTimeout(() => {
      frame.style.display = "none";
    }, 4000);
  }
}

function triggerRandomEvent() {
  const roll = Math.random();
  if (roll > 0.7) {
    triggerRandomJumpScare();
  } else if (roll > 0.4) {
    startPuzzle();
  } else {
    showDedKodeImage("dedkode_warning.png", true);
    printToTerminal(`[DedKode]: \"${randomLine("eerie")}\"`);
    setTimeout(() => {
      printToTerminal("[SYSTEM]: Control Restored.");
      allowNextMove();
    }, 2000);
  }
}

function maybeGlitchScreen() {
  if (corruption >= 3) {
    const term = document.getElementById("terminal");
    const original = term.value;
    term.value = original.replace(/[A-Za-z]/g, c => (Math.random() > 0.7 ? "█" : c));
    setTimeout(() => (term.value = original), 1500);
  }
}

function fakeCrashScreen() {
  printToTerminal("[ERROR]: System integrity breached. FATAL EXCEPTION.");
  document.body.innerHTML = `
    <div style="background:black;color:red;text-align:center;padding:5em;font-family:monospace;">
      <h1>[CRITICAL ERROR] DEDKODE.EXE FAILURE</h1>
      <p>Fatal system overflow. Memory dump initiated...</p>
    </div>`;
  setTimeout(() => {
    alert("...kidding.");
    restartGame();
  }, 4000);
}

function startPuzzle() {
  puzzleStage++;
  const challenges = [
    { prompt: "Decode this: KHOOR", answer: "HELLO" },
    { prompt: "Binary to text: 01001000 01001001", answer: "HI" },
    { prompt: "Base64: V09SRA==", answer: "WORD" },
  ];
  const challenge = challenges[Math.floor(Math.random() * challenges.length)];
  printToTerminal(`[CHALLENGE]: ${challenge.prompt}`);
  let input = prompt("Enter Answer:");

  if (input === null || input.trim() === "") {
    printToTerminal("[ERROR]: No input received. Puzzle skipped.", true);
    allowNextMove();
    return;
  }

  if (input.toUpperCase().trim() === challenge.answer) {
    printToTerminal("[SYSTEM]: Challenge Passed.");
    moralScore++;
  } else {
    printToTerminal(`[DedKode]: \"${randomLine("roast")}\"`, true);
    corruption++;
  }

  updateStats();
  allowNextMove();
},
    { prompt: "Binary to text: 01001000 01001001", answer: "HI" },
    { prompt: "Base64: V09SRA==", answer: "WORD" },
  ];
  const challenge = challenges[Math.floor(Math.random() * challenges.length)];
  printToTerminal(`[CHALLENGE]: ${challenge.prompt}`);
  let input = prompt("Enter Answer:");
  if (!input) return;
  if (input.toUpperCase() === challenge.answer) {
    printToTerminal("[SYSTEM]: Challenge Passed.");
    moralScore++;
  } else {
    printToTerminal(`[DedKode]: \"${randomLine("roast")}\"`, true);
    corruption++;
  }
  updateStats();
  allowNextMove();
}

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

function useItem(item) {
  if (inventory[item] > 0) {
    if (item === "backupFile") {
      playerHealth = Math.min(5, playerHealth + 1);
      printToTerminal("[SYSTEM]: Backup restored. +1 HP");
    } else if (item === "firewallShield") {
      printToTerminal("[SYSTEM]: Firewall active. Next hit blocked.");
    } else if (item === "purgeCommand") {
      corruption = 0;
      playerHealth--;
      printToTerminal("[SYSTEM]: Purged corruption. -1 HP");
    }
    inventory[item]--;
    updateStats();
  } else {
    printToTerminal("[ERROR]: Item unavailable.");
  }
}

function updateInventoryDisplay() {
  const inv = document.getElementById("inventory");
  if (inv) {
    inv.innerHTML = `
      <p><strong>Inventory</strong></p>
      🔹 Backup File: ${inventory.backupFile} <button onclick="useItem('backupFile')">Use</button><br>
      🔹 Firewall Shield: ${inventory.firewallShield} <button onclick="useItem('firewallShield')">Use</button><br>
      🔹 Purge Command: ${inventory.purgeCommand} <button onclick="useItem('purgeCommand')">Use</button>
    `;
  }
}

function winGame(msg) {
  printToTerminal("[SYSTEM]: " + msg);
  document.body.innerHTML = `<h1 class='glitch'>YOU ESCAPED</h1><p>${msg}</p><button onclick='restartGame()'>TRY AGAIN</button>`;
}

function loseGame(msg) {
  printToTerminal("[ERROR]: " + msg);
  document.body.innerHTML = `<h1 class='glitch'>GAME OVER</h1><p>${msg}</p><button onclick='restartGame()'>TRY AGAIN</button>`;
}

function restartGame() { location.reload(); }

function allowNextMove() {
  document.getElementById("choices").style.display = "block";
  document.querySelectorAll("#choices button").forEach(btn => btn.disabled = false);
}

function startGame() {
  playerHealth = 5;
  corruption = 0;
  spectreAwareness = 0;
  moralScore = 0;
  puzzleStage = 0;
  unlockedOblivion = false;
  updateStats();
  document.getElementById("instructions")?.remove();
  printToTerminal("[DedKode]: \"Yo, static’s getting louder. Someone’s tapping in.\"");
  document.getElementById("startButton").style.display = "none";
  document.getElementById("choices").style.display = "block";
}

document.addEventListener("DOMContentLoaded", () => {
  document.getElementById("startButton")?.addEventListener("click", startGame);
  document.getElementById("traceBtn")?.addEventListener("click", () => playerChoice("trace"));
  document.getElementById("bruteBtn")?.addEventListener("click", () => playerChoice("brute"));
  document.getElementById("ghostBtn")?.addEventListener("click", () => playerChoice("ghost"));
});
