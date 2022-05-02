package com.rynkow.quiz.model.user;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "users")
public class User {
    @Id
    private String id;
    private String name;
    private String password;
    private AuthRole role;
    private Boolean deactivated;


    public User(String name, String password) {
        this.name = name;
        this.password = password;
        this.role = AuthRole.USER;
        this.deactivated = false;
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
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

    public Boolean getDeactivated() {
        return deactivated;
    }

    public void deactivate() {
        this.deactivated = true;
    }

    public void activate() {
        this.deactivated = false;
    }
}
