package com.cinema.backend.entities;

import jakarta.persistence.Id;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;

public abstract class User {

  public static enum UserState {
    ACTIVE,
    INACTIVE,
    SUSPENDED,
  }

  @NotEmpty @NotNull @NotBlank @Id public long id;

  @NotEmpty @NotNull public UserState state;

  @NotEmpty @NotNull @NotBlank private String password;

  public boolean correctPassword(String input) {
    if (password.equals(input)) {
      return true;
    } else {
      return false;
    }
  }

  public UserState getState() {
    return state;
  }

  public void setUserState(UserState state) {
    this.state = state;
  }
}
