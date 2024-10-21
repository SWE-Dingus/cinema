package com.cinema.backend.controllers;

import static org.springframework.http.HttpStatus.BAD_REQUEST;
import static org.springframework.http.HttpStatus.NOT_FOUND;

import com.cinema.backend.entities.AuthenticationToken;
import com.cinema.backend.entities.Confirmation;
import com.cinema.backend.entities.User;
import com.cinema.backend.records.*;
import com.cinema.backend.repositories.ConfirmationRepository;
import com.cinema.backend.repositories.UserRepository;
import com.cinema.backend.services.AccountsService;
import com.cinema.backend.services.EmailService;
import jakarta.mail.MessagingException;
import jakarta.validation.Valid;
import java.util.List;
import java.util.concurrent.ThreadLocalRandom;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

@RestController
@RequestMapping("/account")
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
    Confirmation toAdd = Confirmation.convert(registrationInfo, codeToUse);
    confirmRepository.save(toAdd);
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
    Confirmation isInactive = new Confirmation();
    User isActive = new User();
    try {
      isInactive =
          confirmRepository
              .findById(loginInfo.email())
              .orElseThrow(() -> new ResponseStatusException(NOT_FOUND));
    } catch (ResponseStatusException e) {
      isActive =
          userRepository
              .findById(loginInfo.email())
              .orElseThrow(() -> new ResponseStatusException(NOT_FOUND));
    }

    // Returns NOT_FOUND if the user does not exist
    // Returns BAD_REQUEST if the user state is inactive
    if (isInactive.state != User.UserState.ACTIVE && isActive.state != User.UserState.ACTIVE) {
      throw new ResponseStatusException(BAD_REQUEST);
    }
    return accountsService.login(loginInfo);
  }

  @PostMapping("logout") // Modify logout for confirmation
  public void logout(@RequestBody @Valid LogoutInfo logoutInfo) {
    accountsService.logout(logoutInfo);
  }

  @PutMapping("/edit/{email}")
  public void editProfile(
      @PathVariable String email, @Valid @RequestBody AccountPersonalInfo accountPersonalInfo) {
    var dbUser =
        userRepository.findById(email).orElseThrow(() -> new ResponseStatusException(NOT_FOUND));
    dbUser.edit(accountPersonalInfo);
    userRepository.save(dbUser);
    sendProfileChangeInfo(dbUser.email);
  }

  @GetMapping("/getAll")
  public List<User> getAll() {
    return userRepository.findAll();
  }

  public int sendRegistrationEmail(String emailRecipient) {
    String registerSubject = "Dingus Account Creation";
    int randomCode = ThreadLocalRandom.current().nextInt(100000, 1000000);
    String emailBody = ("Please use the following code to confirm your account: " + randomCode);
    try {
      emailService.sendEmail(emailRecipient, registerSubject, emailBody);
    } catch (MessagingException e) {
      throw new ResponseStatusException(NOT_FOUND);
    }
    return randomCode;
  }

  public void sendProfileChangeInfo(String emailRecipient) {
    String registerSubject = "Dingus Profile Information Changed";
    String emailBody =
        ("This is a reminder to let you know that information has changed about your account.");
    try {
      emailService.sendEmail(emailRecipient, registerSubject, emailBody);
    } catch (MessagingException e) {
      throw new ResponseStatusException(NOT_FOUND);
    }
  }
}
