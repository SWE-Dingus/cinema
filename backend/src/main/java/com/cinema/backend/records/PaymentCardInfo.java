package com.cinema.backend.records;

import com.cinema.backend.entities.PaymentCard;
import jakarta.validation.constraints.NotBlank;

public record PaymentCardInfo(
    @NotBlank String cardNumber, @NotBlank String expirationDate, @NotBlank String billingAddress) {
  public PaymentCard toEntity() {
    var paymentCard = new PaymentCard();
    paymentCard.cardNumber = cardNumber;
    paymentCard.expirationDate = expirationDate;
    paymentCard.billingAddress = billingAddress;
    return paymentCard;
  }
}
