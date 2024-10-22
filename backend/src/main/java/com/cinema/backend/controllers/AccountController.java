package com.cinema.backend.controllers;

import static org.springframework.http.HttpStatus.BAD_REQUEST;
import static org.springframework.http.HttpStatus.NOT_FOUND;

import com.cinema.backend.entities.AuthenticationToken;
import com.cinema.backend.entities.User;
import com.cinema.backend.entities.User.UserState;
import com.cinema.backend.records.*;
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

  private final EmailService emailService;

  AccountsService accountsService;

  @Autowired
  public AccountController(
      AccountsService accountsService, EmailService emailService, UserRepository userRepository) {
    this.accountsService = accountsService;
    this.emailService = emailService;
    this.userRepository = userRepository;
  }

  @PostMapping("register")
  public void register(@RequestBody @Valid RegistrationInfo registrationInfo) {
    int codeToUse = sendRegistrationEmail(registrationInfo.email());
    var newUser = new User();
    newUser.email = registrationInfo.email();
    newUser.password = registrationInfo.password();
    newUser.firstName = registrationInfo.firstName();
    newUser.lastName = registrationInfo.lastName();
    newUser.lastConfirmationCode = codeToUse;
    newUser.state = UserState.INACTIVE;
    newUser.wantsMarketingEmails = registrationInfo.wantsMarketingEmails();
    if (registrationInfo.homeAddress() != null && !registrationInfo.homeAddress().isBlank()) {
      newUser.address = registrationInfo.homeAddress();
    }
    if (registrationInfo.paymentCard() != null) {
      accountsService.savePaymentCard(newUser.email, registrationInfo.paymentCard());
    }
    userRepository.save(newUser);
  }

  @PostMapping("confirmRegistration") // Used for taking the given code and confirming
  public void confirmAccount(@RequestBody @Valid AccountConfirmationInfo confirmationInfo) {
    // Take confirmation info, compare to code in User, and go
    // lastConfirmationCode
    User toConfirm =
        userRepository
            .findById(confirmationInfo.userEmail())
            .orElseThrow(() -> new ResponseStatusException(NOT_FOUND));
    if (confirmationInfo.confirmationCode() == toConfirm.lastConfirmationCode) {
      toConfirm.state = User.UserState.ACTIVE;
    }
  }

  @PostMapping("login") // Modify login for confirmation
  public AuthenticationToken login(@RequestBody @Valid LoginInfo loginInfo) {
    User isActive =
        userRepository
            .findById(loginInfo.email())
            .orElseThrow(() -> new ResponseStatusException(NOT_FOUND));

    // Returns NOT_FOUND if the user does not exist
    // Returns BAD_REQUEST if the user state is inactive
    if (isActive.state != User.UserState.ACTIVE) {
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

  @PutMapping("/changePassword")
  public void changePassword(@RequestBody @Valid PasswordChangeInfo passwordChangeInfo) {
    // This should only be called when a user is LOGGED IN
    // This should be called when a user is changing their password
    User toChange =
        userRepository
            .findById(passwordChangeInfo.userEmail())
            .orElseThrow(() -> new ResponseStatusException(NOT_FOUND));
    boolean areSame =
        AccountsService.passwordEncoder.matches(
            passwordChangeInfo.oldPassword(), toChange.password);
    if (areSame) {
      toChange.password = AccountsService.passwordEncoder.encode(passwordChangeInfo.newPassword());
    }
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
