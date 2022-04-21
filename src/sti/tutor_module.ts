class Tutor {
    currentExercise: Exercise;
    userAnswer?: string;
    currentProgress: number;

    constructor() {
        this.currentExercise = expert.getExercise(1);
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
        this.currentExercise.answerIsCorrect = answerResponse.isCorrect;

        console.log("answerResponse", { answerResponse, currentExercise: this.currentExercise });
        if (answerResponse.isCorrect) {
            response = `<div class="terminal-line tutor-line correct-answer">${answerResponse.response}</div>`;
            if (this.currentExercise.currentStep == this.currentExercise.totalSteps) {
                user.addCorrectExercises();
                user.addFinishedExercises();

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
        }
        return response;
    }

    shouldGiveHint(): boolean {
        // TODO: mandar dica somente em algumas ocasiões
        return true;
    }

    getNextExercise(): void {
        this.currentProgress += 1;
        tutor.showProgressBar();

        var newIndex: number = this.currentExercise.index + 1; // TODO: EXERCÍCIOS DINAMICOS
        if (newIndex > expert.totalExercises) {
            // 
            return;
        }

        this.currentExercise = expert.getExercise(newIndex);
        tutor.showExerciseTitle();
    }
}

var tutor = new Tutor();