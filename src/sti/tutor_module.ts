class Tutor {
    currentExercise: Exercise;
    userAnswer?: string;

    constructor() {
        this.currentExercise = new Exercise(1, "Digite o comando 'git'.");
    }

    showExerciseTitle() {
        var titleDOM = document.getElementById("exercise-title");
        titleDOM.innerHTML = this.currentExercise.title;
    }
    
    answerExercise(answer: string) {
        this.currentExercise.answer = answer;
        var isAnswerCorrect = expert.isAnswerCorrect(this.currentExercise);
        console.log("isAnswerCorrect", isAnswerCorrect);
        this.currentExercise.answerIsCorrect = isAnswerCorrect;
        if (isAnswerCorrect) {
            this.currentExercise.answerResponse = "Correto!";
            user.addCorrectExercises();
            user.addFinishedExercises();
        } else {
            this.currentExercise.answerResponse = "Errado :(";
        }
    }
}

var tutor = new Tutor();