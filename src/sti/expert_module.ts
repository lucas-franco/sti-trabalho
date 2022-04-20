class Exercise {
    index: number;
    title: string;
    hints?: string[];
    answer?: string;
    answerIsCorrect?: boolean;
    answerResponse?: string;

    constructor(index: number, title: string) {
        this.index = index;
        this.title = title;
    }

}

class Expert {

    isAnswerCorrect(exercise: Exercise) {
        console.log(exercise.answer);
        return exercise.answer == "git"; // TODO
    }
}

var expert = new Expert();