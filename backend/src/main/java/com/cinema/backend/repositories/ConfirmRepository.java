package com.cinema.backend.repositories;

import com.cinema.backend.entities.Confirmation;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ConfirmRepository extends JpaRepository<Confirmation, Long> {}

