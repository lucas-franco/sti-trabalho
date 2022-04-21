class User {
    finishedExercises: Exercise[];
    
    allHintsNeeded: number;
    currentExerciseHintsNeeded: number;

    currentStepAttempts: number; // Attempts == wrong answers
    currentExerciseAttempts: number;
    allAttempts: number;
    
    constructor() {
        this.finishedExercises = [];
        this.allHintsNeeded = 0;
        this.currentExerciseHintsNeeded = 0;
        this.currentStepAttempts = 0
        this.currentExerciseAttempts = 0;
        this.allAttempts = 0;
    }
    
    addFinishedExercises(exercise: Exercise) {
        this.finishedExercises.push(exercise);

        this.currentStepAttempts = 0;
        this.currentExerciseAttempts = 0;
    }

    resetHintsNeeded() {
        this.currentExerciseHintsNeeded = 0
    }

    addHintsNeeded() {
        if (this.currentStepAttempts == 2) {
            this.currentExerciseHintsNeeded +=1;
            this.addAllHintsNeeded();
        }
    }
    addAllHintsNeeded() {
        this.allHintsNeeded += 1;
    }
    resetCurrentStepAttempts() {
        this.currentStepAttempts = 0;
    }
    addCurrentStepAttempts() {
        this.currentStepAttempts +=1;
        this.addCurrentExerciseAttempts();
    }
    addCurrentExerciseAttempts() {
        this.currentExerciseAttempts +=1;
        this.addAttempts();
    }
    addAttempts() {
        this.allAttempts +=1;
    }
}

var user = new User();