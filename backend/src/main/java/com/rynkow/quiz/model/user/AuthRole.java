package com.rynkow.quiz.model.user;

import org.springframework.security.core.GrantedAuthority;

public enum AuthRole implements GrantedAuthority {
    USER, ADMIN;

    @Override
    public String getAuthority() {
        return this.toString();
    }
}
