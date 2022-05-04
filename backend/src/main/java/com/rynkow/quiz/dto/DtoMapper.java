package com.rynkow.quiz.dto;

import com.rynkow.quiz.model.question.Question;
import com.rynkow.quiz.model.question.QuestionStatistics;
import com.rynkow.quiz.model.quiz.Quiz;
import com.rynkow.quiz.model.quiz.QuizStatistics;
import com.rynkow.quiz.model.user.User;
import com.rynkow.quiz.service.QuizService;
import com.rynkow.quiz.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.util.HashMap;
import java.util.Map;

@Service
public class DtoMapper {

    private UserService userService;
    private QuizService quizService;

    public QuizDTO mapToDTO(Quiz quiz) throws ResponseStatusException {
        return new QuizDTO.Builder()
                .setId(quiz.getId())
                .setAuthor(userService.getName(quiz.getAuthorId()).orElseThrow(() -> new ResponseStatusException(HttpStatus.BAD_REQUEST, "author not found")))
                .setDescription(quiz.getDescription())
                .setPublic(quiz.getPublic())
                .setQuestions(quiz.getQuestions().stream().map(this::mapToDTO).toList())
                .setTitle(quiz.getTitle())
                .build();
    }

    public Quiz mapFromDTO(QuizDTO quizDTO) throws ResponseStatusException {
        return new Quiz.Builder()
                .setId(quizDTO.getId())
                .setAuthorId(userService.getId(quizDTO.getAuthor()).orElseThrow(() -> new ResponseStatusException(HttpStatus.BAD_REQUEST, "author not found")))
                .setDescription(quizDTO.getDescription())
                .setPublic(quizDTO.getPublic())
                .setQuestions(quizDTO.getQuestions().stream().map(this::mapFromDTO).toList())
                .setTitle(quizDTO.getTitle())
                .build();
    }

    public QuizDTO fillUserStatistics(QuizDTO quizDTO, String userName) {
        String userId = userService.getId(userName).orElse(null);
        Map<String, QuestionStatistics> questionsStatistics = quizService
                .findQuizStatistics(userId, quizDTO.getId())
                .map(QuizStatistics::getQuestionsStatistics)
                .orElse(new HashMap<>());

        QuizDTO clone = quizDTO.clone();
        for (QuestionDTO questionDTO : clone.getQuestions()) {
            if (questionsStatistics.containsKey(questionDTO.getId())) {
                questionDTO.setQuestionStatistics(questionsStatistics.get(questionDTO.getId()));
            }
        }
        return clone;
    }

    public QuestionDTO mapToDTO(Question question) {
        return new QuestionDTO(question);
    }

    public Question mapFromDTO(QuestionDTO questionDTO) {
        Question question = new Question(questionDTO.getQuestion(), questionDTO.getAnswers(), questionDTO.getMultipleChoice());
        if (questionDTO.getId() != null)
            question.setId(questionDTO.getId());
        return question;
    }

    public UserDTO mapToDTO(User user) {
        return new UserDTO(user.getName(), null, user.getRole());
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
