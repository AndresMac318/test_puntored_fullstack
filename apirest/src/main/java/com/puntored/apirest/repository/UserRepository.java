package com.puntored.apirest.repository;

import com.puntored.apirest.domain.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface UserRepository extends JpaRepository<User, Long> {

    Optional<User> findOneByEmail(String email);
    boolean existsByEmail(String email);
}
