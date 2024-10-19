package com.cinema.backend.entities;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import java.sql.Date;

@Entity
public class PaymentCardInfo {

  @Id @NotBlank @NotEmpty private String cardNumber;

  @NotBlank @NotEmpty private String billingAddr;

  @NotBlank @NotEmpty private Date experirationDate;

  /** FK to user */
  @NotBlank @NotEmpty @NotNull private long userID;

  public String getCardNumber() {
    return cardNumber;
  }

  public void setCardNumber(String cardNumber) {
    this.cardNumber = cardNumber;
  }
}
