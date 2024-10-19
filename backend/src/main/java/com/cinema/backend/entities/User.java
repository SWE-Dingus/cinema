package com.cinema.backend.entities;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

@Entity
public abstract class User {

  public enum UserState {
    ACTIVE,
    INACTIVE,
    SUSPENDED,
  }

  @NotNull @Id public Long id;
  @NotNull public UserState state;

  @Email public String email;

  @NotBlank private String password;

  public boolean isCorrectPassword(String input) {
    return password.equals(input);
  }

  public UserState getState() {
    return state;
  }

  public void setState(UserState state) {
    this.state = state;
  }
}
