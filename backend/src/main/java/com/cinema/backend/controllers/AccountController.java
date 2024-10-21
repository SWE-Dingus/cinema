package com.cinema.backend.controllers;

import static org.springframework.http.HttpStatus.NOT_FOUND;

import com.cinema.backend.entities.AuthenticationToken;
import com.cinema.backend.entities.Confirmation;
import com.cinema.backend.entities.User;
import com.cinema.backend.records.AccountConfirmationInfo;
import com.cinema.backend.records.LoginInfo;
import com.cinema.backend.records.LogoutInfo;
import com.cinema.backend.records.RegistrationInfo;
import com.cinema.backend.repositories.ConfirmationRepository;
import com.cinema.backend.repositories.UserRepository;
import com.cinema.backend.services.AccountsService;
import com.cinema.backend.services.EmailService;
import jakarta.mail.MessagingException;
import jakarta.validation.Valid;
import java.util.concurrent.ThreadLocalRandom;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

@RestController
@RequestMapping("/auth")
public class AccountController {

  private final UserRepository userRepository;

  private final ConfirmationRepository confirmRepository;

  private final EmailService emailService;

  AccountsService accountsService;

  @Autowired
  public AccountController(
      AccountsService accountsService,
      EmailService emailService,
      UserRepository userRepository,
      ConfirmationRepository confirmRepository) {
    this.accountsService = accountsService;
    this.emailService = emailService;
    this.userRepository = userRepository;
    this.confirmRepository = confirmRepository;
  }

  @PostMapping("register")
  public void register(@RequestBody @Valid RegistrationInfo registrationInfo) {
    int codeToUse = sendRegistrationEmail(registrationInfo.email());
    if (codeToUse != 0) {
      Confirmation toAdd = Confirmation.convert(registrationInfo, codeToUse);
      confirmRepository.save(toAdd);
    }
  }

  @PostMapping("confirmRegistration") // Used for taking the given code and confirming
  public void confirmAccount(@RequestBody @Valid AccountConfirmationInfo confirmationInfo) {
    Confirmation toAdd =
        confirmRepository
            .findById(confirmationInfo.userEmail())
            .orElseThrow(() -> new ResponseStatusException(NOT_FOUND));
    confirmRepository.delete(toAdd);
    accountsService.registerUser(Confirmation.deconvert(toAdd));
  }

  @PostMapping("login") // Modify login for confirmation
  public AuthenticationToken login(@RequestBody @Valid LoginInfo loginInfo) {
    return accountsService.login(loginInfo);
  }

  @PostMapping("logout") // Modify logout for confirmation
  public void logout(@RequestBody @Valid LogoutInfo logoutInfo) {
    accountsService.logout(logoutInfo);
  }

  @PutMapping("/edit/{email}")
  public void editProfile(@PathVariable String email, @Valid @RequestBody User user) {
    var dbUser =
        userRepository.findById(email).orElseThrow(() -> new ResponseStatusException(NOT_FOUND));
    dbUser.edit(user);
    userRepository.save(dbUser);
  }

  public int sendRegistrationEmail(String emailRecipient) {
    String registerSubject = "Dingus Account Creation";
    int randomCode = ThreadLocalRandom.current().nextInt(100000, 1000000);
    String emailBody =
        ("Please use the following code to confirm " + "your account: " + randomCode);
    try {
      emailService.sendEmail(emailRecipient, registerSubject, emailBody);
    } catch (MessagingException e) {
      throw new ResponseStatusException(NOT_FOUND);
    }
    return randomCode;
  }
} //
