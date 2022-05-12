interface Question {
    id: string | null,
    question: string,
    answers: Map<string, boolean>,
    isMultipleChoice: boolean,
    correctAnswers: number,
    wrongAnswers: number,
    needsReview: boolean,
}

export default Question;