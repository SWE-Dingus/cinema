package com.cinema.backend.controllers;

import com.cinema.backend.entities.User;
import com.cinema.backend.records.AccountPersonalInfo;
import com.cinema.backend.repositories.UserRepository;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/admin")
public class AdminController {

  private UserRepository userRepository;

  @Autowired
  public AdminController(UserRepository userRepository) {
    this.userRepository = userRepository;
  }

  @GetMapping("/getAllUsers")
  public List<User> getAllUsers() {
    return userRepository.findAll();
  }

  @PostMapping("/updateUser")
  public void updateUser(@RequestBody AccountPersonalInfo userUpdates) {
    var user =
        userRepository
            .findById(userUpdates.email)
            .orElseThrow(() -> new UsernameNotFoundException("Could not find user"));
    if (userUpdates.firstName != null) user.firstName = userUpdates.firstName;
    if (userUpdates.lastName != null) user.lastName = userUpdates.lastName;
    if (userUpdates.billingAddr != null) user.address = userUpdates.billingAddr;
    if (userUpdates.billingAddr != null) user.address = userUpdates.billingAddr;
    if (userUpdates.authorizationLevel != null)
      user.authorizationLevel = userUpdates.authorizationLevel;
    if (userUpdates.wantsMarketingEmails != null)
      user.wantsMarketingEmails = userUpdates.wantsMarketingEmails;
  }
}
