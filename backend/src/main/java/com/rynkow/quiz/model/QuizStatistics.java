package com.rynkow.quiz.model;


import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.Map;
import java.util.Optional;

@Document(collection = "quizstatistics")
public class QuizStatistics {
    @Id
    private String id;
    private String userId;
    private String quizId;
    private Map<String, QuestionStatistics> questionsStatistics;

    public QuizStatistics(String userId, String quizId, Map<String, QuestionStatistics> questionsStatistics) {
        this.userId = userId;
        this.quizId = quizId;
        this.questionsStatistics = questionsStatistics;
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;

    }

    public String getUserId() {
        return userId;
    }

    public void setUserId(String userId) {
        this.userId = userId;
    }

    public String getQuizId() {
        return quizId;
    }

    public void setQuizId(String quizId) {
        this.quizId = quizId;
    }

    public Map<String, QuestionStatistics> getQuestionsStatistics() {
        return questionsStatistics;
    }

    public void setQuestionsStatistics(Map<String, QuestionStatistics> questionsStatistics) {
        this.questionsStatistics = questionsStatistics;
    }

    public Optional<QuestionStatistics> getQuestionStatistic(String questionId) {
        return Optional.ofNullable(questionsStatistics.get(questionId));
    }

    public void setQuestionStatistics(String questionId, QuestionStatistics questionStatistics) {
        questionsStatistics.put(questionId, questionStatistics);
    }
}
