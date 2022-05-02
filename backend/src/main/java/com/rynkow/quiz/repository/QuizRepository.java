package com.rynkow.quiz.repository;

import com.rynkow.quiz.model.quiz.Quiz;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.List;

public interface QuizRepository extends MongoRepository<Quiz, String> {
    List<Quiz> findByAuthorId(String authorId);
}
