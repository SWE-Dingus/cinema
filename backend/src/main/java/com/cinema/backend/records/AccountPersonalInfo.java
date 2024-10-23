package com.cinema.backend.records;

import com.cinema.backend.entities.PaymentCard;
import jakarta.persistence.OneToMany;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import java.util.List;

public class AccountPersonalInfo {

  @Email public String email;

  @NotBlank public String firstName;

  @NotBlank public String lastName;

  public String billingAddr;

  @NotBlank public String phoneNumber;

  @OneToMany(mappedBy = "userEmail")
  private List<PaymentCard> userCards;

  public List<PaymentCard> getUserCards() {
    return userCards;
  }
}
