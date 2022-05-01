package com.rynkow.quiz.dto;

import com.rynkow.quiz.model.Question;

import java.util.List;

public class QuizDTO {
    private String id;
    private String title;
    private String description;
    private String author;
    private Boolean isPublic;
    private List<Question> questions;

    public QuizDTO(String id, String title, String description, String author, Boolean isPublic, List<Question> questions) {
        this.id = id;
        this.title = title;
        this.description = description;
        this.author = author;
        this.isPublic = isPublic;
        this.questions = questions;
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
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

    public static class Builder {
        private String id;
        private String title;
        private String description;
        private String author;
        private Boolean isPublic;
        private List<Question> questions;

        public Builder() {
        }

        public Builder setId(String id) {
            this.id = id;
            return this;
        }

        public Builder setTitle(String title) {
            this.title = title;
            return this;
        }

        public Builder setDescription(String description) {
            this.description = description;
            return this;
        }

        public Builder setAuthor(String author) {
            this.author = author;
            return this;
        }

        public Builder setPublic(Boolean aPublic) {
            isPublic = aPublic;
            return this;
        }

        public Builder setQuestions(List<Question> questions) {
            this.questions = questions;
            return this;
        }

        public QuizDTO build() {
            return new QuizDTO(id, title, description, author, isPublic, questions);
        }
    }
}
