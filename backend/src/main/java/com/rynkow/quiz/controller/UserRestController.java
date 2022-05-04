package com.rynkow.quiz.controller;

import com.rynkow.quiz.dto.UserDTO;
import com.rynkow.quiz.model.user.AuthRole;
import com.rynkow.quiz.model.user.User;
import com.rynkow.quiz.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

@RestController
@RequestMapping("/user")
public class UserRestController {

    private UserRepository userRepository;

    private PasswordEncoder passwordEncoder;

    @GetMapping("/login")
    public UserDTO login(Authentication authentication) {
        AuthRole userRole = (AuthRole) authentication.getAuthorities().stream().findFirst().orElseThrow(
                () -> new ResponseStatusException(HttpStatus.CONFLICT, "User with no authority")
        );
        return new UserDTO(
                authentication.getName(), null, userRole);
    }

    @PostMapping("/singup")
    public ResponseEntity<?> singup(@RequestBody UserDTO userDTO) {
        if (userDTO.getName() == null || userDTO.getPassword() == null)
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "invalid user data");

        if (userRepository.existsByName(userDTO.getName()))
            throw new ResponseStatusException(HttpStatus.CONFLICT, "username taken");

        userRepository.save(new User(userDTO.getName(), passwordEncoder.encode(userDTO.getPassword())));
        return new ResponseEntity<>("singup completed", HttpStatus.OK);
    }

    @Autowired
    public void setUserRepository(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @Autowired
    public void setPasswordEncoder(PasswordEncoder passwordEncoder) {
        this.passwordEncoder = passwordEncoder;
    }
}
