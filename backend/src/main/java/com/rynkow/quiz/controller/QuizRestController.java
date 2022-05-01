package com.rynkow.quiz.controller;

import com.rynkow.quiz.dto.QuizDTO;
import com.rynkow.quiz.model.Quiz;
import com.rynkow.quiz.service.QuizService;
import com.rynkow.quiz.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;

@RestController
@RequestMapping("/quiz")
public class QuizRestController {
    private QuizService quizService;
    private UserService userService;

    @GetMapping("/list")
    public List<QuizDTO> getQuizList() {
        return quizService.findAll().stream()
                .filter(Quiz::getPublic)
                .map(this::convertToDTO)
                .toList();
    }

    @GetMapping("/{quizId}")
    public QuizDTO getQuizById(@PathVariable String quizId) {
        return convertToDTO(
                quizService.findByID(quizId)
                        .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "quiz not found"))
        );
    }

    @GetMapping("/{authorId}")
    public List<QuizDTO> getQuizByAuthorId(@PathVariable String authorId) {
        return quizService.findByAuthorId(authorId).stream()
                .filter(Quiz::getPublic)
                .map(this::convertToDTO)
                .toList();
    }

    @PostMapping("/create")
    public ResponseEntity<?> createOrUpdateQuiz(@RequestBody QuizDTO quizDTO) {
        quizService.saveOrUpdate(convertFromDTO(quizDTO));
        return new ResponseEntity<>("quiz saved successfully", HttpStatus.OK);
    }

    @PostMapping("/delete/{id}")
    public ResponseEntity<?> deleteQuiz(@PathVariable String id) {
        quizService.deleteById(id);
        return new ResponseEntity<>("quiz deleted successfully", HttpStatus.OK);
    }

    private QuizDTO convertToDTO(Quiz quiz) {
        return new QuizDTO.Builder()
                .setId(quiz.getId())
                .setAuthor(userService.findById(quiz.getAuthorId()).orElseThrow(() -> new ResponseStatusException(HttpStatus.BAD_REQUEST, "author not found")).getName())
                .setDescription(quiz.getDescription())
                .setPublic(quiz.getPublic())
                .setQuestions(quiz.getQuestions())
                .setTitle(quiz.getTitle())
                .build();
    }

    private Quiz convertFromDTO(QuizDTO quizDTO) {
        return new Quiz.Builder()
                .setId(quizDTO.getId())
                .setAuthorId(userService.findByName(quizDTO.getAuthor()).orElseThrow(() -> new ResponseStatusException(HttpStatus.BAD_REQUEST, "author not found")).getId())
                .setDescription(quizDTO.getDescription())
                .setPublic(quizDTO.getPublic())
                .setQuestions(quizDTO.getQuestions())
                .setTitle(quizDTO.getTitle())
                .build();
    }

    @Autowired
    public void setQuizService(QuizService quizService) {
        this.quizService = quizService;
    }

    @Autowired
    public void setUserService(UserService userService) {
        this.userService = userService;
    }
}
