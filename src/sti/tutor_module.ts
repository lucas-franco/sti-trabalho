const FIRST_EXERCISE_INDEX = 1;

class Tutor {
    currentExercise: Exercise;
    currentProgress: number;

    constructor() {
        this.currentExercise = expert.getExercise(FIRST_EXERCISE_INDEX);
        this.currentProgress = 0;
    }

    showExerciseTitle(): void {
        var titleDOM = document.getElementById("exercise-title");
        var index: number = (this.currentProgress + 1);
        titleDOM.innerHTML = index + " - " +this.currentExercise.title;
    }
    showProgressBar(): void {
        var titleDOM = document.getElementById("progress-bar");
        this.currentExercise;

        var output = "";
        expert.exercises.forEach((_, i) => {
            if (this.currentProgress > i) {
                if (i < expert.totalExercises - 1) {
                    output += `<div class="progress-bar-step progress-bar-step_active margin-right-2"></div>`;
                } else {
                    output += `<div class="progress-bar-step progress-bar-step_active"></div>`;
                }
            } else {
                if (i < expert.totalExercises - 1) {
                    output += `<div class="progress-bar-step margin-right-2"></div>`;
                } else {
                
                    output += `<div class="progress-bar-step"></div>`;
                }
            }
        });
        titleDOM.innerHTML = output;
    }
    
    answerExercise(answer: string): string {
        var response: string;
        this.currentExercise.addAnswer(answer);

        var answerResponse = expert.answerExercise(this.currentExercise);

        if (answerResponse.isCorrect) {
            response = `<div class="terminal-line tutor-line correct-answer">${answerResponse.response}</div>`;
            
            user.resetCurrentStepAttempts();
            if (this.currentExercise.currentStep == this.currentExercise.totalSteps) {
                user.addFinishedExercises(this.currentExercise);

                this.getNextExercise();
            }
        } else {
            if (this.shouldGiveHint()) {
                response = `
                    <div class="terminal-line tutor-line wrong-answer">Errado :(</div>
                    <div class="terminal-line tutor-line hint-answer">${answerResponse.response}</div>
                `;
                user.addHintsNeeded();
            } else {
                response = `<div class="terminal-line tutor-line wrong-answer">Errado :(</div>`;
            }
            user.addCurrentStepAttempts();
        }
        return response;
    }

    shouldGiveHint(): boolean {
        return user.currentStepAttempts > 1;
    }

    getNextExercise(): void {
        this.currentProgress += 1;
        tutor.showProgressBar();

        var newIndex: number;

        var finishedExercises: number[] = user.finishedExercises.map((it) => it.index);
        var availableExercises: number[] = expert.exercises.filter((it) => !finishedExercises.includes(it.index) && it.index != this.currentExercise.index).map((it) => it.index);

        var performance;
        if (user.currentExerciseHintsNeeded > 2) {
            performance = -2; // Very bad
        } else if (user.currentExerciseHintsNeeded > 1) {
            performance = -1; // Bad
        } else if (user.currentExerciseHintsNeeded > 0) {
            performance = 1; // Good
        } else {
            performance = 2; // Very good
        }
        var index = Math.min(Math.max(this.currentExercise.index + performance, 1), 5);
        var closestIndex = availableExercises.reduce(function(prev, curr) {
            return (Math.abs(curr - index) < Math.abs(prev - index) ? curr : prev);
        });

        newIndex = closestIndex;

        if (newIndex > expert.totalExercises) {
            this.finishSession();
            return;
        }

        this.currentExercise = expert.getExercise(newIndex);
        tutor.showExerciseTitle();
    }

    finishSession():void {
                var bodyDOM = document.getElementsByTagName("body")[0];
        var contentDom = document.getElementById("main-content");
        bodyDOM.removeChild(contentDom);

        const points: number = 1000 - ((user.allHintsNeeded / expert.totalHints) * 1000);

        bodyDOM.innerHTML += `<div id="session-finished" class="session-finished-container">
            <h2 class="terminal-line session-finished-text">Parabéns, você completou os exercícios!</h2>
            <br/>
            <h4 class="terminal-line session-finished-text">Sua pontuação foi ${points}</h4>
            <button id="retry-button" class="retry-button">
                <p class="terminal-line retry-button-label">Tentar novamente</p>
            </button>
        </div>`;

        var retryButton = document.getElementById("retry-button");
        retryButton.addEventListener("click", this.restartSession);
    }
    
    restartSession(): void {
        var bodyDOM = document.getElementsByTagName("body")[0];
        var contentDom = document.getElementById("session-finished");
        bodyDOM.removeChild(contentDom);

        bodyDOM.innerHTML += `
        <div id="main-content">
        <div class="flex">
            <div class="exercise-title-container">
                <h2 class="exercise-title-header terminal-line">Exercício</h2>
                <p id="exercise-title" class=" terminal-line exercise-title-text"></p>
            </div>
        </div>

        <div class="terminal_window" autocomplete="off" autocorrect="off" autocapitalize="off" spellcheck="false">
        </div>
        <div class="fakeMenu">
            <div class="fakeButtons fakeClose"></div>
            <div class="fakeButtons fakeMinimize"></div>
            <div class="fakeButtons fakeZoom"></div>
        </div>
        <div class="fakeScreen">
            <div class="terminal-window primary-bg" onclick="document.getElementById('dummyKeyboard').focus();">
                <div class="terminal-output" id="terminalOutput">
                    <div class="terminal-line">
                        <span class="help-msg">Type <span class="help">help</span> to see a list of supported commands.
                        <br>
                    </div>
                </div>
                <div class="terminal-line">
                    <span class="success">➜</span>
                    <span class="directory">~</span>
                    <span class="user-input" id="userInput"></span>
                    <span class="line anim-typewriter"></span>
                    <input type="text" id="dummyKeyboard" class="dummy-keyboard" />
                </div>
            </div>
        </div>
    </div>
        `;

        user = new User();
        expert = new Expert();
        tutor.currentExercise = expert.getExercise(FIRST_EXERCISE_INDEX);
        tutor.currentProgress = 0;
        tutor.showProgressBar();
        app();
    }
}

var tutor = new Tutor();