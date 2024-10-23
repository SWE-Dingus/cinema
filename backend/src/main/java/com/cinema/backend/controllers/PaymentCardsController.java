package com.cinema.backend.controllers;

import static org.springframework.http.HttpStatus.BAD_REQUEST;
import static org.springframework.http.HttpStatus.NOT_FOUND;

import com.cinema.backend.entities.PaymentCard;
import com.cinema.backend.entities.User;
import com.cinema.backend.repositories.PaymentCardsRepository;
import com.cinema.backend.repositories.UserRepository;
import jakarta.validation.Valid;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

@RestController
@RequestMapping("/paymentCards")
public class PaymentCardsController {

  private final PaymentCardsRepository paymentCardsRepository;

  private final UserRepository userRepository;

  @Autowired
  public PaymentCardsController(
      PaymentCardsRepository paymentCardsRepository, UserRepository userRepository) {
    this.paymentCardsRepository = paymentCardsRepository;
    this.userRepository = userRepository;
  }

  @PostMapping("/create")
  public void createPaymentCard(@Valid @RequestBody PaymentCard paymentCardInfo) {
    // String emailToCheck = paymentCardInfo.getUserEmail();
    User toUse =
        userRepository
            .findById(paymentCardInfo.getUserEmail())
            .orElseThrow(() -> new ResponseStatusException(BAD_REQUEST));
    // The above throws a BAD_REQUEST error if the User does not exist
    if (toUse.getUserCards().size() < 3) {
      paymentCardsRepository.save(paymentCardInfo);
      toUse.addPaymentCard(paymentCardInfo);
    }
  }

  @GetMapping("/get/{id}")
  public PaymentCard getPaymentCard(@PathVariable String id) {
    return paymentCardsRepository
        .findById(id)
        .orElseThrow(() -> new ResponseStatusException(NOT_FOUND));
  }

  @PutMapping("/edit")
  public void setPaymentCard(@Valid @RequestBody PaymentCard paymentCard) {
    PaymentCard cardToChange =
        paymentCardsRepository
            .findById(paymentCard.cardNumber)
            .orElseThrow(() -> new ResponseStatusException(NOT_FOUND));
    cardToChange.update(paymentCard);
  }

  @GetMapping("/getAll")
  public List<PaymentCard> getAll() {
    return paymentCardsRepository.findAll();
  }

  @DeleteMapping("/delete/{id}")
  public void deletePaymentCard(@PathVariable String id) {
    paymentCardsRepository.deleteById(id);
  }
}
