package com.cinema.backend.entities;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import java.sql.Date;

@Entity
public class PaymentCardInfo {

  @Id @NotBlank private String cardNumber;

  @NotBlank private String billingAddr;

  @NotBlank private Date experirationDate;

  /** FK to user */
  @NotNull private Long userID;

  public String getCardNumber() {
    return cardNumber;
  }

  public void setCardNumber(String cardNumber) {
    this.cardNumber = cardNumber;
  }

  public long getUserId(){
    return this.userID;
  }

}
