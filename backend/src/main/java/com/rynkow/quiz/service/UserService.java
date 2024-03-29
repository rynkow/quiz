package com.rynkow.quiz.service;

import com.rynkow.quiz.model.user.User;
import com.rynkow.quiz.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class UserService {
    private UserRepository userRepository;

    @Autowired
    public void setUserRepository(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    public Optional<User> findById(String id) {
        return userRepository.findById(id);
    }

    public Optional<User> findByName(String name) {
        return userRepository.findByName(name);
    }

    public Optional<String> getName(String id) {
        return userRepository.findById(id).map(User::getName);
    }

    public Optional<String> getId(String name) {
        return userRepository.findByName(name).map(User::getId);
    }

}
