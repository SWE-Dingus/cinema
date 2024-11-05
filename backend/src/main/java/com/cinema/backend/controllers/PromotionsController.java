package com.cinema.backend.controllers;

import static org.springframework.http.HttpStatus.NOT_FOUND;

import com.cinema.backend.entities.Promotion;
import com.cinema.backend.repositories.PromotionsRepository;
import com.cinema.backend.services.AccountsService;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.validation.Valid;
import java.util.List;
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
@RequestMapping("/promotions")
public class PromotionsController {

  private final PromotionsRepository promotionsRepository;
  private final AccountsService accountsService;
  private final HttpServletRequest request;

  @Autowired
  public PromotionsController(
      PromotionsRepository promotionsRepository,
      AccountsService accountsService,
      HttpServletRequest request) {
    this.promotionsRepository = promotionsRepository;
    this.accountsService = accountsService;
    this.request = request;
  }

  @PostMapping("/create")
  public void createPromotion(@Valid @RequestBody Promotion promotion) {
    accountsService.ensureAdmin(request);
    promotionsRepository.save(promotion);
  }

  @GetMapping("/getAll")
  public List<Promotion> getPromotions() {
    accountsService.ensureAdmin(request);
    return promotionsRepository.findAll();
  }

  @PutMapping("/update/{id}")
  public void updatePaymentCard(@PathVariable long id, @Valid @RequestBody Promotion promotion) {
    accountsService.ensureAdmin(request);
    var dbPromotion =
        promotionsRepository.findById(id).orElseThrow(() -> new ResponseStatusException(NOT_FOUND));
    dbPromotion.copy(promotion);
    promotionsRepository.save(dbPromotion);
  }

  @DeleteMapping("/delete/{id}")
  public void deletePaymentCard(@PathVariable long id) {
    accountsService.ensureAdmin(request);
    promotionsRepository.deleteById(id);
  }
}
