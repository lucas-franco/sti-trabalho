const EXERCISES_ANSWERS = [
    {
        "exerciseIndex": 1,
        steps: [
            "git add \\.",
            "git commit",
            "git push origin master"
        ],
        hints: [
            "Dica: Tente adicionar os arquivos na área temporária (stage)",
            "Dica: Termine de enviar as alterações para o git",
            "Dica: Envie as alterações para o repositório remoto",
        ]
    },
    {
        "exerciseIndex": 2,
        steps: [
            "git checkout -b ",
            "git push origin "
        ],
        hints: [
            "Dica: Crie a branch e vá direto pra ela com um comando",
            "Dica: Dê push nessa nova branch",
        ]
    }
]

class Exercise {
    index: number;
    title: string;
    totalSteps: number;
    currentStep: number;

    answer?: string;
    answerIsCorrect?: boolean;
    answerStepAttempts: number;

    constructor(index: number, title: string, totalSteps: number) {
        this.index = index;
        this.title = title;
        this.totalSteps = totalSteps;
        this.currentStep = 0;
        
        this.answerStepAttempts = 0;
    }
    
    addAnswer(answer: string): void {
        this.answer = answer;
        
        this.answerIsCorrect = false;
        this.answerStepAttempts += 1;
    }
}

class AnswerResponse {
    isCorrect: boolean;
    response: string;

    constructor(isCorrect: boolean, response: string) {
        this.isCorrect = isCorrect;
        this.response = response;
    }
}

class Expert {
    exercises: Exercise[];
    totalExercises: number;

    constructor() {
        this.exercises = this.createExercises();
        this.totalExercises = this.exercises.length;
    }


    answerExercise(exercise: Exercise): AnswerResponse {
        var exerciseAnswer = EXERCISES_ANSWERS.find((it) => it.exerciseIndex == exercise.index);
        var stepAnswer: string = exerciseAnswer.steps[exercise.currentStep];
        var match = exercise.answer.match(stepAnswer);
        
        var isCorrect: boolean = match != null && match.length > 0;
        var response: string = isCorrect ? "Correto!" : exerciseAnswer.hints[exercise.currentStep];
        var answerResponse: AnswerResponse = new AnswerResponse(isCorrect, response);

        if (isCorrect) {
            exercise.currentStep += 1;
        }
        console.log("answerExercise", { answerResponse, exerciseAnswer });
        return answerResponse;
    }
    
    createExercises = (): Exercise[] => [
        new Exercise(1, "Envie as mudanças para o repositório remoto (origin) na branch master.", 3),
        new Exercise(2, "Crie uma nova branch e adicione ela no repositório remoto", 2),
        new Exercise(2, "Crie uma nova branch e adicione ela no repositório remoto", 2),
        new Exercise(2, "Crie uma nova branch e adicione ela no repositório remoto", 2),
        new Exercise(2, "Crie uma nova branch e adicione ela no repositório remoto", 2),
    ]

    getExercise(index: number): Exercise {
        return this.exercises.find((it) => it.index == index);
    }
}

var expert = new Expert();