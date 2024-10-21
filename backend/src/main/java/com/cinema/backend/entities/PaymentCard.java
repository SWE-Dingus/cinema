package com.cinema.backend.entities;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;

@Entity
public class PaymentCard {

  @Id @NotBlank public String cardNumber;

  @NotBlank public String billingAddr;

  @Pattern(regexp = "[0-9]{2}/[0-9]{4}")
  @NotBlank
  public String expirationDate; // add regex for mm-dd-yyyy

  /** FK to user */
  @Email public String userEmail;

  public String getUserEmail() {
    return this.userEmail;
  }
}
