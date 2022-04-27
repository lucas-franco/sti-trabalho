var FIRST_EXERCISE_INDEX = 4;
var Tutor = (function () {
    function Tutor() {
        this.currentExercise = expert.getExercise(FIRST_EXERCISE_INDEX);
        this.currentProgress = 0;
    }
    Tutor.prototype.showExerciseTitle = function () {
        var titleDOM = document.getElementById("exercise-title");
        var index = (this.currentProgress + 1);
        titleDOM.innerHTML = index + " - " + this.currentExercise.title;
    };
    Tutor.prototype.showProgressBar = function () {
        var _this = this;
        var titleDOM = document.getElementById("progress-bar");
        this.currentExercise;
        var output = "";
        expert.exercises.forEach(function (_, i) {
            if (_this.currentProgress > i) {
                if (i < expert.totalExercises - 1) {
                    output += "<div class=\"progress-bar-step progress-bar-step_active margin-right-2\"></div>";
                }
                else {
                    output += "<div class=\"progress-bar-step progress-bar-step_active\"></div>";
                }
            }
            else {
                if (i < expert.totalExercises - 1) {
                    output += "<div class=\"progress-bar-step margin-right-2\"></div>";
                }
                else {
                    output += "<div class=\"progress-bar-step\"></div>";
                }
            }
        });
        titleDOM.innerHTML = output;
    };
    Tutor.prototype.showStep = function () {
        var currentStepDOM = document.getElementById("current-step");
        var totalStepDOM = document.getElementById("total-step");
        currentStepDOM.innerText = (this.currentExercise.currentStep + 1).toString();
        totalStepDOM.innerText = "/" + this.currentExercise.totalSteps.toString();
    };
    Tutor.prototype.answerExercise = function (answer) {
        var response;
        this.currentExercise.addAnswer(answer);
        var answerResponse = expert.answerExercise(this.currentExercise);
        if (answerResponse.isCorrect) {
            response = "<div class=\"terminal-line tutor-line correct-answer\">" + answerResponse.response + "</div>";
            user.resetCurrentStepAttempts();
            if (this.currentExercise.currentStep == this.currentExercise.totalSteps) {
                user.addFinishedExercises(this.currentExercise);
                this.getNextExercise();
            }
            this.showStep();
        }
        else {
            if (this.shouldGiveHint()) {
                response = "\n                    <div class=\"terminal-line tutor-line wrong-answer\">Errado :(</div>\n                    <div class=\"terminal-line tutor-line hint-answer\">" + answerResponse.response + "</div>\n                ";
                user.addHintsNeeded();
            }
            else {
                response = "<div class=\"terminal-line tutor-line wrong-answer\">Errado :(</div>";
            }
            user.addCurrentStepAttempts();
        }
        return response;
    };
    Tutor.prototype.shouldGiveHint = function () {
        return user.currentStepAttempts > 1;
    };
    Tutor.prototype.getNextExercise = function () {
        var _this = this;
        this.currentProgress += 1;
        tutor.showProgressBar();
        var newIndex;
        var finishedExercises = user.finishedExercises.map(function (it) { return it.index; });
        var availableExercises = expert.exercises.filter(function (it) { return !finishedExercises.includes(it.index) && it.index != _this.currentExercise.index; }).map(function (it) { return it.index; });
        var performance;
        if (user.currentExerciseHintsNeeded > 2) {
            performance = -2;
        }
        else if (user.currentExerciseHintsNeeded > 1) {
            performance = -1;
        }
        else if (user.currentExerciseHintsNeeded > 0) {
            performance = 1;
        }
        else {
            performance = 2;
        }
        var index = Math.min(Math.max(this.currentExercise.index + performance, 1), 5);
        var closestIndex = availableExercises.reduce(function (prev, curr) {
            return (Math.abs(curr - index) < Math.abs(prev - index) ? curr : prev);
        });
        newIndex = closestIndex;
        if (newIndex > expert.totalExercises) {
            this.finishSession();
            return;
        }
        this.currentExercise = expert.getExercise(newIndex);
        tutor.showExerciseTitle();
    };
    Tutor.prototype.finishSession = function () {
        var bodyDOM = document.getElementsByTagName("body")[0];
        var contentDom = document.getElementById("main-content");
        bodyDOM.removeChild(contentDom);
        var points = 1000 - ((user.allHintsNeeded / expert.totalHints) * 1000);
        bodyDOM.innerHTML += "<div id=\"session-finished\" class=\"session-finished-container\">\n            <h2 class=\"terminal-line session-finished-text\">Parab\u00E9ns, voc\u00EA completou os exerc\u00EDcios!</h2>\n            <br/>\n            <h4 class=\"terminal-line session-finished-text\">Sua pontua\u00E7\u00E3o foi " + points + "</h4>\n            <button id=\"retry-button\" class=\"retry-button\">\n                <p class=\"terminal-line retry-button-label\">Tentar novamente</p>\n            </button>\n        </div>";
        var retryButton = document.getElementById("retry-button");
        retryButton.addEventListener("click", this.restartSession);
    };
    Tutor.prototype.restartSession = function () {
        var bodyDOM = document.getElementsByTagName("body")[0];
        var contentDom = document.getElementById("session-finished");
        bodyDOM.removeChild(contentDom);
        bodyDOM.innerHTML += "\n        <div id=\"main-content\">\n        <div class=\"flex\">\n            <div class=\"exercise-title-container\">\n                <h2 class=\"exercise-title-header terminal-line\">Exerc\u00EDcio</h2>\n                <p id=\"exercise-title\" class=\" terminal-line exercise-title-text\"></p>\n            </div>\n        </div>\n\n        <div class=\"terminal_window\" autocomplete=\"off\" autocorrect=\"off\" autocapitalize=\"off\" spellcheck=\"false\">\n        </div>\n        <div class=\"fakeMenu\">\n            <div class=\"fakeButtons fakeClose\"></div>\n            <div class=\"fakeButtons fakeMinimize\"></div>\n            <div class=\"fakeButtons fakeZoom\"></div>\n        </div>\n        <div class=\"fakeScreen\">\n            <div class=\"terminal-window primary-bg\" onclick=\"document.getElementById('dummyKeyboard').focus();\">\n                <div class=\"terminal-output\" id=\"terminalOutput\">\n                    <div class=\"terminal-line\">\n                        <span class=\"help-msg\">Type <span class=\"help\">help</span> to see a list of supported commands.\n                        <br>\n                    </div>\n                </div>\n                <div class=\"terminal-line\">\n                    <span class=\"success\">\u279C</span>\n                    <span class=\"directory\">~</span>\n                    <span class=\"user-input\" id=\"userInput\"></span>\n                    <span class=\"line anim-typewriter\"></span>\n                    <input type=\"text\" id=\"dummyKeyboard\" class=\"dummy-keyboard\" />\n                </div>\n            </div>\n        </div>\n    </div>\n        ";
        user = new User();
        expert = new Expert();
        tutor.currentExercise = expert.getExercise(FIRST_EXERCISE_INDEX);
        tutor.currentProgress = 0;
        tutor.showProgressBar();
        app();
    };
    return Tutor;
}());
var tutor = new Tutor();
