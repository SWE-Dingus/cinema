package com.cinema.backend.repositories;

import com.cinema.backend.entities.PaymentCardInfo;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface PaymentCardsRepository extends JpaRepository<PaymentCardInfo, Long> {}
