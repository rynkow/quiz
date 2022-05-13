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

        const response = await fetch(`http://localhost:8080/quiz/${quizId}`, requestOptions);
        if (!response.ok)
            return undefined;
        const data = await response.json();

        for (let question of data.questions) {
            question.answers = new Map(Object.entries(question.answers));
        }

        return data;
    }

    public static deleteQuiz = async (quizId: string, authHeader: string) =>{
        let requestOptions = {
            method: 'DELETE',
            headers: {
                "Content-Type": "application/json",
                "Authorization": authHeader,
            },
        };

        const response = await fetch(`http://localhost:8080/quiz/${quizId}`, requestOptions);
        return response.ok;
    }

    public static updateQuiz = async (quiz: Quiz, authHeader: string) => {
        let requestOptions = {
            method: 'PATCH',
            headers: {
                "Content-Type": "application/json",
                "Authorization": authHeader,
                'credentials': 'same-origin'
            },
            body: JSON.stringify(quiz, FetchService.quizJsonReplacer),
        };

        const response = await fetch(`http://localhost:8080/quiz`, requestOptions);
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

        const response = await fetch(`http://localhost:8080/quiz`, requestOptions);
        return response.ok;
    }


    public static updateQuizStats = async (quizId: string, questionId: string, newCorrectAnswers: number, newWrongAnswers: number, needsReview: boolean, authHeader: string) => {
        let requestOptions = {
            method: 'PATCH',
            headers: {
                "Content-Type": "application/json",
                "Authorization": authHeader,
                'credentials': 'same-origin'
            },
        };

        let urlParams: any = {};
        if (newWrongAnswers !== 0) {
            urlParams["wrong"] = newWrongAnswers;
        }
        if (newCorrectAnswers !== 0) {
            urlParams["correct"] = newCorrectAnswers;
        }
        urlParams["needsReview"] = needsReview;

        const url = `http://localhost:8080/quiz/${quizId}/${questionId}?`;

        console.log(url + new URLSearchParams(urlParams));

        const response = await fetch(url + new URLSearchParams(urlParams), requestOptions);

        return response.ok;
    }

}

export default FetchService;