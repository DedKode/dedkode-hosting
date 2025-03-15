// ✅ Debugging message to ensure script is loading
console.log("✅ game.js loaded successfully!");

// GAME VARIABLES
let playerHealth = 3;
let idleTimer;
let clickCounts = { trace: 0, brute: 0, ghost: 0 };

// 🚀 UPDATE PLAYER HEALTH
function updateHealth() {
    let healthElement = document.getElementById("health");
    if (healthElement) {
        healthElement.textContent = playerHealth;
    } else {
        console.error("❌ ERROR: 'health' element not found!");
    }

    if (playerHealth <= 0) {
        printToTerminal("[0Sp3ctr3]: \"Y0u b3l0ng t0 m3 n0w...\"", true);
        setTimeout(() => {
            document.body.innerHTML = "<h1 class='glitch'>GAME OVER</h1><p>You have been claimed by 0Sp3ctr3.</p>";
        }, 2000);
    } else {
        allowNextMove();
    }
}

// ✅ Added allowNextMove to prevent missing function error
function allowNextMove() {
    let choicesDiv = document.getElementById("choices");
    if (choicesDiv) {
        choicesDiv.style.display = "block";
        document.querySelectorAll("#choices button").forEach(button => {
            button.disabled = false; // Re-enable choices
        });
    } else {
        console.error("❌ ERROR: 'choices' element not found!");
    }
}

// 🖥 PRINT TO TERMINAL
function printToTerminal(text, isGlitch = false) {
    let terminal = document.getElementById("terminal");
    if (terminal) {
        terminal.value += (isGlitch ? "[ERROR] " : "") + text + "\n";
        terminal.scrollTop = terminal.scrollHeight;
    } else {
        console.error("❌ ERROR: 'terminal' element not found!");
    }
}

// 🛠 START GAME
function startGame() {
    console.log("🔥 startGame() triggered");
    playerHealth = 3;
    updateHealth();
    printToTerminal("[DedKode]: \"Yo, You hearing this static? Some ass hat's listening...\"");

    let startButton = document.getElementById("startButton");
    let choicesDiv = document.getElementById("choices");

    if (startButton) {
        startButton.style.display = "none";
    } else {
        console.error("❌ ERROR: 'startButton' element not found!");
    }

    if (choicesDiv) {
        choicesDiv.style.display = "block";
    } else {
        console.error("❌ ERROR: 'choices' element not found!");
    }
}

// 🎭 PLAYER CHOICE (Spectre Can Reverse It)
function playerChoice(option) {
    let trueChoice = Math.random() > 0.3 ? option : (option === "trace" ? "brute" : "trace");
    printToTerminal(`[You]: ${trueChoice.toUpperCase()}...`);
    document.getElementById("choices").style.display = "none";
    triggerSpectreGlitch();
}

// 🔥 FORCE EVENT LISTENER ATTACHMENT
document.addEventListener("DOMContentLoaded", function() {
    console.log("🚀 DOM fully loaded");

    let startButton = document.getElementById("startButton");
    let traceBtn = document.getElementById("traceBtn");
    let bruteBtn = document.getElementById("bruteBtn");
    let ghostBtn = document.getElementById("ghostBtn");

    if (startButton) {
        console.log("✅ startButton found, adding event listener");
        startButton.addEventListener("click", startGame);
    } else {
        console.error("❌ ERROR: 'startButton' not found in DOM");
    }

    if (traceBtn && bruteBtn && ghostBtn) {
        traceBtn.addEventListener("click", () => playerChoice('trace'));
        bruteBtn.addEventListener("click", () => playerChoice('brute'));
        ghostBtn.addEventListener("click", () => playerChoice('ghost'));
    } else {
        console.error("❌ ERROR: One or more choice buttons not found!");
    }
});

// ✅ Removed reference to checkPuzzle to prevent errors
