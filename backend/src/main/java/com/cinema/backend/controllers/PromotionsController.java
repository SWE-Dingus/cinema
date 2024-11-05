package com.cinema.backend.controllers;

import static org.springframework.http.HttpStatus.NOT_FOUND;

import com.cinema.backend.entities.Promotion;
import com.cinema.backend.repositories.PromotionsRepository;
import com.cinema.backend.repositories.UserRepository;
import com.cinema.backend.services.AccountsService;
import com.cinema.backend.services.EmailService;
import jakarta.mail.MessagingException;
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

  private final AccountsService accountsService;
  private final EmailService emailService;
  private final PromotionsRepository promotionsRepository;
  private final UserRepository userRepository;
  private final HttpServletRequest request;

  @Autowired
  public PromotionsController(
      AccountsService accountsService,
      EmailService emailService,
      PromotionsRepository promotionsRepository,
      UserRepository userRepository,
      HttpServletRequest request) {
    this.emailService = emailService;
    this.accountsService = accountsService;
    this.promotionsRepository = promotionsRepository;
    this.userRepository = userRepository;
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
  public void updatePaymentCard(@PathVariable String id, @Valid @RequestBody Promotion promotion) {
    accountsService.ensureAdmin(request);
    var dbPromotion =
        promotionsRepository.findById(id).orElseThrow(() -> new ResponseStatusException(NOT_FOUND));
    dbPromotion.copy(promotion);
    promotionsRepository.save(dbPromotion);
  }

  @DeleteMapping("/delete/{id}")
  public void deletePaymentCard(@PathVariable String id) {
    accountsService.ensureAdmin(request);
    promotionsRepository.deleteById(id);
  }

  @PostMapping("/send/{id}")
  public void sendPromotion(@PathVariable String id) {
    accountsService.ensureAdmin(request);
    var dbPromotion =
        promotionsRepository
            .findById(id)
            .orElseThrow(
                () ->
                    new ResponseStatusException(
                        NOT_FOUND, String.format("Promotion with ID %d not found", id)));
    userRepository.findAll().stream()
        .filter(u -> u.wantsMarketingEmails)
        .forEach(
            u -> {
              try {
                emailService.sendEmail(
                    u.email,
                    "Check out this new promotion from the cinema!",
                    String.format(
                        """
            We have a new promotion for you! Enter the code %s at check-out for a %.2f%% off discount!""",
                        dbPromotion.code, dbPromotion.discountPercent));
              } catch (MessagingException e) {
                System.err.println(
                    "Failed to send promotion notification email to user " + u.email);
              }
            });
  }
}
