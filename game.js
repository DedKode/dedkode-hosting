// ✅ Debugging message to ensure script is loading
console.log("✅ game.js loaded successfully!");

// GAME VARIABLES v.4
let playerHealth = 5;
let corruption = 0;
let spectreAwareness = 0; // NEW: Spectre remembers actions
let inventory = { backupFile: 1, firewallShield: 1, purgeCommand: 1 };

// ✅ PRINT TO TERMINAL (Declared First)
function printToTerminal(text, isGlitch = false) {
    let terminal = document.getElementById("terminal");
    if (terminal) {
        terminal.value += (isGlitch ? "[ERROR] " : "") + text + "\n";
        terminal.scrollTop = terminal.scrollHeight;
    } else {
        console.error("❌ ERROR: 'terminal' element not found!");
    }
}

// 🚀 UPDATE PLAYER HEALTH, CORRUPTION & CHECK WIN/LOSS
function updateStats() {
    let healthElement = document.getElementById("health");
    let corruptionElement = document.getElementById("corruption");

    if (healthElement) healthElement.textContent = playerHealth;
    if (corruptionElement) corruptionElement.textContent = corruption;

    if (playerHealth <= 0) {
        loseGame("Spectre has consumed you.");
    } else if (corruption >= 5) {
        loseGame("Spectre has overwritten your consciousness.");
    } else if (spectreAwareness >= 5) {
        winGame("You have outmaneuvered Spectre and escaped.");
    }
}

// ✅ NEW: BRANCHING PATHS & AI MEMORY SYSTEM
function playerChoice(option) {
    printToTerminal(`[You]: ${option.toUpperCase()}...`);
    document.getElementById("choices").style.display = "none";

    if (option === "trace") {
        printToTerminal("[0Sp3ctr3]: \"G00d luck tr4ck1ng m3...\"", true);
        corruption++;
        spectreAwareness++;
        if (spectreAwareness >= 3) {
            printToTerminal("[ERROR]: Spectre is adapting. Tracing is becoming unreliable.");
        }
    } else if (option === "brute") {
        printToTerminal("[ERROR]: Spectre is counter-attacking!");
        playerHealth--;
        corruption++;
        spectreAwareness += 2;
        if (spectreAwareness >= 4) {
            printToTerminal("[ERROR]: Spectre has learned to predict brute force attacks.");
        }
    } else if (option === "ghost") {
        printToTerminal("[SYSTEM]: Engaging Ghost Mode...");
        spectreAwareness--;
        if (spectreAwareness <= 0) {
            printToTerminal("[DedKode]: \"Nice move. Spectre lost your signal for now.\"");
        }
    }

    updateStats();
    triggerSpectreGlitch();
}

// ✅ SPECTRE GLITCH EFFECTS (NOW FULLY DYNAMIC)
function triggerSpectreGlitch() {
    console.log("👻 triggerSpectreGlitch() called!");
    setTimeout(() => {
        printToTerminal("[0Sp3ctr3]: \"D3dK0d3, y0u c4n't h1d3 f0r3v3r...\"", true);
        document.body.style.backgroundColor = "red";
        document.body.classList.add("glitch");
        setTimeout(() => {
            document.body.style.backgroundColor = "black";
            document.body.classList.remove("glitch");
            triggerRandomJumpScare();
        }, 1500);
    }, 3000);
}

// 💀 RANDOM JUMPSCARE FUNCTION (NOW ENSURES GAME RESUMES)
function triggerRandomJumpScare() {
    let scareId = Math.floor(Math.random() * 3) + 1;
    let scare = document.getElementById(`jumpscare${scareId}`);
    let sound = document.getElementById(`jumpscareSound${scareId}`);

    if (scare && sound) {
        scare.style.display = "block";
        sound.play();

        setTimeout(() => {
            scare.style.display = "none";
            playerHealth--;
            updateStats();

            console.log("✅ Jumpscare ended. Returning control to player.");
            allowNextMove();
        }, 1000);
    } else {
        console.error(`❌ ERROR: Jumpscare file ${scareId} missing!`);
    }
}

// ✅ WIN & LOSE CONDITIONS
function winGame(message) {
    printToTerminal(`[SYSTEM]: ${message}`);
    setTimeout(() => {
        document.body.innerHTML = `<h1 class='glitch'>YOU ESCAPED</h1><p>${message}</p>`;
    }, 2000);
}

function loseGame(message) {
    printToTerminal(`[ERROR]: ${message}`);
    setTimeout(() => {
        document.body.innerHTML = `<h1 class='glitch'>GAME OVER</h1><p>${message}</p>`;
    }, 2000);
}

// ✅ SURVIVAL MECHANICS: HEALING & DEFENSES
function useItem(item) {
    if (inventory[item] > 0) {
        if (item === "backupFile") {
            playerHealth = Math.min(5, playerHealth + 1);
            printToTerminal("[SYSTEM]: Backup File Restored. +1 HP");
        } else if (item === "firewallShield") {
            printToTerminal("[SYSTEM]: Firewall Active. Next attack blocked.");
            inventory.firewallShield--;
        } else if (item === "purgeCommand") {
            corruption = 0;
            playerHealth--;
            printToTerminal("[SYSTEM]: Purge Complete. Corruption Reset. -1 HP");
        }
        inventory[item]--;
        updateStats();
    } else {
        printToTerminal("[ERROR]: No more of that item left.");
    }
}

// ✅ ALLOW NEXT MOVE (ENSURES CHOICES RETURN AFTER EVENTS)
function allowNextMove() {
    let choicesDiv = document.getElementById("choices");
    if (choicesDiv) {
        choicesDiv.style.display = "block";
        document.querySelectorAll("#choices button").forEach(button => {
            button.disabled = false;
        });
    } else {
        console.error("❌ ERROR: 'choices' element not found!");
    }
}

// 🛠 START GAME (FINAL VERSION)
function startGame() {
    console.log("🔥 startGame() triggered");
    playerHealth = 5;
    corruption = 0;
    spectreAwareness = 0;
    updateStats();
    printToTerminal("[DedKode]: \"Yo, You hearing this static? Some ass hat's listening...\"");

    let startButton = document.getElementById("startButton");
    let choicesDiv = document.getElementById("choices");

    if (startButton) startButton.style.display = "none";
    if (choicesDiv) choicesDiv.style.display = "block";
}

// 🔥 EVENT LISTENER ATTACHMENT (FINAL FIX)
document.addEventListener("DOMContentLoaded", function() {
    document.getElementById("startButton")?.addEventListener("click", startGame);
    document.getElementById("traceBtn")?.addEventListener("click", () => playerChoice('trace'));
    document.getElementById("bruteBtn")?.addEventListener("click", () => playerChoice('brute'));
    document.getElementById("ghostBtn")?.addEventListener("click", () => playerChoice('ghost'));
});
