var User = (function () {
    function User() {
        this.correctExercises = 0;
        this.finishedExercises = 0;
        this.hintsNeeded = 0;
    }
    User.prototype.addCorrectExercises = function () {
        this.correctExercises += 1;
    };
    User.prototype.addFinishedExercises = function () {
        this.finishedExercises += 1;
    };
    User.prototype.addHintsNeeded = function () {
        this.hintsNeeded += 1;
    };
    return User;
}());
var user = new User();
