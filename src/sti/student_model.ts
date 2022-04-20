class User {
    correctExercises: number;
    finishedExercises: number;
    hintsNeeded: number;

    constructor() {
        this.correctExercises = 0;
        this.finishedExercises = 0;
        this.hintsNeeded = 0;
    }
    
    addCorrectExercises() {
        this.correctExercises +=1;
    }
    addFinishedExercises() {
        this.finishedExercises +=1;
    }
    addHintsNeeded() {
        this.hintsNeeded +=1;
    }
}

var user = new User();