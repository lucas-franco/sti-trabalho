let userInput, terminalOutput;
let projAsk = false;
let lastCommands = [];

const COMMANDS = {
    ls: "programa.c&nbsp;&nbsp;&nbsp;&nbsp;programa.h&nbsp;&nbsp;&nbsp;&nbsp;programa.o&nbsp;&nbsp;&nbsp;&nbsp;makefile",
    // cd: "changed directory to root..",
    // "cd ..": "cd: no such file or directory",
    // "cd var": "var aliased to ../",
    // "cd root": "access denied",
    // "cd usr": "no users found",

    // "cd home": "home was aliased to .",
    help: 'Supported commands: <span class="code">clear</span>, <span class="code">history</span>, <span class="code">ls</span><br>Tip: Use Up / Down arrow to go through recent commands',
};

const app = () => {
    userInput = document.getElementById("userInput");
    terminalOutput = document.getElementById("terminalOutput");
    document.getElementById("dummyKeyboard").focus();
    tutor.showExerciseTitle();
    tutor.showProgressBar();
    console.log("Application loaded");
};

const execute = function executeCommand(input: string) {
    input = input.toLowerCase();
    lastCommands.push(input);
    let output;
    if (input.length === 0) {
        return;
    }

    if (input === "clear" || input === "cls") {
        clearScreen();
    } else if (input === "history") {
        showHist();
    } else {
        output = `<div class="terminal-line"><span class="success">➜</span> <span class="directory">~</span> ${input}</div>`;
        if (!COMMANDS.hasOwnProperty(input) && !input.startsWith("git")) {
            output += `<div class="terminal-line">command not found: ${input}</div>`;
        } else if (input.startsWith("git")) {
            var answerResponse: string = tutor.answerExercise(input);
            output += answerResponse;
        } else {
            output += COMMANDS[input];
        }

        terminalOutput.innerHTML = `${terminalOutput.innerHTML}<br><div class="terminal-line">${output}<br></div>`;
        terminalOutput.scrollTop = terminalOutput.scrollHeight;
    }
};

const key = (e) => {
    // console.log("key", {e});

    const input = userInput.innerHTML;
    if (e.key === "Enter") {
        execute(input);
        userInput.innerHTML = "";
        return;
    }

    userInput.innerHTML = input + e.key;
};

const backspace = (e) => {
    // console.log("backspace", {e});

    if (e.keyCode !== 8 && e.keyCode !== 46) {
        return;
    }
    userInput.innerHTML = userInput.innerHTML.slice(
        0,
        userInput.innerHTML.length - 1
    );
};

function showHist() {
    terminalOutput.innerHTML = `${
    terminalOutput.innerHTML
  }<div class="terminal-line">${lastCommands.join(", ")}</div>`;
}

let iter = 0;
const up = (e) => {
    // console.log("up", {e});
    if (e.key === "Escape") {
        tutor.finishSession();
    }

    if (e.key === "ArrowUp") {
        if (lastCommands.length > 0 && iter < lastCommands.length) {
            iter += 1;
            userInput.innerHTML = lastCommands[lastCommands.length - iter];
        }
    }

    if (e.key === "ArrowDown") {
        if (lastCommands.length > 0 && iter > 1) {
            iter -= 1;
            userInput.innerHTML = lastCommands[lastCommands.length - iter];
        }
    }
};

function clearScreen() {
    location.reload();
}
document.addEventListener("keydown", up);

document.addEventListener("keydown", backspace);
document.addEventListener("keypress", key);
document.addEventListener("DOMContentLoaded", app);