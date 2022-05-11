interface Question {
    id: String,
    question: String,
    answers: Map<String, Boolean>,
    isMultipleChoice: Boolean,
    correctAnswers: Number,
    wrongAnswers: Number,
    needsReview: Boolean,
}

export default Question;