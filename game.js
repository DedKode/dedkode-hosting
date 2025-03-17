// ✅ Debugging message to ensure script is loading
console.log("✅ game.js loaded successfully!");

// GAME VARIABLES v.5
let playerHealth = 5;
let corruption = 0;
let spectreAwareness = 0; // Spectre remembers actions
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

// ✅ PLAYER CHOICE (Now Includes DedKode Feedback)
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
            showDedKodeImage("dedkode_nod.png");
            printToTerminal("[DedKode]: \"Nice move. Spectre lost your signal for now.\"");
        }
    }

    updateStats();
    triggerSpectreGlitch();
}

// ✅ SPECTRE GLITCH EFFECTS (Now Mixed with DedKode Moments)
function triggerSpectreGlitch() {
    console.log("👻 triggerSpectreGlitch() called!");
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
        }
    }, 3000);
}

// ✅ RANDOM EVENT (Can Be a Jump Scare or DedKode Moment)
function triggerRandomEvent() {
    let eventRoll = Math.random();

    if (eventRoll > 0.6) {
        triggerRandomJumpScare();
    } else if (eventRoll > 0.3) {
        showDedKodeImage("dedkode_warning.png");
        printToTerminal("[DedKode]: \"Yo, be careful. You’re playing right into Spectre’s hands...\"");
    } else {
        showDedKodeImage("dedkode_glitch.png");
        printToTerminal("[ERROR]: DedKode.exe has encountered an anomaly...");
    }
}

// ✅ SHOW DEDKODE IMAGE
function showDedKodeImage(imageFile) {
    let dedKodeImg = document.getElementById("dedKodeImage");
    if (
