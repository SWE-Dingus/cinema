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
import org.apache.commons.lang3.RandomStringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
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
    newUser.password = AccountsService.passwordEncoder.encode(registrationInfo.password());
    newUser.firstName = registrationInfo.firstName();
    newUser.lastName = registrationInfo.lastName();
    newUser.phoneNumber = registrationInfo.phoneNumber();
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
    User toConfirm =
        userRepository
            .findById(confirmationInfo.userEmail())
            .orElseThrow(() -> new ResponseStatusException(NOT_FOUND, "User does not exist."));
    if (toConfirm.state != UserState.INACTIVE) {
      throw new ResponseStatusException(BAD_REQUEST, "Account has already been confirmed");
    } else if (confirmationInfo.confirmationCode() != toConfirm.lastConfirmationCode) {
      throw new ResponseStatusException(BAD_REQUEST, "Invalid confirmation code");
    }
    toConfirm.state = UserState.ACTIVE;
    userRepository.save(toConfirm);
  }

  @PostMapping("login") // Modify login for confirmation
  public AuthenticationToken login(@RequestBody @Valid LoginInfo loginInfo) {
    User isActive =
        userRepository
            .findById(loginInfo.email())
            .orElseThrow(() -> new ResponseStatusException(NOT_FOUND, "User not found"));

    // Returns NOT_FOUND if the user does not exist
    // Returns BAD_REQUEST if the user state is inactive
    if (isActive.state != User.UserState.ACTIVE) {
      throw new ResponseStatusException(BAD_REQUEST, "User has not confirmed their email");
    }
    return accountsService.login(loginInfo);
  }

  @PostMapping("logout") // Modify logout for confirmation
  public void logout(@RequestBody @Valid LogoutInfo logoutInfo) {
    accountsService.logout(logoutInfo);
  }

  @PutMapping("/edit")
  public void editProfile(@Valid @RequestBody AccountPersonalInfo accountPersonalInfo) {
    var dbUser =
        userRepository
            .findById(accountPersonalInfo.email)
            .orElseThrow(() -> new ResponseStatusException(NOT_FOUND));
    dbUser.edit(accountPersonalInfo);
    userRepository.save(dbUser);
    sendProfileChangeInfo(dbUser.email);
  }

  // Add PutMapping for Editing PaymentCards

  @GetMapping("/fetchUser")
  public User fetchUser(@Valid @RequestParam("email") String email) {
    return userRepository.findById(email).orElseThrow(() -> new ResponseStatusException(NOT_FOUND));
  }

  @PostMapping("resetPassword")
  public void resetPassword(@RequestBody @Valid PasswordResetInfo passwordResetInfo)
      throws MessagingException {
    var user =
        userRepository
            .findById(passwordResetInfo.email())
            .orElseThrow(() -> new UsernameNotFoundException("User not found"));
    var newPassword = RandomStringUtils.secure().nextAlphanumeric(16);
    user.password = AccountsService.passwordEncoder.encode(newPassword);
    userRepository.save(user);
    emailService.sendEmail(
        user.email,
        "Password reset for Cinema E-Booking System",
        "Your password has been reset to the below value. Please use this new password to log in, and then change your password as soon as possible.\n\n"
            + newPassword);
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
      userRepository
              .findById(passwordChangeInfo.userEmail())
              .orElseThrow(() -> new ResponseStatusException(NOT_FOUND))
              .password =
          AccountsService.passwordEncoder.encode(passwordChangeInfo.newPassword());
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
        ("This is a reminder to let you know that information has changed about your account.\nPlease log in to check, and contact Dingus support with any questions.");
    try {
      emailService.sendEmail(emailRecipient, registerSubject, emailBody);
    } catch (MessagingException e) {
      throw new ResponseStatusException(NOT_FOUND);
    }
  }
}
