package com.rynkow.quiz.model.question;

public class QuestionStatistics {
    private Integer correctAnswers;
    private Integer wrongAnswers;
    private Boolean needsReview;

    public QuestionStatistics() {
        this.correctAnswers = 0;
        this.wrongAnswers = 0;
        this.needsReview = true;
    }

    public Integer getCorrectAnswers() {
        return correctAnswers;
    }

    public void setCorrectAnswers(Integer correctAnswers) {
        this.correctAnswers = correctAnswers;
    }

    public Integer getWrongAnswers() {
        return wrongAnswers;
    }

    public void setWrongAnswers(Integer wrongAnswers) {
        this.wrongAnswers = wrongAnswers;
    }

    public Boolean getNeedsReview() {
        return needsReview;
    }

    public void setNeedsReview(Boolean needsReview) {
        this.needsReview = needsReview;
    }

    public void newCorrectAnswers(Integer correctAnswers) {
        this.correctAnswers += correctAnswers;
    }

    public void newWrongAnswers(Integer wrongAnswers) {
        this.wrongAnswers += wrongAnswers;
    }
}
