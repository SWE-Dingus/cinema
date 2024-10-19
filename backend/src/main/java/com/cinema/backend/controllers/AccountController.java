package com.cinema.backend.controllers;

import com.cinema.backend.entities.AuthenticationToken;
import com.cinema.backend.records.LoginInfo;
import com.cinema.backend.records.LogoutInfo;
import com.cinema.backend.records.RegistrationInfo;
import com.cinema.backend.services.AccountsService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/auth")
public class AccountController {
  AccountsService accountsService;

  @Autowired
  public AccountController(AccountsService accountsService) {
    this.accountsService = accountsService;
  }

  @PostMapping("register")
  public void register(@RequestBody @Valid RegistrationInfo registrationInfo) {
    accountsService.registerUser(registrationInfo);
  }

  @PostMapping("login")
  public AuthenticationToken login(@RequestBody @Valid LoginInfo loginInfo) {
    return accountsService.login(loginInfo);
  }

  @PostMapping("logout")
  public void logout(@RequestBody @Valid LogoutInfo logoutInfo) {
    accountsService.logout(logoutInfo);
  }
}
