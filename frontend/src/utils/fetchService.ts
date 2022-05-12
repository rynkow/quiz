import Quiz from "../interface/quiz.interface";

class FetchService {
    private static quizJsonReplacer = (key: any, value: any) => {
        if(value instanceof Map) {
            let obj = Object.create(null);
            for (let [k,v] of value) {
                obj[k] = v;
            }
            return obj;
        } else {
            return value;
        }
    }

    public static fetchQuiz = async (quizId: string, authHeader: string) => {
        let requestOptions = {
            method: 'GET',
            headers: {
                "Content-Type": "application/json",
                "Authorization": "",
            },
        };
        requestOptions.headers.Authorization = authHeader;

        const response =  await fetch(`http://localhost:8080/quiz/details/${quizId}`, requestOptions);
        if (!response.ok)
            return undefined;
        const data = await response.json();

        for (let question of data.questions) {
            console.log(question.answers);
            question.answers = new Map(Object.entries(question.answers));
        }

        return data;
    }

    public static deleteQuiz = async (quizId: string, authHeader: string) =>{
        let requestOptions = {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
                "Authorization": authHeader,
            },
        };

        const response = await fetch(`http://localhost:8080/quiz/delete/${quizId}`, requestOptions);
        return response.ok;
    }

    public static updateQuiz = async (quiz: Quiz, authHeader: string) => {
        let requestOptions = {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
                "Authorization": authHeader,
                'credentials': 'same-origin'
            },
            body: JSON.stringify(quiz, FetchService.quizJsonReplacer),
        };

        const response = await fetch(`http://localhost:8080/quiz/update`, requestOptions);
        return response.ok;

    }

    public static createQuiz = async (quiz: Quiz, authHeader: string) => {
        let requestOptions = {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
                "Authorization": authHeader,
                'credentials': 'same-origin'
            },
            body: JSON.stringify(quiz, FetchService.quizJsonReplacer),
        };

        const response = await fetch(`http://localhost:8080/quiz/create`, requestOptions);
        return response.ok;
    }

}

export default FetchService;