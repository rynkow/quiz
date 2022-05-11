interface Question {
    id: string,
    question: string,
    answers: Map<string, boolean>,
    isMultipleChoice: boolean,
    correctAnswers: number,
    wrongAnswers: number,
    needsReview: boolean,
}

export default Question;