package com.rynkow.quiz.dto;

import com.rynkow.quiz.model.question.Question;
import com.rynkow.quiz.model.question.QuestionStatistics;

import java.util.Map;

public class QuestionDTO implements Cloneable {
    private String id;
    private String question;
    private Map<String, Boolean> answers;
    private Boolean isMultipleChoice;
    private Integer correctAnswers;
    private Integer wrongAnswers;
    private Boolean needsReview;

    public QuestionDTO(String id, String question, Map<String, Boolean> answers, Boolean isMultipleChoice) {
        this.id = id;
        this.question = question;
        this.answers = answers;
        this.isMultipleChoice = isMultipleChoice;
        this.correctAnswers = 0;
        this.wrongAnswers = 0;
        this.needsReview = true;
    }

    public QuestionDTO(Question question) {
        this.id = question.getId();
        this.question = question.getQuestion();
        this.answers = question.getAnswers();
        this.isMultipleChoice = question.getMultipleChoice();
        this.correctAnswers = 0;
        this.wrongAnswers = 0;
        this.needsReview = true;
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getQuestion() {
        return question;
    }

    public void setQuestion(String question) {
        this.question = question;
    }

    public Map<String, Boolean> getAnswers() {
        return answers;
    }

    public void setAnswers(Map<String, Boolean> answers) {
        this.answers = answers;
    }

    public Boolean getMultipleChoice() {
        return isMultipleChoice;
    }

    public void setMultipleChoice(Boolean multipleChoice) {
        isMultipleChoice = multipleChoice;
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

    public void setQuestionStatistics(QuestionStatistics questionStatistics) {
        this.correctAnswers = questionStatistics.getCorrectAnswers();
        this.wrongAnswers = questionStatistics.getWrongAnswers();
        this.needsReview = questionStatistics.getNeedsReview();
    }

    @Override
    public QuestionDTO clone() {
        try {
            QuestionDTO clone = (QuestionDTO) super.clone();
            clone.answers = Map.copyOf(answers);
            return clone;
        } catch (CloneNotSupportedException e) {
            throw new AssertionError();
        }
    }
}
