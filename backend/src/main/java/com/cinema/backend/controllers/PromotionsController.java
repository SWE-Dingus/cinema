package com.cinema.backend.controllers;

import static org.springframework.http.HttpStatus.NOT_FOUND;

import com.cinema.backend.repositories.PromotionsRepository;
import com.cinema.backend.entities.Promotion;
import jakarta.validation.Valid;
import java.util.HashMap;
import java.util.Map;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.server.ResponseStatusException;

@RestController
@RequestMapping("/promotions")
public class PromotionsController {

  private final PromotionsRepository promotionsRepository;

  @Autowired
  public PromotionsController(PromotionsRepository promotionsRepository) {
    this.promotionsRepository = promotionsRepository;
  }

  @PostMapping("/create")
  public Map<String, String> createPromotion(@Valid @RequestBody Promotion promotion) {
    promotionsRepository.save(promotion);
    return new HashMap<>() {
      {
        this.put("id", promotion.getCode());
      }
    };
  }

  @GetMapping("/get/{id}")
  public Promotion getPromotion(@PathVariable long id) {
    return promotionsRepository.findById(id).orElseThrow(() -> new ResponseStatusException(NOT_FOUND));
  }

  @GetMapping("/getAll")
  public List<Promotion> getPromotions() {
    return promotionsRepository.findAll();
  }

  @PutMapping("/update/{id}")
  public void updatePaymentCard(@PathVariable long id, @Valid @RequestBody Promotion promotion) {
    var dbPromotion =
      promotionsRepository.findById(id).orElseThrow(() -> new ResponseStatusException(NOT_FOUND));
    dbPromotion.copy(promotion);
    promotionsRepository.save(dbPromotion);
  }

  @DeleteMapping("/delete/{id}")
  public void deletePaymentCard(@PathVariable long id) {
    promotionsRepository.deleteById(id);
  }
}
