var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var _this = this;
var userInput, terminalOutput;
var projAsk = false;
var lastCommands = [];
var COMMANDS = {
    ls: "programa.c&nbsp;&nbsp;&nbsp;&nbsp;programa.h&nbsp;&nbsp;&nbsp;&nbsp;programa.o&nbsp;&nbsp;&nbsp;&nbsp;makefile",
    help: 'Comandos disponíveis: <span class="code">git help</span>, <span class="code">clear</span>, <span class="code">history</span>, <span class="code">ls</span><br>Dica: Use a Seta para Cima/Baixo para percorrer comandos recentes.',
    "git help": "\n        start a working area<br>\n        <span class=\"code\">init</span>&nbsp;Create an empty Git repository or reinitialize an existing one<br><br>\n\n        work on the current change<br>\n        <span class=\"code\">add</span>&nbsp;Add file contents to the index<br><br>\n\n        grow, mark and tweak your common history<br>\n        <span class=\"code\">checkout</span>&nbsp;Switch branches or restore working tree files<br>\n        <span class=\"code\">branch</span>&nbsp;List, create, or delete branches<br>\n        <span class=\"code\">commit</span>&nbsp;Record changes to the repository<br>\n        <span class=\"code\">merge</span>&nbsp;Join two or more development histories together<br><br>\n\n        collaborate<br>\n        <span class=\"code\">remote</span>&nbsp;Manage set of tracked repositories<br>\n        <span class=\"code\">fetch</span>&nbsp;Download objects and refs from another repository<br>\n        <span class=\"code\">pull</span>&nbsp;Fetch from and integrate with another repository or a local branch<br>\n        <span class=\"code\">push</span>&nbsp;Update remote refs along with associated objects<br>\n    ",
};
var app = function () {
    userInput = document.getElementById("userInput");
    terminalOutput = document.getElementById("terminalOutput");
    document.getElementById("dummyKeyboard").focus();
    tutor.showExerciseTitle();
    tutor.showProgressBar();
    tutor.showStep();
    console.log("Application loaded");
};
var execute = function executeCommand(input) {
    input = input.toLowerCase();
    lastCommands.push(input);
    var output;
    if (input.length === 0) {
        return;
    }
    if (input === "clear" || input === "cls") {
        clearScreen();
    }
    else if (input === "history") {
        showHist();
    }
    else {
        output = "<div class=\"terminal-line\"><span class=\"success\">\u279C</span> <span class=\"directory\">~</span> " + input + "</div>";
        if (!COMMANDS.hasOwnProperty(input) && !input.startsWith("git")) {
            output += "<div class=\"terminal-line\">command not found: " + input + "</div>";
        }
        else if (input.startsWith("git") && !COMMANDS.hasOwnProperty(input)) {
            var answerResponse = tutor.answerExercise(input);
            output += answerResponse;
        }
        else {
            output += COMMANDS[input];
        }
        terminalOutput.innerHTML = terminalOutput.innerHTML + "<br><div class=\"terminal-line\">" + output + "<br></div>";
        terminalOutput.scrollTop = terminalOutput.scrollHeight;
    }
};
var key = function (e) {
    console.log("key", { e: e });
    var input = userInput.innerHTML;
    if (e.key === "Enter") {
        execute(input);
        userInput.innerHTML = "";
        return;
    }
    userInput.innerHTML = input + e.key;
};
var backspace = function (e) {
    if (e.keyCode !== 8 && e.keyCode !== 46) {
        return;
    }
    userInput.innerHTML = userInput.innerHTML.slice(0, userInput.innerHTML.length - 1);
};
function showHist() {
    terminalOutput.innerHTML = terminalOutput.innerHTML + "<div class=\"terminal-line\">" + lastCommands.join(", ") + "</div>";
}
var iter = 0;
var up = function (e) { return __awaiter(_this, void 0, void 0, function () {
    var text;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                console.log("up", { e: e });
                if (e.code == "Quote") {
                    console.log("up", { e: e });
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
                if (!((e.metaKey || e.ctrlKey) && e.key === "v")) return [3, 2];
                return [4, navigator.clipboard.readText()];
            case 1:
                text = _a.sent();
                console.log("metaKey", { char: "⌘-" + e.keyCode, text: text });
                userInput.innerHTML = userInput.innerHTML + text;
                _a.label = 2;
            case 2: return [2];
        }
    });
}); };
function clearScreen() {
    location.reload();
}
document.addEventListener("keydown", up);
document.addEventListener("keydown", backspace);
document.addEventListener("keypress", key);
document.addEventListener("DOMContentLoaded", app);
