package com.cinema.backend.entities;

import com.cinema.backend.entities.User.AuthorizationLevel;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Pattern;
import java.time.Instant;

@Entity
public class AuthenticationToken {
  @Id @Email public String userEmail;

  @Pattern(regexp = "[A-Za-z0-9]{64}")
  public String token;

  @NotNull public Instant expires;

  @NotNull public AuthorizationLevel authorizationLevel;
}
