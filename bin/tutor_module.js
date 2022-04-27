var Exercise = (function () {
    function Exercise(index, title) {
        this.index = index;
        this.title = title;
    }
    return Exercise;
}());
var Tutor = (function () {
    function Tutor() {
        this.currentExercise = new Exercise(1, "Questão bla bla bla");
    }
    return Tutor;
}());
var tutor = new Tutor();
