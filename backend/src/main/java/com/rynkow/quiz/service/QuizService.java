package com.rynkow.quiz.service;

import com.rynkow.quiz.model.Quiz;
import com.rynkow.quiz.repository.QuizRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class QuizService {
    private QuizRepository quizRepository;

    @Autowired
    public void setQuizRepository(QuizRepository quizRepository) {
        this.quizRepository = quizRepository;
    }

    public List<Quiz> findAll() {
        return quizRepository.findAll();
    }

    public Optional<Quiz> findByID(String id) {
        return quizRepository.findById(id);
    }

    public List<Quiz> findByAuthorId(String authorId) {
        return quizRepository.findByAuthorId(authorId);
    }
}
