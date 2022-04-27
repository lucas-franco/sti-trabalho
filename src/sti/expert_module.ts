const EXERCISES_ANSWERS = [
    {
        "exerciseIndex": 1,
        steps: [
            "git add \\.",
            "git commit -m \".+\"",
            "git push origin master"
        ],
        hints: [
            "Dica: Tente adicionar TODOS os arquivos na área temporária (stage)",
            "Dica: Termine de enviar as alterações para o git. Lembre-se da mensagem.",
            "Dica: Envie o commit para o repositório remoto",
        ]
    },
    {
        "exerciseIndex": 2,
        steps: [
            "git checkout -b .+",
            "git push origin .+"
        ],
        hints: [
            "Dica: Crie uma nova branch e vá para ela no mesmo comando. É necessário uma flag para isso.",
            "Dica: Dê push nessa nova branch"
        ]
    },
    {
        "exerciseIndex": 3,
        steps: [
            "git init",
            "git remote add origin https://github.com/demarco-sampaio/exercicio.git",
            "git push -u origin master",
        ],
        hints: [
            "Dica: Crie um novo repositório do Git",
            "Dica: Crie uma nova conexão com o repositório remoto passando a origem e a url do repositório ao comando.",
            "Dica: Dê push ao repositório para a nova branch master. Por essa branch não existir no repositório remoto é preciso adicionar uma flag junto ao comando.",
        ]
    },
    {
        "exerciseIndex": 4,
        steps: [
            "git fetch",
            "git pull origin master",
            "git checkout feature/exercicio-mescla",
            "git merge master",
        ],
        hints: [
            "Dica: Atualize todo o seu repositório local com o seu repositório remoto.",
            "Dica: Atualize a sua branch master do repositório local com a branch master do repositório remoto.",
            "Dica: Mude da branch master para a branch 'feature/exercicio-mescla'",
            "Dica: Faça a mescla da sua branch master dentro da branch 'feature/exercicio-mescla'",
        ],
    },
    {
        "exerciseIndex": 5,
        steps: [
            "git add .",
            "git commit --amend --no-edit",
            "git push --force-with-lease",
        ],
        hints: [
            "Dica: Adicione os arquivos na área temporária (stage)",
            "Dica: Termine de enviar as alterações para o git usando duas flags: uma que permite combinar as alterações atuais com o último commit e outra que sinaliza que não é necessário uma mensagem nova de commit.",
            "Dica: De push nesse commit com uma flag que força a alteração, mas apenas quando não tem outros novos commits no repositório remoto.",
        ]
    }
]

class Exercise {
    index: number; // difficulty: 1 to 5
    title: string;
    totalSteps: number;
    currentStep: number;

    answer?: string;
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
    totalHints: number;

    constructor() {
        this.exercises = this.createExercises();
        this.totalExercises = this.exercises.length;
        this.totalHints = EXERCISES_ANSWERS.reduce((partialSum, it) => partialSum + it.hints.length, 0);
    }


    answerExercise(exercise: Exercise): AnswerResponse {
        var exerciseAnswer = EXERCISES_ANSWERS.find((it) => it.exerciseIndex == exercise.index);
        var stepAnswer: string = "(" + exerciseAnswer.steps[exercise.currentStep] + ")$";
        var match = exercise.answer.match(stepAnswer);
        
        var isCorrect: boolean = match != null && match.length > 0;
        var response: string = isCorrect ? "Correto!" : exerciseAnswer.hints[exercise.currentStep];
        var answerResponse: AnswerResponse = new AnswerResponse(isCorrect, response);
        console.log("answerExercise", {match, stepAnswer, isCorrect})
        if (isCorrect) {
            exercise.currentStep += 1;
        }
        
        return answerResponse;
    }
    
    createExercises = (): Exercise[] => [
        new Exercise(1, "Envie as mudanças para o repositório remoto (origin) na branch master.", 3),
        new Exercise(2, "Crie uma nova branch e adicione ela no repositório remoto", 2),
        new Exercise(3, "Digamos que você já possui um projeto local sem Git e quer adicionar esse projeto à nova branch master em um repositório existente remoto do Git. Esse repositório possui o link https://github.com/demarco-sampaio/exercicio.git. Como podemos fazer isso?", 3),
        new Exercise(4, "Digamos que você já está na branch master no repositório local desatualizada com o repositório remoto, você quer atualizar sua branch \"feature/exercicio-mescla\" com a branch master. Como podemos fazer isso?", 4),
        new Exercise(5, "Digamos que vc tem um último commit já pushado na branch do seu repositório remoto, mas percebeu que precisa adicionar novas mudanças nesse commit já pushado. Como você pode fazer isso?", 3)
    ]

    getExercise(index: number): Exercise {
        return this.exercises.find((it) => it.index == index);
    }
}

var expert = new Expert();