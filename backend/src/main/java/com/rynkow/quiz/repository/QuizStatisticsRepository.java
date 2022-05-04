package com.rynkow.quiz.repository;

import com.rynkow.quiz.model.quiz.QuizStatistics;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface QuizStatisticsRepository extends MongoRepository<QuizStatistics, String> {
    Optional<QuizStatistics> findByUserIdAndQuizId(String userId, String quizId);
}
