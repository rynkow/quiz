import Question from "./question.interface";

interface Quiz {
    id: String,
    title: String,
    description: String,
    author: String,
    isPublic: Boolean,
    questions: Array<Question>
}

export default Quiz;