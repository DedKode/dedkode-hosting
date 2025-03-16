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
    }

    if (corruption >= 5) {
        loseGame("Spectre has overwritten your consciousness.");
    }

    if (spectreAwareness >= 5) {
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
