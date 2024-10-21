package com.cinema.backend.repositories;

import com.cinema.backend.entities.Confirmation;
import jakarta.validation.constraints.Email;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ConfirmationRepository extends JpaRepository<Confirmation, @Email String> {}
