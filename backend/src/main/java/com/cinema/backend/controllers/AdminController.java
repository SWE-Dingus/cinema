package com.cinema.backend.controllers;

import com.cinema.backend.entities.User;
import com.cinema.backend.repositories.UserRepository;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
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
}
