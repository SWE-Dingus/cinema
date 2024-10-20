package com.cinema.backend.controllers;

import static org.springframework.http.HttpStatus.NOT_FOUND;

import com.cinema.backend.entities.Confirmation;
import com.cinema.backend.entities.User;
import com.cinema.backend.repositories.ConfirmRepository;
import com.cinema.backend.repositories.UserRepository;
import com.cinema.backend.entities.AuthenticationToken;
import com.cinema.backend.records.LoginInfo;
import com.cinema.backend.records.LogoutInfo;
import com.cinema.backend.records.RegistrationInfo;
import com.cinema.backend.services.AccountsService;
import com.cinema.backend.services.EmailService;
import jakarta.mail.MessagingException;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;
import java.security.SecureRandom;
import java.util.List;

@RestController
@RequestMapping("/auth")
public class AccountController {

  private final UserRepository userRepository;

  private final ConfirmRepository confirmRepository;

  @Autowired
  private EmailService emailService;

  AccountsService accountsService;

  @Autowired
  public AccountController(AccountsService accountsService, UserRepository userRepository, ConfirmRepository confirmRepository) {
    this.accountsService = accountsService;
    this.userRepository = userRepository;
    this.confirmRepository = confirmRepository;
  }

  @PostMapping("register")
  public void register(@RequestBody @Valid RegistrationInfo registrationInfo) {
    int codeToUse = sendRegistrationEmail(registrationInfo.email());
    if (codeToUse != 0) {
      //accountsService.registerUser(registrationInfo);
      Confirmation toAdd = new Confirmation();
      toAdd = toAdd.convert(registrationInfo, codeToUse);
      confirmRepository.save(toAdd);
    }
  }

  @PostMapping("confirmation") // Used for taking the given code and confirming
  public String confirmAccount(@RequestBody @Valid int validateCode) {
    long idToFind = validateCode;
    Confirmation toAdd = confirmRepository.findById(idToFind)
      .orElseThrow(() -> new ResponseStatusException(NOT_FOUND));
    System.out.println("Confirmation found.");
    accountsService.registerUser(toAdd.deconvert(toAdd));
    return "Confirmation done";
  }

  @PostMapping("login") // Modify login for confirmation
  public AuthenticationToken login(@RequestBody @Valid LoginInfo loginInfo) {
    return accountsService.login(loginInfo);
  }

  @PostMapping("logout") // Modify logout for confirmation
  public void logout(@RequestBody @Valid LogoutInfo logoutInfo) {
    accountsService.logout(logoutInfo);
  }

  @PutMapping("/edit/{id}")
  public void editProfile(@PathVariable String email, @Valid @RequestBody User user) {
    var dbUser =
      userRepository.findById(email).orElseThrow(() -> new ResponseStatusException(NOT_FOUND));
    dbUser.edit(user);
    userRepository.save(dbUser);
  }

  /**
   * This Get Mapping is to be used only for Debugging purposes.
   *
   * @return List<User> for all users
   */
  @GetMapping("/getAll")
  public List<User> getUsers() {
    return userRepository.findAll();
  }

  public int sendRegistrationEmail(String emailRecipient) {
    try {
      String registerSubject = "Dingus Account Creation";
      SecureRandom secureRandom = new SecureRandom();
      int randomCode = 100000 + secureRandom.nextInt(900000);
      String emailBody = ("Please use the following code to confirm " +
        "your account: " + randomCode);
      emailService.sendEmail(emailRecipient, registerSubject,
        emailBody);
      return randomCode;
    } catch (MessagingException e) {
      System.out.println("Failed to send email: " + e.getMessage());
      return 0;
    }
  }
} //
