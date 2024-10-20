package com.cinema.backend.controllers;

import static org.springframework.http.HttpStatus.NOT_FOUND;

import com.cinema.backend.entities.PaymentCardInfo;
import com.cinema.backend.repositories.PaymentCardsRepository;
import jakarta.validation.Valid;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.server.ResponseStatusException;

@RestController
@RequestMapping("/paymentCards")
public class PaymentCardsController {

  private final PaymentCardsRepository paymentCardsRepository;

  @Autowired
  public PaymentCardsController(PaymentCardsRepository paymentCardsRepository) {
    this.paymentCardsRepository = paymentCardsRepository;
  }

  @PostMapping("/create")
  public Map<String, Long> createPaymentCard(@Valid @RequestBody PaymentCardInfo paymentCardInfo) {
    paymentCardsRepository.save(paymentCardInfo);
    return new HashMap<>() {
      {
        this.put("id", paymentCardInfo.getUserId());
      }
    };
  }

  @GetMapping("/get/{id}")
  public PaymentCardInfo getPaymentCard(@PathVariable long id) {
    return paymentCardsRepository.findById(id).orElseThrow(() -> new ResponseStatusException(NOT_FOUND));
  }

  @DeleteMapping("/delete/{id}")
  public void deletePaymentCard(@PathVariable long id) {
    paymentCardsRepository.deleteById(id);
  }
}
