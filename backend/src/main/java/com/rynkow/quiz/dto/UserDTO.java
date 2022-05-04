package com.rynkow.quiz.dto;

import com.rynkow.quiz.model.user.AuthRole;
import com.rynkow.quiz.model.user.User;

public class UserDTO {
    private String name;
    private String password;
    private AuthRole role;

    public UserDTO(String name, String password, AuthRole role) {
        this.name = name;
        this.password = password;
        this.role = role;
    }

    public static UserDTO build(User user) {
        return new UserDTO(user.getName(), null, user.getRole());
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public AuthRole getRole() {
        return role;
    }

    public void setRole(AuthRole role) {
        this.role = role;
    }
}
