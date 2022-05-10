interface Quiz {
    id: String,
    title: String,
    description: String,
    author: String,
    isPublic: Boolean,
    questions: [
        {
            id: String,
            question: String,
            answers: Map<String, Boolean>,
            isMultipleChoice: Boolean,
            correctAnswers: Number,
            wrongAnswers: Number,
            needsReview: Boolean,
        }
    ]
}

export default Quiz;