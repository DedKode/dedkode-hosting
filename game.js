// GAME VARIABLES
let playerHealth = 3;
let idleTimer;
let clickCounts = { trace: 0, brute: 0, ghost: 0 };

// 🚀 UPDATE PLAYER HEALTH
function updateHealth() {
    document.getElementById("health").textContent = playerHealth;
    if (playerHealth <= 0) {
        printToTerminal("[0Sp3ctr3]: \"Y0u b3l0ng t0 m3 n0w...\"", true);
        setTimeout(() => {
            document.body.innerHTML = "<h1 class='glitch'>GAME OVER</h1><p>You have been claimed by 0Sp3ctr3.</p>";
        }, 2000);
    } else {
        allowNextMove();
    }
}

// 🖥 PRINT TO TERMINAL
function printToTerminal(text, isGlitch = false) {
    let terminal = document.getElementById("terminal");
    terminal.value += (isGlitch ? "[ERROR] " : "") + text + "\n";
    terminal.scrollTop = terminal.scrollHeight;
}

// 🛠 START GAME
function startGame() {
    playerHealth = 3;
    updateHealth();
    printToTerminal("[DedKode]: \"Yo, You hearing this static? Some ass hat's listening...\"");
    document.getElementById("startButton").style.display = "none";
    document.getElementById("choices").style.display = "block";
}

// 🎭 PLAYER CHOICE (Spectre Can Reverse It)
function playerChoice(option) {
    let trueChoice = Math.random() > 0.3 ? option : (option === "trace" ? "brute" : "trace");
    printToTerminal(`[You]: ${trueChoice.toUpperCase()}...`);
    document.getElementById("choices").style.display = "none";
    triggerSpectreGlitch();
}

// Wait for the DOM to fully load before adding event listeners
document.addEventListener("DOMContentLoaded", function() {
    let startButton = document.getElementById("startButton");
    let traceBtn = document.getElementById("traceBtn");
    let bruteBtn = document.getElementById("bruteBtn");
    let ghostBtn = document.getElementById("ghostBtn");
    let puzzleInput = document.getElementById("puzzleInput");
    let puzzleSubmit = document.getElementById("puzzleSubmit");

    if (startButton) {
        startButton.addEventListener("click", startGame);
    } else {
        console.error("❌ ERROR: startButton not found!");
    }

    if (traceBtn && bruteBtn && ghostBtn) {
        traceBtn.addEventListener("click", () => playerChoice('trace'));
        bruteBtn.addEventListener("click", () => playerChoice('brute'));
        ghostBtn.addEventListener("click", () => playerChoice('ghost'));
    } else {
        console.error("❌ ERROR: Choice buttons not found!");
    }

    if (puzzleSubmit) {
        puzzleSubmit.addEventListener("click", checkPuzzle);
    } else {
        console.error("❌ ERROR: puzzleSubmit button not found!");
    }

    if (puzzleInput) {
        puzzleInput.addEventListener("input", function(event) {
            if (Math.random() > 0.85) {
                event.target.value = ["I SEE YOU", "STOP TRYING", "YOU ARE MINE"][Math.floor(Math.random() * 3)];
            }
        });
    }
});
