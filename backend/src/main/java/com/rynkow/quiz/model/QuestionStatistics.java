package com.rynkow.quiz.model;

public class QuestionStatistics {
    private int correctAnswers;
    private int wrongAnswers;
    private QuestionState questionState;

    public QuestionStatistics() {
        this.correctAnswers = 0;
        this.wrongAnswers = 0;
        this.questionState = QuestionState.NEEDS_REVIEW;
    }

    public int getCorrectAnswers() {
        return correctAnswers;
    }

    public void setCorrectAnswers(int correctAnswers) {
        this.correctAnswers = correctAnswers;
    }

    public int getWrongAnswers() {
        return wrongAnswers;
    }

    public void setWrongAnswers(int wrongAnswers) {
        this.wrongAnswers = wrongAnswers;
    }

    public QuestionState getQuestionState() {
        return questionState;
    }

    public void setQuestionState(QuestionState questionState) {
        this.questionState = questionState;
    }

    public void newCorrectAnswer() {
        this.correctAnswers += 1;
    }

    public void newWrongAnswer() {
        this.wrongAnswers += 1;
    }
}
