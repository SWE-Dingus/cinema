package com.cinema.backend.repositories;

import com.cinema.backend.entities.Admin;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRepository extends JpaRepository<Admin, Long> {}
