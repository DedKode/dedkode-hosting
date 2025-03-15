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

// 👀 SPECTRE GLITCH EFFECTS
function triggerSpectreGlitch() {
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

// 💀 RANDOM JUMPSCARE
function triggerRandomJumpScare() {
    let scareId = Math.floor(Math.random() * 3) + 1;
    let scare = document.getElementById(`jumpscare${scareId}`);
    let sound = document.getElementById(`jumpscareSound${scareId}`);

    console.log("Triggering jumpscare:", scareId);
    
    scare.style.display = "block";
    sound.play();

    setTimeout(() => {
        scare.style.display = "none";
        playerHealth--;
        updateHealth();
    }, 1000);
}

// 🎮 ALLOW NEXT MOVE
function allowNextMove() {
    let choicesDiv = document.getElementById("choices");
    if (playerHealth > 0) {
        choicesDiv.style.display = "block";
        document.querySelectorAll("#choices button").forEach(button => {
            button.disabled = false; // Re-enable choices
        });
    }
}

// 🕵️‍♂️ SPECTRE PARANOIA SYSTEM (Idle & Click Detection)
document.querySelectorAll("#choices button").forEach(button => {
    button.addEventListener("click", () => {
        clearTimeout(idleTimer);
        idleTimer = setTimeout(triggerSpectreGlitch, 10000);  // 10 sec idle trigger

        let option = button.innerText.toLowerCase();
        clickCounts[option]++;
        if (clickCounts[option] >= 3) {
            printToTerminal("[ERROR] Spectre is watching...", true);
            document.body.style.backgroundColor = "darkred";
            setTimeout(() => document.body.style.backgroundColor = "black", 500);
            clickCounts[option] = 0;  // Reset count
        }
    });
});

// 🔥 UI GLITCHES & ERRORS
function glitchTerminalText() {
    let terminal = document.getElementById("terminal");
    let originalText = terminal.value;
    terminal.value = originalText.replace(/[A-Za-z]/g, char => Math.random() > 0.5 ? "█" : char);
    setTimeout(() => terminal.value = originalText, 1000);
}

function fakeConnectionLost() {
    printToTerminal("[ERROR] CONNECTION LOST...");
    document.body.innerHTML = "<h1 class='glitch'>CONNECTION LOST</h1>";
    setTimeout(() => location.reload(), 3000); // Refresh game after fake error
}

// 🔄 RANDOM HEALTH FLICKER
setInterval(() => {
    let healthDisplay = document.getElementById("health");
    if (Math.random() > 0.7) {
        healthDisplay.textContent = "??";
        setTimeout(() => healthDisplay.textContent = playerHealth, 500);
    }
}, 5000);

// 🔠 PUZZLE INPUT HIJACK
document.getElementById("puzzleInput").addEventListener("input", function(event) {
    if (Math.random() > 0.85) {
        event.target.value = ["I SEE YOU", "STOP TRYING", "YOU ARE MINE"][Math.floor(Math.random() * 3)];
    }
});

// Wait for the DOM to fully load before adding event listeners
document.addEventListener("DOMContentLoaded", () => {
    document.getElementById("startButton").addEventListener("click", startGame);
    document.getElementById("traceBtn").addEventListener("click", () => playerChoice('trace'));
    document.getElementById("bruteBtn").addEventListener("click", () => playerChoice('brute'));
    document.getElementById("ghostBtn").addEventListener("click", () => playerChoice('ghost'));
    document.getElementById("puzzleSubmit").addEventListener("click", checkPuzzle);
});
