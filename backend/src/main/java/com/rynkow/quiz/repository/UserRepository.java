package com.rynkow.quiz.repository;

import com.rynkow.quiz.model.User;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface UserRepository extends MongoRepository<User, String> {
}
