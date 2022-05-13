package com.rynkow.quiz.service;

import com.rynkow.quiz.model.quiz.Quiz;
import com.rynkow.quiz.model.quiz.QuizStatistics;
import com.rynkow.quiz.repository.QuizRepository;
import com.rynkow.quiz.repository.QuizStatisticsRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.NoSuchElementException;
import java.util.Optional;

@Service
public class QuizService {
    private QuizRepository quizRepository;
    private QuizStatisticsRepository quizStatisticsRepository;
    private UserService userService;

    @Autowired
    public void setUserService(UserService userService) {
        this.userService = userService;
    }

    @Autowired
    public void setQuizRepository(QuizRepository quizRepository) {
        this.quizRepository = quizRepository;
    }

    @Autowired
    public void setQuizStatisticsRepository(QuizStatisticsRepository quizStatisticsRepository) {
        this.quizStatisticsRepository = quizStatisticsRepository;
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

    public void saveOrUpdate(Quiz quiz) {
        quizRepository.save(quiz);
    }

    public void deleteById(String id) {
        quizRepository.deleteById(id);
    }

    public Optional<QuizStatistics> findQuizStatistics(String userId, String quizId) {
        return quizStatisticsRepository.findByUserIdAndQuizId(userId, quizId);
    }

    public void saveOrUpdateQuizStatistics(QuizStatistics quizStatistics) {
        quizStatisticsRepository.save(quizStatistics);
        System.out.println("saved stats");
    }

    public Optional<String> getQuizAuthorName(String quizId) {
        try {
            Quiz quiz = findByID(quizId).orElseThrow();
            return userService.getName(quiz.getAuthorId());
        } catch (NoSuchElementException e) {
            return Optional.empty();
        }
    }
}
