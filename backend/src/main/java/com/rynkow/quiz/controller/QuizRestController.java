package com.rynkow.quiz.controller;

import com.rynkow.quiz.dto.DtoMapper;
import com.rynkow.quiz.dto.QuizDTO;
import com.rynkow.quiz.model.question.QuestionStatistics;
import com.rynkow.quiz.model.quiz.QuizStatistics;
import com.rynkow.quiz.service.QuizService;
import com.rynkow.quiz.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import java.util.HashMap;
import java.util.List;
import java.util.Objects;
import java.util.Optional;

@RestController
@RequestMapping("/quiz")
public class QuizRestController {
    private QuizService quizService;
    private UserService userService;
    private DtoMapper dtoMapper;

    @GetMapping("/list")
    public List<QuizDTO> getQuizList(Authentication authentication) {
        final String userName = authentication == null
                ? null
                : authentication.getName();
        return quizService.findAll().stream()
                .map(dtoMapper::mapToDTO)
                .filter(quizDTO -> quizDTO.getPublic() || Objects.equals(userName, quizDTO.getAuthor()))
                .map(quizDTO -> dtoMapper.fillUserStatistics(quizDTO, userName))
                .toList();
    }

    @GetMapping("/details/{quizId}")
    public QuizDTO getQuizById(@PathVariable String quizId, Authentication authentication) {
        QuizDTO quiz = quizService.findByID(quizId)
                .map(dtoMapper::mapToDTO)
                .map(quizDTO -> dtoMapper.fillUserStatistics(quizDTO, authentication.getName()))
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "quiz not found"));

        if (!quiz.getPublic() && !Objects.equals(quiz.getAuthor(), authentication.getName()))
            throw new ResponseStatusException(HttpStatus.FORBIDDEN, "unauthorized");
        return quiz;
    }

    @GetMapping("/author/{authorName}")
    public List<QuizDTO> getQuizByAuthorId(@PathVariable String authorName, Authentication authentication) {
        String authorId = userService.getId(authorName).orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND));
        return quizService.findByAuthorId(authorId).stream()
                .filter(quiz -> quiz.getPublic() || Objects.equals(quiz.getAuthorId(), authorId))
                .map(dtoMapper::mapToDTO)
                .map(quizDTO -> dtoMapper.fillUserStatistics(quizDTO, authentication.getName()))
                .toList();
    }

    @PostMapping("/create")
    public ResponseEntity<?> createQuiz(@RequestBody QuizDTO quizDTO, Authentication authentication) {
        if (!Objects.equals(quizDTO.getAuthor(), authentication.getName()))
            throw new ResponseStatusException(HttpStatus.CONFLICT);
        if (quizDTO.getId() != null)
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST);
        quizService.saveOrUpdate(dtoMapper.mapFromDTO(quizDTO));
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @PostMapping("/update")
    public ResponseEntity<?> UpdateQuiz(@RequestBody QuizDTO quizDTO, Authentication authentication) {
        if (!Objects.equals(quizDTO.getAuthor(), authentication.getName()))
            throw new ResponseStatusException(HttpStatus.CONFLICT);
        String authorName = quizService.getQuizAuthorName(quizDTO.getId()).orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND));
        if (!Objects.equals(authorName, authentication.getName()))
            throw new ResponseStatusException(HttpStatus.FORBIDDEN);
        quizService.saveOrUpdate(dtoMapper.mapFromDTO(quizDTO));
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @PostMapping("/delete/{id}")
    public ResponseEntity<?> deleteQuiz(@PathVariable String id, Authentication authentication) {
        String authorName = quizService.getQuizAuthorName(id).orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND));
        if (!Objects.equals(authorName, authentication.getName()))
            throw new ResponseStatusException(HttpStatus.FORBIDDEN);
        quizService.deleteById(id);
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @PostMapping("/{quizId}/{questionId}/updatestats")
    public ResponseEntity<?> updateQuizStatistics(
            @PathVariable String quizId,
            @PathVariable String questionId,
            @RequestParam(required = false) Integer wrong,
            @RequestParam(required = false) Integer correct,
            @RequestParam(required = false) Boolean needsReview,
            Authentication authentication
    ) {
        String userId = userService.getId(authentication.getName()).orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND));
        QuizStatistics quizStatistics = quizService.findQuizStatistics(userId, quizId).orElse(new QuizStatistics(userId, quizId, new HashMap<>()));
        QuestionStatistics questionStatistics = Optional.ofNullable(quizStatistics.getQuestionsStatistics().get(questionId)).orElse(new QuestionStatistics());
        if (wrong != null)
            questionStatistics.newWrongAnswers(wrong);
        if (correct != null)
            questionStatistics.newCorrectAnswers(correct);
        if (needsReview != null)
            questionStatistics.setNeedsReview(needsReview);
        quizStatistics.getQuestionsStatistics().put(questionId, questionStatistics);
        quizService.saveOrUpdateQuizStatistics(quizStatistics);
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @Autowired
    public void setUserService(UserService userService) {
        this.userService = userService;
    }

    @Autowired
    public void setQuizService(QuizService quizService) {
        this.quizService = quizService;
    }

    @Autowired
    public void setDtoMapper(DtoMapper dtoMapper) {
        this.dtoMapper = dtoMapper;
    }
}
