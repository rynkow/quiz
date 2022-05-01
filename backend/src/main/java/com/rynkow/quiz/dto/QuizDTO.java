package com.rynkow.quiz.dto;

import com.rynkow.quiz.model.Question;

import java.util.List;

public class QuizDTO {
    private String title;
    private String description;
    private String author;
    private Boolean isPublic;
    private List<Question> questions;

    public QuizDTO(String title, String description, String author, Boolean isPublic, List<Question> questions) {
        this.title = title;
        this.description = description;
        this.author = author;
        this.isPublic = isPublic;
        this.questions = questions;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getAuthor() {
        return author;
    }

    public void setAuthor(String author) {
        this.author = author;
    }

    public Boolean getPublic() {
        return isPublic;
    }

    public void setPublic(Boolean aPublic) {
        isPublic = aPublic;
    }

    public List<Question> getQuestions() {
        return questions;
    }

    public void setQuestions(List<Question> questions) {
        this.questions = questions;
    }
}
