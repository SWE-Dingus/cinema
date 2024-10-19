package com.cinema.backend.entities;

import jakarta.persistence.Entity;
import jakarta.validation.constraints.NotBlank;

@Entity
public class Customer extends User {
  @NotBlank public String firstName;
  @NotBlank public String lastName;
}
