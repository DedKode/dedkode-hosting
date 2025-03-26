// ✅ Debugging message to ensure script is loading
console.log("✅ game.js loaded successfully!");

// GAME VARIABLES v.6
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

            setTimeout(() => {
                printToTerminal("[SYSTEM]: Control Restored.");
                allowNextMove();
            }, 2000);
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

        setTimeout(() => {
            printToTerminal("[SYSTEM]: Control Restored.");
            allowNextMove();
        }, 2000);
    } else {
        showDedKodeImage("dedkode_glitch.png");
        printToTerminal("[ERROR]: DedKode.exe has encountered an anomaly...");

        setTimeout(() => {
            printToTerminal("[SYSTEM]: Control Restored.");
            allowNextMove();
        }, 2000);
    }
}

// ✅ SHOW DEDKODE IMAGE
function showDedKodeImage(imageFile) {
    let dedKodeImg = document.getElementById("dedKodeImage");
    if (dedKodeImg) {
        dedKodeImg.src = imageFile;
        dedKodeImg.style.display = "block";

        setTimeout(() => {
            dedKodeImg.style.display = "none";
        }, 1500);
    }
}

// ✅ WIN & LOSE CONDITIONS (Now Includes Try Again Button)
function winGame(message) {
    printToTerminal(`[SYSTEM]: ${message}`);
    setTimeout(() => {
        document.body.innerHTML = `<h1 class='glitch'>YOU ESCAPED</h1><p>${message}</p><button onclick="restartGame()">TRY AGAIN</button>`;
    }, 2000);
}

function loseGame(message) {
    printToTerminal(`[ERROR]: ${message}`);
    setTimeout(() => {
        document.body.innerHTML = `<h1 class='glitch'>GAME OVER</h1><p>${message}</p><button onclick="restartGame()">TRY AGAIN</button>`;
    }, 2000);
}

// ✅ RESTART GAME FUNCTION
function restartGame() {
    location.reload();
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

// 🔥 EVENT LISTENER ATTACHMENT
document.addEventListener("DOMContentLoaded", function() {
    document.getElementById("startButton")?.addEventListener("click", startGame);
    document.getElementById("traceBtn")?.addEventListener("click", () => playerChoice('trace'));
    document.getElementById("bruteBtn")?.addEventListener("click", () => playerChoice('brute'));
    document.getElementById("ghostBtn")?.addEventListener("click", () => playerChoice('ghost'));
});
