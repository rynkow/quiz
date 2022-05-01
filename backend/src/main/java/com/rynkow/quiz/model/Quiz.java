package com.rynkow.quiz.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.List;

@Document(collection = "quizzes")
public class Quiz {
    @Id
    private String id;
    private String title;
    private String description;
    private String authorId;
    private Boolean isPublic;
    private List<Question> questions;

    public Quiz(String title, String description, String authorId, Boolean isPublic, List<Question> questions) {
        this.title = title;
        this.description = description;
        this.authorId = authorId;
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

    public String getAuthorId() {
        return authorId;
    }

    public void setAuthorId(String authorId) {
        this.authorId = authorId;
    }

    public Boolean getPublic() {
        return isPublic;
    }

    public void setPublic(Boolean isPublic) {
        this.isPublic = isPublic;
    }

    public List<Question> getQuestions() {
        return questions;
    }

    public void setQuestions(List<Question> questions) {
        this.questions = questions;
    }

    public void addQuestion(Question question) {
        this.questions.add(question);
    }

    public void removeQuestion(Question question) {
        this.questions.remove(question);
    }

    public static class Builder {
        private String id;
        private String title;
        private String description;
        private String authorId;
        private Boolean isPublic;
        private List<Question> questions;

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

        public Builder setAuthorId(String authorId) {
            this.authorId = authorId;
            return this;
        }

        public Builder setPublic(Boolean isPublic) {
            this.isPublic = isPublic;
            return this;
        }

        public Builder setQuestions(List<Question> questions) {
            this.questions = questions;
            return this;
        }

        public Quiz build() {
            Quiz quiz = new Quiz(title, description, authorId, isPublic, questions);
            quiz.setId(id);
            return quiz;
        }
    }
}
