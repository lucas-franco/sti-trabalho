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
    help: 'Comandos disponíveis: <span class="code">git help</span>, <span class="code">clear</span>, <span class="code">history</span>, <span class="code">ls</span><br>Dica: Use a Seta para Cima/Baixo para percorrer comandos recentes.',
    "git help": `
        start a working area (see also: git help tutorial)<br>
        <span class="code">init</span>&nbsp;Create an empty Git repository or reinitialize an existing one<br><br>

        work on the current change (see also: git help everyday)<br>
        <span class="code">add</span>&nbsp;Add file contents to the index<br><br>

        grow, mark and tweak your common history<br>
        <span class="code">checkout</span>&nbsp;Switch branches or restore working tree files<br>
        <span class="code">branch</span>&nbsp;List, create, or delete branches<br>
        <span class="code">commit</span>&nbsp;Record changes to the repository<br>
        <span class="code">merge</span>&nbsp;Join two or more development histories together<br><br>

        collaborate (see also: git help workflows)<br>
        <span class="code">remote</span>&nbsp;Manage set of tracked repositories<br>
        <span class="code">fetch</span>&nbsp;Download objects and refs from another repository<br>
        <span class="code">pull</span>&nbsp;Fetch from and integrate with another repository or a local branch<br>
        <span class="code">push</span>&nbsp;Update remote refs along with associated objects<br>
    `,
    // <span class="code">clone</span>&nbsp;Clone a repository into a new directory<br>
    // <span class="code">status</span>&nbsp;Show the working tree status<br><br>
    // <span class="code">rebase</span>&nbsp;Reapply commits on top of another base tip<br>
    // <span class="code">reset</span>&nbsp;Reset current HEAD to the specified state<br><br>

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
        } else if (input.startsWith("git") && !COMMANDS.hasOwnProperty(input)) {
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
    console.log("key", {e});

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
const up = async (e) => {
    console.log("up", {e});

    if (e.code == "Quote") {
        console.log("up", {e});
        userInput.innerHTML = userInput.innerHTML + "\"";
    }
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
        if ((e.metaKey || e.ctrlKey) && e.key === "v") {
        const text = await navigator.clipboard.readText();
        console.log("metaKey", { char: "⌘-" + e.keyCode, text});
        userInput.innerHTML = userInput.innerHTML + text;
    }

};

function clearScreen() {
    location.reload();
}
document.addEventListener("keydown", up);

document.addEventListener("keydown", backspace);
document.addEventListener("keypress", key);
document.addEventListener("DOMContentLoaded", app);