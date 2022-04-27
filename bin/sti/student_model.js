var User = (function () {
    function User() {
        this.finishedExercises = [];
        this.allHintsNeeded = 0;
        this.currentExerciseHintsNeeded = 0;
        this.currentStepAttempts = 0;
        this.currentExerciseAttempts = 0;
        this.allAttempts = 0;
    }
    User.prototype.addFinishedExercises = function (exercise) {
        this.finishedExercises.push(exercise);
        this.currentStepAttempts = 0;
        this.currentExerciseAttempts = 0;
    };
    User.prototype.resetHintsNeeded = function () {
        this.currentExerciseHintsNeeded = 0;
    };
    User.prototype.addHintsNeeded = function () {
        if (this.currentStepAttempts == 2) {
            this.currentExerciseHintsNeeded += 1;
            this.addAllHintsNeeded();
        }
    };
    User.prototype.addAllHintsNeeded = function () {
        this.allHintsNeeded += 1;
    };
    User.prototype.resetCurrentStepAttempts = function () {
        this.currentStepAttempts = 0;
    };
    User.prototype.addCurrentStepAttempts = function () {
        this.currentStepAttempts += 1;
        this.addCurrentExerciseAttempts();
    };
    User.prototype.addCurrentExerciseAttempts = function () {
        this.currentExerciseAttempts += 1;
        this.addAttempts();
    };
    User.prototype.addAttempts = function () {
        this.allAttempts += 1;
    };
    return User;
}());
var user = new User();
