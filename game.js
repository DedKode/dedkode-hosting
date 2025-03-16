// ✅ Debugging message to ensure script is loading
console.log("✅ game.js loaded successfully!");

// GAME VARIABLES v.3
let playerHealth = 5;
let corruption = 0;
let inventory = { backupFile: 0, firewallShield: 0, purgeCommand: 0 };

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

// 🚀 UPDATE PLAYER HEALTH & CORRUPTION
function updateStats() {
    let healthElement = document.getElementById("health");
    let corruptionElement = document.getElementById("corruption");

    if (healthElement) healthElement.textContent = playerHealth;
    if (corruptionElement) corruptionElement.textContent = corruption;

    if (playerHealth <= 0) {
        printToTerminal("[0Sp3ctr3]: \"Y0u b3l0ng t0 m3 n0w...\"", true);
        setTimeout(() => {
            document.body.innerHTML = "<h1 class='glitch'>GAME OVER</h1><p>You have been claimed by 0Sp3ctr3.</p>";
        }, 2000);
    }

    if (corruption >= 5) {
        printToTerminal("[0Sp3ctr3]: \"Syst3m Ov3rrid3. You ar3 m1n3.\"", true);
        setTimeout(() => {
            document.body.innerHTML = "<h1 class='glitch'>YOU HAVE BEEN ERASED.</h1><p>0Sp3ctr3 has taken over your mind.</p>";
        }, 2000);
    }
}

// ✅ NEW: INVENTORY SYSTEM (HACKING TOOLS)
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

// 🛠 START GAME (FULLY FIXED)
function startGame() {
    console.log("🔥 startGame() triggered");
    playerHealth = 5;
    corruption = 0;
    updateStats();
    printToTerminal("[DedKode]: \"Yo, You hearing this static? Some ass hat's listening...\"");

    let startButton = document.getElementById("startButton");
    let choicesDiv = document.getElementById("choices");

    if (startButton) startButton.style.display = "none";
    if (choicesDiv) choicesDiv.style.display = "block";
}

// 🎭 PLAYER CHOICE (Spectre Fights Back)
function playerChoice(option) {
    printToTerminal(`[You]: ${option.toUpperCase()}...`);
    document.getElementById("choices").style.display = "none";

    if (option === "trace") {
        printToTerminal("[0Sp3ctr3]: \"G00d luck tr4ck1ng m3...\"", true);
        corruption++;
    } else if (option === "brute") {
        printToTerminal("[ERROR]: Spectre is fighting back!");
        playerHealth--;
        corruption++;
    } else if (option === "ghost") {
        printToTerminal("[SYSTEM]: Engaging Ghost Mode...");
    }
    
    triggerSpectreGlitch();
}

// ✅ SPECTRE GLITCH EFFECTS (NOW GUARANTEED TO WORK)
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
            allowNextMove(); // ✅ THIS LINE ENSURES CONTROLS RETURN
        }, 1000);
    } else {
        console.error(`❌ ERROR: Jumpscare file ${scareId} missing!`);
    }
}

// 🔥 EVENT LISTENER ATTACHMENT (FINAL FIX)
document.addEventListener("DOMContentLoaded", function() {
    document.getElementById("startButton")?.addEventListener("click", startGame);
    document.getElementById("traceBtn")?.addEventListener("click", () => playerChoice('trace'));
    document.getElementById("bruteBtn")?.addEventListener("click", () => playerChoice('brute'));
    document.getElementById("ghostBtn")?.addEventListener("click", () => playerChoice('ghost'));
});
