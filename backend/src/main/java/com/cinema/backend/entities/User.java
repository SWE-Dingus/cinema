package com.cinema.backend.entities;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

@Entity
@Table(name = "users")
public class User {

  public enum UserState {
    ACTIVE,
    INACTIVE,
    SUSPENDED,
  }

  public enum AuthorizationLevel {
    CUSTOMER,
    ADMIN,
  }

  @Id @Email public String email;
  @NotBlank public String password;
  @NotBlank public String name;
  @NotNull public UserState state = UserState.ACTIVE;
  @NotNull public AuthorizationLevel authorizationLevel = AuthorizationLevel.CUSTOMER;

  public void edit(User changes) {
    this.email = changes.email;
    this.password = changes.email;
    this.name = changes.name;
    this.state = changes.state;
    this.authorizationLevel = changes.authorizationLevel;
  }

}
