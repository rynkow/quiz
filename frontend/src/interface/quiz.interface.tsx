import Question from "./question.interface";

interface Quiz {
    id: string | null,
    title: string,
    description: string,
    author: string,
    isPublic: boolean,
    questions: Array<Question>
}

export default Quiz;