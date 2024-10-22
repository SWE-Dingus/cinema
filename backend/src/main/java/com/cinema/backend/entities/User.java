package com.cinema.backend.entities;

import com.cinema.backend.records.AccountPersonalInfo;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import java.util.List;

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
  @NotBlank public String firstName;
  @NotBlank public String lastName;
  public String address;
  @NotNull public UserState state = UserState.INACTIVE;
  @NotNull public AuthorizationLevel authorizationLevel = AuthorizationLevel.CUSTOMER;
  public int lastConfirmationCode;
  public boolean wantsMarketingEmails;

  @OneToMany(mappedBy = "userEmail")
  private List<PaymentCard> userCards;

  public void edit(AccountPersonalInfo changes) {
    this.firstName = changes.firstName;
    this.lastName = changes.lastName;
    this.address = changes.billingAddr;
    this.userCards = changes.getUserCards();
  }

  // Returns true if the payment card can be added, false if too many
  public boolean addPaymentCard(PaymentCard paymentCard) {
    if (userCards.size() < 3) {
      this.userCards.add(paymentCard);
      return true;
    } else {
      return false;
    }
  }

  public List<PaymentCard> getUserCards() {
    return userCards;
  }
}
