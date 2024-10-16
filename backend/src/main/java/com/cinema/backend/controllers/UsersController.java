package com.cinema.backend.controllers;


import com.cinema.backend.entities.User;
import com.cinema.backend.repositories.UserRepository;
import jakarta.validation.Valid;
import java.util.HashMap;
import java.util.Map;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
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

  @PostMapping("/create")
  public Map<String, String> createUser(@Valid @RequestBody User user) {
    if (userRepository.findById(user.username) != null) {
      // ToDo: Throw error need a different username
    } else {
      userRepository.save(user);
      return new HashMap<>() {
        {
          this.put("username", user.getUsername());
        }
      };
    }
    return null;
  }
}
