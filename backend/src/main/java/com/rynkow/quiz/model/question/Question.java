package com.rynkow.quiz.model.question;

import org.bson.types.ObjectId;

import java.util.Map;

public class Question {
    private String id;
    private String question;
    private Map<String, Boolean> answers;
    private Boolean isMultipleChoice;

    public Question(String question, Map<String, Boolean> answers, Boolean isMultipleChoice) {
        this.id = new ObjectId().toString();
        this.question = question;
        this.answers = answers;
        this.isMultipleChoice = isMultipleChoice;
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

    public void addAnswer(String answer, Boolean isTrue){
        this.answers.put(answer, isTrue);
    }
}
