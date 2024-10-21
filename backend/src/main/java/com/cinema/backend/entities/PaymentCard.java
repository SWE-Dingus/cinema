package com.cinema.backend.entities;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import java.sql.Date;

@Entity
public class PaymentCard {

  @Id @NotBlank private String cardNumber;

  @NotBlank private String billingAddr;

  @NotBlank private Date experirationDate;

  /** FK to user */
  @Email private String userEmail;

  public String getCardNumber() {
    return cardNumber;
  }

  public void setCardNumber(String cardNumber) {
    this.cardNumber = cardNumber;
  }
}
