package com.cinema.backend.controllers;

import com.cinema.backend.repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/users")
public class UsersController {
  private final UserRepository userRepository;

  @Autowired
  public UsersController(UserRepository userRepository) {
    this.userRepository = userRepository;
  }
}
